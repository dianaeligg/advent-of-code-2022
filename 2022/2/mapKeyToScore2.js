function mapKeyToScore(key) {
  const [opponent, me] = [key[0], key[2]];

  // X - Lose
  // Y - Draw
  // Z - Win

  const opponentScore = opponent.charCodeAt(0) - 64;

  console.log({ me, opponent, opponentScore });
  if (me === 'Y') {
    console.log(opponentScore + 3);
    return opponentScore + 3;
  } else if (me === 'X') {
    console.log(opponentScore - 1 || 3);
    return opponentScore - 1 || 3;
  }

  console.log((opponentScore % 3) + 1 + 6);
  return (opponentScore % 3) + 1 + 6;
}

module.exports = mapKeyToScore;
