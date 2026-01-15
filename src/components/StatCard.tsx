import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  const variantStyles = {
    default: 'from-primary/20 to-primary/5',
    accent: 'from-accent/20 to-accent/5',
    success: 'from-success/20 to-success/5',
    warning: 'from-warning/20 to-warning/5',
  };

  const iconStyles = {
    default: 'bg-primary/20 text-primary',
    accent: 'bg-accent/20 text-accent',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
  };

  return (
    <div className="stat-card group hover:scale-[1.02] transition-transform duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${variantStyles[variant]} opacity-50 rounded-xl`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${iconStyles[variant]}`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              trend.isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
          {value}
        </h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground/70 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
