"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "@/schemas/contactSchema";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      content: "",
    },
  });
  const { reset } = form;

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/contact-message", {
        name: data.name,
        content: data.content,
        email: data.email,
      });
      toast(`${response.data.message}`);
      setIsSubmitting(false);
      reset();
    } catch (error: any) {
      setIsSubmitting(false);
      throw new error();
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };
  return (
    <main className="flex justify-center items-start gap-5 px-8 overflow-hidden">
      <div className="fixed animate-blob bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400 to-pink-400 h-[300px] w-[300px] blur-[90px] left-10 rounded-full" />
      <div className="fixed animate-blob bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400 to-pink-400 h-[300px] w-[300px] blur-[90px] right-10 bottom-0 rounded-full" />
      <Image
        className="fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] ml-10 opacity-5"
        src={"/feedback.png"}
        alt="logo"
        height={700}
        width={800}
      />

      <div className=" hidden lg:flex lg:fixed top-0 left-0 items-center justify-center h-screen border-r-[0.7px] border-neutral-800 w-[10%]">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-[4rem] uppercase tracking-widest font-black whitespace-nowrap -rotate-90 text-center">
          Contact us
        </span>
      </div>

      <div className="rounded z-50 max-w-2xl w-full lg:ml-[6.7rem] p-2 lg:p-6 overflow-auto capitalize flex justify-center items-center h-[40rem]">
        <div className="w-full rounded-lg lg:p-6">
          <div>
            <div className="flex justify-center gap-2 lg:gap-5 items-center text-white mb-5">
              <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-[2rem] uppercase tracking-widest font-black whitespace-nowrap  text-center">
                Contact
              </h2>
              <div className="hidden lg:flex justify-center items-center">
                <Image
                  src={"/download.png"}
                  alt={"logo"}
                  width={50}
                  height={50}
                />
              </div>
              <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-[2rem] uppercase tracking-widest font-black whitespace-nowrap  text-center">
                Form
              </h2>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                {/* =========== Email input ============= */}
                <div className="grid gap-2 w-full">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 ">Email</FormLabel>
                        <FormControl>
                          <Input
                            className=" text-sm text-neutral-300 p-5 rounded-lg bg-zinc-900 border-gray-700"
                            placeholder="Your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* =========== name input ============= */}

                <div className="grid gap-2">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">
                          Your Name
                        </FormLabel>
                        <div>
                          <FormControl>
                            <Input
                              className="text-sm text-neutral-300 p-5 rounded-lg bg-zinc-900 border-gray-700"
                              type="text"
                              placeholder="Your name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* =========== content input ============= */}
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

                {/* =========== Button ============= */}

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
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
