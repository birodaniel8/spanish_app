import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { CheckBox, Text } from "react-native-elements";
import MoodSelector from "../components/MoodSelector";
import MoodAndTenseTypes from "../configurations/MoodAndTenseTypes";
import { styles } from "../Styles";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { setSettings } from "../actions/user";
import { connect } from "react-redux";
import { db } from "../firebase";

const SettingsScreen = ({ navigation, user, settings, setSettings }) => {
  const [newSettings, setNewSettings] = useState(settings);

  // update the other settings:
  const elEllaUstedChecker = () => {
    setNewSettings({ ...newSettings, elEllaUsted: !newSettings.elEllaUsted });
  };
  const onlyEnglishChecker = () => {
    setNewSettings({ ...newSettings, onlyEnglish: !newSettings.onlyEnglish });
  };

  const saveSettings = () => {
    db.collection("users").doc(user.uid).set({ settings: newSettings });
    setSettings(newSettings);
    console.log("settings saved");
  };

  return (
    <View style={styles.settingsScreenContainer}>
      <View style={styles.settingsHeader}>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text h3>Settings</Text>
        <TouchableOpacity onPress={saveSettings}>
          <FontAwesome5 name="save" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.settingContainer}>
        <Text style={styles.settingsCategory}>Moods and Tenses</Text>
        {Object.keys(MoodAndTenseTypes).map((mood) => (
          <MoodSelector
            key={mood}
            mood={mood}
            tenses={MoodAndTenseTypes[mood]}
            settings={newSettings}
            setSettings={setNewSettings}
          />
        ))}
        <Text style={styles.settingsCategory}>Other</Text>
        <View style={styles.moodSettingsContainer}>
          <CheckBox
            containerStyle={styles.moodCheckBox}
            title={"él/ella/Usted in any case"}
            checked={newSettings.elEllaUsted}
            onPress={elEllaUstedChecker}
          />
          <CheckBox
            containerStyle={styles.moodCheckBox}
            title={"Only with English translation"}
            checked={newSettings.onlyEnglish}
            onPress={onlyEnglishChecker}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setSettings })(SettingsScreen);
