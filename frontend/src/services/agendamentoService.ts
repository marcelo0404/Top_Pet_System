import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function criarAgendamento({ pet_id, servico_id, data_hora, observacoes, token }: {
  pet_id: number|string,
  servico_id: number|string,
  data_hora: string,
  observacoes?: string,
  token?: string
}) {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const payload: any = {
    pet_id,
    servico_id,
    data_hora,
  };
  if (observacoes) payload.observacoes = observacoes;
  const response = await axios.post(`${API_URL}/agendamentos/`, payload, { headers });
  return response.data;
}

export async function getAgendamentos(token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const response = await axios.get(`${API_URL}/agendamentos/`, { headers });
  return response.data;
}
