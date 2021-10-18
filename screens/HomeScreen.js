import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Image, View, ScrollView } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth, db } from "../firebase";
import { loadDictionary } from "../actions/dictionary";
import dictionaryJSON from "../assets/dictionary.json";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { setUser, setSettings } from "../actions/user";
import logo from "../assets/logo.png";

const HomeScreen = ({ navigation, user, settings, setUser, setSettings, loadDictionary }) => {
  const [wordOfTheDayDict, setWordOfTheDayDict] = useState({});

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
  }, [settings]);

  useEffect(() => {
    var unsubscribe = db.collection("dictionary").where("verb", "==", wordOfTheDay);
    unsubscribe
      .where("mood", "==", "Indicative")
      .where("pronoun", "==", "yo")
      .where("tense", "==", "Present")
      .get()
      .then((querySnapshot) => {
        setWordOfTheDayDict((prevState) => {
          return { ...prevState, yoPresent: querySnapshot.docs[0].data() };
        });
      });

    unsubscribe
      .where("mood", "==", "Indicative")
      .where("pronoun", "==", "tú")
      .where("tense", "==", "Present")
      .get()
      .then((querySnapshot) => {
        setWordOfTheDayDict((prevState) => {
          return { ...prevState, tuPresent: querySnapshot.docs[0].data() };
        });
      });

    unsubscribe
      .where("mood", "==", "Indicative")
      .where("pronoun", "==", "yo")
      .where("tense", "==", "Preterite")
      .get()
      .then((querySnapshot) => {
        setWordOfTheDayDict((prevState) => {
          return { ...prevState, yoPreterite: querySnapshot.docs[0].data() };
        });
      });

    unsubscribe
      .where("mood", "==", "Progressive")
      .where("pronoun", "==", "nosotros")
      .where("tense", "==", "Present")
      .get()
      .then((querySnapshot) => {
        setWordOfTheDayDict((prevState) => {
          return { ...prevState, nosotrosProgressivePresent: querySnapshot.docs[0].data() };
        });
      });
  }, []);
  // console.log(wordOfTheDayDict.first);
  // if (Object.keys(wordOfTheDayDict).length >= 4) {
  //   console.log(Object.keys(wordOfTheDayDict["yoPresent"]));
  // }

  // word_of_the_day_query_1.get().then((querySnapshot) => {
  //   console.log(querySnapshot.docs[0].id, " => ", querySnapshot.docs[0].data());
  //   // let docs = querySnapshot.docs;
  //   // for (let doc of docs) {
  //   //   console.log(doc.id, " => ", doc.data());
  //   // }
  // });
  // word_of_the_day_query_1.get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // });

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

          <View style={{ height: "45%" }}>
            {Object.keys(wordOfTheDayDict).length == 4 ? (
              <Text style={styles.wordOfTheDayHeader}>Word of the day:</Text>
            ) : null}
            {Object.keys(wordOfTheDayDict).length == 4 ? (
              <View style={styles.wordOfDayContainer}>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Image source={logo} style={{ height: 100, width: 200 }}></Image>
                </View>
                <Text style={styles.wordOfTheDaySpanish}>{wordOfTheDay}</Text>
                <Text style={styles.wordOfTheDayEnglish}>{wordOfTheDayDict.yoPresent.english.split(" ")[1]}</Text>
                {["yoPresent", "tuPresent", "yoPreterite", "nosotrosProgressivePresent"].map((i) => (
                  <Text key={i} style={styles.wordOfTheDayExamples}>
                    {wordOfTheDayDict[i].pronoun +
                      " " +
                      wordOfTheDayDict[i].spanish +
                      " - " +
                      wordOfTheDayDict[i].english}{" "}
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
        <Text>{"loading..."}</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setUser, setSettings, loadDictionary })(HomeScreen);
