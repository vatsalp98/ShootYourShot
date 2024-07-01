"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        size={"icon"}
        variant={"reverse"}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        <SunIcon className="w500:h-4 w500:w-4 hidden h-6 w-6 stroke-text dark:inline" />
        <MoonIcon className="w500:h-4 w500:w-4 inline h-6 w-6 stroke-text dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
