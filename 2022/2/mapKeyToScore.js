function mapKeyToScore(key) {
  const [opponent, me] = [key[0], key[2]];

  // 1 for Rock(X)
  // 2 for Paper(Y)
  // 3 for Scissors(Z)
  let score = me.charCodeAt(0) - 87;

  const opponentScore = opponent.charCodeAt(0) - 64;
  if (score === opponentScore) {
    return score + 3;
  } else if (
    (score === 1 && opponentScore === 3) ||
    (score === 2 && opponentScore === 1) ||
    (score === 3 && opponentScore === 2)
  ) {
    return score + 6;
  }
  return score;
}

module.exports = mapKeyToScore;
