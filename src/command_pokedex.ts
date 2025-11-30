import { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
  const poke_lst = Object.keys(state.pokedex);
  console.log(` Your Pokedex: `);
  poke_lst.forEach(p => console.log(`   - ${p}`));
}
