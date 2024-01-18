import api from "./axioisInstance";

export const getAllCommunities = async () => {
  try {
    const response = await api.get('/points/sorted');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching all communities:', error.message);
    throw error;
  }
};
