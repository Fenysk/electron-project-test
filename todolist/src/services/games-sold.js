const URL = 'http://localhost:3000/games-sold';

// GET (tout)
export async function getGamesSold() {
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux:', error);
    throw error;
  }
}

// POST
export async function postGameSold(game) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    return response;
  } catch (error) {
    console.error('Erreur lors de la création du jeu:', error);
    throw error;
  }
}