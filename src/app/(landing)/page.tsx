import Footer from "~/components/footer";
import Pricing from "~/components/pricing";
import Community from "~/components/sections/community";
import Faq from "~/components/sections/faq";
import Features from "~/components/sections/features";
import Header from "~/components/sections/header";

export default async function Home() {
  return (
    <>
      <Header />
      <Features />
      <Community />
      <Faq />
      <Pricing />
    </>
  );
}
