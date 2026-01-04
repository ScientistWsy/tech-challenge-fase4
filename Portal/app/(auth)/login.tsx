import { useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
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
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      setError("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await signIn(email, senha);
      // ❌ NÃO navega aqui
      // RouteGuard cuida disso
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Email ou senha inválidos"
      );
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

