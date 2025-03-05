import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import { Shield } from "lucide-react";

export default function Layout({ children }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const user = storage.getCurrentUser();

  const handleLogout = () => {
    storage.setCurrentUser(null);
    toast({
      title: "Logged out successfully",
      duration: 2000
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <Shield className="h-6 w-6" />
            <span>Police Portal</span>
          </Link>
          
          <nav className="flex items-center ml-auto gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/police-info">
                  <Button variant="ghost">Police Info</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
