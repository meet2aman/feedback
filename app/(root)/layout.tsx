import { auth } from "@/auth";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Empower anonymity with our feedback webapp. Collect honest insights discreetly. Join us for transparent communication!",
  icons: {
    icon: "/feedback.svg",
  },
};
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log(session);
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
export default RootLayout;
