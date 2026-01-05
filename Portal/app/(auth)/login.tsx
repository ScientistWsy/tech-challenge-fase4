import { useAuth } from "@/contexts/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";

import { styles } from "@/styles/GlobalStyles";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn, cargo } = useAuth();
  const router = useRouter();

  async function handleLogin() {
    if (!email || !senha) {
      setError("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await signIn(email, senha);

      // 🔥 REDIRECIONA AQUI
      if (cargo === "professor") {
        router.replace("/gerenciar");
      } else {
        router.replace("/home");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.mensagem ||
        err.response?.data?.message ||
        "Erro ao realizar login";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />

      <View style={styles.containerlogin}>
        <Text style={styles.titleLogin}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Entrar" onPress={handleLogin} />
        )}
      </View>
    </>
  );
}

