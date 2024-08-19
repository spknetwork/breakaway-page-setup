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

  export const registerPlatform = async (communityData) => {
    try {
      const response = await api.post(`/platform-setup`, communityData);
      return response.data;
    } catch (error) {
      console.error('Error during docker setup:', error.response?.data || error.message);
      throw error.response?.data || { error: 'An unexpected error occurred' };
    }
  };