"use client";
import { Loader2, User } from "lucide-react";
import React from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { messageSchema } from "@/schemas/messageSchema";
import { Textarea } from "@/components/ui/textarea";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useGlobal } from "@/context/GlobalProvider";

const MessagePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const { toast } = useToast();
  const { user, setUser }: any = useGlobal();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/send-message", {
        username: user.username,
        content: data.content,
      });

      if (response.status === 200) {
        toast({
          className: "py-4 !text-[12px]",
          title: `${response.data.message}`,
        });
      }

      setIsSubmitting(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        className: "py-4",
        description: `Error sending message.`,
      });
      setIsSubmitting(false);
      throw new error();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="flex justify-center items-start gap-5 px-8">
        <div className=" hidden lg:flex lg:fixed top-0 left-0 items-center justify-center h-screen border-r-[0.7px] border-neutral-800 w-[10%]">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-[4rem] uppercase tracking-widest font-black whitespace-nowrap -rotate-90 text-center">
            user&apos;s Page
          </span>
        </div>
        <div className="mt-2 rounded max-w-6xl w-full lg:ml-[6.7rem] p-6 overflow-auto capitalize">
          <div className="">
            <div className="grid gap-8 items-start justify-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button className="relative px-7 py-3 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                  <span className="flex items-center space-x-5">
                    <User className="text-pink-500" />
                    <span className="pr-6 text-gray-100 tracking-wide">
                      Welcome to Feedback
                    </span>
                  </span>
                  <span className="pl-6 uppercase tracking-wide text-indigo-400 group-hover:text-gray-100 transition duration-200">
                    {params.username} &rarr;
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl lg:ml-[11.7rem] rounded-lg p-4">
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
              className="w-full px-4 py-2 text-md  bg-white/80 text-black transition-all rounded-lg hover:bg-white flex items-center justify-center"
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
                      <LiaLongArrowAltRightSolid className="text-black text-xl" />
                    </span>
                  </p>
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default MessagePage;
