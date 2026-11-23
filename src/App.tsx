import { useEffect, useRef, useState, type ReactNode } from "react";
import content from "./content.json";

type IconName =
  | "arrow"
  | "building"
  | "check"
  | "copy"
  | "document"
  | "download"
  | "globe"
  | "location"
  | "mail"
  | "phone"
  | "people"
  | "policy"
  | "share"
  | "shield";

type DocumentEntry = (typeof content.documents)[number];

const icons: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  building: (
    <>
      <path d="M4 21h16M6 21V7l6-4 6 4v14" />
      <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01M9 18h.01M15 18h.01" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </>
  ),
  document: (
    <>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v5h5M9 13h6M9 17h6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-4-4 4 4 4-4M5 21h14" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 1-1 2-2 2C9.7 20.5 3.5 14.3 3 6c0-1 1-2 2-2Z" />
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="10" r="2" />
      <path d="M3 20c0-4 2.5-7 6-7s6 3 6 7M15 15c3 0 5 2 5 5" />
    </>
  ),
  policy: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {icons[name]}
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <img src="/images/buysmart-mark.webp" alt="" className="brand__mark" />
      <div>
        <span className="brand__name">BuySmart</span>
        <span className="brand__wordmark">PROCUREMENT LIMITED</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="#/" aria-label="BuySmart Trust home">
        <Brand compact />
      </a>
      <div className="trust-label">
        <Icon name="shield" size={16} />
        <span>Official verification centre</span>
      </div>
    </header>
  );
}

function Footer() {
  const [shared, setShared] = useState(false);

  async function sharePage() {
    const shareData = {
      title: "BuySmart Trust Page",
      text: "BuySmart Procurement Limited — official documents and links.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
      }
    } catch {
      // Closing the native share sheet is not an error the visitor needs to see.
    }
  }

  return (
    <footer className="footer">
      <span>Last updated {content.site.lastUpdated}</span>
      <button className="text-button" type="button" onClick={sharePage}>
        <Icon name="share" size={17} />
        {shared ? "Link copied" : "Share this page"}
      </button>
    </footer>
  );
}

function HomePage() {
  const links: Array<{
    label: string;
    detail: string;
    icon: IconName;
    href: string;
    external?: boolean;
  }> = [
    {
      label: "Website",
      detail: "Visit our official website",
      icon: "globe",
      href: content.links.website,
      external: true,
    },
    {
      label: "Verified Documents",
      detail: "Company records and official checks",
      icon: "document",
      href: "#/documents",
    },
    {
      label: "Verified Socials",
      detail: "Official accounts",
      icon: "people",
      href: "#/socials",
    },
    {
      label: "Google Business and Location",
      detail: "Find our Lagos office",
      icon: "location",
      href: "#/location",
    },
    {
      label: "Company Profile",
      detail: "Who we are and what we do",
      icon: "building",
      href: "#/documents/profile",
    },
    {
      label: "Policies and Terms",
      detail: "Payments, refunds and delivery",
      icon: "policy",
      href: "#/documents/policy",
    },
    {
      label: "Contact and Request a Quote",
      detail: "Speak with our team",
      icon: "mail",
      href: "#/contact",
    },
  ];

  return (
    <main className="page home-page">
      <Header />
      <section className="hero">
        <Brand />
        <p className="eyebrow">BuySmart Trust Page</p>
        <h1>
          Verify BuySmart
          <br />
          with confidence.
        </h1>
        <p className="hero-company">{content.site.companyName}</p>
        <p className="tagline">{content.site.tagline}</p>
        <div className="registration-badge">
          <Icon name="building" size={17} />
          <span>Registered with CAC Nigeria, RC {content.site.registrationNumber}</span>
          <a href={content.links.cacSearch} target="_blank" rel="noreferrer">
            Verify
          </a>
        </div>
      </section>

      <section className="trust-intro">
        <span className="trust-intro__icon">
          <Icon name="shield" size={26} />
        </span>
        <div>
          <p className="eyebrow">Before you transact</p>
          <h2>Check the company. Open the source. Compare the details.</h2>
          <p>
            Use this official hub to review our public documents and open the independent source
            whenever one is available.
          </p>
        </div>
      </section>

      <section className="quick-verify" aria-labelledby="quick-verify-title">
        <div className="quick-verify__heading">
          <span className="quick-verify__icon">
            <Icon name="shield" size={24} />
          </span>
          <div>
            <p className="eyebrow">Official verification</p>
            <h2 id="quick-verify-title">Verify BuySmart in 3 clear steps</h2>
          </div>
        </div>
        <ol className="quick-verify__steps">
          <li>
            <span>1</span>
            <div>
              <strong>Copy the exact company details</strong>
              <div className="copy-grid quick-verify__copy">
                <CopyButton value={content.site.companyName} />
                <CopyButton value={content.site.registrationNumber} />
              </div>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <strong>Open the official CAC search</strong>
              <p>
                Use{" "}
                <a href={content.links.cacSearch} target="_blank" rel="noreferrer">
                  search.cac.gov.ng
                </a>{" "}
                — the independent government source.
              </p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <strong>Compare before you transact</strong>
              <p>Match the company name, RC number, status and incorporation date.</p>
            </div>
          </li>
        </ol>
        <div className="quick-verify__actions">
          <a
            className="button button--gold"
            href={content.links.cacSearch}
            target="_blank"
            rel="noreferrer"
          >
            Open official CAC verification <Icon name="arrow" size={17} />
          </a>
          <VerificationCheck label="I compared the details" />
        </div>
      </section>

      <nav aria-label="BuySmart links" className="link-list">
        {links.map((link) => (
          <a
            className="link-card"
            href={link.href}
            key={link.label}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
          >
            <span className="link-card__icon">
              <Icon name={link.icon} />
            </span>
            <span className="link-card__copy">
              <strong>{link.label}</strong>
              <small>{link.detail}</small>
            </span>
            <Icon name="arrow" />
          </a>
        ))}
      </nav>
      <Footer />
    </main>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // The displayed value can still be selected and copied manually.
    }
  }

  return (
    <button className="copy-button" onClick={copy} type="button">
      <span>{value}</span>
      <span className="copy-button__action">
        <Icon name="copy" size={16} />
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

function VerificationCheck({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  function markChecked() {
    setChecked(true);
    setShowToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 4500);
  }

  return (
    <div className="verification-check">
      <button
        className={`verification-check__button ${checked ? "is-complete" : ""}`}
        type="button"
        onClick={markChecked}
        aria-pressed={checked}
      >
        <Icon name={checked ? "check" : "shield"} size={18} />
        {checked ? "Details compared" : label}
      </button>
      {showToast && (
        <div className="verification-toast" role="status" aria-live="polite">
          <span className="verification-toast__tick">
            <Icon name="check" size={34} />
          </span>
          <div>
            <strong>Verification check complete</strong>
            <p>You compared the details. Keep using the official source before you transact.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentCard({ document }: { document: DocumentEntry }) {
  return (
    <article
      className={`document-card ${document.status === "pending" ? "document-card--pending" : ""}`}
      id={document.id}
    >
      {document.thumbnail ? (
        <div className="document-preview">
          <img className="document-preview__watermark" src="/images/buysmart-mark.webp" alt="" />
          <img src={document.thumbnail} alt={`First page of ${document.title}`} loading="lazy" />
          <span className="page-count">{document.pages} pages</span>
        </div>
      ) : (
        <div className="document-placeholder">
          <Icon name="document" size={30} />
          <span>FILE PENDING</span>
        </div>
      )}
      <div className="document-card__body">
        <div className="badge-row">
          <span className={`status-badge ${document.officialUrl ? "status-badge--official" : ""}`}>
            {document.officialUrl ? "Verify on official site" : "Company document"}
          </span>
          {document.status === "pending" && <span className="pending-badge">File pending</span>}
        </div>
        <h2>{document.title}</h2>
        <p className="document-purpose">{document.purpose}</p>
        {document.details.length > 0 && (
          <dl className="document-details">
            {document.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {document.notice && <p className="document-notice">{document.notice}</p>}
        <div className="verification-guide">
          <div className="verification-guide__title">
            <Icon name="shield" size={18} />
            <strong>How to verify this document</strong>
          </div>
          {document.officialUrl ? (
            <ul className="verification-guide__list">
              <li>
                <strong>Open the official CAC search.</strong>
              </li>
              <li>
                <strong>Search:</strong> {content.site.companyName} or RC{" "}
                {content.site.registrationNumber}.
              </li>
              <li>
                <strong>Compare:</strong> name, RC number, status and date.
              </li>
            </ul>
          ) : document.file ? (
            <ul className="verification-guide__list">
              <li>
                <strong>Open the PDF above.</strong>
              </li>
              <li>
                <strong>Confirm via the official website.</strong>
              </li>
              <li>
                <strong>Match:</strong> company name, RC number and contact details.
              </li>
            </ul>
          ) : (
            <p>
              <strong>Not yet verifiable.</strong> No public file or official source has been
              supplied. Do not treat this record as verified.
            </p>
          )}
        </div>
        <div className="file-meta">
          <span>Last updated {document.lastUpdated}</span>
          {document.fileSize && <span>{document.fileSize}</span>}
        </div>
        <div className="document-actions">
          {document.file && (
            <>
              <a
                className="button button--gold"
                href={document.file}
                target="_blank"
                rel="noreferrer"
              >
                View <Icon name="arrow" size={17} />
              </a>
              <a className="button button--secondary" href={document.file} download>
                <Icon name="download" size={17} /> Download
              </a>
            </>
          )}
          {document.officialUrl && (
            <a
              className="button button--secondary button--full"
              href={document.officialUrl}
              target="_blank"
              rel="noreferrer"
            >
              Verify on official site <Icon name="arrow" size={17} />
            </a>
          )}
          {!document.officialUrl && document.file && (
            <a
              className="button button--secondary button--full"
              href={content.links.website}
              target="_blank"
              rel="noreferrer"
            >
              Confirm via official website <Icon name="arrow" size={17} />
            </a>
          )}
        </div>
        {(document.officialUrl || document.file) && (
          <VerificationCheck
            label={
              document.officialUrl ? "I compared the official record" : "I confirmed this document"
            }
          />
        )}
      </div>
    </article>
  );
}

function DocumentsPage({ focus }: { focus?: string }) {
  const documents = focus
    ? content.documents.filter((document) => document.id === focus)
    : content.documents;

  return (
    <main className="page documents-page">
      <Header />
      <div className="page-heading">
        <p className="eyebrow">Trust centre</p>
        <h1>{focus ? documents[0]?.title : "Company documents"}</h1>
        <p>
          {focus
            ? documents[0]?.purpose
            : "Review our public company documents and independently check the records that have an official source."}
        </p>
      </div>

      {!focus && (
        <section className="verify-box">
          <div className="verify-box__heading">
            <span>30 sec</span>
            <div>
              <p className="eyebrow">Independent check</p>
              <h2>Verify us in 30 seconds</h2>
            </div>
          </div>
          <ol>
            <li>
              <div className="step-number">1</div>
              <div>
                <strong>Copy our name or RC number</strong>
                <div className="copy-grid">
                  <CopyButton value={content.site.companyName} />
                  <CopyButton value={content.site.registrationNumber} />
                </div>
              </div>
            </li>
            <li>
              <div className="step-number">2</div>
              <div>
                <strong>Open the official CAC public search</strong>
                <p>
                  Search on{" "}
                  <a href={content.links.cacSearch} target="_blank" rel="noreferrer">
                    search.cac.gov.ng
                  </a>
                  . If unavailable, visit{" "}
                  <a href={content.links.cacWebsite} target="_blank" rel="noreferrer">
                    cac.gov.ng
                  </a>{" "}
                  and choose Public Search.
                </p>
              </div>
            </li>
            <li>
              <div className="step-number">3</div>
              <div>
                <strong>Compare the details</strong>
                <p>
                  Check the registered name, RC number, company status and incorporation date
                  against this page.
                </p>
              </div>
            </li>
          </ol>
          <VerificationCheck label="I compared the official record" />
        </section>
      )}

      <section className="documents-list" aria-label="Company documents">
        {documents.map((document) => (
          <DocumentCard document={document} key={document.id} />
        ))}
      </section>

      {!focus && (
        <aside className="safety-note">
          <Icon name="policy" size={23} />
          <p>
            We publish only business documents intended for public viewing. Client invoices,
            receipts and private records are never listed here.
          </p>
        </aside>
      )}
      <Footer />
    </main>
  );
}

function StandardPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="page">
      <Header />
      <div className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
      <Footer />
    </main>
  );
}

function SocialsPage() {
  return (
    <StandardPage
      eyebrow="Official channels"
      title="Verified socials"
      description="Open our accounts from this page and compare the handle before you follow, message or transact."
    >
      <section className="channel-list">
        {content.socials.map((social) => (
          <article className="channel-card" key={social.platform}>
            <span className="channel-card__icon">
              <Icon name="people" />
            </span>
            <div>
              <p className="eyebrow">{social.platform}</p>
              <h2>{social.handle}</h2>
              <p>Our official accounts are listed here and on our website footer.</p>
            </div>
            <a className="button button--gold" href={social.url} target="_blank" rel="noreferrer">
              Open <Icon name="arrow" size={17} />
            </a>
          </article>
        ))}
      </section>
      <aside className="safety-note safety-note--gold">
        <Icon name="shield" size={23} />
        <p>
          <strong>Safety check:</strong> compare the full handle exactly. We will never ask you to
          send passwords, PINs or one-time codes through social media.
        </p>
      </aside>
    </StandardPage>
  );
}

function LocationPage() {
  return (
    <StandardPage
      eyebrow="Location"
      title="Find BuySmart"
      description="Use the directions link below to navigate to the address supplied by BuySmart Procurement Limited."
    >
      <section className="contact-panel">
        <span className="contact-panel__icon">
          <Icon name="location" size={28} />
        </span>
        <p className="eyebrow">Head office</p>
        <h2>{content.contact.address}</h2>
        <p>{content.contact.hours}</p>
        <div className="contact-actions">
          <a
            className="button button--gold"
            href={content.links.directions}
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps directions <Icon name="arrow" size={17} />
          </a>
          <a
            className="button button--secondary"
            href={content.googleBusiness.link}
            target="_blank"
            rel="noreferrer"
          >
            Open Google Business Profile <Icon name="arrow" size={17} />
          </a>
        </div>
      </section>
    </StandardPage>
  );
}

function ContactPage() {
  return (
    <StandardPage
      eyebrow="Direct contact"
      title="Contact and request a quote"
      description="Use these official details to speak with the BuySmart team. Compare them with the company website before making a payment."
    >
      <section className="contact-panel">
        <span className="contact-panel__icon">
          <Icon name="mail" size={28} />
        </span>
        <p className="eyebrow">Official BuySmart contacts</p>
        <h2>How can we help?</h2>
        <div className="contact-actions">
          <a
            className="button button--gold"
            href={content.links.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Request a quote on WhatsApp
          </a>
          <a className="button button--secondary" href={content.links.phone}>
            <Icon name="phone" size={17} /> Call {content.contact.phone}
          </a>
          <a className="button button--secondary" href={content.links.email}>
            <Icon name="mail" size={17} /> Email BuySmart
          </a>
          <a
            className="button button--secondary"
            href={content.links.directions}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="location" size={17} /> Get directions
          </a>
        </div>
        <dl className="contact-details">
          <div>
            <dt>Email</dt>
            <dd>{content.contact.email}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{content.contact.address}</dd>
          </div>
        </dl>
      </section>
    </StandardPage>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      "#/documents": "Company Documents | BuySmart Trust Page",
      "#/documents/profile": "Company Profile | BuySmart Trust Page",
      "#/documents/policy": "Policies and Terms | BuySmart Trust Page",
      "#/socials": "Verified Socials | BuySmart Trust Page",
      "#/location": "Location | BuySmart Trust Page",
      "#/contact": "Contact | BuySmart Trust Page",
    };
    document.title = titles[route] || "BuySmart Trust Page";
  }, [route]);

  if (route === "#/documents/profile") return <DocumentsPage focus="profile" />;
  if (route === "#/documents/policy") return <DocumentsPage focus="policy" />;
  if (route.startsWith("#/documents")) return <DocumentsPage />;
  if (route === "#/socials") return <SocialsPage />;
  if (route === "#/location") return <LocationPage />;
  if (route === "#/contact") return <ContactPage />;
  return <HomePage />;
}
