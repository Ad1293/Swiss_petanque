import React from 'react';

const ResultsExporter = ({ tournament, players, matches }) => {
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.difference - a.difference;
  });

  const exportResults = () => {
    const content = [
      `Resultados del Torneo: ${tournament.name}`,
      `Rondas jugadas: ${tournament.rounds}`,
      '',
      'Clasificación Final:',
      ...sortedPlayers.map((p, i) => `${i + 1}. ${p.name} - Puntos: ${p.points} - Diferencia: ${p.difference}`),
      '',
      'Partidos Jugados:',
      ...matches.map(m => `Ronda ${m.round}: ${m.player1.name} ${m.score1} - ${m.score2} ${m.player2.name}`)
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resultados_${tournament.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Exportar Resultados</h3>
      <button
        onClick={exportResults}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Descargar Resultados Completos
      </button>
    </div>
  );
};

export default ResultsExporter;