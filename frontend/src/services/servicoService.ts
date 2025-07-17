import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getServicos(token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const response = await axios.get(`${API_URL}/servicos/`, { headers });
  return response.data;
}
