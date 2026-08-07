import {
  Activity,
  Home,
  Settings,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    disabled: true,
  },
  {
    title: "Upload",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Results",
    href: "/results",
    icon: Activity,
    disabled: true,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    disabled: true,
  },
];
