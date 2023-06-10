import { TextSearchService } from './TextSearchService';

export class BasicTextSearchService implements TextSearchService {
  public *findWordInArray(array: string[], word: string): Iterable<string> {
    for (const sentence of array) {
      if (sentence.split(' ').includes(word)) {
        yield sentence;
      }
    }
  }
}
