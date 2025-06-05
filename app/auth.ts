import { auth } from "@clerk/nextjs/server";

export async function getAuthToken() {
  try {
    const token = await auth().getToken({ 
      template: "convex"
    });
    
    if (!token) {
      console.warn("No auth token available");
      return undefined;
    }
    
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return undefined;
  }
}
