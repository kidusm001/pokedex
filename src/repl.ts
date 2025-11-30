import { createInterface } from "readline";
import { State, CLICommand } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (trimmed == "") {
    return [];
  }
  const split_lst: string[] = trimmed.split(/\s+/);
  return split_lst;
}

export function startREPL(state: State) {
  state.rl.prompt();
  state.rl.on("line", async (input) => {
    if (input === "") {
      state.rl.prompt();
    } else {
      const lst = cleanInput(input);
      const cmd = lst[0];
      const args = lst.slice(1);
      try {
        const cmdObj = state.commands.find(command => command.name === cmd);
        if (cmdObj) {
          await cmdObj.callback(state, ...args);
        } else {
          console.log(`Unknown command: ${cmd}`);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }

      state.rl.prompt();
    }
  });
}
