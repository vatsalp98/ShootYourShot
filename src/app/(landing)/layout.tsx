import type { ReactNode } from "react";
import Footer from "~/components/footer";
import Nav from "~/components/nav";

export default async function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative flex min-h-screen flex-col">
        <Nav />
        <div className="flex-1 flex-grow">{children}</div>
        <Footer />
      </section>
    </>
  );
}
