import api from "./axioisInstance";

export const fetchCommunityDockers = async () => {
    try {
      const response = await api.get("/docker");
      console.log(response)
      return response.data
    } catch (error) {
      console.log("Error fetching community dockers:", error.message);
    }
  };