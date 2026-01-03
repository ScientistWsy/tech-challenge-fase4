import { useAuth } from "@/contexts/AuthContext";
import { Button } from "react-native";
import Toast from "react-native-toast-message";

export function LogoutButton() {
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();

    Toast.show({
      type: "success",
      text1: "Você saiu da conta",
    });
  }

  return <Button title="Sair" onPress={handleLogout} />;
}
