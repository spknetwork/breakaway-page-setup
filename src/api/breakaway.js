import api from "./axioisInstance";


const adminToken = localStorage.getItem('adminToken');

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
      },
      {
        headers: {
        Authorization: adminToken,
      } } 
    );
      return response.data;
    } catch (error) {
      console.error('Error confirming Docker setup:', error);
      throw error;
    }
  };
  
  export const cancelDockerRequest = async (id) => {
    try {
      const response = await api.put(`/platform-setup/cancel/${id}`,{
        dockerStatus: 'canceled'
      },
      { 
        headers: {
          Authorization:  adminToken, 
        },
      });
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
  export const deleteDockerRequest = async (id) => {
    try {
      const response = await api.delete(`/platform-setup/delete/${id}`, 
        {
          headers: {
          Authorization: adminToken,
        } } 
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting Docker setup:', error);
      throw error;
    }
  };



  export const loginUser = async (userData) => {
    try {
      const response = await api.post('/admin/login', userData);
      console.log(response)

      return response
    } catch (error) {
      console.error('Error logging in:', error);
    }
    
  };