import React, { useState } from 'react';

const PlayerForm = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('individual');
  const [captain, setCaptain] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (type === 'individual') {
      onAddPlayer({
        name,
        type,
        points: 0,
        difference: 0,
        matches: []
      });
    } else {
      const teamMembers = members.split(',').map(m => m.trim());
      const captainName = captain.trim();
      onAddPlayer({
        name: captainName, // Usar el nombre del capitán como nombre del equipo
        type,
        captain: captainName,
        members: teamMembers,
        points: 0,
        difference: 0,
        matches: []
      });
    }
    
    setName('');
    setCaptain('');
    setMembers('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Registrar Jugador/Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="individual">Individual</option>
            <option value="team">Equipo (Dobles/Triples)</option>
          </select>
        </div>

        {type === 'individual' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre del Jugador</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nombre del Capitán (Será el nombre del equipo)</label>
              <input
                type="text"
                value={captain}
                onChange={(e) => setCaptain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Miembros (separados por comas, incluyendo al capitán)</label>
              <input
                type="text"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="Ej: Carlos Ruiz, Ana López, Pedro Sánchez"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;

// DONE