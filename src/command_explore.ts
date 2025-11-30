import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  const param = args[0];
  const pokeLst = await state.pokeapi.getPokemonFromLocationArea(param);
  console.log(`Exploring ${param}...`);
  console.log("Found Pokemon:");
  pokeLst.forEach(pokemon => console.log(` - ${pokemon}`))
}
