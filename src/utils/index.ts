import { Locale, getPathname } from "@/i18n/routing";
import { GameCardRecord } from "@/services/data";

const GAME_DESCRIPTION_NOISE =
  /\s*(?:Website Developer|Web Dev|Developed|ウェブサイト開発者|ウェブ開発)(?:\s*(?:&lt;a\b[\s\S]*?&lt;\/a&gt;|<a\b[\s\S]*?<\/a>|https?:\/\/\S+))?\s*/gi;

export const getNavigationHref = (
  pathname: string,
  channel?: string | null,
  otherSearchStr?: string
) => {
  let searchStr = "";

  if (otherSearchStr) {
    searchStr = `?${otherSearchStr}`;
  }

  if (channel) {
    if (searchStr) {
      searchStr = `${searchStr}&channel=${channel}`;
    } else {
      searchStr = `?channel=${channel}`;
    }
  }

  return `${pathname}${searchStr}`;
};

export const getTargetHref = (
  locale: Locale,
  pathname: string,
  channel?: string | null,
  otherSearchStr?: string
) => {
  return getPathname({
    locale,
    href: {
      pathname: getNavigationHref(pathname, channel, otherSearchStr),
    },
  });
};

export const randomGames = (len: number, total: number) => {
  const array = Array.from({ length: len }, (_, i) => i);

  return array.sort(() => 0.5 - Math.random()).slice(0, total);
};

export const splitGames = <T extends GameCardRecord>(games: T[]) => {
  const destGames = [];
  const queue = [...games];

  while (queue.length) {
    const sliceGames = queue.splice(0, 6);
    destGames.push(sliceGames);
  }

  return destGames;
};

export const sanitizeGameDescription = (description: string) => {
  return description.replace(GAME_DESCRIPTION_NOISE, " ").replace(/\s{2,}/g, " ").trim();
};
