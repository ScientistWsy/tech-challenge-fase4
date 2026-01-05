import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

import { MenuButton } from "@/components/MenuButton";
import api from "@/services/api";
import { styles as globalStyles } from "@/styles/GlobalStyles";

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  cargo: "aluno" | "professor";
}

interface ApiResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  usuarios: Usuario[];
}

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadUsuarios(reset = false) {
    if (loading) return;
    if (!reset && page > totalPages) return;

    try {
      setLoading(true);

      const response = await api.get<ApiResponse>("/auth/usuarios", {
        params: {
          cargo: "aluno", // 🔑 padrão
          page: reset ? 1 : page,
          limit: 10,
        },
      });

      setUsuarios((prev) =>
        reset ? response.data.usuarios : [...prev, ...response.data.usuarios]
      );

      setTotalPages(response.data.totalPages);
      setPage(response.data.page + 1);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao carregar usuários",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/auth/usuarios/${id}`);

      setUsuarios((prev) => prev.filter((u) => u._id !== id));

      Toast.show({
        type: "success",
        text1: "Usuário excluído",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir usuário",
      });
    }
    }

    useFocusEffect(
        useCallback(() => {
            loadUsuarios(true);
        }, [])
    );

    return (
        <>
            <View style={globalStyles.headerCenter}>
                <MenuButton />
                <Text style={globalStyles.title}>Usuários Cadastrados</Text>
            </View>

            <hr style={globalStyles.separator}/>
            <View style={styles.container}>
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item._id}
                    onEndReached={() => loadUsuarios()}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={
                        loading ? <ActivityIndicator style={{ margin: 16 }} /> : null
                    }
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>

                            <View style={styles.actions}>
                                <Pressable
                                    style={styles.edit}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/visualizar/usuario",
                                            params: { id: item._id },
                                        })
                                    }
                                >
                                    <Text style={styles.actionText}>Editar</Text>
                                </Pressable>

                                <Pressable
                                    style={styles.delete}
                                    onPress={() => handleDelete(item._id)}
                                >
                                    <Text style={styles.actionText}>Excluir</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  edit: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  delete: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
});
