export const generatePairings = (participants, round) => {
  // Ordenar participantes por puntos y diferencia
  const sorted = [...participants].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.difference - a.difference;
  });

  const pairings = [];
  
  while (sorted.length > 1) {
    const player1 = sorted.shift();
    const player2Index = sorted.findIndex(p => 
      Math.abs(p.difference - player1.difference) <= 3
    );
    
    if (player2Index >= 0) {
      const player2 = sorted.splice(player2Index, 1)[0];
      pairings.push({
        round,
        player1,
        player2,
        completed: false,
        score1: 0,
        score2: 0
      });
    }
  }

  return pairings;
};

export const calculateStandings = (participants, matches) => {
  return participants.map(p => {
    const playerMatches = matches.filter(m => 
      m.player1.id === p.id || m.player2.id === p.id
    );
    
    const points = playerMatches.reduce((acc, m) => {
      if (m.player1.id === p.id && m.score1 > m.score2) return acc + 1;
      if (m.player2.id === p.id && m.score2 > m.score1) return acc + 1;
      return acc;
    }, 0);
    
    const difference = playerMatches.reduce((acc, m) => {
      if (m.player1.id === p.id) return acc + (m.score1 - m.score2);
      if (m.player2.id === p.id) return acc + (m.score2 - m.score1);
      return acc;
    }, 0);
    
    return {
      ...p,
      points,
      difference
    };
  });
};