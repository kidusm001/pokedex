import { State } from "./state";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  const param = args[0];
  const pokeCatch = await state.pokeapi.catchPokemon(param);
  if (pokeCatch === null) {
    return;
  }
  console.log(`Throwing a Pokeball at ${param}...`);
  if (pokeCatch) {
    const pokemon = await state.pokeapi.getPokemon(param);
    if (pokemon === null) {
      return;
    }
    state.pokedex[param] = pokemon;
    console.log(`${param} was caught!`);
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${param} escaped!`);
  }
}
