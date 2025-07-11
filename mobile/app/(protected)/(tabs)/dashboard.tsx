import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SignOutButton } from "@/app/components/SignOutButton";

export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="m-auto text-2xl text-center bg-slate-500">
        Dashboard Hello {user?.emailAddresses[0].emailAddress}
      </Text>
      <SignOutButton />
    </View>
  );
}
