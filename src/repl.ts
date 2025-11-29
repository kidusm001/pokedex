import { createInterface } from "readline";
import { State, CLICommand } from "./state.js";


// export function getCommands(): Record<string, CLICommand> {
//   return {
//     exit: {
//       name: "exit",
//       description: "Exits the Pokedex",
//       callback: commandExit,
//     },
//     help: {
//       name: "help",
//       description: "Helps with the usage of Pokedex",
//       callback: command_help,
//     },
//   };
// }

export function cleanInput(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (trimmed == "") {
    return [];
  }
  const split_lst: string[] = trimmed.split(/\s+/);
  return split_lst;
}

export function startREPL(state: State) {
  // const rl = createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  //   prompt: 'Pokedex >'
  // });
  state.rl.prompt();
  state.rl.on("line", async (input) => {
    if (input === "") {
      state.rl.prompt();
    } else {
      const lst = cleanInput(input);
      const cmd = lst[0]
      try {
        const cmdObj = state.commands.find(command => command.name === cmd);
        if (cmdObj) {
          await cmdObj.callback(state);
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
