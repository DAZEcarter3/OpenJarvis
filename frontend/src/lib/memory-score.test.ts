import { describe, expect, it } from 'vitest';

import { relativeScores } from './memory-score';

describe('relativeScores', () => {
  it('scales scores against the best result', () => {
    expect(relativeScores([0.5, 0.25, 0.1])).toEqual([1, 0.5, 0.2]);
  });

  it('keeps tiny BM25 scores comparable', () => {
    expect(relativeScores([1e-6, 1e-6])).toEqual([1, 1]);
  });

  it('handles scores above 1', () => {
    expect(relativeScores([4, 2])).toEqual([1, 0.5]);
  });

  it('treats zero, negative and invalid scores as no relevance', () => {
    expect(relativeScores([0, -1, Number.NaN])).toEqual([0, 0, 0]);
    expect(relativeScores([2, 0, Number.NaN])).toEqual([1, 0, 0]);
  });

  it('returns an empty list for no results', () => {
    expect(relativeScores([])).toEqual([]);
  });
});
