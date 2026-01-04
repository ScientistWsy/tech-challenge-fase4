import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "@/styles/GlobalStyles";
import Toast from "react-native-toast-message";

import { MenuButton } from "@/components/MenuButton";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Comment } from "@/types/Comment";
import { Post } from "@/types/Post";

export default function PostPublicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { nome, cargo } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // edição post
  const [editandoPost, setEditandoPost] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  // comentários
  const [novoComentario, setNovoComentario] = useState("");
  const [comentarioEditando, setComentarioEditando] = useState<string | null>(null);
  const [textoComentarioEditado, setTextoComentarioEditado] = useState("");

  async function loadData() {
    try {
      setLoading(true);

      const [postRes, commentsRes] = await Promise.all([
        api.get<Post>(`/posts/${id}`),
        api.get<Comment[]>(`/posts/${id}/comentarios`),
      ]);

      setPost(postRes.data);
      setComments(commentsRes.data);
      setTitulo(postRes.data.titulo);
      setDescricao(postRes.data.descricao);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha ao carregar post",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const podeEditarPost =
    nome === post?.autor || cargo === "professor";

  const podeEditarComentario = (usuario: string) =>
    usuario === nome;

  const podeExcluirComentario = (usuario: string) =>
    usuario === nome || cargo === "professor";

  async function handleUpdatePost() {
    try {
      await api.put(`/posts/${id}`, { titulo, descricao });

      setEditandoPost(false);

      Toast.show({
        type: "success",
        text1: "Post atualizado",
      });

      loadData();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar post",
      });
    }
  }

  async function handleDeletePost() {
    try {
      await api.delete(`/posts/${id}`);

      Toast.show({
        type: "success",
        text1: "Post excluído",
      });

      setTimeout(() => router.replace("/home"), 1000);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir post",
      });
    }
  }

  async function handleCreateComment() {
    if (!novoComentario) return;

    try {
      await api.post(`/posts/${id}/comentarios`, {
        usuario: nome,
        texto: novoComentario,
      });

      setNovoComentario("");

      Toast.show({
        type: "success",
        text1: "Comentário publicado",
      });

      loadData();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao comentar",
      });
    }
  }

  async function handleUpdateComment(commentId: string) {
    try {
      await api.put(
        `/posts/${id}/comentarios/${commentId}`,
        {
          usuario: nome,
          novoTexto: textoComentarioEditado,
        }
      );

      setComentarioEditando(null);
      setTextoComentarioEditado("");

      Toast.show({
        type: "success",
        text1: "Comentário editado",
      });

      loadData();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao editar comentário",
      });
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      await api.delete(
        `/posts/${id}/comentarios/${commentId}`,
        {
          data: { usuario: nome, cargo },
        }
      );

      Toast.show({
        type: "success",
        text1: "Comentário excluído",
      });

      loadData();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir comentário",
      });
    }
  }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Post" }} />
        <ActivityIndicator size="large" />
      </>
    );
  }

  if (!post) {
    return <Text>Post não encontrado</Text>;
  }

  return (
    <>
      <View style={styles.headerCenter}>
        <MenuButton />
        <Text style={styles.title}>Detalhes</Text>
      </View>

      <View style={{ padding: 16 }}>
        {editandoPost ? (
          <>
            <TextInput value={titulo} onChangeText={setTitulo} />
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <Button title="Salvar" onPress={handleUpdatePost} />
            <Button
              title="Cancelar"
              onPress={() => setEditandoPost(false)}
            />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {post.titulo}
            </Text>
            <Text style={{ marginVertical: 12 }}>
              {post.descricao}
            </Text>
            <Text>Autor: {post.autor}</Text>

            {podeEditarPost && (
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Button
                  title="Editar"
                  onPress={() => setEditandoPost(true)}
                />
                <Button
                  title="Excluir"
                  color="red"
                  onPress={handleDeletePost}
                />
              </View>
            )}
          </>
        )}

        {/* Novo comentário */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontWeight: "bold" }}>Novo comentário</Text>
          <TextInput
            value={novoComentario}
            onChangeText={setNovoComentario}
            placeholder="Digite seu comentário"
          />
          <Button title="Comentar" onPress={handleCreateComment} />
        </View>

        {/* Lista comentários */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: "#f2f2f2",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {item.usuario}
              </Text>

              {comentarioEditando === item._id ? (
                <>
                  <TextInput
                    value={textoComentarioEditado}
                    onChangeText={setTextoComentarioEditado}
                  />
                  <Button
                    title="Salvar"
                    onPress={() =>
                      handleUpdateComment(item._id)
                    }
                  />
                </>
              ) : (
                <Text>{item.texto}</Text>
              )}

              <View style={{ flexDirection: "row", gap: 8 }}>
                {podeEditarComentario(item.usuario) && (
                  <Button
                    title="Editar"
                    onPress={() => {
                      setComentarioEditando(item._id);
                      setTextoComentarioEditado(item.texto);
                    }}
                  />
                )}

                {podeExcluirComentario(item.usuario) && (
                  <Button
                    title="Excluir"
                    color="red"
                    onPress={() =>
                      handleDeleteComment(item._id)
                    }
                  />
                )}
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}