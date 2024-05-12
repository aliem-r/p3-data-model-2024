import { db } from "./db";

// Create new Player
export const newPlayer = async (nickname: string, firstName: string, lastName: string, bulletElo: number, blitzElo: number, rapidElo: number) => {
    const player = await db.player.create({
        data: {
            nickname,
            firstName,
            lastName,
            bulletElo,
            blitzElo,
            rapidElo,
        },
    });
    return player;
};

export const getAllPlayers = async () => {
    const players = await db.player.findMany();
    return players;
};

export const getPlayer = async (nickname: string) => {
    const player = await db.player.findUnique({
        where: {
            nickname,
        },
    });
    return player;
};

export const getPlayerElo = async (nickname: string) => {
    const players = await db.player.findUnique({
        where: {
            nickname,
        },
        select: {
            nickname: true,
            bulletElo: true,
            blitzElo: true,
            rapidElo: true,
        },
    });
    return players;
};

export const setPlayerFirstName = async (nickname: string, firstName: string) => {
    const player = await db.player.update({
        where: {
            nickname,
        },
        data: {
            firstName,
        },
    });
    return player;
};

export const setPlayerLastName = async (nickname: string, lastName: string) => {
    const player = await db.player.update({
        where: {
            nickname,
        },
        data: {
            lastName,
        },
    });
    return player;
};

export const deletePlayer = async (nickname: string) => {
    const player = await db.player.delete({
        where: {
            nickname,
        },
    });
    return player;
};
