# Modelo de Datos con Prisma y PostgreSQL

Esta aplicación es un sistema de gestión de torneos de ajedrez que permite almacenar y administrar información sobre torneos, partidas y jugadores. Utiliza Prisma como ORM y PostgreSQL como base de datos.

El modelo de datos incluye las siguientes entidades: `Tournament`, `Game`, `Player` y `PrizePool` relacionadas de la siguiente manera:

<img src="https://raw.githubusercontent.com/aliem-r/p3-data-model-2024/871873cfa1f4a3541bdd0592196d6464cd3ec241/prisma-erd.svg"  width="500">

El proyecto incluye un script (`seed.ts`) para inicializar la base de datos con datos de prueba, como torneos de ejemplo, jugadores generados aleatoriamente y partidas simuladas.

## Requisitos previos

-   Node.js (versión 14 o superior)
-   Bun (gestor de paquetes y entorno de ejecución)
-   Docker y Docker Compose (para ejecutar PostgreSQL en un contenedor)

## Instalación y seeding

**1. Instala las dependencias con Bun.**

```
bun install
```

**2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno.**

```
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbName
DB_PORT=5432
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
# postgresql://user:password@localhost:5432/dbName
```

Estas variables de entorno se utilizarán en los archivos `docker-compose.yml` y `schema.prisma`.

**3. Inicia el contenedor de PostgreSQL con Docker Compose:**

```
docker compose up -d
```

Este comando iniciará un contenedor de PostgreSQL en segundo plano.

**4. Genera el cliente de Prisma, aplica el esquema de Prisma y siembra la base de datos con datos iniciales ejecutando el siguiente comando:**

```
bun seed
```

<br><br><br><br>

# Scripts para manipulación de datos

El proyecto cuenta con varios scripts para manipular los datos de los jugadores y partidas en la base de datos. A continuación, se detallan los comandos disponibles:

## Comandos para Player

**Crear un nuevo jugador en la base de datos:**

```
bun player new-player <nickname> <firstName> <lastName> <bulletElo> <blitzElo> <rapidElo>
```

**Obtener todos los jugadores registrados:**

```
bun player get-all-players
```

**Obtener un jugador específico:**

```
bun player get-player <nickname>
```

**Obtener el rating ELO de un jugador específico:**

```
bun player get-player-elo <nickname>
```

**Actualizar el nombre de un jugador:**

```
bun player set-player-firstname <nickname> <firstName>
```

**Actualizar el apellido de un jugador:**

```
bun player set-player-firstname <nickname> <lastName>
```

**Eliminar un jugador de la base de datos:**

```
bun player delete-player <nickname>
```

## Comandos para Game

**Crear una nueva partida en la base de datos:**

```
bun game new-game <matchDateString> <tournamentId> <winnerNickname> <loserNickname>
```

**Obtener todas las partidas registradas:**

```
bun game get-all-games
```

**Obtener una partida específica:**

```
bun game get-game <id>
```

**Actualizar la fecha de una partida:**

```
bun game set-match-date <id> <matchDateString>
```

**Eliminar una partida de la base de datos:**

```
bun game delete-game <id>
```

<br><br><br><br>

# Enunciado de la práctica

En esta práctica hay que desarrollar el modelo de datos para una aplicación que resulte de tu interés. (No es necesario pensar en la autenticación aún, estudiaremos eso por separado.)

Se trata, como otras veces, de hacer un _fork_ de este repositorio y trabajar en él.

La solución del ejercicio debe ser un proyecto Javascript con:

-   El esquema de Prisma (`schema.prisma`).
-   La configuración para una base de datos (con `docker-compose.yml`).
-   Rellenado con unos pocos datos de prueba.
-   Scripts en Typescript de demostración que hacen algunas cosas con los datos.
-   Documentación sobre cómo lanzar la base de datos y usar los scripts de demostración (sustituyendo este mismo README).

## Esquema

El esquema debe tener almenos 3 entidades, pero no hay límite superior. Empieza siempre por definir las entidades más importantes, y asegúrate de que las relaciones cumplen con las necesidades que has planteado (nunca hay una única solución, cada solución tienes sus ventajas e inconvenientes, simplemente hay que ser conscientes de ellos). Luego añade entidades para hacer crecer el modelo. No intentes hacerlo todo de golpe (a no ser que ya tengas experiencia).

## Rellenado de datos de prueba

Para crear los datos iniciales con los que poder hacer algo al principio se puede usar cualquier mecanismo que automatice la inserción. Se recomienda mirar la documentación sobre como usar `seed.ts` en Prisma, que es una manera semi-estandarizada.
