import { Cache } from "./pokecache";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;
  constructor(cache: Cache) {
    this.cache = cache;
  }

  async getLocations(pageURL?: string): Promise<ResponseLocations> {
    try {
      let url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`
      const cachedRes = this.cache.get(url);
      if (!cachedRes) {
        // console.log("Cache Miss")
        const res = await fetch(url);
        const locations: ResponseLocations = await res.json();
        this.cache.add(url, locations);
        return locations;
      }
      // console.log("Cache Hit");
      return cachedRes as ResponseLocations;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`)
      }
    }
    return {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }

  async getLocationArea(params: number | string): Promise<LocationArea> {
    try {
      const url = `${PokeAPI.baseURL}/location-area/${params}`;
      const res = await fetch(url);
      const locationArea: LocationArea = await res.json();
      return locationArea;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
      }
      return {
        id: 0,
        name: '',
        game_index: 0,
        encounter_method_rates: [],
        location: { name: '', url: '' },
        names: [],
        pokemon_encounters: []
      };
    }
  }

  async getPokemonFromLocationArea(params: number | string): Promise<string[]> {
    try {
      const url = `${PokeAPI.baseURL}/location-area/${params}`;
      const res = await fetch(url);
      const locationArea: LocationArea = await res.json();
      const pokemonEncounters = locationArea.pokemon_encounters;
      const pokemonNames = pokemonEncounters.map(encounter => encounter.pokemon.name);
      return pokemonNames;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
      }
      return [];
    }
  }

  async getPokemon(params: number | string): Promise<Pokemon | null> {
    try {
      const url = `${PokeAPI.baseURL}/pokemon/${params}`;
      const res = await fetch(url);
      const pokemon: Pokemon = await res.json();
      return pokemon;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
      }
      return null
    }
  }

  async catchPokemon(params: number | string): Promise<boolean | null> {
    try {
      const url = `${PokeAPI.baseURL}/pokemon/${params}`;
      const res = await fetch(url);
      const pokemon: Pokemon = await res.json();
      const max_xp = 300;
      let base_xp = pokemon.base_experience > max_xp ? max_xp : pokemon.base_experience;
      const difficulty = base_xp / max_xp;
      const catchChance = 1 - difficulty;
      const caught = Math.random() < catchChance;
      return caught;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
      }
      return null
    }
  }
}

export type ShallowLocation = {
  name: string;
  url: string;
}

export type ResponseLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShallowLocation[];
}

interface NamedAPIResource {
  name: string;
  url: string;
}
interface VersionEncounterDetail {
  rate: number;
  version: NamedAPIResource;
}

interface EncounterMethodRate {
  encounter_method: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

interface EncounterDetail {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
}

interface VersionEncounterDetails {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: EncounterDetail[];
}

interface PokemonEncounter {
  pokemon: NamedAPIResource;
  version_details: VersionEncounterDetails[];
}

interface AreaName {
  name: string;
  language: NamedAPIResource;
}

export interface LocationArea {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: AreaName[];
  pokemon_encounters: PokemonEncounter[];
}


interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface HeldItem {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
}

interface Move {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    version_group: NamedAPIResource;
    move_learn_method: NamedAPIResource;
    order: number;
  }[];
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

interface Cries {
  latest: string;
  legacy: string;
}

// Main Pokemon interface
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: NamedAPIResource;
  sprites: Sprites;
  cries: Cries;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: any[];
  past_abilities: any[];
}

// Simplified interface for display purposes
export interface PokemonSummary {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  base_experience: number;
  sprite: string | null;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    special_attack: number;
    special_defense: number;
  };
}
