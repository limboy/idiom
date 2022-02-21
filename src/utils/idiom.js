import { allIdioms } from '../data/idioms';

function Idiom() {
  this.idiomBySeed = (seed) => {
    let idiomIndex = seed % allIdioms.length;
    return allIdioms[idiomIndex];
  };
}

const idiom = new Idiom();

export default idiom;
