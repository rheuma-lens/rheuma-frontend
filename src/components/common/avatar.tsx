import { Avatar as AvatarPrimitive, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppAvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

export const AppAvatar = ({ name, src, size = "md" }: AppAvatarProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AvatarPrimitive className={sizeClasses[size]}>
      {src ? <AvatarImage src={src} alt={name} /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </AvatarPrimitive>
  );
};
