export interface SearchParams {
  name?: string;
  gender?: string;
}

export interface Page {
  prev?: string;
  next?: string;
  items: Character[];
}

export interface Character {
  id: number;
  name: string;
  gender: string;
  species: string;
  image: string;
}
