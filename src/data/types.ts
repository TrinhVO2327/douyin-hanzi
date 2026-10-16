export type Hanzi = { char:string; pinyin:string; tones:number[]; meaningEn:string; meaningVi:string; hanViet:string; exampleComment:{zh:string;pinyin:string;en:string;vi:string}; frequencyRank:number };
export type Slang = { phrase:string; pinyin:string; literalMeaning:string; usage:string; meaningVi:string; exampleComment:string; todo?:string };
