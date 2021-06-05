import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Input, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth, storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import MoodAndTenseTypes from "../configurations/MoodAndTenseTypes";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);

  // mood and tense default settings:
  const defaultSettings = Object.keys(MoodAndTenseTypes).reduce((settings, mood) => {
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
      // Create a new used based on email and password and then add the selected name:
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (authUser) => {
          await authUser.user.updateProfile({
            displayName: name,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/spanish-app-57e1a.appspot.com/o/default_profile_picture.jpg?alt=media&token=17afbe61-3b43-40bd-828c-a135a664768d",
          });
          // upload an image too:
          await uploadImage(authUser);
          // refresh the home page:
          navigation.replace("Home");
        })
        .catch((error) => alert(error.message));
    }
  };

  const uploadImage = async (authUser) => {
    // upload the photo:
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
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Register
      </Text>
      {image && <Avatar source={{ uri: image }} size="xlarge" rounded />}
      <View style={styles.inputContainer}>
        <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
        <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)} />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Password again"
          secureTextEntry
          type="password"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button containerStyle={styles.buttonContainer} title="Pick an image from camera roll" onPress={pickImage} />
      <Button
        containerStyle={styles.buttonContainer}
        title="Register"
        onPress={register}
        raised
        buttonStyle={styles.registerButton}
      />
    </View>
  );
};

export default RegisterScreen;
