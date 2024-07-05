import {
  HamburgerMenuIcon,
  HomeIcon,
  RocketIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ThemeSwitcher } from "./theme-switcher";
import { Separator } from "./ui/separator";

export default function MobileNavAdmin() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="neutral" className="sm:hidden">
            <HamburgerMenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetHeader className="flex flex-col items-start justify-start">
            <SheetTitle>ShootYourShot</SheetTitle>
            <SheetDescription>Gen-Z dating platform.</SheetDescription>
          </SheetHeader>
          <Separator className="mt-6" />
          <nav className="grid gap-6 py-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
            >
              <HomeIcon className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/shots"
              className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
            >
              <RocketIcon className="h-5 w-5" />
              Shots
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
            >
              <GearIcon className="h-5 w-5" />
              Settings
            </Link>
          </nav>
          <Separator />
          <SheetFooter className="flex w-full flex-row justify-end pt-6">
            <ThemeSwitcher />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
