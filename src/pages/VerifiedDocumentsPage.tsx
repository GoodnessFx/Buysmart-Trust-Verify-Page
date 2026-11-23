import { useContent } from "../hooks/useContent";
import { MainButton, SecondaryButton } from "../components/TrustUI";
import { schemaOrgOrganization } from "../lib/schema";

function VerifiedDocumentsPage() {
  const { data, loading } = useContent("verifiedDocuments");

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {data?.title || "Verify us in 30 seconds"}
            </h2>
            <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-lg mb-8">
              {data?.intro || "BuySmart Procurement Limited is verified and registered with the Corporate Affairs Commission (CAC) of Nigeria. All documents are authentic and up-to-date."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.cards?.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{card.title}</h3>
                    {card.badge && (
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${card.badgeColor === "gold" ? "bg-[color:var(--primary-gold,_#C7961A)] text-[color:var(--primary-charcoal,_#0D0D0D)]" : card.badgeColor === "silver" ? "bg-[color:var(--primary-silver,_#E5E7EB)] text-[color:var(--primary-charcoal)]" : ""}`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                  {card.viewOnly ? (
                    <SecondaryButton href={card.href || `#${card.id}`} className="text-sm">
                      View
                    </SecondaryButton>
                  ) : (
                    <>
                      <MainButton href={card.file || "#"} className="text-sm">
                        View
                      </MainButton>
                      <MainButton
                        href={card.download || "#"}
                        className="ml-2 text-sm hidden"
                        download>
                        Download
                      </MainButton>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default VerifiedDocumentsPage;