import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Image, View, ScrollView } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth } from "../firebase";
import { loadDictionary } from "../actions/dictionary";
import dictionaryJSON from "../assets/dictionary.json";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { setUser, setSettings } from "../actions/user";
import logo from "../assets/logo.png";
import { wordOfTheDayExamples } from "../configurations/MoodAndTenseTypes";

const HomeScreen = ({ navigation, user, settings, setUser, setSettings, loadDictionary }) => {
  const [wordOfTheDayList, setWordOfTheDayList] = useState();

  var wordOfTheDay = "creer";

  // Sign Out:
  const signOutUser = () => {
    auth.signOut().then(() => {
      // remove user from state and navigate to login screen:
      setUser(null);
      setSettings(null);
      navigation.replace("Login");
    });
  };

  // Load Dictionary from JSON:
  useEffect(() => {
    let filteredDictionary = {};
    if (settings) {
      Object.keys(dictionaryJSON).forEach((mood) => {
        // if not all the tenses are false in the mood setting we load the tenses:
        if (Object.values(settings[mood]).every((item) => item === false) === false) {
          filteredDictionary[mood] = {};
          // load the only the selected tenses from the settings:
          Object.keys(dictionaryJSON[mood]).forEach((tense) => {
            if (settings[mood][tense] === true) {
              filteredDictionary[mood][tense] = dictionaryJSON[mood][tense];
            }
          });
        }
      });
    }
    // save the filtered dictionary:
    loadDictionary(filteredDictionary);
    // console.log(filteredDictionary);
  }, [settings]);

  // Load word of the day examples:
  useEffect(() => {
    setWordOfTheDayList(
      wordOfTheDayExamples.map((example) => ({
        ...example,
        ...dictionaryJSON[example.mood][example.tense][example.pronoun][wordOfTheDay],
      }))
    );
  }, []);

  if (user?.displayName) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.replace("Settings")}>
            <AntDesign name="setting" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOutUser}>
            <MaterialIcons name="logout" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.pageContainer}>
          <View style={styles.profilePictureContainer}>
            <Image source={logo} style={styles.flagBackground}></Image>
            {user?.photoURL && (
              <Avatar
                source={{ uri: user.photoURL }}
                size="xlarge"
                rounded
                avatarStyle={{ borderWidth: 0.5, borderRadius: 100 }}
              />
            )}
          </View>
          <Text style={styles.greedingText}>¡Hola {user?.displayName}!</Text>
          <Button
            containerStyle={{ ...styles.primaryButtonContainer, width: "60%" }}
            buttonStyle={styles.primaryButton}
            titleStyle={styles.primaryButtonText}
            onPress={() => navigation.navigate("Practice")}
            title="Let's practice!"
          />

          <View style={{ height: "45%", width: "90%" }}>
            {wordOfTheDayList? <Text style={styles.wordOfTheDayHeader}>Word of the day:</Text> : null}
            {wordOfTheDayList? (
              <View style={styles.wordOfDayContainer}>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Image source={logo} style={{ height: 100, width: 200 }}></Image>
                </View>
                <Text style={styles.wordOfTheDaySpanish}>{wordOfTheDay}</Text>
                <Text style={styles.wordOfTheDayEnglish}>{wordOfTheDayList[0].in_english.split(" ")[1]}</Text>
                {wordOfTheDayList.map((wod, i) => (
                  <Text key={i} style={styles.wordOfTheDayExamples}>
                    {wod.pronoun + " " + wod.in_spanish + " - " + wod.in_english}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.defaultText}>{"loading..."}</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setUser, setSettings, loadDictionary })(HomeScreen);
