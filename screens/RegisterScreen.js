import React, { useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Avatar, Button, Input, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

import { setUser, setSettings, setStats } from "../actions/user";

import { styles } from "../Styles";
import { auth, db, storage } from "../firebase";
import { MoodAndTenseTypes } from "../configurations/MoodAndTenseTypes";
import DefaultPhotoUrl from "../configurations/DefaultPhotoUrl";

const RegisterScreen = ({ navigation, setUser, setSettings, setStats }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // mood and tense default settings:
  const defaultMoodSettings = Object.keys(MoodAndTenseTypes).reduce((settings, mood) => {
    // set every tense setting in a mood to 'false':
    const tenseSettings = MoodAndTenseTypes[mood].reduce((o, key) => ({ ...o, [key]: false }), {});
    settings[mood] = tenseSettings;
    // except Indicative Present, Preterite, Future:
    settings["Indicative"]["Present"] = true;
    settings["Indicative"]["Preterite"] = true;
    settings["Indicative"]["Future"] = true;
    return settings;
  }, {});
  const defaultStats = { streakCount: 0, lastPracticeTime: null, practiceCount: 0 };

  const register = () => {
    navigation.replace("Loading");
    // Create a new user based on email and password and then add the selected name and photo:
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({
          displayName: name.trim(),
          photoURL: DefaultPhotoUrl,
        });
        // upload an image too:
        await uploadImage(authUser);
        // add the base settings to the database:
        await db.collection("users").doc(authUser.user.uid).set({
          settings: defaultMoodSettings,
          stats: defaultStats,
        });
        // add to states:
        setUser(authUser.user);
        setSettings(defaultMoodSettings);
        setStats(defaultStats);
      })
      .then(() =>
        // refresh the home page:
        navigation.replace("Home")
      )
      .catch((error) => alert(error.message));
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
    <View style={styles.pageContainer}>
      <Text h3 style={styles.h1Text}>
        Register
      </Text>
      <Avatar source={image ? { uri: image } : { uri: DefaultPhotoUrl }} size="xlarge" rounded onPress={pickImage} />
      <Text
        style={{ ...styles.defaultText, textDecorationLine: "underline", marginBottom: 35, marginTop: 10 }}
        onPress={pickImage}
      >
        Pick a profile picture
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputFieldLabel}>Nickname</Text>
        <Input
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          inputContainerStyle={styles.inputField}
        />
        <Text style={styles.inputFieldLabel}>Email</Text>
        <Input
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputField}
        />
        <Text style={styles.inputFieldLabel}>Password</Text>
        <Input
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputContainerStyle={styles.inputField}
        />
      </View>
      <Button
        containerStyle={styles.secondaryButtonContainer}
        buttonStyle={styles.secondaryButton}
        titleStyle={styles.secondaryButtonText}
        title="Register"
        onPress={register}
        raised
      />
    </View>
  );
};

export default connect(null, { setUser, setSettings, setStats })(RegisterScreen);
