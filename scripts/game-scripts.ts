import { deleteGame, getAllGames, getGame, newGame, setMatchDate } from "../src/Game";

const [_bun, _script, _type, ...args] = process.argv;

switch (_type) {
    case "new-game": {
        if (process.argv.length < 3 + 4) {
            console.error("Usage: bun game new-game <matchDateString> <tournamentId> <winnerNickname> <loserNickname>");
            process.exit(1);
        }
        const [matchDateString, tournamentId, winnerNickname, loserNickname] = args;

        const result = await newGame(matchDateString, tournamentId, winnerNickname, loserNickname);
        console.log(`Game "${result.id}" created.`);

        break;
    }

    case "get-all-games": {
        if (process.argv.length < 3) {
            console.error("Usage: bun game get-all-games");
            process.exit(1);
        }
        const result = await getAllGames();
        console.log(result);

        break;
    }

    case "get-game": {
        if (process.argv.length < 3 + 1) {
            console.error("Usage: bun game get-game <id>");
            process.exit(1);
        }
        const [id] = args;

        const result = await getGame(id);
        console.log(result);

        break;
    }

    case "set-match-date": {
        if (process.argv.length < 3 + 1) {
            console.error("Usage: bun game set-match-date <id> <matchDateString>");
            process.exit(1);
        }
        const [id, matchDateString] = args;

        const result = await setMatchDate(id, matchDateString);
        console.log(result);

        break;
    }

    case "delete-game": {
        if (process.argv.length < 3 + 1) {
            console.error("Usage: bun game delete-game <id>");
            process.exit(1);
        }
        const [id] = args;
        const result = await deleteGame(id);
        console.log(`Game "${result.id}" deleted.`);

        break;
    }

    default: {
        console.error("Usage: bun game <command>");
        console.log("You must provide one of the following commands: new-game, get-all-games, get-game, set-match-date, delete-game");
        process.exit(1);
    }
}
