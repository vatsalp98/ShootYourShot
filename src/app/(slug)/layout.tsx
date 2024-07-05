import type { ReactNode } from "react";

export default function SlugLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="flex flex-col items-center justify-center py-10">
        {children}
      </section>
    </>
  );
}
