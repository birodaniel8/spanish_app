import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import WordCard from "../components/WordCard";
import { setWordCardList } from "../actions/cards";
import { TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const PracticeScreen = ({ navigation, dictionary, wordCardList, setWordCardList }) => {
  const [selectedWordCard, setSelectedWordCard] = useState(<View></View>);
  const [count, setCount] = useState(0);
  const totalWords = 10;

  useEffect(() => {
    // sample 10 random word cards and store them:
    let wordList = [];
    for (let i = 0; i < totalWords; i++) {
      wordList.push(getRandomWord());
    }
    setWordCardList(wordList);
  }, []);

  useEffect(() => {
    if (wordCardList) {
      if (wordCardList.length > 0) {
        setSelectedWordCard(wordCardList[0]);
        setCount(totalWords - wordCardList.length + 1);
      } else {
        setWordCardList(null);
        navigation.replace("PracticeDone");
      }
    }
  }, [wordCardList]);

  var randomKey = function (obj) {
    var keys = Object.keys(obj);
    const randomKey = keys[(keys.length * Math.random()) << 0];
    return [randomKey, obj[randomKey]];
  };

  const getRandomWord = () => {
    var [mood, moodDict] = randomKey(dictionary);
    var [tense, tenseDict] = randomKey(moodDict);
    var [pronoun, pronounDict] = randomKey(tenseDict);
    var [word, wordDict] = randomKey(pronounDict);
    return <WordCard mood={mood} tense={tense} pronoun={pronoun} word={word} wordDict={wordDict} />;
  };

  var progress = (count / (totalWords+1)) * 100 + "%";

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pageHeader}>
        <View style={styles.statusBarContainer}>
          <View style={{ ...styles.statusBarProgress, width: progress }}></View>
          <Text style={styles.statusBarProgressNumbers}>
            {count + "/" + totalWords}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.replace("Home")}>
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
});

export default connect(mapStateToProps, { setWordCardList })(PracticeScreen);
