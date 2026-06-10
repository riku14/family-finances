import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const isDark = theme === "dark";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": isDark ? "hsl(22 18% 16%)" : "hsl(0 0% 100%)",
          "--normal-text": isDark ? "hsl(38 40% 92%)" : "hsl(22 19% 24%)",
          "--normal-border": isDark ? "hsl(22 18% 22%)" : "hsl(32 30% 88%)",
          "--success-bg": isDark ? "hsl(142 35% 18%)" : "hsl(142 55% 95%)",
          "--success-text": isDark ? "hsl(142 55% 72%)" : "hsl(142 55% 25%)",
          "--success-border": isDark ? "hsl(142 35% 28%)" : "hsl(142 45% 75%)",
          "--error-bg": isDark ? "hsl(0 40% 18%)" : "hsl(0 80% 97%)",
          "--error-text": isDark ? "hsl(0 65% 72%)" : "hsl(0 65% 35%)",
          "--error-border": isDark ? "hsl(0 40% 28%)" : "hsl(0 65% 78%)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
