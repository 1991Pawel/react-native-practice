import { Text, View } from "react-native";
import SignOutButton from "@/components/SignOutButton";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { getUserByClerkId } from "@/services/api";

export default function Page() {
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string>("");

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
  }, [user?.id]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View>
        <Text className="m-auto text-2xl text-center bg-slate-100 py-20">
          Dashboard Hello {firstName || "Loading..."}
          Email: {user?.emailAddresses[0]?.emailAddress}
        </Text>
        <View className="mt-4  flex-row justify-center">
          <SignOutButton />
        </View>
      </View>
    </View>
  );
}
