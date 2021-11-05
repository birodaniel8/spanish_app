import React, { useState } from "react";
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, View, Alert } from "react-native";
import { Text, Input, Avatar } from "react-native-elements";
import { FontAwesome5, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { setSettings, setUser } from "../actions/user";

import { styles, primaryColor } from "../Styles";
import firebase from "firebase/app";
import { auth, db, storage } from "../firebase";
import { MoodAndTenseTypes } from "../configurations/MoodAndTenseTypes";
import MoodSelector from "../components/MoodSelector";

const SettingsScreen = ({ navigation, user, settings, stats, setSettings, setUser }) => {
  const [newSettings, setNewSettings] = useState(settings);
  const [showNewNameField, setShowNewNameField] = useState(false);
  const [newName, setNewName] = useState(user.displayName);
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(null);

  const saveSettings = () => {
    // check if any of the boxes are selected
    const validSetting = Object.values(newSettings)
      .map((mood) => Object.values(mood).some((tense) => tense === true))
      .some((mood) => mood === true);
    if (validSetting) {
      db.collection("users").doc(user.uid).update({ settings: newSettings });
      setSettings(newSettings);
    } else {
      Alert.alert("Error", "Select at least one mood or tense!");
    }
  };

  // db.collection("users")
  //   .get()
  //   .then((querySnapshot) =>
  //     querySnapshot.forEach((doc) =>
  //       doc.ref.update({ stats: { streakCount: 0, lastPracticeTime: null, practiceCount: 0 } })
  //     )
  //   );

  // update user's displayName
  const updateName = async () => {
    if (newName.length > 0) {
      await auth.currentUser.updateProfile({ displayName: newName.trim() });
      setUser(auth.currentUser);
      setShowNewNameField(false);
      Alert.alert("Done", `Your name has been updated to ${newName.trim()}!`);
    } else {
      Alert.alert("Error", `Your name should be at least one character long!`);
    }
  };

  // reauthenticate user with email and password
  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  // change user's password
  const changePassword = async (oldPassword, newPassword) => {
    if (newPassword.length >= 6) {
      const user = auth.currentUser;
      try {
        await reauthenticate(oldPassword);
        await user.updatePassword(newPassword);
        setShowNewPasswordField(false);
        Alert.alert("Done", `Your password has been changed!`);
      } catch (err) {
        Alert.alert("Error", `Your password doesn't match the current password you entered!`);
      }
    } else {
      Alert.alert("Error", `Password should be at least 6 characters!`);
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

  // Upload the photo:
  const uploadImage = async () => {
    if (image) {
      try {
        const imageName = image.substring(image.lastIndexOf("/") + 1);
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = storage.ref(auth.currentUser.uid + "/profilePicture/" + imageName);
        await storageRef.put(blob);
        // then add to user's profile:
        await storageRef.getDownloadURL().then(async (url) => {
          await auth.currentUser.updateProfile({
            photoURL: url,
          });
        });
        Alert.alert("Done", `Your profile picture has been updated`);
        setImage(null);
      } catch (err) {
        Alert.alert("Error", `Something went wrong. The upload is not successful.`);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.h2Text}>Settings</Text>
        <TouchableOpacity onPress={saveSettings}>
          <FontAwesome5 name="save" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.settingsPageContainer}>
        <Text style={styles.settingsCategoryText}>Moods and Tenses</Text>
        {Object.keys(MoodAndTenseTypes).map((mood) => (
          <MoodSelector
            key={mood}
            mood={mood}
            tenses={MoodAndTenseTypes[mood]}
            settings={newSettings}
            setSettings={setNewSettings}
          />
        ))}

        <Text style={styles.settingsCategoryText}>Profile</Text>

        <View style={styles.profileSettingsItem}>
          <Text style={styles.defaultBoldText}>{`Name: ${user.displayName}`}</Text>
          <TouchableOpacity onPress={() => setShowNewNameField(!showNewNameField)}>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showNewNameField && (
          <View style={styles.profileSettingsItemOpened}>
            <Text>New name: </Text>
            <Input
              type="text"
              value={newName}
              onChangeText={(text) => setNewName(text)}
              inputContainerStyle={styles.profileSettingsInputField}
              containerStyle={{ width: "67%", paddingLeft: 5 }}
            />
            <TouchableOpacity onPress={() => updateName()}>
              <Ionicons name="send" size={24} color={primaryColor} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.profileSettingsItem}>
          <Text style={styles.defaultBoldText}>Select new profile picture</Text>
          <TouchableOpacity onPress={pickImage}>
            <MaterialIcons name="add-photo-alternate" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {image && (
          <View style={styles.profileSettingsItemOpened}>
            <Avatar source={{ uri: image }} size="small" rounded />
            <Text style={{ paddingLeft: 10, paddingRight: 10 }}>New profile picture selected</Text>
            <TouchableOpacity onPress={uploadImage}>
              <Ionicons name="send" size={24} color={primaryColor} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.profileSettingsItem}>
          <Text style={styles.defaultBoldText}>Change password</Text>
          <TouchableOpacity onPress={() => setShowNewPasswordField(!showNewPasswordField)}>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showNewPasswordField && (
          <View style={{ flex: 1 }}>
            <View style={styles.profileSettingsItemOpened}>
              <Text>Current password: </Text>
              <Input
                secureTextEntry
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                inputContainerStyle={styles.profileSettingsInputField}
                containerStyle={{ width: "52%", paddingLeft: 5 }}
              />
            </View>
            <View style={styles.profileSettingsItemOpened}>
              <Text>New password: </Text>
              <Input
                secureTextEntry
                type="password"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                inputContainerStyle={styles.profileSettingsInputField}
                containerStyle={{ width: "52%", paddingLeft: 5, marginLeft: 18 }}
              />
              <TouchableOpacity onPress={() => changePassword(password, newPassword)}>
                <Ionicons name="send" size={24} color={primaryColor} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.profileSettingsItem}>
          <Text style={styles.defaultBoldText}>Number of practices: {stats.practiceCount}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
  stats: state.user.stats,
});

export default connect(mapStateToProps, { setSettings, setUser })(SettingsScreen);
