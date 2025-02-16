"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodos, Todo } from "@/lib/api/todo";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await getTodos();
      return res;
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-4xl font-bold text-center mb-5">Hello, world!</h1>
        <p className="text-lg text-center">
          Welcome to your new Geist UI project. You can start editing this page
          by opening <code>src/app/page.tsx</code>.
        </p>
      </div>
      <div className="">
        <div className="inline-flex gap-4">
          <Input placeholder="Enter your name" />
          <Button>Submit</Button>
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

          {data?.map((todo: Todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-2 my-2 bg-gray-100 rounded-md"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full ${
                    todo.isComplete ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>{todo.title}</div>
              </div>
              <div>{todo.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
