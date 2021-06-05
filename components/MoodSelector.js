import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../Styles";

const MoodSelector = ({ mood, settings, tenses, setSettings }) => {
  const [moodChecked, setMoodChecked] = useState(!Object.values(settings[mood]).every((item) => item === false));
  const [showTenses, setShowTenses] = useState(false);

  // set mood checker if all false or at least one is true:
  useEffect(() => {
    Object.values(settings[mood]).every((item) => item === false) ? setMoodChecked(false) : setMoodChecked(true);
  }, [settings]);

  // set all tense settings if the mood checker is changed:
  const moodChecker = () => {
    setMoodChecked(!moodChecked);
    const newMoodSettings = Object.keys(settings[mood]).reduce((o, key) => {
      o[key] = !moodChecked;
      return o;
    }, {});

    setSettings({ ...settings, [mood]: newMoodSettings });
  };

  // tense settings updater:
  const tenseChecker = (tense) => {
    const newTenseSettings = Object.keys(settings[mood]).reduce((o, key) => {
      key === tense ? (o[key] = !settings[mood][tense]) : (o[key] = settings[mood][key]);
      return o;
    }, {});

    setSettings({ ...settings, [mood]: newTenseSettings });
  };

  return (
    <View style={styles.moodSettingsContainer}>
      <View style={styles.moodContainer}>
        <CheckBox containerStyle={styles.moodCheckBox} title={mood} checked={moodChecked} onPress={moodChecker} />
        <TouchableOpacity onPress={() => setShowTenses(!showTenses)}>
          {showTenses ? (
            <AntDesign name="upcircleo" size={24} color="black" />
          ) : (
            <AntDesign name="downcircleo" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.subSettingContainer}>
        {showTenses &&
          tenses.map((tense) => (
            <CheckBox
              containerStyle={styles.tenseCheckBox}
              key={mood + tense}
              title={tense}
              checked={settings[mood][tense]}
              onPress={() => tenseChecker(tense)}
              checkedColor="green"
            />
          ))}
      </View>
    </View>
  );
};

export default MoodSelector;
