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
