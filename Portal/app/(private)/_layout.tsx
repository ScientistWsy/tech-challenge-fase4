import { styles } from "@/styles/GlobalStyles";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

function CustomDrawerContent(props: any) {
  const { nome, cargo, signOut } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Header */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {nome}
        </Text>
        <Text style={{ color: "#666" }}>
          {cargo}
        </Text>
      </View>

      {/* Navegação */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate("gerenciar")}
        style={{ marginBottom: 15 }}
      >
        <Text style={styles.itemMenu}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
       onPress={() => props.navigation.navigate("newpost")}
       style={{ marginBottom: 15 }}
      >
      <Text style={styles.itemMenu}>Novo Post</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => props.navigation.navigate("register")}
        style={{ marginBottom: 15 }}
      >
        <Text style={styles.itemMenu}>Criar Novo Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("professores")}
        style={{ marginBottom: 15 }}
      >
        <Text style={styles.itemMenu}>Gerenciar Usuários</Text>
      </TouchableOpacity>

      {/* Logout */}
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={signOut}>
          <Text style={{ color: "red", fontSize: 18, fontWeight: "500", }}>Sair</Text>
        </TouchableOpacity>
      </View>
        </View>
    );
}

export default function PrivateLayout() {
    return (
        <Drawer
            drawerContent={(props) => (
                <CustomDrawerContent {...props} />
            )}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="gerenciar"
                options={{ headerShown: false }}
            />

            <Drawer.Screen
                name="newpost"
                options={{ headerShown: false }}
            />

            <Drawer.Screen
                name="cadastrar"
                options={{ headerShown: false }}
            />
        </Drawer>
    );
}
