import { cn } from "@/lib/utils";

interface CPFLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  collapsed?: boolean;
}

const CPFLogo = ({ className, size = "md", showText = true, collapsed = false }: CPFLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon */}
      <div className={cn(
        "relative rounded-xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center shadow-lg",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/20 before:to-accent/20 before:blur-xl",
        sizeClasses[size]
      )}>
        <svg
          viewBox="0 0 64 64"
          className={cn(
            "relative z-10",
            size === "sm" ? "w-5 h-5" : size === "md" ? "w-6 h-6" : "w-8 h-8"
          )}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern Financial Platform Icon */}
          {/* Background Circle with Gradient */}
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="url(#logoGradient)"
          />
          
          {/* Document Stack - Representing Bills/Securitization */}
          <g transform="translate(18, 20)">
            {/* Document 1 (Back) */}
            <rect
              x="0"
              y="4"
              width="16"
              height="20"
              rx="1.5"
              fill="white"
              opacity="0.4"
            />
            {/* Document 2 (Middle) */}
            <rect
              x="2"
              y="2"
              width="16"
              height="20"
              rx="1.5"
              fill="white"
              opacity="0.6"
            />
            {/* Document 3 (Front) */}
            <rect
              x="4"
              y="0"
              width="16"
              height="20"
              rx="1.5"
              fill="white"
            />
            
            {/* Lines on front document */}
            <line
              x1="7"
              y1="5"
              x2="17"
              y2="5"
              stroke="hsl(var(--primary))"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="9"
              x2="15"
              y2="9"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="13"
              x2="17"
              y2="13"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
          
          {/* Verification Checkmark Badge */}
          <circle
            cx="44"
            cy="20"
            r="7"
            fill="hsl(var(--accent))"
          />
          <path
            d="M41 20 L43.5 22.5 L47 17"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && !collapsed && (
        <div className="overflow-hidden">
          <h1 className="font-display text-lg font-bold text-foreground tracking-tight">
            CPF Platform
          </h1>
          <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
            Settlement System
          </p>
        </div>
      )}
    </div>
  );
};

export default CPFLogo;
