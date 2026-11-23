import { useContent } from "../hooks/useContent";
import { MainButton, SecondaryButton } from "../components/TrustUI";

function CompanyProfilePage() {
  const { data, loading } = useContent("companyProfile");

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg p-8 md:p-12 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                {data?.cards?.[0]?.title || "Company Profile"}
              </h2>
              {data?.cards?.[0]?.thumbnail && (
                <img
                  src={data?.cards?.[0]?.thumbnail}
                  alt={data?.cards?.[0]?.title || "Company profile"}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}
              {data?.cards?.[0]?.pdf && (
                <>
                  <MainButton
                    href={data?.cards?.[0]?.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 mb-4"
                  >
                    View
                  </MainButton>
                  <SecondaryButton
                    href={data?.cards?.[0]?.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3"
                    download>
                    Download
                  </SecondaryButton>
                </>
              )}
            </div>
            <div className="bg-white rounded-lg p-8 md:p-12 space-y-6">
              {data?.cards?.[1]?.title && (
                <h3 className="text-xl font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-4">
                  {data?.cards?.[1].title}
                </h3>
              )}
              {data?.cards?.[1]?.pdfs && (
                <div className="grid grid-cols-2 gap-4">
                  {data?.cards?.[1]?.pdfs?.map((pdf: string) => (
                    <div key={pdf} className="space-y-2">
                      <MainButton
                        href={pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 text-sm"
                      >
                        View
                      </MainButton>
                      <SecondaryButton
                        href={pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 text-sm"
                        download>
                        Download
                      </SecondaryButton>
                    </div>
                  ))}
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

export default CompanyProfilePage;