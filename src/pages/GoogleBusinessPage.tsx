import { MainButton, SecondaryButton } from "../components/TrustUI";

function GoogleBusinessPage({ pageData }: { pageData: any }) {
  const {
    title: title = "Google Business & Location",
    description: description = "Find us on Google Maps and view our business profile.",
    mapUrl: mapUrl = "https://www.google.com/maps/dir/?api=1&destination=6+Bassey+Street%2C+Egbeda%2C+Lagos+100276%2C+Nigeria",
    businessProfile: businessProfile = "https://business.google.com/buy-smart-procurement-limited",
    reviews: reviews = { count: 2, rating: 5.0 }
  } = {};

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-lg mb-8">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                src={mapUrl}
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Business Profile</h3>
                <MainButton
                  href={businessProfile}
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
              {reviews.count > 0 && (
                <div>
                  <h3 className="font-medium text-lg mb-2">Reviews</h3>
                  <p className="text-[color:var(--primary-charcoal,_#0D0D0D)]">
                    {reviews.rating}/5.0 ({reviews.count} reviews)
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