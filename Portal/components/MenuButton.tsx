import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

export function MenuButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.dispatch(DrawerActions.openDrawer())
      }
      style={{ 
        marginLeft: 2, 
        zIndex: 1
    }}
    >
      <Text style={{ fontSize: 20 }}>☰</Text>
    </TouchableOpacity>
  );
}
