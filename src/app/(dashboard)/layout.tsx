import type { ReactNode } from "react";
import SideBar from "~/components/side-bar";
import MobileNavAdmin from "~/components/admin-mobile-nav";
import UserDropdown from "~/components/user-dropdown";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="bg-muted/40 flex min-h-screen w-full flex-col">
        <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
          <SideBar />
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNavAdmin />
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            <UserDropdown />
          </header>
          <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </section>
    </>
  );
}
