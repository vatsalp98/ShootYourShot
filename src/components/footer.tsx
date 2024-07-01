import { ThemeSwitcher } from "./theme-switcher";

export default function Footer() {
  return (
    <footer className="m500:text-sm z-30 flex w-full flex-row items-center justify-between bg-white px-6 py-5 text-center font-base dark:bg-darkBg">
      <span>
        &copy; Shootyourshot {new Date().getFullYear()}, All rights Reserved.
      </span>
      <ThemeSwitcher />
    </footer>
  );
}
