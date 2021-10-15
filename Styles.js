import { StatusBar, StyleSheet } from "react-native";

const backgroundColor = "#FCFCFC";
const inputBorderColor = "#C0C0C0";
const inputbackgroundColor = "#FFFFFF";
const shadowColor = "#000000";
export const primaryColor = "#C7031B";
const secondaryColor = "#FDC605";
export const secondaryCheckBoxColor = "#404040";
const spanishFont = "Merienda_700Bold";
const defaultFont = "Montserrat_400Regular";
const defaultItalicFont = "Montserrat_400Regular_Italic";
const defaultBoldFont = "Montserrat_700Bold";

const shadowSettings = {
  shadowColor: shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  elevation: 2,
};

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgroundColor,
  },

  pageHeader: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },

  settingsPageContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: backgroundColor,
  },

  // Title:
  titleContainer: {
    width: "90%",
    height: 120,
    marginBottom: 25,
  },

  logoImage: {
    width: "40%",
    height: "70%",
    marginLeft: "16%",
    marginTop: "8%",
  },

  conjugacionTitle: {
    position: "absolute",
    marginLeft: "15%",
    fontSize: 36,
    fontFamily: spanishFont,
  },

  practicerTitle: {
    position: "absolute",
    marginTop: 42,
    marginLeft: "48%",
    fontSize: 30,
    fontFamily: defaultBoldFont,
  },

  // Input fields:
  inputContainer: {
    width: "90%",
  },

  inputFieldLabel: {
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: defaultFont,
    marginTop: -15,
  },

  inputField: {
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: inputBorderColor,
    backgroundColor: inputbackgroundColor,
    ...shadowSettings,
  },

  // Buttons:

  // Primary:
  primaryButtonContainer: {
    width: "50%",
    borderRadius: 5,
    ...shadowSettings,
  },

  primaryButton: {
    backgroundColor: primaryColor,
  },

  primaryButtonText: {
    fontFamily: defaultBoldFont,
  },

  // Primary:
  secondaryButtonContainer: {
    width: "50%",
    borderRadius: 5,
    ...shadowSettings,
  },

  secondaryButton: {
    backgroundColor: secondaryColor,
  },

  secondaryButtonText: {
    fontFamily: defaultBoldFont,
    color: "black",
  },

  // Transparent:
  transparentButtonContainer: {
    width: "50%",
    borderRadius: 5,
  },

  transparentButton: {
    backgroundColor: backgroundColor,
  },

  transparentButtonText: {
    color: "black",
    fontFamily: defaultBoldFont,
  },

  // Text types:

  h1Text: {
    fontFamily: defaultBoldFont,
    fontSize: 24,
    marginBottom: 16,
  },

  h2Text: {
    fontFamily: defaultBoldFont,
    fontSize: 20,
  },

  defaultText: {
    fontFamily: defaultFont,
  },

  greedingText: {
    fontFamily: spanishFont,
    fontSize: 24,
    marginTop: 14,
    marginBottom: 16,
  },

  wordOfTheDayHeader: {
    fontFamily: defaultFont,
    marginTop: 40,
    marginBottom: 6,
  },

  wordOfTheDaySpanish: {
    fontFamily: defaultBoldFont,
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },

  wordOfTheDayEnglish: {
    fontFamily: defaultItalicFont,
    fontSize: 18,
    textAlign: "center",
    color: "#C0C0C0",
    marginBottom: 20,
  },

  wordOfTheDayExamples: {
    fontFamily: defaultFont,
    paddingLeft: 10,
  },

  settingsCategoryText: {
    width: "80%",
    fontFamily: defaultBoldFont,
    fontSize: 18,
    marginTop: 20,
  },

  settingsMoodText: {
    fontFamily: defaultBoldFont,
    paddingLeft: 10,
  },

  settingsTenseText: {
    fontFamily: defaultFont,
    paddingLeft: 10,
  },

  // Profile picture with background:
  profilePictureContainer: {
    width: 240,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  flagBackground: {
    position: "absolute",
    height: "100%",
    width: "140%",
  },

  // Word of the day:
  wordOfDayContainer: {
    height: "40%",
    width: "90%",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: backgroundColor,
    ...shadowSettings,
  },

  // Settings:
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

  tenseCheckBox: {
    paddingLeft: "15%",
    backgroundColor: "transparent",
    borderWidth: 0,
  },

  // Old stuff:
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },

  buttonContainer: {
    width: "75%",
    marginTop: 10,
  },

  pickImageButton: {
    backgroundColor: "tomato",
  },

  checkCardButton: {
    backgroundColor: "blue",
  },

  correctCardButton: {
    backgroundColor: "green",
  },

  wrongCardButton: {
    backgroundColor: "red",
  },

  // Login:
  loginH3: {
    marginBottom: 50,
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
});
