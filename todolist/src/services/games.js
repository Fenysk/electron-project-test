const URL = 'http://localhost:3000/games';

// GET (tout)
export async function getGames() {
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux:', error);
    throw error;
  }
}

// GET (détails)
export async function getGame(id) {
  try {
    const response = await fetch(`${URL}/${id}`);
    return response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération du jeu avec l'ID ${id}:`, error);
    throw error;
  }
}

// POST
export async function postGame(game) {
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

// PUT
export async function putGame(id, changedGame) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedGame),
    });
    return response;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du jeu avec l'ID ${id}:`, error);
    throw error;
  }
}

// DELETE
export async function deleteGame(id) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression du jeu avec l'ID ${id}:`, error);
    throw error;
  }
}