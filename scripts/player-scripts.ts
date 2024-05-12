import { deletePlayer, getAllPlayers, getPlayer, getPlayerElo, newPlayer, setPlayerFirstName, setPlayerLastName } from "../src/Player";

const [_bun, _script, _type, ...args] = process.argv;

switch (_type) {
    case "new-player": {
        if (process.argv.length < 3 + 6) {
            console.error("Usage: bun player new-player <nickname> <firstName> <lastName> <bulletElo> <blitzElo> <rapidElo>");
            process.exit(1);
        }
        const [nickname, firstName, lastName, bulletElo, blitzElo, rapidElo] = args;

        const result = await newPlayer(nickname, firstName, lastName, Number(bulletElo), Number(blitzElo), Number(rapidElo));
        console.log(`Player "${result.nickname}" created.`);

        break;
    }

    case "get-all-players": {
        if (process.argv.length < 3) {
            console.error("Usage: bun player get-all-players");
            process.exit(1);
        }
        const result = await getAllPlayers();
        console.log(result);

        break;
    }

    case "get-player": {
        if (process.argv.length < 3 + 1) {
            console.error("Usage: bun player get-player <nickname>");
            process.exit(1);
        }
        const [nickname] = args;

        const result = await getPlayer(nickname);
        console.log(result);

        break;
    }

    case "get-player-elo": {
        if (process.argv.length < 3 + 1) {
            console.error("Usage: bun player get-player-elo <nickname>");
            process.exit(1);
        }
        const [nickname] = args;

        const result = await getPlayerElo(nickname);
        console.log(result);

        break;
    }

    case "set-player-firstname": {
        if (process.argv.length < 3 + 2) {
            console.error("Usage: bun player set-player-firstname <nickname> <firstName>");
            process.exit(1);
        }
        const [nickname, firstName] = args;
        const currentFirst = await getPlayer(nickname).then((player) => player?.firstName);
        const result = await setPlayerFirstName(nickname, firstName);
        console.log(`firstName of "${nickname}" changed: "${currentFirst}" -> "${result.firstName}"`);

        break;
    }

    case "set-player-lastname": {
        if (process.argv.length < 3 + 2) {
            console.error("Usage: bun player set-player-firstname <nickname> <lastName>");
            process.exit(1);
        }
        const [nickname, lastName] = args;
        const currentLast = await getPlayer(nickname).then((player) => player?.lastName);
        const result = await setPlayerLastName(nickname, lastName);
        console.log(`lastName of "${nickname}" changed: "${currentLast}" -> "${result.lastName}"`);

        break;
    }

    case "delete-player": {
        if (process.argv.length < 3 + 1) {
            console.error("Usage: bun player delete-player <nickname>");
            process.exit(1);
        }
        const [nickname] = args;
        const result = await deletePlayer(nickname);
        console.log(`Player "${result.nickname}" deleted.`);

        break;
    }

    default: {
        console.error("Usage: bun player <command>");
        console.log("You must provide one of the following commands: new-player, get-all-players, get-player, get-player-elo, set-player-firstname, set-player-lastname, delete-player");
        process.exit(1);
    }
}
