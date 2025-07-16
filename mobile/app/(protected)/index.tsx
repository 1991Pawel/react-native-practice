import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import SignOutButton from "@/components/SignOutButton";

export default function Page() {
  const { user } = useUser();

  console.log("User:", user);

  return (
    <View>
      {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
        <Link href="/(protected)/dashboard">
          <Text>Go to Profile</Text>
        </Link>
        <Link href="/(auth)/sign-in">
          <Text>Go to sign in</Text>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
        <Text>or</Text>
        <Link href="/(auth)/forgot-password">
          <Text>Forgot password?</Text>
        </Link>
      </SignedOut> */}
    </View>
  );
}
