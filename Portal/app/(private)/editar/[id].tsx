import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import { styles } from "@/styles/GlobalStyles";

import Toast from "react-native-toast-message";

import { MenuButton } from "@/components/MenuButton";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Comment } from "@/types/Comment";
import { Post } from "@/types/Post";
import { MaterialIcons } from '@expo/vector-icons';

export default function PostScreen() {
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

      <hr style={styles.separator} />

      <View style={{ padding: 16 }}>
        {editandoPost ? (
          <>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
            <TextInput
              style={styles.input}
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <TouchableOpacity onPress={handleUpdatePost} style={{ backgroundColor: 'green', padding: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Salvar post">
                <MaterialIcons name="check" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditandoPost(false)} style={{ backgroundColor: 'gray', padding: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Cancelar edição">
                <MaterialIcons name="close" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {post.titulo}
            </Text>
            <Text style={{ marginVertical: 12 }}>
              {post.descricao}
            </Text>
            <Text style={{ marginBottom: 8 }}>Autor: {post.autor}</Text>

            {podeEditarPost && (
                <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity onPress={() => setEditandoPost(true)} style={{ backgroundColor: '#1976d2', padding: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Editar post">
                  <MaterialIcons name="edit" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeletePost} style={{ backgroundColor: 'red', padding: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Excluir post">
                  <MaterialIcons name="delete" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Novo comentário */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Novo comentário</Text>
          <TextInput
            style={styles.input}
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
          renderItem={({ item, index }) => (
            <View
              style={[styles.card, { marginTop: index == 0 ? 16 : 8 }]}
              key={item._id}
            >
              <Text style={{ fontWeight: "bold" }}>
                {item.usuario}
              </Text>

              {comentarioEditando === item._id ? (
                <>
                  <TextInput

                    style={[{ marginVertical: 8 }, styles.input]}
                    value={textoComentarioEditado}
                    onChangeText={setTextoComentarioEditado}
                  />
                  <View style={{ marginBottom: 8, flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity onPress={() => handleUpdateComment(item._id)} style={{ backgroundColor: 'green', padding: 6, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Salvar comentário">
                      <MaterialIcons name="check" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setComentarioEditando(null); setTextoComentarioEditado(''); }} style={{ backgroundColor: 'gray', padding: 6, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Cancelar edição comentário">
                      <MaterialIcons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={{ marginBottom: 8 }}>{item.texto}</Text>
              )}

              <View style={{ flexDirection: "row", gap: 8 }}>
                {podeEditarComentario(item.usuario) && (
                  <TouchableOpacity onPress={() => { setComentarioEditando(item._id); setTextoComentarioEditado(item.texto); }} style={{ backgroundColor: '#1976d2', padding: 6, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Editar comentário">
                    <MaterialIcons name="edit" size={16} color="white" />
                  </TouchableOpacity>
                )}

                {podeExcluirComentario(item.usuario) && (
                  <TouchableOpacity onPress={() => handleDeleteComment(item._id)} style={{ backgroundColor: 'red', padding: 6, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Excluir comentário">
                    <MaterialIcons name="delete" size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}
