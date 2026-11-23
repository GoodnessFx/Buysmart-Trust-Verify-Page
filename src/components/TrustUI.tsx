import React from "react";

type ButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export const Logo = ({ size = "lg" }: { size?: "lg" | "xl" }) => {
  const sizeClasses = size === "xl" ? "w-16 h-16 text-xl" : "w-12 h-12 text-base";

  return (
    <div
      className={`${sizeClasses} bg-[color:var(--primary-gold,_#C7961A)] rounded-md flex items-center justify-center text-[color:var(--primary-charcoal,_#0D0D0D)] font-bold`}
    >
      B
    </div>
  );
};

export const Tagline = ({ text }: { text: string }) => {
  return <p className="mt-2 text-[color:var(--primary-charcoal,_#0D0D0D)] text-sm">{text}</p>;
};

export const MainButton = ({ children, href, className, ...props }: ButtonProps) => {
  return (
    <a
      href={href}
      className={`inline-block bg-[color:var(--primary-gold,_#C7961A)] text-[color:var(--primary-charcoal,_#0D0D0D)] font-medium hover:opacity-90 text-sm py-2 px-4 rounded transition-colors ${className || ""}`}
      {...props}
    >
      {children}
    </a>
  );
};

export const SecondaryButton = ({ children, href, className, ...props }: ButtonProps) => {
  return (
    <a
      href={href}
      className={`inline-block border-2 border-[color:var(--primary-gold,_#C7961A)] text-[color:var(--primary-charcoal,_#0D0D0D)] font-medium hover:bg-[color:var(--primary-gold,_#C7961A)] hover:text-white text-sm py-2 px-4 rounded transition-colors ${className || ""}`}
      {...props}
    >
      {children}
    </a>
  );
};

export const Footer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <footer
      className={`bg-[color:var(--fallback-canvas-color,_#161616)] text-white py-8 ${className || ""}`}
    >
      {children}
    </footer>
  );
};

export const ShareButton = ({ url }: { url: string }) => {
  return (
    <button
      onClick={() => navigator.clipboard && navigator.clipboard.writeText(url)}
      className="px-4 py-2 bg-[color:var(--primary-gold,_#C7961A)] text-[color:var(--primary-charcoal,_#0D0D0D)] font-medium rounded hover:bg-opacity-90 transition-colors"
      title="Share page URL"
    >
      Share
    </button>
  );
};

export const QRCode = ({ url }: { url: string }) => {
  // In a real implementation, this would use a QR code library
  // For now, show a placeholder
  return (
    <div className="w-20 h-20 bg-[color:var(--primary-white,_#FFFFFF)] rounded-md flex items-center justify-center text-sm">
      QR
    </div>
  );
};
