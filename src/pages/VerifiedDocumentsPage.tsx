import { MainButton, SecondaryButton } from "../components/TrustUI";

export default function VerifiedDocumentsPage({ pageData }: { pageData: any }) {
  const cards = pageData?.cards || [
    {
      id: "A",
      title: "CAC Certificate of Incorporation",
      badge: "Verified",
      badgeColor: "gold",
      file: "/documents/CAC-Certificate.pdf",
      status: "pending"
    },
    {
      id: "B",
      title: "CAC Company Registration Details",
      badge: "Verified",
      badgeColor: "gold",
      file: "/documents/CAC-Registration.pdf",
      status: "pending"
    },
    {
      id: "C",
      title: "Tax Registration (TIN)",
      badge: "Pending",
      badgeColor: "silver",
      file: "/documents/Tax-Certificate.pdf",
      status: "pending"
    },
    {
      id: "D",
      title: "Procurement and Payment Policy",
      badge: "Verified",
      badgeColor: "gold",
      file: "/documents/Procurement-Policy.pdf",
      viewOnly: true
    },
    {
      id: "E",
      title: "Shipping and Delivery Policy",
      badge: "Verified",
      badgeColor: "gold",
      file: "/documents/Shipping-Policy.pdf",
      viewOnly: true
    },
    {
      id: "F",
      title: "Returns and Refund Policy",
      badge: "Verified",
      badgeColor: "gold",
      file: "/documents/Returns-Policy.pdf",
      viewOnly: true
    },
    {
      id: "G",
      title: "Customer Registration Policy",
      badge: "Verified",
      badgeColor: "gold",
      file: "/documents/Registration-Policy.pdf",
      viewOnly: true
    }
  ];

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Verify us in 30 seconds
      </h2>
      <p className="text-[color:var(--primary-charcoal,_#0D0D0D)] text-lg mb-8">
        BuySmart Procurement Limited is verified and registered with the Corporate Affairs Commission (CAC) of Nigeria. All documents are authentic and up-to-date.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-lg mb-1">{card.title}</h3>
                {card.badge && (
                  <span
                    className="inline-block px-2 py-1 text-xs font-medium rounded bg-primaryGold/20 text-primaryGold"
                    >
                    {card.badge}
                  </span>
                )}
              </div>
              {card.viewOnly ? (
                <SecondaryButton href={card.file || "#"} className="text-sm">
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
    </div>
  );
}