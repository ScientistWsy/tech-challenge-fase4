import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../../styles/GlobalStyles";

import { MenuButton } from "@/components/MenuButton";
import api from "@/services/api";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("aluno");

  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nome || !email || !senha || !cargo) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos",
      });
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/registrar", {
        nome,
        email,
        senha,
        cargo,
      });

      Toast.show({
        type: "success",
        text1: "Usuário cadastrado",
        text2: "Agora você pode fazer login",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (error: any) {
      const mensagem =
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "Não foi possível criar o usuário";

      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
        text2: mensagem,
      });
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View style={styles.headerCenter}>
        <MenuButton />
      </View>

      <View style={styles.containerNewUser}>
        <Text style={styles.titleNewUser}>Criar conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Cadastrar" onPress={handleRegister} />
        )}
      </View>
    </>
  );
}

