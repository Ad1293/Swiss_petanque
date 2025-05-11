const players = [
  {
    id: 1,
    name: "Juan Pérez",
    type: "individual",
    points: 0,
    difference: 0,
    matches: []
  },
  {
    id: 2,
    name: "María García",
    type: "individual",
    points: 0,
    difference: 0,
    matches: []
  },
  {
    id: 3,
    name: "Carlos Ruiz", // Nombre del capitán como nombre del equipo
    type: "team",
    captain: "Carlos Ruiz",
    members: ["Carlos Ruiz", "Ana López", "Pedro Sánchez"],
    points: 0,
    difference: 0,
    matches: []
  }
];

export default players;