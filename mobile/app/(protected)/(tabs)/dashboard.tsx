import { Text, View, SafeAreaView, Image } from "react-native";
import SignOutButton from "@/components/SignOutButton";
import { useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { getUserByClerkId } from "@/services/api";
import { useIsFocused } from "@react-navigation/native";
import { images } from "@/constans/images";

export default function Page() {
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string>("");
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchUserName() {
      if (!user?.id) return;

      try {
        const userData = await getUserByClerkId(user.id);
        setFirstName(userData.firstName || "User");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserName();
  }, [isFocused, user?.id]);

  return (
    <SafeAreaView>
      <View className="flex-row items-center gap-4 p-4">
        <Image
          source={images.dashboard.avatar}
          className="w-16 h-16 rounded-full"
        />

        <Text className="text-xl font-semibold">Witaj, {firstName}!</Text>
      </View>

      <View>
        <Text className="m-auto text-2xl text-center bg-slate-100 py-20">
          Email: {user?.emailAddresses[0]?.emailAddress}
        </Text>
        <View className="mt-4  flex-row justify-center">
          <SignOutButton />
        </View>
      </View>
    </SafeAreaView>
  );
}
