"use client";

import { TodoForm } from "@/components/todo/TodoForm";
import { Checkbox } from "@/components/ui/checkbox";
import { getTodos, makeCompleted, removeTodo, Todo } from "@/lib/api/todo";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await getTodos();
      return res;
    },
  });

  const handleDelete = async (id: number) => {
    toast.dismiss();
    const res = await removeTodo(id);
    if (!res) {
      toast.error("Failed to delete todo");
      return;
    }
    refetch();
    toast.success("Todo deleted successfully");
  };

  const toggleMakeCompleted = async (todo: Todo) => {
    toast.dismiss();
    const res = await makeCompleted(todo.id, !todo.isComplete);
    if (!res) {
      toast.error("Failed to update todo");
      return;
    }
    refetch();
    if (!todo.isComplete) {
      toast.success("Todo marked as completed");
    } else {
      toast.success("Todo marked as incomplete");
    }
  };

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-4xl font-bold text-center mb-5">Hello, world!</h1>
        <p className="text-lg text-center">
          Welcome to your new Geist UI project. You can start editing this page
          by opening <code>src/app/page.tsx</code>.
        </p>
      </div>
      <div className="">
        <div>
          <TodoForm refetch={refetch} />
        </div>
        <div className="pt-4">
          {isLoading &&
            isFetching &&
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 my-2 bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
                </div>
                <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
              </div>
            ))}

          {data?.map((todo: Todo, index: number) => (
            <div
              key={index}
              className="flex justify-between p-2 my-2 bg-gray-100 rounded-md gap-3"
            >
              <div>
                <Checkbox
                  checked={todo?.isComplete}
                  onCheckedChange={() => toggleMakeCompleted(todo)}
                />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div>
                  <div
                    className={cn(
                      "",
                      todo?.isComplete && "line-through text-stone-400",
                    )}
                  >
                    {todo.title}{" "}
                    <div
                      className={`w-2 h-2 min-w-2 rounded-full inline-flex min-h-2 me-3 ${
                        todo.isComplete ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                  <div className="break-all text-sm">{todo.desc}</div>
                </div>
              </div>
              <div>
                <Trash2
                  className="cursor-pointer"
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
