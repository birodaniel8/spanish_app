import dictionaryJSON from "../assets/dictionary.json";

const moodAndTenseTypesMap = new Map(Object.keys(dictionaryJSON).map((key) => {
  const tenses = Object.keys(dictionaryJSON[key])
  return [key, tenses];
}));

const MoodAndTenseTypes = Object.fromEntries(moodAndTenseTypesMap)

export default MoodAndTenseTypes;
