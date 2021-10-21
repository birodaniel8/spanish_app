import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup
from collections import defaultdict
import json
import ujson
from tqdm import tqdm


def infinidict():
    return defaultdict(infinidict)


verbs = ["ser", "estar", "tener", "hacer", "decir", "ir", "ver", "dar", "saber", "querer", "llegar",
         "pasar", "deber", "poner", "parecer", "quedar", "creer", "hablar", "llevar", "dejar", "seguir", "encontrar",
         "llamar",  "venir", "pensar", "salir", "volver", "tomar", "conocer", "vivir", "sentir", "tratar", "mirar",
         "contar", "empezar", "esperar", "buscar", "existir", "entrar", "trabajar", "escribir", "perder", "producir",
         "ocurrir", "entender", "pedir", "recibir", "recordar", "terminar", "permitir", "aparecer", "conseguir",
         "comenzar", "servir", "sacar", "necesitar", "mantener", "resultar", "leer", "caer", "cambiar", "presentar",
         "crear", "abrir", "considerar", "oír", "acabar", "convertir", "ganar", "formar", "traer", "partir", "morir",
         "aceptar", "realizar", "suponer", "comprender", "lograr", "explicar", "preguntar", "tocar", "reconocer",
         "estudiar", "alcanzar", "nacer", "dirigir", "correr", "utilizar", "pagar", "ayudar", "jugar",
         "escuchar", "cumplir", "ofrecer", "descubrir", "levantar", "intentar"]

non_imperative_verbs = ["ser", "estar", "tener", "hacer", "ver", "saber", "querer", "deber", "parecer", "conocer",
                        "tratar", "existir", "ocurrir", "entender", "conseguir", "necesitar", "comprender", "born", ]

conjugation_list = []
for verb in tqdm(verbs):
    try:
        # fetch the lxml:
        URL = f"https://www.spanishdict.com/conjugate/{verb}"
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'lxml')

        # get the conjugation for he/she:
        english_root = soup.find_all("div", {"class": "_2lEPxxeg _3qA_h9SE"})[
            0].a["href"].split("%20")[-1].split("?")[0]
        english_page = requests.get(f"https://www.spanishdict.com/conjugate/{english_root}?langFrom=en")
        english_soup = BeautifulSoup(english_page.content, 'lxml')
        english_he_she = english_soup.find_all("div", {"class": "_pGNF_2O"})[0].find_all("tr")[3].find_all("td")[1].text

        # get the mood tables:
        mood_headers = soup.find_all("div", {"class": "QG0KOmOy"})
        table_wrappers = soup.find_all("div", {"class": "_pGNF_2O"})
        N = len(mood_headers)

        # iterate through the mood tables:
        for i in range(N):
            # verb mood:
            mood = mood_headers[i].find_all("div")[0].a.text

            # table header with the tenses:
            table_headers = table_wrappers[i].find_all("tr")[0].find_all("a")
            tenses = [a.text for a in table_headers]

            # table rows with verb content:
            content_rows = table_wrappers[i].find_all("tr")[1:]
            for content_row in content_rows:

                # Pronoun:
                pronoun = content_row.find_all("td")[0].text

                # table columns with verb content:
                content_columns = content_row.find_all("td")[1:]
                for j, content_column in enumerate(content_columns):
                    # div of the verb
                    word_div = content_column.find_all("div", {"class": "Fy4K0Udl"})
                    if len(word_div) > 0:  # if the word is not missing
                        word_a = word_div[0].a
                        in_spanish = word_a["aria-label"]
                        in_english_href = word_a["href"]
                        # get the english translation from the href if exists:
                        if len(in_english_href.split("&")) > 1:
                            in_english = in_english_href.split("&")[1].split("=")[1].replace("%20", " ")
                        else:
                            in_english = np.NaN

                        if (mood == "Indicative") & (tenses[j] == "Present") & (pronoun == "él/ella/Ud."):
                            # some he/she conjugations are not working well in english (outs):
                            in_english = np.NaN if english_he_she == "outs" else f"he/she {english_he_she}"

                        conjugation_list.append([mood, tenses[j], pronoun, verb, in_spanish, in_english])
    except:
        pass

df = pd.DataFrame(conjugation_list, columns=["mood", "tense", "pronoun", "verb", "spanish", "english"])

# fixing some missing values:
limited_verbs = df.groupby("verb")["english"].count()[df.groupby("verb")["english"].count() < 50].index

# subjunctive duplications (keeping only one form):
df.loc[
    (df["mood"] == "Subjunctive") &
    (df["tense"] == "Imperfect"),
    "spanish"
] = df.loc[
    (df["mood"] == "Subjunctive") &
    (df["tense"] == "Imperfect"),
    "spanish"
].apply(lambda x: x.split(",")[0]).values

df.loc[
    (df["mood"] == "Perfect Subjunctive") &
    (df["tense"] == "Past"),
    "spanish"
] = df.loc[
    (df["mood"] == "Perfect Subjunctive") &
    (df["tense"] == "Past"),
    "spanish"
].apply(lambda x: x.split(",")[0]).values

# indicative he/she (same as indicative yo but with 'he/she' at the beginning):
df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"] != "Present"),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] == "yo") &
    (df["tense"] != "Present"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she " + x[2:]).values

# progressive he/she (same as progressive yo but with 'he/she ...' at the beginning):
df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"] == "Present"),
    "english"
] = df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "yo") &
    (df["tense"] == "Present"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she is " + x.split(" ")[-1]).values

df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"].isin(["Preterite", "Imperfect"])),
    "english"
] = df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "yo") &
    (df["tense"].isin(["Preterite", "Imperfect"])),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she was " + x.split(" ")[-1]).values

df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"] == "Conditional"),
    "english"
] = df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "yo") &
    (df["tense"] == "Conditional"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she would be " + x.split(" ")[-1]).values

df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"] == "Future"),
    "english"
] = df.loc[
    (df["mood"] == "Progressive") &
    (df["pronoun"] == "yo") &
    (df["tense"] == "Future"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she will be " + x.split(" ")[-1]).values

# perfect he/she (same as perfect yo but with 'he/she ...' at the beginning):
df.loc[
    (df["mood"] == "Perfect") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"] != "Present"),
    "english"
] = df.loc[
    (df["mood"] == "Perfect") &
    (df["pronoun"] == "yo") &
    (df["tense"] != "Present"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she " + x[1:]).values

df.loc[
    (df["mood"] == "Perfect") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"] == "Present"),
    "english"
] = df.loc[
    (df["mood"] == "Perfect") &
    (df["pronoun"] == "yo") &
    (df["tense"] == "Present"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "he/she has " + x.split(" ")[-1]).values

# subjuctive he/she (same as indicative):
df.loc[
    (df["mood"] == "Subjunctive") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"].isin(["Present", "Imperfect", "Future"])),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"].isin(["Present", "Imperfect", "Future"])),
    "english"
].values

# subjuctive perfect he/she (same as perfect):
df.loc[
    (df["mood"] == "Perfect Subjunctive") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"].isin(["Present", "Past", "Future"])),
    "english"
] = df.loc[
    (df["mood"] == "Perfect") &
    (df["pronoun"] == "él/ella/Ud.") &
    (df["tense"].isin(["Present", "Past", "Future"])),
    "english"
].values

# subjunctive others (same as indicative):
df.loc[
    (df["mood"] == "Subjunctive") &
    (df["pronoun"] != "él/ella/Ud.") &
    (df["tense"].isin(["Present", "Future"])),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] != "él/ella/Ud.") &
    (df["tense"].isin(["Present", "Future"])),
    "english"
].values

# imperative (just getting the root verb out of the future tense):
df.loc[
    (df["mood"] == "Imperative") &
    (df["tense"] == "Affirmative") &
    (df["pronoun"] != "nosotros"),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] != "él/ella/Ud.") &
    (df["pronoun"] != "nosotros") &
    (df["tense"] == "Future"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else x.split(" ")[-1] + "!").values

df.loc[
    (df["mood"] == "Imperative") &
    (df["tense"] == "Affirmative") &
    (df["pronoun"] == "nosotros"),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] == "nosotros") &
    (df["tense"] == "Future"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "let's " + x.split(" ")[-1] + "!").values

df.loc[
    (df["mood"] == "Imperative") &
    (df["tense"] == "Negative") &
    (df["pronoun"] != "nosotros"),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] != "él/ella/Ud.") &
    (df["pronoun"] != "nosotros") &
    (df["tense"] == "Future"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "don't " + x.split(" ")[-1] + "!").values

df.loc[
    (df["mood"] == "Imperative") &
    (df["tense"] == "Negative") &
    (df["pronoun"] == "nosotros"),
    "english"
] = df.loc[
    (df["mood"] == "Indicative") &
    (df["pronoun"] == "nosotros") &
    (df["tense"] == "Future"),
    "english"
].apply(lambda x: np.NaN if pd.isna(x) else "let's not " + x.split(" ")[-1] + "!").values

# limited verbs imperative (removing imperative for problematic words):
df.loc[df["verb"].isin(limited_verbs) & (df["mood"] == "Imperative"), "english"] = np.NaN

# delete imperative for words with non meaningful imperative forms:
df = df[(df["mood"] != "Imperative") | (~df["verb"].isin(non_imperative_verbs))]

# delete NaN entries:
df.dropna(inplace=True)

# replace i with I:
df["english"] = df["english"].apply(lambda x: x.replace("i ", "I "))

# df.to_csv("df.csv")


# create a word dictionary that can be of any depth:
collections = infinidict()
collections_to_firestore = infinidict()

# add the verb to the dictionary:
for row in df.values:
    collections[row[0]][row[1]][row[2]][row[3]] = {"in_spanish": row[4], "in_english": row[5]}
    collections_to_firestore["__collections__"]["dictionary"][f"{row[0]}_{row[1]}_{row[2]}_{row[3]}"] = {
        "mood": row[0],
        "tense": row[1],
        "pronoun": row[2],
        "verb": row[3],
        "spanish": row[4],
        "english": row[5],
    }

# convert the defaultdict to normal dict:
collections = json.loads(json.dumps(collections))
collections_to_firestore = json.loads(json.dumps(collections_to_firestore))

# save to json files:
with open(f'_database_export_import/wordDictionary.json', 'w') as outfile:
    ujson.dump(collections_to_firestore, outfile)

with open(f'assets/dictionary.json', 'w') as outfile:
    ujson.dump(collections, outfile)

# run: firestore-import -a _database_export_import/spanishAppApiKey.json -b _database_export_import/wordDictionary.json
