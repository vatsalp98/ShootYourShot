"use client";

import { buttonVariants } from "~/components/ui/button";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import MaxWidthWrapper from "./max-witdh-wrapper";
import { ThemeSwitcher } from "./theme-switcher";
import { useCurrentSession } from "~/hooks/use-current-session";
import MobileNav from "./mobile-nav";
import { Link } from "next-view-transitions";
// import MobileNav from "./MobileNav";
// import UserDropdown from "./UserDropdown";
// import { useCurrentSession } from "~/hooks/use-current-session";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { session } = useCurrentSession();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Change 50 to whatever offset you prefer
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "h-18 dark:bg-background sticky inset-x-0 top-0 z-50 transition-colors duration-100",
        scrolled ? "text-primary bg-white shadow-lg" : "bg-primary text-white",
      )}
    >
      <MaxWidthWrapper>
        <header className="relative ">
          <div className="px-10">
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-8 flex lg:ml-0">
                <Link href="/" className="flex flex-row items-center gap-2">
                  <div
                    className="text-2xl font-bold text-text dark:text-darkText"
                    // className={cn(
                    //   "h-14 w-14 bg-contain bg-no-repeat",
                    //   scrolled
                    //     ? "bg-[url('/logo192.png')] "
                    //     : "bg-[url('/logo-white.png')]",
                    // )}
                  >
                    ShootYourShot
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
                  {/* Add more options if needed */}
                  {/* <ul className="flex flex-row gap-4">
                    <li>
                      <Link
                        href={"/"}
                        className={buttonVariants({ variant: "reverse" })}
                      >
                        Home
                      </Link>
                    </li>
                  </ul> */}

                  {session ? (
                    <></>
                  ) : (
                    <Link
                      href="/auth/register"
                      className={buttonVariants({
                        variant: "reverse",
                      })}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
