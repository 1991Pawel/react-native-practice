import React from "react";

import EmailVerifyCode from "@components/EmailVerifyCode";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { signInUser } from "../../services/api";
export default function VerifyScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  //   const { isLoaded, signUp, setActive } = useSignUp();
  //   const router = useRouter();

  const onVerifyPress = async ({ code }) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        signInUser({
          email: signUpAttempt.emailAddress,
          clerkId: signUpAttempt.createdUserId,
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        console.log(signUpAttempt.createdUserId, "signUpAttempt.createdUserId");

        // Redirect to the dashboard or any other screen
        alert("Verification successful!");
        router.replace("/(protected)/(tabs)/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        alert("Verification failed. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return <EmailVerifyCode onVerifyPress={onVerifyPress} />;
}
