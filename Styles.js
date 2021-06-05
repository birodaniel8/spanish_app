import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },

  inputContainer: {
    width: "80%",
  },

  buttonContainer: {
    width: "75%",
    marginTop: 10,
  },

  loginButton: {
    backgroundColor: "black",
  },

  loginRegisterButton: {
    backgroundColor: "goldenrod",
  },

  pickImageButton: {
    backgroundColor: "tomato",
  },

  registerButton: {
    backgroundColor: "goldenrod",
  },

  // Login:
  loginH3: {
    marginBottom: 50,
    // borderWidth: 1,
    borderColor: "grey",
    width: "80%",
    textAlign: "center",
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "firebrick",
    padding: 5,
    color: "white",
  },

  // WordCard styles:
  wordCardContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 200,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 5,
    margin: 15,
  },

  englishText: {
    marginBottom: 10,
  },

  moodText: {
    fontWeight: "bold",
  },

  wordInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    marginBottom: -10,
  },

  pronounText: {
    fontStyle: "italic",
    maxWidth: "30%",
    alignSelf: "center",
  },

  spanishInput: {
    width: "70%",
    marginTop: 15,
    width: 80,
    alignSelf: "flex-end",
  },

  // Settings:

  settingsScreenContainer: {
    flex: 1,
  },

  settingsHeader: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 30,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    // borderWidth: 1,
  },

  settingsCategory: {
    width: "100%",
    paddingLeft: "10%",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },

  settingContainer: {
    alignItems: "center",
  },

  moodSettingsContainer: {
    width: "90%",
  },

  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  moodCheckBox: {
    width: "80%",
    backgroundColor: "transparent",
    borderWidth: 0,
  },

  subSettingContainer: {},

  tenseCheckBox: {
    paddingLeft: "15%",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});
