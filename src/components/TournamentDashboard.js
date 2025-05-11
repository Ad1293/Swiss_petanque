import React, { useState, useEffect } from 'react';
import { generatePairings, calculateStandings } from '../utils/helpers';
import MatchCard from './MatchCard';
import StandingsTable from './StandingsTable';
import ResultsExporter from './ResultsExporter';

const TournamentDashboard = ({ tournament, players, onNextRound }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState(players);

  useEffect(() => {
    if (players.length > 0) {
      const initialPairings = generatePairings(players, 1);
      setMatches(initialPairings);
      setStandings(players);
    }
  }, [players]);

  const handleSaveResult = (updatedMatch) => {
    const updatedMatches = matches.map(m => 
      m.player1.id === updatedMatch.player1.id && 
      m.player2.id === updatedMatch.player2.id ? updatedMatch : m
    );
    
    setMatches(updatedMatches);
    
    const allMatchesCompleted = updatedMatches.every(m => m.completed);
    if (allMatchesCompleted) {
      const newStandings = calculateStandings(standings, updatedMatches);
      setStandings(newStandings);
    }
  };

  const handleNextRound = () => {
    const newRound = currentRound + 1;
    const newPairings = generatePairings(standings, newRound);
    setMatches(newPairings);
    setCurrentRound(newRound);
    onNextRound(newRound);
  };

  const isTournamentComplete = currentRound === tournament.rounds && 
    matches.every(m => m.completed);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{tournament.name}</h1>
        <p className="text-gray-600">Ronda {currentRound} de {tournament.rounds}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Partidos de la Ronda {currentRound}</h2>
          {matches.map((match, index) => (
            <MatchCard 
              key={index} 
              match={match} 
              onSaveResult={handleSaveResult} 
              round={currentRound}
            />
          ))}
          
          {matches.every(m => m.completed) && currentRound < tournament.rounds && (
            <button
              onClick={handleNextRound}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Generar Ronda {currentRound + 1}
            </button>
          )}

          {isTournamentComplete && (
            <ResultsExporter 
              tournament={tournament} 
              players={standings} 
              matches={matches} 
            />
          )}
        </div>

        <div className="space-y-4">
          <StandingsTable players={standings} />
        </div>
      </div>
    </div>
  );
};

export default TournamentDashboard;