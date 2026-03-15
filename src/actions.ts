import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Locale } from "./i18n/routing";
import {
  CategoryPageRecord,
  CategoryRecord,
  GameRecord,
  HomeDataRecord,
  RouteManifestRecord,
} from "./services/data";

const DATA_ROOT = path.join(process.cwd(), "data");

const readJson = cache(async (filePath: string) => {
  const content = await readFile(filePath, "utf8");

  return JSON.parse(content);
});

const readCatalogJson = async <T>(
  locale: Locale,
  ...segments: string[]
): Promise<T> => {
  const filePath = path.join(DATA_ROOT, locale, "catalog", ...segments);

  return (await readJson(filePath)) as T;
};

export const getCategories = async (locale: Locale): Promise<CategoryRecord[]> => {
  return readCatalogJson<CategoryRecord[]>(locale, "categories.json");
};

export const getHomeData = async (locale: Locale): Promise<HomeDataRecord> => {
  return readCatalogJson<HomeDataRecord>(locale, "home.json");
};

export const getCategoryPage = async (
  locale: Locale,
  alias: string,
  page: number
): Promise<CategoryPageRecord | null> => {
  try {
    return await readCatalogJson<CategoryPageRecord>(
      locale,
      "category-pages",
      alias,
      `${page}.json`
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
};

export const getGameDetail = async (
  locale: Locale,
  id: string
): Promise<GameRecord> => {
  try {
    return await readCatalogJson<GameRecord>(locale, "games", `${id}.json`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return notFound();
    }

    throw error;
  }
};

export const getRouteManifest = async (
  locale: Locale
): Promise<RouteManifestRecord> => {
  return readCatalogJson<RouteManifestRecord>(locale, "routes.json");
};

export const getStaticLocales = (): Locale[] => ["en-US", "ja-JP"];
