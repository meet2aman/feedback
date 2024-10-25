import { auth } from "@/auth";
import DashboardUserDetails from "@/components/custom/DashboardUserDetails";
import Glitch from "@/components/sub/Glitch";

export default async function Dashboard() {
  const session = await auth();

  /* ============= if user not logged in  ============ */
  if (!session) {
    return (
      <>
        <div className="text-white font-semibold tracking-wide text-xl text-center">
          <Glitch />
        </div>
      </>
    );
  }

  /* ============= if logged IN ============ */
  return (
    <>
      <main className="flex justify-center items-start gap-5 px-8 py-5">
        <div className=" hidden lg:flex lg:fixed top-0 left-0 items-center justify-center h-screen border-r-[0.7px] border-neutral-800 w-[10%]">
          <span className="text-[4rem] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 uppercase tracking-widest font-black whitespace-nowrap -rotate-90 text-center">
            DashBoard
          </span>
        </div>

        <div className="mt-2 bg-neutral-200 rounded max-w-6xl w-full lg:ml-[6.7rem] p-6 overflow-auto">
          <DashboardUserDetails user={session?.user} />
        </div>
      </main>
    </>
  );
}
