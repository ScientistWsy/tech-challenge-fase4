import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";

import api from "../../services/api";
import { Comment } from "../../types/Comment";
import { Post } from "../../types/Post";

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [Comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        const [postResponse, CommentsResponse] = await Promise.all([
          api.get<Post>(`/posts/${id}`),
          api.get<Comment[]>(`/posts/${id}/comentarios`),
        ]);

        setPost(postResponse.data);
        setComments(CommentsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Post" }} />
        <ActivityIndicator size="large" />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Stack.Screen options={{ title: "Post" }} />
        <Text>Post não encontrado</Text>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Post" }} />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {post.titulo}
        </Text>

        <Text style={{ marginVertical: 12 }}>
          {post.descricao}
        </Text>

        <Text>Autor: {post.autor}</Text>
        <Text>Criado em: {post.dataCriacao}</Text>

        {/* Comentários */}
        {Comments.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Comentários
            </Text>

            <FlatList
              data={Comments}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginTop: 12,
                    padding: 12,
                    backgroundColor: "#f2f2f2",
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {item.usuario}
                  </Text>

                  <Text style={{ marginVertical: 4 }}>
                    {item.texto}
                  </Text>

                  <Text style={{ fontSize: 12, color: "#666" }}>
                    {new Date(item.data).toLocaleString()}
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        {Comments.length === 0 && (
          <Text style={{ marginTop: 24, color: "#666" }}>
            Nenhum comentário ainda.
          </Text>
        )}
      </View>
    </>
  );
}
