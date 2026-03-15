export interface GameCardRecord {
  id: string;
  name: string;
  image: string;
  categoryId: number;
}

export interface GameDetailRecord extends GameCardRecord {
  gameUrl: string;
  description: string;
  instructions: string;
  tags: string;
}

export interface CategoryRecord {
  id: number;
  name: string;
  alias: string;
  count: number;
}

export interface HomeCategorySectionRecord {
  alias: string;
  items: GameCardRecord[];
}

export interface HomeDataRecord {
  heroGameIds: string[];
  newGameCards: GameCardRecord[];
  topGameCards: GameCardRecord[];
  featuredCategories: HomeCategorySectionRecord[];
}

export interface CategoryPageRecord {
  category: CategoryRecord;
  page: number;
  totalPages: number;
  totalItems: number;
  items: GameCardRecord[];
}

export interface RouteManifestRecord {
  detailIds: string[];
  playIds: string[];
  categoryPageCounts: Record<string, number>;
}

export type GameRecord = GameDetailRecord;
