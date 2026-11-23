import React from "react";

export const Logo = () => {
  return <div className="w-12 h-12 bg-gray-800 rounded-flex items-center justify-center text-white font-bold text-xl">B</div>;
};

export const Tagline = ({ text }: { text: string }) => {
  return <p className="mt-2 text-gray-300 text-sm">{text}</p>;
};

export const MainButton = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  return (
    <a
      href={href}
      className="inline-block bg-yellow-500 text-gray-900 font-medium hover:opacity-90 text-sm py-2 px-4 rounded"
    >
      {children}
    </a>
  );
};

export const SecondaryButton = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  return (
    <a
      href={href}
      className="inline-block border-2 border-yellow-500 text-gray-900 font-medium hover:bg-yellow-500 hover:text-white text-sm py-2 px-4 rounded transition-colors"
    >
      {children}
    </a>
  );
};

export const Footer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <footer className="bg-gray-900 text-white py-8">{children}</footer>;
};

export const ShareButton = ({ url }: { url: string }) => {
  return (
    <button
      onClick={() => navigator.clipboard && navigator.clipboard.writeText(url)}
      className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded hover:bg-opacity-90 transition-colors"
      title="Share page URL">
      Share
    </button>
  );
};

export const QRCode = ({ url }: { url: string }) => {
  return <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center text-sm">QR</div>;
};