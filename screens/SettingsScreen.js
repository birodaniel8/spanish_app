import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import MoodSelector from "../components/MoodSelector";
import { MoodAndTenseTypes } from "../configurations/MoodAndTenseTypes";
import { styles } from "../Styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { setSettings } from "../actions/user";
import { connect } from "react-redux";
import { db } from "../firebase";

const SettingsScreen = ({ navigation, user, settings, setSettings }) => {
  const [newSettings, setNewSettings] = useState(settings);
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
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setSettings })(SettingsScreen);
