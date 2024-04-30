import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Empower anonymity with our feedback webapp. Collect honest insights discreetly. Join us for transparent communication!",
  icons: {
    icon: "/feedback.svg",
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
export default RootLayout;
