import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function RouteGuard() {
  const { token, cargo, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const group = segments?.[0];

    // Usuário NÃO logado
    if (!token) {
      if (group === "(private)" || group === "(public)") {
        router.replace("/login");
      }
      //router.replace("/");
      return;
    }

    // Usuário LOGADO
    if (token) {
      if (!group) {
        router.replace(
          cargo === "professor" ? "/gerenciar" : "/home"
        );
      }
      
      if (group === "(private)" && cargo === "aluno") {
        router.replace("/home");
      }

      if (group === "(public)" && cargo === "professor") {
        router.replace("/gerenciar");
      }

      if (group === "(private)" && cargo === "professor") {
        return;
      }

      if (group === "(public)" && cargo === "aluno") {
        return;
      }
    }
  }, [token, cargo, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );

}

export default function Layout() {
  return (
    <AuthProvider>
      <RouteGuard />
      <Toast />
    </AuthProvider>
  );
}
