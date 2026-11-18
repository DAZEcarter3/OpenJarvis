/**
 * Express memory search scores relative to the best result of the query.
 *
 * Backends return scores on different scales: the SQLite backend returns raw
 * BM25 scores, which are unbounded and close to zero for terms that appear in
 * most documents, so they cannot be read as percentages.
 */
export function relativeScores(scores: number[]): number[] {
  const positive = scores.map((s) => (Number.isFinite(s) && s > 0 ? s : 0));
  const top = Math.max(0, ...positive);
  if (top === 0) return positive.map(() => 0);
  return positive.map((s) => s / top);
}
