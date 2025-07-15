export const signInUser = async ({ email, clerkId }) => {
  try {
    const response = await fetch("http://localhost:5001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, clerkId }),
    });

    console.log("Response from server:", response);

    if (!response.ok) {
      throw new Error("Failed to sign in");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
