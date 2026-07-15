import { Badge } from "@/public/components/ui/badge";

interface BadgeComponentProps {
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;
  className?: string;
  children: React.ReactNode;
}

const BadgeComponent = ({
  variant,
  className,
  children,
}: BadgeComponentProps) => {
  return (
    <Badge variant={variant} className={className}>
      {children}
    </Badge>
  );
};

export default BadgeComponent;
