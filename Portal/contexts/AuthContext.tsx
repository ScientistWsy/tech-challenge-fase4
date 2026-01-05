import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { LoginResponse } from "../types/Auth";

interface AuthContextData {
  token: string | null;
  nome: string | null;
  cargo: string | null;
  loading: boolean;
  signIn(email: string, senha: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [cargo, setCargo] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorage() {
      try {
        const [[, token], [, nome], [, cargo]] =
          await AsyncStorage.multiGet([
            "@token",
            "@nome",
            "@cargo",
          ]);

        if (token) {
          setToken(token);
          setNome(nome);
          setCargo(cargo);
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
      } finally {
        setLoading(false);
      }
    }

    loadStorage();
  }, []);

  async function signIn(email: string, senha: string): Promise<void> {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        { email, senha }
      );

      const { token, nome, cargo } = response.data;

      setToken(token);
      setNome(nome);
      setCargo(cargo);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
        ["@token", token],
        ["@nome", nome],
        ["@cargo", cargo],
      ]);
    } catch (error) {
      throw error;
    }
  }

  async function signOut(): Promise<void> {
    setLoading(true);

    setToken(null);
    setNome(null);
    setCargo(null);

    delete api.defaults.headers.common.Authorization;

    await AsyncStorage.multiRemove([
      "@token",
      "@nome",
      "@cargo",
    ]);

    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        nome,
        cargo,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
