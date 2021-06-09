import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import WordCard from "../components/WordCard";
import { setWordCardList } from "../actions/cards";

const PracticeScreen = ({ navigation, dictionary, wordCardList, setWordCardList }) => {
  const [selectedWordCard, setSelectedWordCard] = useState(<View></View>);
  const [count, setCount] = useState(0);
  const totalWords = 2;

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

  return (
    <View style={styles.container}>
      <Text>{count + "/" + totalWords}</Text>
      {selectedWordCard}
    </View>
  );
};

const mapStateToProps = (state) => ({
  dictionary: state.dictionary.dictionary,
  wordCardList: state.cards.wordCardList,
});

export default connect(mapStateToProps, { setWordCardList })(PracticeScreen);
