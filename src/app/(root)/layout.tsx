import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";

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
