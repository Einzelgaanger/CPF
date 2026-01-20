import { Bell, User } from "lucide-react";
import RSOLogo from "@/components/RSOLogo";

const Header = () => {
  return (
    <header className="glass-card border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <RSOLogo size="md" />

          <nav className="hidden md:flex items-center gap-6">
            <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Overview
            </a>
            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Workflow
            </a>
            <a href="#bills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Bills
            </a>
            <a href="#analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
