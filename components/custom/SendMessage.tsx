"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { messageSchema } from "@/schemas/messageSchema";
import { Textarea } from "@/components/ui/textarea";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { toast } from "sonner";

const SendMessage = ({
  username,
  message,
}: {
  username: string;
  message: string;
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (message) {
      form.setValue("content", message);
    }
  }, [message, form]);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/send-message", {
        username: username,
        content: data.content,
      });

      setResponse(response.data.message);

      toast(`${response.data.message}`);

      setIsSubmitting(false);
      form.reset();
    } catch (error: any) {
      toast(`${response}`);
      setIsSubmitting(false);
      // throw error("Error sending message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl rounded-lg p-4 mt-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">
                    Enter Your Message Here
                  </FormLabel>
                  <div>
                    <FormControl>
                      <Textarea
                        rows={8}
                        className="text-sm text-neutral-300 p-5 rounded-lg bg-zinc-900 border-gray-700"
                        placeholder="Your message "
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full px-4 py-2 text-md  bg-white/80 text-black transition-all rounded-lg hover:bg-white flex items-center justify-center group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                sending ...
              </>
            ) : (
              <>
                <p className="align-center flex justify-center items-center text-black">
                  Send
                  <span>
                    <LiaLongArrowAltRightSolid className="text-black text-xl group-hover:animate-pulse" />
                  </span>
                </p>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMessage;
