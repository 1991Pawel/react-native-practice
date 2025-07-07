import LoginForm from "@/app/components/LoginForm";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl text-center font-bold">WelcomeScreen</Text>
      <LoginForm />
    </View>
  );
}
