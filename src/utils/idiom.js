import seedrandom from 'seedrandom';
import allIdioms from '../data/idioms-rich.json';

function Idiom() {
  this.idiomBySeed = (seed) => {
    let rnd = seedrandom(seed + '');
    let idiomIndex = Math.floor(allIdioms.length * rnd());
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
