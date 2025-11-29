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
        console.log("Cache Miss")
        const res = await fetch(url);
        const locations: ResponseLocations = await res.json();
        this.cache.add(url, locations);
        return locations;
      }
      console.log("Cache Hit");
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
