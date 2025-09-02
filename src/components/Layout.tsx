import { Header } from "./Header";
import { ChatWidget } from "./ChatWidget";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background security-pattern">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}