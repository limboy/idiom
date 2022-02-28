import { allIdioms } from '../data/idioms';

function Idiom() {
  this.idiomBySeed = (seed) => {
    let idiomIndex = seed % allIdioms.length;
    return { cn: allIdioms[idiomIndex][0], en: allIdioms[idiomIndex][1] };
  };
}

const idiom = new Idiom();

export default idiom;
