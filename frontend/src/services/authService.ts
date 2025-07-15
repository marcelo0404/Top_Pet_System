
import axios from "axios";

const API_URL = "http://localhost:8000";

// Login apenas por username e password
export async function login({ username, password }: { username: string; password: string }) {
  const response = await axios.post(`${API_URL}/api-token-auth/`, { username, password });
  return response.data; // { token: "..." }
}
