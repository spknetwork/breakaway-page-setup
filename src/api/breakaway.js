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

  export const dockerSetupRequest = async (dockerData) => {
    try {
      const response = await api.post('/platform-setup', dockerData);
      return response.data;
    } catch (error) {
      console.error('Error setting up Docker:', error);
      throw error;
    }
  };
  
  export const confirmDockerRequest = async (id) => {
    try {
      const response = await api.put(`/platform-setup/confirm/${id}`, {
        dockerStatus: 'approved'
      });
      return response.data;
    } catch (error) {
      console.error('Error confirming Docker setup:', error);
      throw error;
    }
  };
  
  export const cancelDockerRequest = async (id) => {
    try {
      const response = await api.put(`/platform-setup/cancel/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling Docker setup:', error);
      throw error;
    }
  };

  export const getSingleDockerPlatform = async (id) => {
    try {
      const response = await api.get(`/docker-setup/community/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling Docker setup:', error);
      throw error;
    }
  };