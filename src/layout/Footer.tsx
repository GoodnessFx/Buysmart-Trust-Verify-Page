import { useNavigate } from "react-router-dom";

export function Footer({ onNavigate }: { onNavigate: (path: string) => void }) {
  const navigate = onNavigate;

  return (
    <footer className="bg-[color:var(--fallback-canvas-color,_#161616)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="w-12 h-12 bg-[color:var(--primary-gold,_#C7961A)] rounded-md flex items-center justify-center mb-4">
              B
            </div>
            <h3 className="text-xl font-bold text-[color:var(--primary-white,_#FFFFFF)] mb-2">BuySmart</h3>
            <p className="text-sm opacity-80">
              Smarter Sourcing, Stronger Businesses.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-[color:var(--primary-white,_#FFFFFF)] mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/verified-documents" className="text-sm opacity-80 hover:text-white transition-colors">
                  Verified Documents
                </a>
              </li>
              <li>
                <a href="/socials" className="text-sm opacity-80 hover:text-white transition-colors">
                  Verified Socials
                </a>
              </li>
              <li>
                <a href="/google-business" className="text-sm opacity-80 hover:text-white transition-colors">
                  Google Business
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-sm opacity-60">
          <p>
            {new Date().getFullYear()} BuySmart Procurement Limited. All rights reserved.
          </p>
          <p className="mt-2">
            RC Number: 9613952 | CAC Nigeria Registered
          </p>
        </div>
      </div>
    </footer>
  );
}