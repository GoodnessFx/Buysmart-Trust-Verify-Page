import { useContent } from "../hooks/useContent";
import { MainButton, SecondaryButton } from "../components/TrustUI";
import { schemaOrgOrganization } from "../lib/schema";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

function GoogleBusinessPage() {
  const { data, loading } = useContent("googleBusiness");

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {data?.title || "Google Business & Location"}
            </h2>
            <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-lg mb-8">
              {data?.description || "Find us on Google Maps and view our business profile."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                src={data?.mapUrl || "https://www.google.com/maps/embed?pb=!4v1689823456789!"}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Business Profile</h3>
                <MainButton
                  href={data?.businessProfile || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-lg"
                >
                  View Profile
                </MainButton>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Contact</h3>
                <p className="text-[color:var(--primary-charcoal,_#0D0D0D)]">
                  <strong>Phone:</strong> +234 810 013 0714
                </p>
                <p className="text-[color:var(--primary-charcoal,_#0D0D0D)]">
                  <strong>Address:</strong> 6 Bassey Street, Egbeda, Lagos 100276, Nigeria
                </p>
              </div>
              {data?.reviews && (
                <div>
                  <h3 className="font-medium text-lg mb-2">Reviews</h3>
                  <p className="text-[color:var(--primary-charcoal,_#0D0D0D)]">
                    {data?.reviews?.rating}/5.0 ({data?.reviews?.count} reviews)
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default GoogleBusinessPage;
