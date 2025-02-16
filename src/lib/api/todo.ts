const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTodos = async () => {
  const res = await fetch(`${baseUrl}/todos`);
  return res.json();
};

export const addTodo = async (todo: Partial<Todo>) => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const removeTodo = async (id: number) => {
  const res = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });
  console.log(res);
  if (res.status == 204) {
    return true;
  }
  if (!res.ok) {
    return false;
    // throw new Error("Failed to delete todo");
  }
  return true;
};

export const makeCompleted = async (id: number, isComplete: boolean) => {
  const res = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isComplete }),
  });
  console.log("update", res);
  if (!res.ok) {
    return false;
  }
  return true;
};

export type Todo = {
  id: number;
  title: string;
  desc: string;
  isComplete: boolean;
};
