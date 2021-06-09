import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import { styles } from "../Styles";
import { removeCorrectWordCard, replaceWrongWordCard } from "../actions/cards";

const WordCard = ({ mood, tense, pronoun, word, wordDict, removeCorrectWordCard, replaceWrongWordCard }) => {
  const [text, setText] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Check");
  const [buttonStyle, setButtonStyle] = useState("checkCardButton");

  // useEffect(() => setText(""), [word]);

  const buttonFunction = () => {
    if (buttonTitle === "Check") {
      checkIfCorrect();
    } else {
      nextCard();
    }
  };

  const checkIfCorrect = () => {
    if (wordDict.spanish === text.toLowerCase()) {
      setButtonTitle("Correct");
      setButtonStyle("correctCardButton")
    } else {
      setButtonTitle("Not Correct");
      setButtonStyle("wrongCardButton")
      setText(wordDict.spanish)
    }
  };

  const nextCard = () => {
    setButtonTitle("Check");
    setText("");
    setButtonStyle("checkCardButton")
    if (buttonTitle === "Correct") {
      removeCorrectWordCard();
    } else {
      replaceWrongWordCard();
    }
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
          onSubmitEditing={buttonFunction}
        />
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles[buttonStyle]}
        title={buttonTitle}
        onPress={buttonFunction}
      />
    </View>
  );
};

export default connect(null, { removeCorrectWordCard, replaceWrongWordCard })(WordCard);
