import { useContent } from "../hooks/useContent";
import { MainButton } from "../components/TrustUI";
import { schemaOrgOrganization } from "../lib/schema";

function VerifiedSocialsPage() {
  const { data, loading } = useContent("verifiedSocials");

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {data?.title || "Verified Social Media"}
            </h2>
            <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-lg mb-8">
              {data?.intro || "Connect with BuySmart Procurement Limited on official social platforms."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data?.platforms?.map((platform) => (
              <div
                key={platform.id}
                className="bg-white rounded-lg border border-border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: platform.color }}>
                  {platform.handle.charAt(0)}
                </div>
                <h3 className="font-medium text-lg mb-2">{platform.name}</h3>
                <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-sm">
                  {platform.handle}
                </p>
                <MainButton
                  href={platform.url}
                  className="mt-3 w-full py-2 text-sm"
                >
                  Open
                </MainButton>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default VerifiedSocialsPage;