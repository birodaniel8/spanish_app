import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { CheckBox, Text } from "react-native-elements";
import MoodSelector from "../components/MoodSelector";
import { MoodAndTenseTypes } from "../configurations/MoodAndTenseTypes";
import { styles, primaryColor } from "../Styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
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
        <Text style={styles.settingsCategoryText}>Other</Text>
        <View style={styles.moodSettingsContainer}>
          <CheckBox
            containerStyle={styles.moodCheckBox}
            // title={"él/ella/Usted in any case"}
            title={<Text style={styles.settingsMoodText}>él/ella/Usted in any case</Text>}
            checked={newSettings.elEllaUsted}
            onPress={elEllaUstedChecker}
            checkedColor={primaryColor}
          />
          <CheckBox
            containerStyle={styles.moodCheckBox}
            title={<Text style={styles.settingsMoodText}>Only with English translation</Text>}
            checked={newSettings.onlyEnglish}
            onPress={onlyEnglishChecker}
            checkedColor={primaryColor}
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
