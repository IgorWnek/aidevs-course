export interface TextSearchService {
  findWordInArray(array: string[], word: string): Iterable<string>;
}
