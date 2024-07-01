"use client";

import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button, buttonVariants } from "~/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "~/hooks/use-current-user";

const MobileNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useCurrentUser();
  const router = useRouter();

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
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger
          className={buttonVariants({
            variant: "reverse",
            size: "icon",
            className: cn(
              scrolled
                ? "dark:text-primary text-black"
                : "bg-primary text-white hover:bg-gray-400 hover:text-black dark:bg-slate-900 dark:text-white",
            ),
          })}
        >
          <HamburgerMenuIcon
            className={cn(
              scrolled
                ? "dark:text-primary text-black"
                : " text-white dark:text-white",
            )}
          />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="text-start">
            <SheetTitle>
              <Link href={"/"} className="flex flex-row items-center gap-2">
                {/* Logo */}
                <h2 className="text-2xl font-bold text-text dark:text-darkText">
                  ShootYourShot
                </h2>
              </Link>
            </SheetTitle>
            <SheetDescription className="">
              GenZ dating platform.
            </SheetDescription>
          </SheetHeader>
          <ul className="mt-10">
            <li>
              <Link href={"/"} className={buttonVariants({ variant: "link" })}>
                Home &rarr;
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className={buttonVariants({ variant: "link" })}
              >
                About Us &rarr;
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={buttonVariants({ variant: "link" })}
              >
                Contact Us &rarr;
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Dashboard &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/profile"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Profile &rarr;
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={"/auth/login"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Sign In &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/auth/register"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Sign Up &rarr;
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <SheetFooter className="mt-20 w-full">
              <SheetClose>
                <Button variant={"neutral"} className="flex-1 gap-2">
                  <ExitIcon />
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
