export interface IWord {
  license: { name: string; url: string };
  meanings: Array<IMeanings>;
  phonetic: string;
  phonetics: { text: string; audio: string }[];
  sourceUrls: string;
  word: string;
}

export interface IMeanings {
  antonyms: Array<string>;
  definitions: [
    {
      antonyms: Array<string>;
      definition: string;
      synonyms: Array<string>;
    }
  ];
  partOfSpeech: string;
  synonyms: Array<string>;
}
export interface IDefinitions {
  definitions: [
    {
      antonyms: Array<string>;
      definition: string;
      synonyms: Array<string>;
    }
  ];
}