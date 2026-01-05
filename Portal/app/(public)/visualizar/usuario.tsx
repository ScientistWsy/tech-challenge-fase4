import { MenuButton } from "@/components/MenuButton";
import api from "@/services/api";
import { styles as globalStyles } from "@/styles/GlobalStyles";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

type Cargo = "aluno" | "professor";

export default function EditarUsuarioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState<Cargo>("aluno");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadUsuario() {
    try {
      setLoading(true);

      const usuario = await api.get(`/auth/usuarios?id=${id}`);

      if (!usuario) {
        Toast.show({
          type: "error",
          text1: "Usuário não encontrado",
        });
        router.back();
        return;
      }

      setNome(usuario.data.nome);
      setEmail(usuario.data.email);
      setCargo(usuario.data.cargo);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao carregar usuário",
      });
      router.back();
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!nome || !email) {
      Toast.show({
        type: "error",
        text1: "Nome e email são obrigatórios",
      });
      return;
    }

    try {
      setSaving(true);

      const payload: any = {
        nome,
        email,
        cargo,
      };

      if (senha) {
        payload.senha = senha;
      }

      await api.put(`/auth/usuarios/${id}`, payload);

      Toast.show({
        type: "success",
        text1: "Usuário atualizado com sucesso",
      });

      router.back();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar usuário",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/auth/usuarios/${id}`);

      Toast.show({
        type: "success",
        text1: "Usuário excluído",
      });

      router.replace("/professores");
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir usuário",
      });
    }
    }

    useFocusEffect(
        useCallback(() => {
            if (id) {
                loadUsuario();
            }
        }, [id])
    );

    if (loading) {
        return (
      <>
        <Stack.Screen options={{ title: "Editar Usuário" }} />
        <ActivityIndicator style={{ marginTop: 32 }} size="large" />
      </>
    );
  }

  return (
      <>
          <View style={globalStyles.headerCenter}>
              <MenuButton />
              <Text style={globalStyles.title}>Editar Usuário</Text>
          </View>

            <hr style={globalStyles.separator}/>

      <View style={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Nova senha (opcional)</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Deixe em branco para manter"
        />

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Excluir usuário</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  selectContainer: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
  },
  option: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#1976D2",
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#1976D2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: "#D32F2F",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
