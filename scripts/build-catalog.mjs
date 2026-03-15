import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, "data");
const HOME_CATEGORY_ORDER = [
  "action",
  "adventure",
  "arcade",
  "shooting",
  "sports",
  "stickman",
];
const FEATURED_CATEGORY_LIMIT = 6;
const NEW_GAMES_LIMIT = 18;
const TOP_GAMES_LIMIT = 18;
const HERO_GAMES_LIMIT = 3;
const CATEGORY_PREVIEW_LIMIT = 18;
const CATEGORY_PAGE_SIZE = 24;
const LOCALES = ["en-US", "ja-JP"];

const readJson = async (filePath) => {
  return JSON.parse(await readFile(filePath, "utf8"));
};

const writeJson = async (filePath, value) => {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const createCardRecord = (game) => ({
  id: String(game.id),
  name: game.name,
  image: game.image,
  categoryId: game.categoryId,
});

const createDetailRecord = (game) => ({
  id: String(game.id),
  name: game.name,
  image: game.image,
  gameUrl: game.gameUrl,
  description: game.description,
  categoryId: game.categoryId,
  instructions: game.instructions,
  tags: game.tags ?? "",
});

const stableHash = (input) => {
  let hash = 2166136261;

  for (const char of input) {
    hash ^= char.charCodeAt(0);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }

  return hash >>> 0;
};

const pickStable = (records, limit, seed, excludeIds = new Set()) => {
  return records
    .filter((record) => !excludeIds.has(record.id))
    .slice()
    .sort((left, right) => {
      const diff =
        stableHash(`${seed}:${left.id}`) - stableHash(`${seed}:${right.id}`);

      if (diff !== 0) {
        return diff;
      }

      return Number(right.id) - Number(left.id);
    })
    .slice(0, limit);
};

const dedupeGames = (games) => {
  const seenIds = new Set();
  const uniqueGames = [];

  for (const game of games) {
    const id = String(game.id);

    if (seenIds.has(id)) {
      continue;
    }

    seenIds.add(id);
    uniqueGames.push({
      ...game,
      id,
    });
  }

  return uniqueGames;
};

const getFeaturedAliases = (categories) => {
  const selectedAliases = [];
  const selectedSet = new Set();

  for (const alias of HOME_CATEGORY_ORDER) {
    const category = categories.find((item) => item.alias === alias);

    if (!category || selectedSet.has(category.alias) || category.count === 0) {
      continue;
    }

    selectedAliases.push(category.alias);
    selectedSet.add(category.alias);
  }

  const remainingCategories = categories
    .filter((item) => !selectedSet.has(item.alias) && item.count > 0)
    .slice()
    .sort((left, right) => right.count - left.count);

  for (const category of remainingCategories) {
    if (selectedAliases.length >= FEATURED_CATEGORY_LIMIT) {
      break;
    }

    selectedAliases.push(category.alias);
    selectedSet.add(category.alias);
  }

  return selectedAliases;
};

const chunk = (items, size) => {
  const pages = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages;
};

const buildLocaleCatalog = async (locale) => {
  const localeDir = path.join(DATA_DIR, locale);
  const catalogDir = path.join(localeDir, "catalog");
  const sourceGames = await readJson(path.join(localeDir, "data.json"));
  const sourceCategories = await readJson(path.join(localeDir, "categories.json"));
  const uniqueGames = dedupeGames(sourceGames);
  const gamesByCategoryId = new Map();

  for (const game of uniqueGames) {
    const games = gamesByCategoryId.get(game.categoryId) ?? [];
    games.push(game);
    gamesByCategoryId.set(game.categoryId, games);
  }

  const featuredAliases = getFeaturedAliases(
    sourceCategories.map((category) => ({
      ...category,
      count: (gamesByCategoryId.get(category.id) ?? []).length,
    }))
  );
  const categories = sourceCategories.map((category) => ({
    id: category.id,
    name: category.name,
    alias: category.alias,
    count: (gamesByCategoryId.get(category.id) ?? []).length,
  }));
  const cardRecords = uniqueGames.map(createCardRecord);
  const newGameCards = cardRecords.slice(0, NEW_GAMES_LIMIT);
  const newGameIds = new Set(newGameCards.map((game) => game.id));
  const topGameCards = pickStable(cardRecords, TOP_GAMES_LIMIT, "top", newGameIds);
  const heroGameIds = newGameCards
    .slice(0, HERO_GAMES_LIMIT)
    .map((game) => game.id);
  const featuredCategories = featuredAliases.map((alias) => {
    const category = categories.find((item) => item.alias === alias);
    const games = category
      ? (gamesByCategoryId.get(category.id) ?? []).map(createCardRecord)
      : [];

    return {
      alias,
      items: games.slice(0, CATEGORY_PREVIEW_LIMIT),
    };
  });
  const routes = {
    detailIds: uniqueGames.map((game) => game.id),
    playIds: uniqueGames.map((game) => game.id),
    categoryPageCounts: {},
  };

  await rm(catalogDir, { recursive: true, force: true });
  await mkdir(catalogDir, { recursive: true });

  for (const game of uniqueGames) {
    await writeJson(
      path.join(catalogDir, "games", `${game.id}.json`),
      createDetailRecord(game)
    );
  }

  for (const category of categories) {
    const games = (gamesByCategoryId.get(category.id) ?? []).map(createCardRecord);
    const pages = chunk(games, CATEGORY_PAGE_SIZE);
    const totalPages = Math.max(1, pages.length);

    routes.categoryPageCounts[category.alias] = totalPages;

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const items = pages[pageIndex] ?? [];

      await writeJson(
        path.join(
          catalogDir,
          "category-pages",
          category.alias,
          `${pageIndex + 1}.json`
        ),
        {
          category,
          page: pageIndex + 1,
          totalPages,
          totalItems: games.length,
          items,
        }
      );
    }
  }

  await writeJson(path.join(catalogDir, "categories.json"), categories);
  await writeJson(path.join(catalogDir, "home.json"), {
    heroGameIds,
    newGameCards,
    topGameCards,
    featuredCategories,
  });
  await writeJson(path.join(catalogDir, "routes.json"), routes);
}

await Promise.all(LOCALES.map((locale) => buildLocaleCatalog(locale)));
