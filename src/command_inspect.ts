import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  const param = args[0];
  const pokemon = state.pokedex[param];
  if (!pokemon) {
    return;
  }
  const name = pokemon.name;
  const height = pokemon.height;
  const weight = pokemon.weight;
  const stats = pokemon.stats.reduce((acc, stat) => {
    const statName = stat.stat.name;
    acc[statName] = stat.base_stat;
    return acc;
  }, {} as Record<string, number>);
  const types = pokemon.types.map(t => t.type.name);
  console.log(`
    Name: ${name}
    Weight: ${weight}
    Stats:
      - hp: ${stats.hp}
      - attack: ${stats.attack}
      - defense: ${stats.defense}
      - special-attack: ${stats["special-attack"]}
      - special-defense: ${stats["special-defense"]}
      - speed: ${stats.speed}
    Types:
      - ${types.join("\n  - ")}
    `);
}
