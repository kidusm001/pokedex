import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
  rl: Interface;
  commands: CLICommand[];
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
}

export async function initState(): Promise<State> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex >'
  });
  const commands: CLICommand[] = [
    {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    {
      name: "help",
      description: "Helps with the usage of Pokedex",
      callback: commandHelp,
    },
    {
      name: "map",
      description: "List 20 locations areas on the Pokedex Map",
      callback: commandMap,
    },
    {
      name: "mapb",
      description: "List the previous 20 locations areas on the Pokedex Map",
      callback: commandMapBack,
    },
    {
      name: "explore",
      description: "List All the pokemon in a given area",
      callback: commandExplore,
    },
    {
      name: "catch",
      description: "Catch pokemon",
      callback: commandCatch,
    },
    {
      name: "inspect",
      description: "See the pokemon caught by you",
      callback: commandInspect,
    },
    {
      name: "pokedex",
      description: "List of pokemon in pokedex",
      callback: commandPokedex,
    },
  ]

  const cache = new Cache(60);
  const pokeapi = new PokeAPI(cache);
  const nextLocationsURL = null;
  const previousLocationsURL = null;
  const pokedex = {}
  return { rl, commands, pokeapi, nextLocationsURL, previousLocationsURL, pokedex };
}
