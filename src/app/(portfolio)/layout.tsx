import Footer from "@/src/components/footer";
import NavBar from "@/src/components/navbar";

export default function PortfolioLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
