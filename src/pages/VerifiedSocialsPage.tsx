import { MainButton } from "../components/TrustUI";

function VerifiedSocialsPage() {
  const platforms = [
    { id: "instagram", name: "Instagram", handle: "@buysmartprocurementltd", url: "https://www.instagram.com/buysmartprocurementltd/", color: "#E1306C" },
    { id: "facebook", name: "Facebook", handle: "@buysmartprocurementltd", url: "https://www.facebook.com/buysmartprocurementltd", color: "#1877F2" },
    { id: "linkedin", name: "LinkedIn", handle: "@buysmartprocurementltd", url: "https://www.linkedin.com/company/buysmartprocurementltd", color: "#0077B5" },
    { id: "tiktok", name: "TikTok", handle: "@buysmartprocurementltd", url: "https://www.tiktok.com/@buysmartprocurementltd", color: "#010101" }
  ];

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Verified Social Media</h2>
            <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-lg mb-8">
              Connect with BuySmart Procurement Limited on official social platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
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
    </div>
  );
}

export default VerifiedSocialsPage;