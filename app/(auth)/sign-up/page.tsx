import Link from "next/link";
import Image from "next/image";
import Video from "@/components/custom/Video";
import { auth } from "@/auth";
import SignupForm from "@/components/custom/SignupForm";
import TermPolicyBar from "@/components/custom/Term&PolicyBar";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-between lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:mt-8">
        <div className="flex items-center justify-center pb-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <div className="flex justify-center items-center mb-4">
                <Image
                  src={"/download.png"}
                  alt={"logo"}
                  width={50}
                  height={50}
                />
              </div>
              <h1 className="text-[1.2rem] font-semibold text-white tracking-wide font-poppins ">
                Create a Feedback account
              </h1>
              <div className="text-center text-md text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="underline text-blue-500 hover:text-blue-700 transition-all"
                >
                  Log In
                </Link>
              </div>
            </div>
            {/* ============ form div ========== */}

            <div>
              <SignupForm />
              {/* =========== divider ============= */}
            </div>
            <TermPolicyBar />
          </div>
        </div>

        {/* ============ video div ========== */}

        <Video />
      </div>
    </>
  );
}
