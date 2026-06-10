import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "@/components/shell/app-sidebar";
import { MobileNav } from "@/components/shell/mobile-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"><div className="flex"><AppSidebar /><main className="w-full min-w-0 pb-24 lg:pb-0"><header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl lg:px-8"><div><p className="text-sm font-semibold">StudentHub</p><p className="text-xs text-muted-foreground">Connect. Learn. Build.</p></div><UserButton afterSignOutUrl="/" /></header><div className="mx-auto max-w-7xl p-4 lg:p-8">{children}</div></main></div><MobileNav /></div>;
}
