const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTodos = async () => {
  const res = await fetch(`${baseUrl}/todos`);
  return res.json();
};

export const addTodo = async (todo: Todo) => {
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
  return res.json();
};

export type Todo = {
  id: number;
  title: string;
  desc: string;
  isComplete: boolean;
};
