"use client";
import { AppleLogin, GithubLogin, GoogleLogin, SignIn } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple, IoLogoGithub } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";
import { Label } from "../ui/label";

const formSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    let toastid;
    try {
      if (!data.identifier || !data.password) {
        return toast.error("Please Provide all fields");
      }

      toastid = toast.loading("Signing in...");
      const error = await SignIn(data);

      if (!error) {
        toast.success("You have been logged in.", {
          id: toastid,
        });
        form.reset();
        router.refresh();
      } else {
        toast.error(String(error), {
          id: toastid,
        });
      }
    } catch (error: any) {
      toast.error(String(error), {
        id: toastid,
      });
    }
  }

  const handleGithubLogin = async () => {
    await GithubLogin();
    toast.success("Login using github successfull");
  };

  const handleGoogleLogin = async () => {
    await GoogleLogin();
    toast.success("Login using google successfull");
  };

  const handleAppleLogin = async () => {
    await AppleLogin();
    toast.success("Login using apple successfull");
  };

  return (
    <div className="flex justify-center items-center flex-col mt-8">
      <h1 className="text-4xl font-black text-orange-500">
        Auth.JS V5 @beta With Node V20
      </h1>
      <div className="py-10">
        <Tabs defaultValue="sign-in" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="sign-up">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sign-in" className="max-h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Sign In to your account. To check
                  <span className="text-orange-500 ml-2">
                    Auth.js V5 @beta with typescript and node V20
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="identifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email or Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Email or username" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your registered email address or username
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              className="flex w-[85%]"
                              {...field}
                              type={showPassword ? "text" : "password"}
                            />
                          </FormControl>
                          <div
                            className="bg-black py-[6px] px-[8px] cursor-pointer rounded-xl text-white absolute right-0 top-[23px] "
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                          </div>
                          <FormDescription>Enter your password</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
                <Separator />

                <div className="flex justify-center gap-2 w-full ">
                  <Button
                    className="flex gap-2 items-center w-full"
                    onClick={handleGoogleLogin}
                  >
                    <p>Login with</p>
                    <FcGoogle className="size-5" />
                  </Button>
                  <Button
                    onClick={handleGithubLogin}
                    className="flex gap-2 items-center w-full"
                  >
                    <p>Login with</p>
                    <IoLogoGithub className="size-5" />
                  </Button>
                </div>
                <div>
                  <Button
                    disabled
                    className="w-full flex justify-center items-center gap-1"
                    onClick={handleAppleLogin}
                  >
                    <p>Sign in </p>
                    <IoLogoApple className="size-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SignInPage;
