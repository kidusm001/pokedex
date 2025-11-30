# Pokédex CLI

A command-line Pokédex application built with TypeScript that allows you to explore the Pokémon world, catch Pokémon, and manage your own digital Pokédex.

## Features

- **Interactive REPL**: Command-line interface with auto-completion and help
- **Map Navigation**: Explore different location areas in the Pokémon world
- **Pokémon Catching**: Catch Pokémon with difficulty-based success rates
- **Pokédex Management**: View and inspect your caught Pokémon
- **Caching**: Built-in caching for improved performance
- **Real-time Data**: Uses the official PokéAPI for up-to-date Pokémon information

## Installation

### Prerequisites
- Node.js (version 22.15.0 or higher)
- npm or yarn

### Setup
1. Clone the repository:
```bash
git clone https://github.com/kidusm001/pokedex.git
cd pokedex
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Start the Pokédex
```bash
npm start
```

Or for development with automatic rebuilding:
```bash
npm run dev
```

### Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `help` | Shows all available commands | `help` |
| `map` | Lists 20 location areas on the Pokédex Map | `map` |
| `mapb` | Lists the previous 20 location areas | `mapb` |
| `explore <area>` | Lists all Pokémon in a given area | `explore viridian-forest` |
| `catch <pokemon>` | Attempts to catch a Pokémon | `catch pikachu` |
| `inspect <pokemon>` | Shows details of a caught Pokémon | `inspect pikachu` |
| `pokedex` | Lists all Pokémon in your Pokédex | `pokedex` |
| `exit` | Exits the Pokédex | `exit` |

### How to Play

1. **Explore Areas**: Use `map` to see available locations, then `explore <area>` to see what Pokémon live there
2. **Catch Pokémon**: Use `catch <pokemon-name>` when in an area to attempt catching
3. **Build Your Pokédex Successfully caught Pokémon are automatically added to your Pokédex
4. **Inspect Your Collection**: Use `inspect <pokemon>` to see detailed information about your caught Pokémon
5. **View All Pokémon**: Use `pokedex` to see your complete collection

## Catching Mechanics

- Catch success is based on the Pokémon's base experience
- Higher base experience = harder to catch
- The formula uses a difficulty ratio with a maximum base experience of 300

## Development

### Project Structure
```
src/
├── main.ts              # Entry point
├── repl.ts              # REPL interface and input handling
├── state.ts             # Application state and command registration
├── pokeapi.ts           # API client for PokéAPI
├── pokecache.ts         # Caching system
├── types.ts             # Type definitions
├── command_*.ts         # Individual command implementations
└── repl.test.ts         # Tests
```

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run dev` - Build and run in development mode
- `npm test` - Run tests using Vitest

### Technologies Used
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **PokéAPI** - Official Pokémon data API
- **Vitest** - Testing framework
- **Readline** - Interactive command-line interface

## API Integration

This application uses the [PokéAPI](https://pokeapi.co/) to fetch:
- Location areas and their details
- Pokémon encounters in specific areas
- Pokémon statistics, abilities, and other data
- Sprites and artwork

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the comprehensive Pokémon data
- The Pokémon Company for the amazing Pokémon universe
