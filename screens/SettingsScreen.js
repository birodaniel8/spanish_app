import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { CheckBox, Text } from "react-native-elements";
import MoodSelector from "../components/MoodSelector";
import MoodAndTenseTypes from "../configurations/MoodAndTenseTypes";
import { styles } from "../Styles";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  // mood and tense list to settings:
  const moodSettings = Object.keys(MoodAndTenseTypes).reduce((settings, mood) => {
    // set every tense setting in a mood to 'true':
    const tenseSettings = MoodAndTenseTypes[mood].reduce((o, key) => ({ ...o, [key]: true }), {});
    settings[mood] = tenseSettings;
    return settings;
  }, {});

  const [elEllaUsted, setElEllaUsted] = useState(false);
  const [onlyEnglish, setOnlyEnglish] = useState(true);
  const [settings, setSettings] = useState({ ...moodSettings, elEllaUsted, onlyEnglish });

  // update the other settings:
  const elEllaUstedChecker = () => {
    setSettings({ ...settings, elEllaUsted: !elEllaUsted });
    setElEllaUsted(!elEllaUsted);
  };

  const onlyEnglishChecker = () => {
    setSettings({ ...settings, onlyEnglish: !onlyEnglish });
    setOnlyEnglish(!onlyEnglish);
  };

  return (
    <View style={styles.settingsScreenContainer}>
      <View style={styles.settingsHeader}>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text h3>Settings</Text>
        <TouchableOpacity onPress={() => {}}>
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
            settings={settings}
            setSettings={setSettings}
          />
        ))}
        <Text style={styles.settingsCategory}>Other</Text>
        <View style={styles.moodSettingsContainer}>
          <CheckBox
            containerStyle={styles.moodCheckBox}
            title={"él/ella/Usted in any case"}
            checked={elEllaUsted}
            onPress={elEllaUstedChecker}
          />
          <CheckBox
            containerStyle={styles.moodCheckBox}
            title={"Only with English translation"}
            checked={onlyEnglish}
            onPress={onlyEnglishChecker}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
