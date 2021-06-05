import React, { useState } from 'react'
import { connect } from "react-redux";
import { View } from 'react-native'
import { Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import WordCard from "../components/WordCard";

const PracticeScreen = ({ navigation, dictionary }) => {
  const [selectedWordCard, setSelectedWordCard] = useState(<View></View>);

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
    setSelectedWordCard(<WordCard mood={mood} tense={tense} pronoun={pronoun} word={word} wordDict={wordDict} />)
  };

  return (
    <View style={styles.container}>
      <Button containerStyle={styles.buttonContainer} onPress={getRandomWord} title="Random word" />
      {selectedWordCard}
    </View>
  )
}

const mapStateToProps = (state) => ({
  dictionary: state.dictionary.dictionary,
});

export default connect(mapStateToProps, {})(PracticeScreen);