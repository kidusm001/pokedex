import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const state = await initState();
  startREPL(state);
}

main();
