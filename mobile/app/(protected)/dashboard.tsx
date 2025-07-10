import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/app/components/SignOutButton";

export default function Page() {
  const { user } = useUser();

  console.log("User:", user);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="m-auto text-2xl text-center bg-slate-500">
        Dashboard Hello {user?.emailAddresses[0].emailAddress}
      </Text>
    </View>
  );
}

// <SignOutButton />
//   <Text>Dashboard</Text>
//   {/* Display user email address if available */}
//   <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
//   <SignedIn>
//     <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
//     <SignOutButton />
//     {/* <Link href="/(protected)/(tabs)/(home)/dashboard">
//       <Text>Go to Profile</Text>
//     </Link> */}
//     <Link href="/(auth)/sign-in">
//       <Text>Go to sign in</Text>
//     </Link>
//   </SignedIn>
//   <SignedOut>
//     <Link href="/(auth)/sign-in">
//       <Text>Sign in</Text>
//     </Link>
//     <Link href="/(auth)/sign-up">
//       <Text>Sign up</Text>
//     </Link>
//     <Text>or</Text>
//     <Link href="/(auth)/forgot-password">
//       <Text>Forgot password?</Text>
//     </Link>
//   </SignedOut>
