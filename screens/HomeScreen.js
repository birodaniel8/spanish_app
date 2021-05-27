import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../Styles";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <View style={styles.container}>
      <Button containerStyle={styles.buttonContainer} onPress={signOutUser} title="Sign out" type="outline"/>
    </View>
  );
};

export default HomeScreen;
