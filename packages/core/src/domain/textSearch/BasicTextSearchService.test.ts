import { BasicTextSearchService } from './BasicTextSearchService';
import { describe, expect, test } from 'vitest';
describe('Given a BasicTextSearchService', () => {
  const service = new BasicTextSearchService();

  describe('When searching for a word present in one of the sentences', () => {
    const sentences = [
      'To jest pierwsze zdanie.',
      'To jest drugie zdanie.',
      'To jest trzecie zdanie.',
    ];
    const word = 'trzecie';
    const result = [...service.findWordInArray(sentences, word)]; // convert Iterable to array

    test('Then it should find the word in 1 sentence', () => {
      expect(result.length).toBe(1);
    });

    test('Then the returned sentence should be the third one', () => {
      expect(result[0]).toBe('To jest trzecie zdanie.');
    });
  });

  describe('When searching for a word not present in the sentences', () => {
    const sentences = [
      'To jest pierwsze zdanie.',
      'To jest drugie zdanie.',
      'To jest trzecie zdanie.',
    ];
    const word = 'czwarte';
    const result = [...service.findWordInArray(sentences, word)]; // convert Iterable to array

    test('Then it should not find the word', () => {
      expect(result.length).toBe(0);
    });
  });
});
