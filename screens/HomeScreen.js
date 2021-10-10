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

  var unsubscribe = db.collection("dictionary").where("mood", "in", ["Indicative", "asdf", "Imperative"]);
  if (0 < 1) {
    unsubscribe = unsubscribe.where("mood", "==", "Indicative");
  }
  unsubscribe.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  });

  if (user?.displayName) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.replace("Home")}>
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
          {/* <Button containerStyle={styles.buttonContainer} onPress={signOutUser} title="Sign out" type="outline" /> */}
          <Text style={{ ...styles.defaultText, marginTop: 40, marginBottom: 6 }}>Word of the day:</Text>
          <View style={styles.wordOfDayContainer}>
            <Text>correr</Text>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.pageContainer}>
        <Text>loading...</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setUser, setSettings, loadDictionary })(HomeScreen);
