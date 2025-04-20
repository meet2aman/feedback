"use client";

import { useCompletion } from "ai/react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

const SuggestMessage = ({
  setMessage,
}: {
  setMessage: (q: string) => void;
}) => {
  const { completion, input, isLoading, error, complete, handleInputChange } =
    useCompletion({
      api: "/api/suggest-message",
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading(`${input ? "Sending..." : "Suggesting..."}`);
    try {
      e.preventDefault();
      const userPrompt = input.trim() === "" ? "__suggest__" : input;
      await complete(userPrompt, {
        body: {
          prompt: userPrompt,
        },
      });
      toast.success(`${input ? "Sending Completed" : "Suggestion Completed"}`, {
        id: toastId,
      });
       handleInputChange({
         target: { value: "" },
       } as React.ChangeEvent<HTMLInputElement>);
    } catch (error) {
      toast.error(`${input ? "Sending Failed" : "Suggesting failed"}`, {
        id: toastId,
      });
    }
  };

  const messages = completion.split("||");

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-center items-center px-4">
          <Input
            className="text-sm text-neutral-300 p-2 rounded-lg bg-zinc-900 border-gray-700"
            name="prompt"
            value={input}
            onChange={handleInputChange}
            id="input"
            placeholder="Nothing hitting what to send then Click on Suggest Button"
          />
          <Button
            disabled={isLoading}
            className="bg-white text-black hover:bg-white opacity-80 hover:opacity-100"
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>{input ? "Send" : "Suggest"}</>
            )}
          </Button>
        </div>
        {completion && (
          <div className="text-white px-4 my-8">
            <ul className="flex flex-col justify-center gap-2 items-center w-full">
              {messages.map((q, i) => (
                <li
                  className="text-sm text-neutral-300 py-2 px-8 rounded-lg bg-zinc-900 border-gray-700 w-full text-center cursor-pointer"
                  key={i}
                  onClick={() => {
                    console.log(q);
                    setMessage(q);
                  }}
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </>
  );
};

export default SuggestMessage;
