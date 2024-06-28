import api from "./axioisInstance";

export const getDockerSetups = async () => {
    try {
      const response = await api.get('/docker-setup');
      return response.data;
    } catch (error) {
      console.error('Error fetching Docker setups:', error);
      throw error;
    }
  };