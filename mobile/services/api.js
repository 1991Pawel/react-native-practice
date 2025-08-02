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

export const updateUserProfile = async (profileData) => {
  try {
    const response = await fetch("http://localhost:5001/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    console.log("Response from server:", response);

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getUserByClerkId = async (clerkId) => {
  try {
    const response = await fetch(`http://localhost:5001/user/${clerkId}`);
    if (!response.ok) {
      throw new Error("Nie udało się pobrać użytkownika");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd przy pobieraniu użytkownika:", error);
    throw error;
  }
};
