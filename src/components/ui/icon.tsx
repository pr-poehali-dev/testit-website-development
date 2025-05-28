import React from "react";
import {
  Code,
  User,
  UserPlus,
  Users,
  Award,
  Clock,
  Filter,
  Star,
  HelpCircle,
  Play,
  CircleAlert,
} from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const iconMap = {
  Code,
  User,
  UserPlus,
  Users,
  Award,
  Clock,
  Filter,
  Star,
  HelpCircle,
  Play,
  CircleAlert,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  fallback = "CircleAlert",
}) => {
  const IconComponent =
    iconMap[name as keyof typeof iconMap] ||
    iconMap[fallback as keyof typeof iconMap];

  return <IconComponent size={size} className={className} />;
};

export default Icon;
