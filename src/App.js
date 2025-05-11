import React, { useState, useEffect } from 'react';
import TournamentForm from './components/TournamentForm';
import PlayerForm from './components/PlayerForm';
import TournamentDashboard from './components/TournamentDashboard';
import playersData from './mock/players';
import tournamentsData from './mock/tournaments';

const App = () => {
  const [tournament, setTournament] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    // Simular carga inicial de datos
    if (tournamentsData.length > 0) {
      setTournament(tournamentsData[0]);
    }
    setPlayers(playersData);
  }, []);

  const handleCreateTournament = (newTournament) => {
    const tournamentWithId = {
      ...newTournament,
      id: Date.now(),
      status: 'active',
      participants: []
    };
    setTournament(tournamentWithId);
  };

  const handleAddPlayer = (newPlayer) => {
    const playerWithId = {
      ...newPlayer,
      id: Date.now()
    };
    setPlayers([...players, playerWithId]);
    
    if (tournament) {
      const updatedTournament = {
        ...tournament,
        participants: [...tournament.participants, playerWithId.id]
      };
      setTournament(updatedTournament);
    }
  };

  const handleNextRound = (round) => {
    setCurrentRound(round);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {!tournament ? (
          <TournamentForm onCreateTournament={handleCreateTournament} />
        ) : (
          <>
            <PlayerForm onAddPlayer={handleAddPlayer} />
            <TournamentDashboard 
              tournament={tournament} 
              players={players} 
              onNextRound={handleNextRound}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;

// DONE