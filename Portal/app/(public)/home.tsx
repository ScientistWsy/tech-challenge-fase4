import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";

import { styles } from "../../styles/GlobalStyles";

import { MenuButton } from "@/components/MenuButton";
import { router } from "expo-router";
import api from "../../services/api";
import { Post } from "../../types/Post";

export default function Index() {
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
      <View style={styles.headerCenter}>
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
              pathname: "/visualizar/[id]",
              params: { id: item._id },
            })}
            key={item._id}
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