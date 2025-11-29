import { State } from "./state.js";
import { PokeAPI, ResponseLocations, ShallowLocation } from "./pokeapi.js";

export async function commandMap(state: State): Promise<void> {
  const res: ResponseLocations = await state.pokeapi.getLocations(state.nextLocationsURL || undefined);
  state.nextLocationsURL = res.next;
  state.previousLocationsURL = res.previous;
  // const logState: LogState = {
  //   nextLocationsURL: state.nextLocationsURL,
  //   previousLocationsURL: state.previousLocationsURL
  // };
  // console.log(logState);
  const locations: string[] = res.results.map(location => location.name);
  locations.forEach(location => console.log(location));
}

export async function commandMapBack(state: State): Promise<void> {
  if (!state.previousLocationsURL) {
    console.log("you're on the first page");
    return;
  }
  const res: ResponseLocations = await state.pokeapi.getLocations(state.previousLocationsURL);
  state.nextLocationsURL = res.next;
  state.previousLocationsURL = res.previous;
  // const logState: LogState = {
  //   nextLocationsURL: state.nextLocationsURL,
  //   previousLocationsURL: state.previousLocationsURL
  // };
  // console.log(logState);
  const locations: string[] = res.results.map(location => location.name);
  locations.forEach(location => console.log(location));
}
type LogState = Pick<State, "nextLocationsURL" | "previousLocationsURL">
