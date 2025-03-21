interface Auth {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const useAuth = async (): Promise<{
  data: Auth | null;
  error: any;
}> => {
  const { data, error } = await useAsyncData<Auth>("auth", () =>
    $fetch("/todos/1", {
      baseURL: "https://jsonplaceholder.typicode.com",
    })
  );

  return { data: data.value, error };
};
