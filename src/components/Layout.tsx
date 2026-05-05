import { Header } from "./Header";
import { Footer } from "./Footer";
import { AgeGate } from "./AgeGate";
import { WhatsAppFab } from "./WhatsAppFab";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AgeGate />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
