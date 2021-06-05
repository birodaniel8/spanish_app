import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { styles } from "../Styles";

const WordCard = ({ mood, tense, pronoun, word, wordDict }) => {
  const [text, setText] = useState("");

  useEffect(() => setText(""), [word]);

  const checkIfCorrect = () => {
    if (wordDict.spanish === text.toLowerCase()) {
      alert("Correct")
    } else {
      alert(`Not correct - ${wordDict.spanish}`)
    }
    setText("")
  };

  return (
    <View style={styles.wordCardContainer}>
      <Text h4 style={styles.englishText}>
        {wordDict.english}
      </Text>
      <Text style={styles.moodText}>
        {mood} - {tense}
      </Text>
      <View style={styles.wordInputContainer}>
        <Text style={styles.pronounText}>{pronoun}</Text>
        <Input
          style={styles.spanishInput}
          placeholder={word}
          value={text}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={checkIfCorrect}
        />
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        title="Check"
        onPress={checkIfCorrect}
      />
    </View>
  );
};

export default WordCard;
