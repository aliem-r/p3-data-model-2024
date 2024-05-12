import { getPlayer } from "./Player";
import { db } from "./db";
import moment from "moment";

export const newGame = async (matchDateString: string, tournamentId: string, winnerNickname: string, loserNickname: string) => {
    const winnerId = await getPlayer(winnerNickname).then((player) => player!.id);
    const loserId = await getPlayer(loserNickname).then((player) => player!.id);
    const matchDate: Date = moment(matchDateString, "DD/MM/YYYY").toDate();
    const game = await db.game.create({
        data: {
            matchDate,
            tournamentId,
            winnerId,
            loserId,
        },
    });
    return game;
};

export const getAllGames = async () => {
    const games = await db.game.findMany();
    return games;
};

export const getGame = async (id: string) => {
    const game = await db.game.findUnique({
        where: {
            id,
        },
        include: {
            winner: {
                select: {
                    nickname: true,
                },
            },
            loser: {
                select: {
                    nickname: true,
                },
            },
        },
    });
    return game;
};

export const setMatchDate = async (id: string, matchDateString: string) => {
    const matchDate = moment(matchDateString, "DD/MM/YYYY").toDate();
    const game = await db.game.update({
        where: {
            id,
        },
        data: {
            matchDate,
        },
    });
    return game;
};

export const deleteGame = async (id: string) => {
    const game = await db.game.delete({
        where: {
            id,
        },
    });
    return game;
};
