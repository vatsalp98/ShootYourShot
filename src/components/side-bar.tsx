import {
  GearIcon,
  HeartFilledIcon,
  HomeIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function SideBar() {
  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href={"/"}
          className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <HeartFilledIcon />
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <HomeIcon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/shots"
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <RocketIcon className="h-5 w-5" />
                <span className="sr-only">Shots</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Shots</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <GearIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  );
}
