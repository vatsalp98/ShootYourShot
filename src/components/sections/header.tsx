import { Link } from "next-view-transitions";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <header className="inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-darkBg">
      <div className="w-container mx-auto max-w-full px-5 py-[110px] text-center lg:py-[150px]">
        <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
          ShootYourShot
        </h1>
        <p className="my-12 mt-8 text-lg font-semibold leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
          Create your unique love story with customizable profiles on our dating
          app!
          <br />
        </p>
        <Button
          size="lg"
          className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
          asChild
        >
          <Link href={"/auth/login"}>Get started</Link>
        </Button>
      </div>
    </header>
  );
}
