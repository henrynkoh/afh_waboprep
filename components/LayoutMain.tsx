"use client";

import { usePathname } from "next/navigation";

export default function LayoutMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {children}
    </main>
  );
}
