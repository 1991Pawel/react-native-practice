import LoginForm from "@/app/components/LoginForm";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function RegisterScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl text-center font-bold">Register</Text>
      <LoginForm />
      <Link href="/(auth)/sign-in" className="text-blue-600 ">
        Login
      </Link>
    </View>
  );
}
