import axios from "axios";

const API_URL = "http://localhost:8000/api"; // ajuste conforme seu backend

export async function getPets() {
  const response = await axios.get(`${API_URL}/pets/`);
  return response.data;
}
