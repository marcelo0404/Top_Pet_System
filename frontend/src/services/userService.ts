// Importa o axios, a biblioteca que usamos para fazer as requisições HTTP.
import axios from "axios";

// --- CONFIGURAÇÃO CENTRAL ---

// Define a URL base da sua API.
// É uma ótima prática usar variáveis de ambiente (.env) para isso, 
// mas colocamos um valor padrão para facilitar o desenvolvimento local.
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// Cria uma "instância" do axios. Todas as nossas chamadas de API usarão esta instância.
// Isso nos permite definir configurações globais, como a URL base.
const apiClient = axios.create({
  baseURL: API_URL,
});

// "Interceptor" de Requisições: uma função poderosa que é executada ANTES de cada requisição.
// Vamos usá-la para adicionar o token de autenticação automaticamente em todas as chamadas.
apiClient.interceptors.request.use(
  (config) => {
    // Pega o token que foi salvo no localStorage durante o login.
    const token = localStorage.getItem('userToken');

    // Se o token existir...
    if (token) {
      // Adiciona o cabeçalho 'Authorization' à requisição.
      // Usamos o formato "Token <token>", que é o padrão do Django REST Framework.
      config.headers['Authorization'] = `Token ${token}`;
    }
    
    // Retorna a configuração da requisição para que ela possa continuar.
    return config;
  },
  (error) => {
    // Se houver um erro na configuração, a promessa é rejeitada.
    return Promise.reject(error);
  }
);


// --- DEFINIÇÃO DOS TIPOS (INTERFACES) ---

// Define a "forma" de um objeto User. Isso nos dá segurança de tipo e autocomplete no VS Code.
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  // A propriedade 'role' (função) do usuário. 
  // Podemos definir exatamente os valores que ela pode ter, baseados no seu projeto.
  role: 'CLIENTE';
}


// --- FUNÇÕES DA API ---

/**
 * Busca a lista completa de usuários da API.
 * Requer autenticação (o token é adicionado automaticamente pelo interceptor).
 * @returns Uma promessa (Promise) que, se resolvida, retorna um array de objetos User.
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    // Faz a requisição GET para o endpoint '/users/' (o apiClient já sabe a base da URL).
    // Esperamos que a resposta seja um array de User (User[]).
    const response = await apiClient.get<User[]>('/users/');
    
    // Retorna apenas os dados (o array de usuários) da resposta.
    return response.data;
  } catch (error) {
    // Em caso de erro, exibe no console e retorna um array vazio para não quebrar a aplicação.
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}

/**
 * Função de exemplo para buscar um usuário específico pelo seu ID.
 * @param userId - O ID do usuário a ser buscado.
 * @returns Uma promessa que resolve para um único objeto User.
 */
export async function getUserById(userId: number): Promise<User | null> {
  try {
    const response = await apiClient.get<User>(`/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${userId}:`, error);
    return null;
  }
}

// Você pode adicionar todas as outras funções de API aqui, seguindo o mesmo padrão.
// Exemplo:
// export async function getAllPets() { ... }
// export async function createPet(petData) { ... }