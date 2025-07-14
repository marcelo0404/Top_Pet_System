import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // TODO: Implementar lógica de autenticação
  const user = null;
  const isAuthenticated = false;

  const login = async (email: string, password: string) => {
    // TODO: Implementar login
    console.log('Login:', { email, password });
  };

  const logout = () => {
    // TODO: Implementar logout
    console.log('Logout');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};