interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm text-text-secondary border border-border ${className}`}
    >
      {children}
    </span>
  );
}
