import React, { useState } from "react";
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, View, Alert } from "react-native";
import { Text, Input } from "react-native-elements";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";

import { setSettings, setUser } from "../actions/user";

import { styles, primaryColor } from "../Styles";
import { auth, db } from "../firebase";
import { MoodAndTenseTypes } from "../configurations/MoodAndTenseTypes";
import MoodSelector from "../components/MoodSelector";

const SettingsScreen = ({ navigation, user, settings, setSettings, setUser }) => {
  const [newSettings, setNewSettings] = useState(settings);
  const [showNewNameField, setShowNewNameField] = useState(false);
  const [newName, setNewName] = useState(user.displayName);
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const saveSettings = () => {
    // check if any of the boxes are selected
    const validSetting = Object.values(newSettings)
      .map((mood) => Object.values(mood).some((tense) => tense === true))
      .some((mood) => mood === true);
    if (validSetting) {
      db.collection("users").doc(user.uid).set({ settings: newSettings });
      setSettings(newSettings);
    } else {
      Alert.alert("Error", "Select at least one mood or tense!");
    }
  };

  const updateName = async () => {
    await auth.currentUser.updateProfile({ displayName: newName });
    setUser(auth.currentUser);
    setShowNewNameField(false);
    Alert.alert("Done", `Your name has been updated to ${newName}!`);
  };

  // something is wrong here!!!!
  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = async (oldPassword, newPassword) => {
    const user = auth.currentUser;
    try {
      await reauthenticate(oldPassword);
      await user.updatePassword(newPassword);
    } catch (err) {
      console.log(err);
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
          <View style={{ flex: 1, flexDirection: "row", width: "77%", alignItems: "center" }}>
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
          <TouchableOpacity onPress={() => Alert.alert("OK")}>
            <AntDesign name="picture" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSettingsItem}>
          <Text style={styles.defaultBoldText}>Change password</Text>
          <TouchableOpacity onPress={() => setShowNewPasswordField(!showNewPasswordField)}>
            <FontAwesome5 name="key" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showNewPasswordField && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", width: "77%", alignItems: "center" }}>
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
            <View style={{ flex: 1, flexDirection: "row", width: "77%", alignItems: "center" }}>
              <Text>New password: </Text>
              <Input
                secureTextEntry
                type="password"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                inputContainerStyle={styles.profileSettingsInputField}
                containerStyle={{ width: "58%", paddingLeft: 5 }}
              />
              <TouchableOpacity onPress={() => console.log(reauthenticate(password))}>
                <Ionicons name="send" size={24} color={primaryColor} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setSettings, setUser })(SettingsScreen);
