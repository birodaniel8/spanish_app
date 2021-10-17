import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import { styles, primaryFadedColor, secondaryColor, lightGreyColor } from "../Styles";
import { removeCorrectWordCard, replaceWrongWordCard } from "../actions/cards";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { moodMap, tenseMap, pronounMap } from "../configurations/MoodAndTenseTypes";

const WordCard = ({ mood, tense, pronoun, word, wordDict, removeCorrectWordCard, replaceWrongWordCard }) => {
  const [text, setText] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [buttonStyle, setButtonStyle] = useState("submitCardButton");

  const buttonFunction = () => {
    if (buttonTitle === "Submit") {
      checkIfCorrect();
    } else {
      nextCard();
    }
  };

  const checkIfCorrect = () => {
    if (wordDict.spanish === text.toLowerCase().trim()) {
      setButtonTitle("Correct");
      setButtonStyle("correctCardButton");
    } else {
      setButtonTitle("Not Correct");
      setButtonStyle("wrongCardButton");
      setText(wordDict.spanish);
    }
  };

  const nextCard = () => {
    setButtonTitle("Submit");
    setText("");
    setButtonStyle("submitCardButton");
    if (buttonTitle === "Correct") {
      removeCorrectWordCard();
    } else {
      replaceWrongWordCard();
    }
  };

  return (
    <View style={styles.wordCardContainer}>
      <Text style={{ ...styles.h1Text, marginBottom: 10 }}>{wordDict.english}</Text>
      <View style={styles.wordCardSolidLine}></View>
      <View style={styles.wordCardPropertyContainer}>
        <View style={styles.wordCardPropertyItemContainer}>
          <View style={{ ...styles.wordCardIcon, backgroundColor: primaryFadedColor }}>
            <MaterialIcons name="message" size={40} color="black" />
          </View>
          <Text style={styles.defaultBoldTextCentered}>{mood}</Text>
          <Text style={styles.defaultItalicTextCentered}>{moodMap[mood]}</Text>
        </View>

        <View style={styles.wordCardPropertyItemContainer}>
          <View style={{ ...styles.wordCardIcon, backgroundColor: lightGreyColor }}>
            <MaterialIcons name="access-time" size={40} color="black" />
          </View>
          <Text style={styles.defaultBoldTextCentered}>{tense}</Text>
          <Text style={styles.defaultItalicTextCentered}>{tenseMap[tense]}</Text>
        </View>

        <View style={styles.wordCardPropertyItemContainer}>
          <View style={{ ...styles.wordCardIcon, backgroundColor: secondaryColor }}>
            <FontAwesome name="user" size={40} color="black" />
          </View>
          <Text style={styles.defaultBoldTextCentered}>{pronounMap[pronoun]}</Text>
          <Text style={styles.defaultItalicTextCentered}>{pronoun}</Text>
        </View>
      </View>
      <Input
        autoFocus
        placeholder={word}
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={buttonFunction}
        inputContainerStyle={{ ...styles.inputField, marginBottom: -15 }}
      />
      <Button
        containerStyle={styles.practiceButtonContainer}
        buttonStyle={styles[buttonStyle]}
        titleStyle={styles.practiceButtonText}
        title={buttonTitle}
        onPress={buttonFunction}
      />
    </View>
  );
};

export default connect(null, { removeCorrectWordCard, replaceWrongWordCard })(WordCard);
