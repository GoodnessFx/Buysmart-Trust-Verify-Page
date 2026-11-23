import { useContent } from "../hooks/useContent";
import { MainButton, SecondaryButton } from "../components/TrustUI";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

function ContactPage() {
  const { data, loading } = useContent("contact");

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Contact & Quote</h2>
            <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] mb-8">
              Get in touch with BuySmart Procurement Limited or request a quote for your procurement
              needs.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 text-[color:var(--primary-gold,_#C7961A)] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h7.375c.621 0 1.125-.504 1.125-1.125V9.75M4.5 15.75H2.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v1.5z"
                  />
                </svg>
                +234 810 013 0714
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 text-[color:var(--primary-gold,_#C7961A)] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19a2 2 0 00-2 -2H3m6 0a2 2 0 00-2-2H5m14 0a2 2 0 00-2-2h-2.86a2 2 0 00-1.71.92l-5.43 3.59a2 2 0 00-.33 1.95l.1 7.38a2 2 0 001.66.44H19.5m-7.5 0a2 2 0 01-2-2V5a2 2 0 012-2h1v7.93l-1.15.74a1.998 1.998 0 00-.16 1.65l7.3 4.73a1.998 1.998 0 001.63 0l7.3-4.73a1.998 1.998 0 00-.16 1.65l-1.15.74V19z"
                  />
                </svg>
                buysmartprocurementlimited@gmail.com
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 text-[color:var(--primary-gold,_#C7961A)] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                6 Bassey Street, Egbeda, Lagos 100276, Nigeria
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-4">
              Request a Quote
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:ring-2 focus:ring-[color:var(--primary-gold,_#C7961A)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:ring-2 focus:ring-[color:var(--primary-gold,_#C7961A)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-2">
                  Item Link or Description
                </label>
                <textarea
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:ring-2 focus:ring-[color:var(--primary-gold,_#C7961A)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--primary-charcoal,_#0D0D0D)] mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:ring-2 focus:ring-[color:var(--primary-gold,_#C7961A)]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[color:var(--primary-gold,_#C7961A)] text-[color:var(--primary-charcoal,_#0D0D0D)] font-medium py-2 px-4 rounded hover:opacity-90 transition-colors"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
