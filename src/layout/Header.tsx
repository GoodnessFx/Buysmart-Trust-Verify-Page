import { Logo, MainButton, SecondaryButton } from "../components/TrustUI";

export function Header({ currentPath, onNavigate, onRequestQuote }: {
  currentPath: string;
  onNavigate: (path: string) => void;
  onRequestQuote?: () => void;
}) {
  const navigate = onNavigate;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xl font-bold text-[color:var(--primary-charcoal,_#0D0D0D)]">
            BuySmart
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => navigate("/")} className="text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] hover:underline">
            Home
          </button>
          <button onClick={() => navigate("/verified-documents")} className="text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] hover:underline">
            Verified Documents
          </button>
          <button onClick={() => navigate("/socials")} className="text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] hover:underline">
            Verified Socials
          </button>
          <button onClick={() => navigate("/google-business")} className="text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] hover:underline">
            Google Business
          </button>
        </nav>
        <div className="flex items-center gap-3">
          {onRequestQuote && (
            <MainButton onClick={onRequestQuote} className="py-2 px-4">
              Request Quote
            </MainButton>
          )}
        </div>
      </div>
    </header>
  );
}