import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getPets(token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const response = await axios.get(`${API_URL}/pets/`, { headers });
  return response.data;
}
