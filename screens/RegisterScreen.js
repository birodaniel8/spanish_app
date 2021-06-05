import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { Avatar, Button, Input, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth, db, storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import MoodAndTenseTypes from "../configurations/MoodAndTenseTypes";
import { connect } from "react-redux";
import { setUser, setSettings } from "../actions/user";
import DefaultPhotoUrl from "../configurations/DefaultPhotoUrl";
import backgroundImage from "../assets/wp2.jpg";

const RegisterScreen = ({ navigation, setUser, setSettings }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);

  // mood and tense default settings:
  const defaultMoodSettings = Object.keys(MoodAndTenseTypes).reduce((settings, mood) => {
    // set every tense setting in a mood to 'true':
    const tenseSettings = MoodAndTenseTypes[mood].reduce((o, key) => ({ ...o, [key]: true }), {});
    settings[mood] = tenseSettings;
    return settings;
  }, {});

  const register = () => {
    if (password !== password2) {
      setPassword("");
      setPassword2("");
      alert("The passwords do not match.");
    } else {
      // Create a new used based on email and password and then add the selected name and photo:
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (authUser) => {
          await authUser.user.updateProfile({
            displayName: name,
            photoURL: DefaultPhotoUrl,
          });
          // upload an image too:
          await uploadImage(authUser);
          // add the base settings to the database:
          await db
            .collection("users")
            .doc(authUser.user.uid)
            .set({
              settings: {
                ...defaultMoodSettings,
                elEllaUsted: false,
                onlyEnglish: true,
              },
            });
          // add to states:
          setUser(authUser.user);
          setSettings(defaultMoodSettings);
          // refresh the home page:
          navigation.replace("Home");
        })
        .catch((error) => alert(error.message));
    }
  };

  // Upload the photo:
  const uploadImage = async (authUser) => {
    if (image) {
      const imageName = image.substring(image.lastIndexOf("/") + 1);
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = storage.ref(authUser.user.uid + "/profilePicture/" + imageName);
      await storageRef.put(blob);
      // then add to user's profile:
      await storageRef.getDownloadURL().then(async (url) => {
        await auth.currentUser.updateProfile({
          photoURL: url,
        });
      });
    }
  };

  // Image picker:
  const pickImage = async () => {
    // handle permissions:
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    // select image:
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: false,
      aspect: [3, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
      <View style={styles.container}>
        <Text h3 style={{ marginBottom: 50 }}>
          Register
        </Text>
        {image && <Avatar source={{ uri: image }} size="xlarge" rounded />}
        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
            inputContainerStyle={{ borderBottomColor: "black" }}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputContainerStyle={{ borderBottomColor: "black" }}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputContainerStyle={{ borderBottomColor: "black" }}
          />
          <Input
            placeholder="Password again"
            secureTextEntry
            type="password"
            value={password2}
            onChangeText={(text) => setPassword2(text)}
            onSubmitEditing={register}
            inputContainerStyle={{ borderBottomColor: "black" }}
          />
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          titleStyle={{ color: "black" }}
          title="Pick an image from camera roll"
          onPress={pickImage}
          buttonStyle={styles.pickImageButton}
        />
        <Button
          containerStyle={styles.buttonContainer}
          titleStyle={{ color: "black" }}
          title="Register"
          onPress={register}
          raised
          buttonStyle={styles.registerButton}
        />
      </View>
    </ImageBackground>
  );
};

export default connect(null, { setUser, setSettings })(RegisterScreen);
