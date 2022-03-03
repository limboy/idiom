import allIdioms from '../data/idioms-rich.json';

function Idiom() {
  this.idiomBySeed = (seed) => {
    let idiomIndex = seed % allIdioms.length;
    return {
      cn: allIdioms[idiomIndex][0],
      en: allIdioms[idiomIndex][1],
      tone: allIdioms[idiomIndex][2],
      pinyin: allIdioms[idiomIndex][3],
      explanation: allIdioms[idiomIndex][4],
    };
  };
}

const idiom = new Idiom();

export default idiom;
