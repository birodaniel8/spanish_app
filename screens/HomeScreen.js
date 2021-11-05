import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { setUser, setSettings } from "../actions/user";
import { loadDictionary } from "../actions/dictionary";

import { styles, primaryColor } from "../Styles";
import { auth } from "../firebase";
import { wordOfTheDayExamples } from "../configurations/MoodAndTenseTypes";
import WordOfTheDayIcons from "../configurations/WordOfTheDayIcons";
import dictionaryJSON from "../assets/dictionary.json";
import logo from "../assets/logo.png";

import firebase from "firebase/app";

// calculate day of the year:
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

const HomeScreen = ({ navigation, user, settings, stats, setUser, setSettings, loadDictionary }) => {
  const [wordOfTheDayList, setWordOfTheDayList] = useState();
  // word of the day is tied to the given day of the year (different every day in a cycle):
  var wordOfTheDay = Object.keys(WordOfTheDayIcons)[dayOfYear(new Date()) % Object.keys(WordOfTheDayIcons).length];

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

  // Date.prototype.addHours = function (h) {
  //   this.setHours(this.getHours() + h);
  //   this.setMinutes(this.getMinutes() + (h % 1) * 60);
  //   return this;
  // };

  // var date = new Date();
  console.log("--------");
  // console.log(date);
  // // console.log(-date.getTimezoneOffset() / 60)
  // console.log(date.addHours(-date.getTimezoneOffset() / 60));
  // // console.log(date.addHours(1.5));
  // // console.log(1.5 % 1);

  // var currentDateTime = new Date();
  // currentDateTime.addHours(-currentDateTime.getTimezoneOffset() / 60);
  // var firebastTimestamp = firebase.firestore.Timestamp.fromDate(currentDateTime);
  // console.log(firebastTimestamp);

  // const d1 = stats.lastPracticeTime.toDate();
  // const d2 = new Date();
  // const d3 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  // d2.addHours(-d2.getTimezoneOffset() / 60);
  // d3.addHours(-d3.getTimezoneOffset() / 60);

  // console.log(d1);
  // console.log(d2);
  // console.log(d3);
  // console.log(d2 - d3);
  // console.log((d2 - d3) / (60 * 60 * 1000));
  // console.log(2 * 24 * 60 * 60 * 1000);

  if (user?.displayName) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.replace("Settings")}>
            <AntDesign name="setting" size={28} color="black" />
          </TouchableOpacity>
          <View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <MaterialIcons name="local-fire-department" size={28} color={primaryColor} />
              </TouchableOpacity>
              <Text style={{ ...styles.defaultBoldText, paddingLeft: 3 }}>{stats.streakCount}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={signOutUser}>
            <MaterialIcons name="logout" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.homePageContainer}>
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

          <View style={{ width: "90%", marginBottom: 10 }}>
            {wordOfTheDayList ? <Text style={styles.wordOfTheDayHeader}>Word of the day:</Text> : null}
            {wordOfTheDayList ? (
              <View style={styles.wordOfDayContainer}>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Image source={{ uri: WordOfTheDayIcons[wordOfTheDay] }} style={{ height: 100, width: 100 }}></Image>
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
  stats: state.user.stats,
});

export default connect(mapStateToProps, { setUser, setSettings, loadDictionary })(HomeScreen);
