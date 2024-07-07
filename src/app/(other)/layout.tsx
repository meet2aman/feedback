import { Metadata } from "next";
import Header_1 from "@/components/main/Header_1";
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
      <Header_1 />
      {children}
    </main>
  );
};
export default RootLayout;
