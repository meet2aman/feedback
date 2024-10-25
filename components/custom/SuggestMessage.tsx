"use client";

import { useCompletion } from "ai/react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useChat } from "ai/react";

const SuggestMessage = () => {
  const { completion, handleSubmit, isLoading, error } = useCompletion({
    api: "/api/suggest-message",
  });

//    const { messages, input, handleInputChange, handleSubmit } = useChat();


  
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : "Suggest"}
        </Button>
        <div>{completion}</div>
      </form>
    </>
  );
};

export default SuggestMessage;
