import requests
from bs4 import BeautifulSoup
from collections import defaultdict
import json
import ujson

def infinidict():
    return defaultdict(infinidict)

# create a word dictionary that can be of any depth:
collections = infinidict()

verbs = ["ir", "hacer", "venir", "hablar", "dar", "estar", "ser"]

for verb in verbs:
    # fetch the lxml:
    URL = f"https://www.spanishdict.com/conjugate/{verb}"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'lxml')

    # get the mood tables:
    mood_headers = soup.find_all("div", {"class": "tenseHeader--QG0KOmOy"})
    table_wrappers = soup.find_all("div", {"class": "vtableWrapper--_pGNF_2O"})
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
                word_div = content_column.find_all("div", {"class": "specificConjugation--Fy4K0Udl"})
                if len(word_div) > 0:  # if the word is not missing
                    word_a = word_div[0].a
                    in_spanish = word_a["aria-label"]
                    in_english_href = word_a["href"]
                    # get the english translation from the href if exists:
                    if len(in_english_href.split("&")) > 1:
                        in_english = in_english_href.split("&")[1].split("=")[1].replace("%20", " ")
                    else :
                        in_english = ""
                    
                    # add the verb to the dictionary:
                    collections["__collections__"]["dictionary"][f"{mood}_{tenses[j]}_{pronoun}_{verb}"]={
                        "mood": mood,
                        "tense": tenses[j],
                        "pronoun": pronoun,
                        "verb": verb,
                        "spanish": in_spanish,
                        "english": in_english,
                    }
                    # [mood][tenses[j]][pronoun][verb] = {"spanish": in_spanish, "english": in_english}

# convert the defaultdict to normal dict:
collections = json.loads(json.dumps(collections))

# save to json files:
with open(f'_database_export_import/wordDictionary.json', 'w') as outfile:
        ujson.dump(collections, outfile)
        

# run: firestore-import -a _database_export_import/spanishAppApiKey.json -b _database_export_import/wordDictionary.json