export const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Error retrieving tasks');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const postTask = async (task) => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Error posting task');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const putTask = async (id, task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Error updating task');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Error deleting task');
      }
    } catch (error) {
      console.error(error);
    }
  };
  