import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { MenuButton } from "../../components/MenuButton";
import api from "../../services/api";
import { Post } from "../../types/Post";

export function Home() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuButton />,
    });
  }, []);

  return null;
}

export default function Gerenciar() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  async function buscarPosts(): Promise<void> {
    setLoading(true);

    try {
      let response;

      if (titulo || descricao) {
        response = await api.get<Post[]>("/posts/busca", {
          params: {
            titulo,
            descricao,
          },
        });
      } else {
        response = await api.get<Post[]>("/posts");
      }

      const postsAtivos = response.data.filter(
        (post) => post.postAtivo === true
      );

      setPosts(postsAtivos);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    buscarPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <MenuButton />
        <Text style={styles.title}>Lista de Post</Text>
      </View>

      <View style={styles.filtroContainer}>
        <TextInput
          placeholder="Filtrar por título"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />

        <TextInput
          placeholder="Filtrar por descrição"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
        />

        <Pressable style={styles.filtroButton} onPress={buscarPosts}>
          <Text style={styles.filtroText}>Filtrar</Text>
        </Pressable>
      </View>

      <FlatList<Post>
        data={posts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({
              pathname: "/editar/[id]",
              params: { id: item._id },
            })}
            style={styles.card}
          >

            <View style={styles.card}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>

              <View style={styles.footer}>
                <Text style={styles.autor}>Autor: {item.autor}</Text>
                <Text style={styles.data}>{item.dataCriacao}</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum post disponível</Text>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#01ad09",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 2,
  },

  loginText: {
    color: "#fff",
    fontWeight: "500",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  autor: {
    fontSize: 12,
    color: "#777",
  },
  data: {
    fontSize: 12,
    color: "#777",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  filtroContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },

  filtroButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  filtroText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
