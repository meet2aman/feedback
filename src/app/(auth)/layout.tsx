import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="px-2 pt-8">
        <Link
          className="text-white flex gap-3 justify-start items-center text-sm"
          href="/"
        >
          <IoIosArrowForward className="text-gray-400 group-hover:text-black transition-all group-hover:translate-x-2 rotate-180" />
          Home
        </Link>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
