import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text } from "react-native-elements";

import { setWordCardList } from "../actions/cards";
import { setStats } from "../actions/user";

import { styles } from "../Styles";
import { db } from "../firebase";
import firebase from "firebase/app";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import WordCard from "../components/WordCard";

const PracticeScreen = ({ navigation, dictionary, wordCardList, user, stats, setWordCardList, setStats }) => {
  const [selectedWordCard, setSelectedWordCard] = useState(
    <View>
      <Text style={styles.defaultText}>loading...</Text>
    </View>
  );
  const [count, setCount] = useState(0);
  const totalWords = 2;
  var progress = (count / (totalWords + 1)) * 100 + "%";

  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    this.setMinutes(this.getMinutes() + (h % 1) * 60);
    return this;
  };

  useEffect(() => {
    // sample random word cards and store them:
    let wordList = [];
    for (let i = 0; i < totalWords; i++) {
      wordList.push(getRandomWord());
    }
    setWordCardList(wordList);
  }, []);

  // useEffect on the changes of the word card list:
  useEffect(() => {
    if (wordCardList) {
      if (wordCardList.length > 0) {
        setSelectedWordCard(wordCardList[0]);
        setCount(totalWords - wordCardList.length + 1);
      } else {
        setWordCardList(null);
        // get current date:
        var currentDateTime = new Date();
        currentDateTime.addHours(-currentDateTime.getTimezoneOffset() / 60);

        // determine the new streak count:
        const oneDay = 24 * 60 * 60 * 1000;
        if (stats.lastPracticeTime) {
          var lastTime = stats.lastPracticeTime.toDate();
          var lastPracticeDay = new Date(lastTime.getFullYear(), lastTime.getMonth(), lastTime.getDate());
          lastPracticeDay.addHours(-lastPracticeDay.getTimezoneOffset() / 60);
          var newStreakCount = currentDateTime - lastPracticeDay > oneDay ? stats.streakCount + 1 : stats.streakCount;
        } else {
          var newStreakCount = stats.streakCount + 1;
        }

        // upload and set new stats:
        var firebastTimestamp = firebase.firestore.Timestamp.fromDate(currentDateTime);
        const newStats = {
          streakCount: newStreakCount,
          practiceCount: stats.practiceCount + 1,
          lastPracticeTime: firebastTimestamp,
        };

        setStats(newStats);
        db.collection("users").doc(user.uid).update({ stats: newStats });
        navigation.replace("PracticeDone");
      }
    }
  }, [wordCardList]);

  // Get a random key of the object:
  var randomKey = function (obj) {
    var keys = Object.keys(obj);
    const randomKey = keys[(keys.length * Math.random()) << 0];
    return [randomKey, obj[randomKey]];
  };

  // Sample a random word with its properties:
  const getRandomWord = () => {
    var [mood, moodDict] = randomKey(dictionary);
    var [tense, tenseDict] = randomKey(moodDict);
    var [pronoun, pronounDict] = randomKey(tenseDict);
    var [word, wordDict] = randomKey(pronounDict);
    return (
      <WordCard
        mood={mood}
        tense={tense}
        pronoun={pronoun}
        word={word}
        in_english={wordDict["in_english"]}
        in_spanish={wordDict["in_spanish"]}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pageHeader}>
        <View style={styles.statusBarContainer}>
          <View style={{ ...styles.statusBarProgress, width: progress }}></View>
          <Text style={styles.statusBarProgressNumbers}>{count + "/" + totalWords}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setWordCardList(null);
            navigation.replace("Home");
          }}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.pageContainer}>{selectedWordCard}</View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  dictionary: state.dictionary.dictionary,
  wordCardList: state.cards.wordCardList,
  user: state.user.user,
  stats: state.user.stats,
});

export default connect(mapStateToProps, { setWordCardList, setStats })(PracticeScreen);
