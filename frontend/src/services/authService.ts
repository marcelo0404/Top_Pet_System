import axios from "axios";

const API_URL = "http://localhost:8000";

// Login apenas por username e password
export async function login({ username, password }: { username: string; password: string }) {
  const response = await axios.post(`${API_URL}/api-token-auth/`, { username, password });
  return response.data; // { token: "..." }
}

// Cadastro de usuário (signup)
export async function signup({
  username,
  password,
  confirm_password,
  email,
  first_name,
  last_name,
  telefone = "",
  endereco = ""
}: {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  first_name: string;
  last_name: string;
  telefone?: string;
  endereco?: string;
}) {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password,
      confirm_password,
      email,
      first_name,
      last_name,
      telefone,
      endereco
    })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error || { detail: 'Erro ao cadastrar usuário' };
  }
  return res.json();
}
