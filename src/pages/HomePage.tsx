import { MainButton } from "../components/TrustUI";

type HomePageProps = {
  pageData?: {
    tagline?: string;
    buttons?: Array<{ id?: string; label: string; href: string }>;
  };
};

function HomePage({ pageData }: HomePageProps) {
  const defaultData: NonNullable<HomePageProps["pageData"]> = {
    tagline: "Smarter Sourcing, Stronger Businesses.",
    buttons: [
      { label: "Verify Us", href: "/verified-documents" },
      { label: "Our Socials", href: "/socials" },
    ],
  };
  const data = pageData || defaultData;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <main className="max-w-7xl mx-auto py-12">
        <header className="text-center mb-12">
          <div className="w-24 h-24 bg-[color:var(--primary-gold,_#C7961A)] rounded-md flex items-center justify-center mx-auto mb-4">
            B
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">
            {data?.tagline || "Smarter Sourcing, Stronger Businesses."}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.buttons?.map((button) => (
            <MainButton
              key={button.id ?? button.href}
              href={button.href}
              className="py-3 px-6 text-lg"
            >
              {button.label}
            </MainButton>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
