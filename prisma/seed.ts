import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

//Seed prize pools
const prizePools = await db.prizePool.createMany({
    data: [
        {
            first: 100000,
            second: 50000,
            third: 20000,
        },
        {
            first: 10000,
            second: 5000,
            third: 2000,
        },
        {
            first: 1000,
            second: 500,
            third: 200,
        },
        {
            first: 100,
            second: 50,
            third: 20,
        },
    ],
});
console.log(`Prize pools seeded. ${prizePools.count} records created.`);

//Seed tournaments
const prizePool100 = await db.prizePool.findFirst({ where: { first: 100 } });
const prizePool1K = await db.prizePool.findFirst({ where: { first: 1000 } });
const prizePool10K = await db.prizePool.findFirst({ where: { first: 10000 } });
const prizePool1M = await db.prizePool.findFirst({ where: { first: 10000 } });

const tournaments = await db.tournament.createMany({
    data: [
        {
            tournamentName: "Bullet Newbies",
            type: "bullet",
            dificulty: "begginner",
            prizePoolId: prizePool100!.id,
        },
        {
            tournamentName: "Blitz Season Tournament",
            type: "blitz",
            dificulty: "intermediate",
            prizePoolId: prizePool1K!.id,
        },
        {
            tournamentName: "Chess Advanced Championship",
            type: "rapid",
            dificulty: "advanced",
            prizePoolId: prizePool10K!.id,
        },
        {
            tournamentName: "FIDE World Chess Championship",
            type: "classical",
            dificulty: "master",
            prizePoolId: prizePool1M!.id,
        },
        {
            tournamentName: "Speedy Knights Tournament",
            type: "blitz",
            dificulty: "begginner",
            prizePoolId: prizePool100!.id,
        },
    ],
});
console.log(`Tournaments seeded. ${tournaments.count} records created.`);

//Seed players
const response = await fetch("https://randomuser.me/api?results=10&seed=0e428f4a05e33234");
const { results: users } = await response.json();
let playersCount = 0;

for (const user of users) {
    const randomElo = () => Math.floor(Math.random() * (2300 - 400 + 1)) + 400;

    const player = await db.player.create({
        data: {
            nickname: user.login.username,
            firstName: user.name.first,
            lastName: user.name.last,
            bulletElo: randomElo(),
            blitzElo: randomElo(),
            rapidElo: randomElo(),
        },
    });

    playersCount++;
}
console.log(`Players seeded. ${playersCount} records created.`);

//Seed games
const randomDate = () => new Date(+new Date() - Math.floor(Math.random() * 100000000000));

const randomTournamentId = async () => {
    const tournaments = await db.tournament.findMany({
        orderBy: {
            id: "asc",
        },
        take: 1,
        skip: Math.floor(Math.random() * (await db.tournament.count())),
    });

    return tournaments[0].id;
};

const randomPlayerId = async () => {
    const players = await db.player.findMany({
        orderBy: {
            id: "asc",
        },
        take: 1,
        skip: Math.floor(Math.random() * (await db.player.count())),
    });

    return players[0].id;
};

const players = await db.player.findMany();

let gamesCount = 0;

for (const player of players) {
    const numberOfGames = Math.floor(Math.random() * 5); //que cada player pueda tener de 0 a 5 games
    for (let i = 0; i < numberOfGames; i++) {
        const winnerId = player.id;
        let loserId: string;

        do {
            loserId = await randomPlayerId();
        } while (loserId === winnerId);

        const game = await db.game.create({
            data: {
                matchDate: randomDate(),
                tournamentId: await randomTournamentId(),
                winnerId,
                loserId,
            },
        });
        gamesCount++;
    }
}
console.log(`Games seeded. ${gamesCount} records created.`);
