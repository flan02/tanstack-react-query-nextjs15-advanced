export interface User {
  name: string;
  avatar: string;
}

// In a real app this function would come from your authentication service
export async function getCurrentUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    name: "FLAN02",
    avatar: "FL",
  };
}