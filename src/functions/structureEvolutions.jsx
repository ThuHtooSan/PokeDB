import extractId from "./extractId";

const structureEvolutions = (evolution) => {
  const id = extractId(evolution.species.url);
  const newEvolution = { ...evolution };
  delete newEvolution.evolves_to;
  
  return !evolution.evolves_to.length
    ? [[id, newEvolution]]
    : [[id, newEvolution]].concat(structureEvolutions(...evolution.evolves_to));
}

export default structureEvolutions;