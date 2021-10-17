import { StatusBar, StyleSheet } from "react-native";

const backgroundColor = "#FCFCFC";
const inputBorderColor = "#C0C0C0";
const inputbackgroundColor = "#FFFFFF";
const shadowColor = "#000000";
export const primaryColor = "#C7031B";
export const primaryFadedColor = "#D66C6C";
export const secondaryColor = "#FDC605";
export const secondaryCheckBoxColor = "#404040";
export const lightGreyColor = "#C4C4C4";
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

  // Secondary:
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

  // Practice button:
  practiceButtonContainer: {
    width: "94%",
    borderRadius: 5,
    ...shadowSettings,
  },

  practiceButtonText: {
    fontFamily: defaultBoldFont,
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

  defaultBoldText: {
    fontFamily: defaultBoldFont,
  },

  defaultItalicText: {
    fontFamily: defaultItalicFont,
  },

  defaultBoldTextCentered: {
    fontFamily: defaultBoldFont,
    textAlign: "center",
  },

  defaultItalicTextCentered: {
    fontFamily: defaultItalicFont,
    textAlign: "center",
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
    textAlign: "center",
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
    width: "90%",
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "grey",
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

  // Practice:

  statusBarContainer: {
    width: "85%",
    height: 20,
    backgroundColor: lightGreyColor,
    borderRadius: 100,
  },

  statusBarProgress: {
    height: 20,
    borderRadius: 100,
    backgroundColor: primaryFadedColor,
  },

  statusBarProgressNumbers: {
    fontFamily: defaultFont,
    position: "absolute",
    width: "98%",
    textAlign: "right",
  },

  submitCardButton: {
    backgroundColor: primaryColor,
  },

  correctCardButton: {
    backgroundColor: "green",
  },

  wrongCardButton: {
    backgroundColor: "black",
  },

  // WordCard:
  wordCardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  wordCardPropertyContainer: {
    marginBottom: 25,
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    flexDirection: "row",
  },

  wordCardPropertyItemContainer: {
    alignItems: "center",
    width: "30%",
    height: 150,
  },

  wordCardIcon: {
    width: 80,
    height: 80,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  wordCardSolidLine: {
    width: "40%",
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    borderStyle: "solid",
    marginBottom: 20,
  },
});
