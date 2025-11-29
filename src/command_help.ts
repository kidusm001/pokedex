import { State, CLICommand } from "./state.js";

export async function commandHelp({ rl, commands }: State) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();

  for (const command of commands) {
    console.log(`${command.name}: ${command.description}`)
  }
  console.log();
}
