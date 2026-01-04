import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";

import { styles } from "@/styles/GlobalStyles";

import { MenuButton } from "@/components/MenuButton";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import Toast from "react-native-toast-message";

export default function NewPostScreen() {
  const { nome } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreatePost() {
    if (!titulo || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      await api.post("/posts", {
        titulo,
        descricao,
          autor: nome ?? "Autor desconhecido",
      });

        Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Post publicado com sucesso",
        });

        setTimeout(() => {
            router.replace("/gerenciar");
        }, 1200);

        // limpa formulário
        setTitulo("");
        setDescricao("");

      // volta para tela anterior ou home
      router.back();
      // ou: router.replace("/home");

    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao criar post"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <View style={styles.headerCenter}>
        <MenuButton />
        <Text style={styles.title}>Novo Post</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.button}>
          <Button title="Publicar" onPress={handleCreatePost} />
        </View>
      )}
    </View>
  );
}

