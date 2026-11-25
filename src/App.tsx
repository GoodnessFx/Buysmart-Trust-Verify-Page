import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import content from "./content.json";

const brandMarkUrl = `${import.meta.env.BASE_URL}images/buysmart-mark.webp`;
const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

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
type TourContextValue = { startTour: () => void };

const TourContext = createContext<TourContextValue | null>(null);
const splashStorageKey = "buysmart-trust-splash-seen";
const tourStorageKey = "buysmart-trust-tour-seen";

function useTour() {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used within TourContext");
  return context;
}

function readSessionFlag(key: string) {
  try {
    return window.sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string, value: boolean) {
  try {
    if (value) window.sessionStorage.setItem(key, "true");
    else window.sessionStorage.removeItem(key);
    return true;
  } catch {
    // The page still works when browser storage is unavailable.
    return false;
  }
}

function getUrlHost(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function isCacSource(document: DocumentEntry) {
  const host = getUrlHost(document.officialUrl);
  return host === "icrp.cac.gov.ng" || host === "search.cac.gov.ng";
}

const cacSearchHost = getUrlHost(content.links.cacSearch);

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

function OfficialSourceLogos({ className = "" }: { className?: string }) {
  return (
    <div
      className={`official-logos ${className}`.trim()}
      role="group"
      aria-label="Official CAC and NRS verification sources"
    >
      <span>
        <img
          className="official-logos__mark official-logos__mark--cac"
          src={content.links.cacLogo}
          alt="CAC logo"
        />
        <small>CAC</small>
      </span>
      <span>
        <img
          className="official-logos__mark official-logos__mark--nrs"
          src={content.links.nrsLogo}
          alt="NRS logo"
        />
        <small>NRS</small>
      </span>
    </div>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const enterButton = useRef<HTMLButtonElement>(null);
  const exitTimer = useRef<number | null>(null);
  const finishing = useRef(false);

  const finish = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    setLeaving(true);
    exitTimer.current = window.setTimeout(onComplete, 300);
  }, [onComplete]);

  useEffect(() => {
    enterButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, [finish]);

  return (
    <div
      className={`splash ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-title"
      aria-describedby="splash-description"
    >
      <div className="splash__content">
        <img className="splash__mark" src={brandMarkUrl} alt="BuySmart logo" />
        <h1 id="splash-title">BuySmart</h1>
        <p id="splash-description">Official trust centre</p>
        <OfficialSourceLogos className="splash__official-logos" />
        <button className="splash__enter" type="button" onClick={finish} ref={enterButton}>
          Start tour <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <img src={brandMarkUrl} alt="" className="brand__mark" />
      <div>
        <span className="brand__name">BuySmart</span>
        <span className="brand__wordmark">PROCUREMENT LIMITED</span>
      </div>
    </div>
  );
}

function Header() {
  const { startTour } = useTour();

  return (
    <header className="site-header">
      <a href="#/" aria-label="BuySmart Trust home">
        <Brand compact />
      </a>
      <div className="header-actions">
        <button className="tour-button" type="button" onClick={startTour} aria-label="Take a tour">
          <Icon name="globe" size={16} />
          <span>Take a tour</span>
        </button>
        <div className="trust-label">
          <Icon name="shield" size={16} />
          <span>Official verification centre</span>
        </div>
      </div>
    </header>
  );
}

function TourPrompt() {
  const { startTour } = useTour();

  return (
    <button className="tour-prompt" type="button" onClick={startTour}>
      <span className="tour-prompt__icon">
        <Icon name="globe" size={20} />
      </span>
      <span className="tour-prompt__copy">
        <strong>New here?</strong>
        <small>Take the short walkthrough</small>
      </span>
      <Icon name="arrow" size={18} />
    </button>
  );
}

function GuidedTour({
  open,
  route,
  stepIndex,
  onStepChange,
  onClose,
}: {
  open: boolean;
  route: string;
  stepIndex: number;
  onStepChange: (step: number) => void;
  onClose: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const step = content.tour[stepIndex];

  useEffect(() => {
    if (!open || route !== step.route) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(step.target);
      target?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
      heading.current?.focus({ preventScroll: true });
    }, 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open, route, step]);

  if (!open) return null;

  const isLastStep = stepIndex === content.tour.length - 1;

  return (
    <aside className="guided-tour" role="region" aria-labelledby="guided-tour-title">
      <div className="guided-tour__top">
        <span>
          Step {stepIndex + 1} of {content.tour.length}
        </span>
        <button
          className="guided-tour__close"
          type="button"
          onClick={onClose}
          aria-label="Close walkthrough"
        >
          &times;
        </button>
      </div>
      <div className="guided-tour__progress" aria-hidden="true">
        <span style={{ width: `${((stepIndex + 1) / content.tour.length) * 100}%` }} />
      </div>
      <p className="eyebrow">{step.eyebrow}</p>
      <h2 id="guided-tour-title" ref={heading} tabIndex={-1}>
        {step.title}
      </h2>
      <p className="guided-tour__description">{step.description}</p>
      <OfficialSourceLogos className="guided-tour__official-logos" />
      <div className="guided-tour__actions">
        <button
          className="button button--secondary"
          type="button"
          onClick={() => onStepChange(stepIndex - 1)}
          disabled={stepIndex === 0}
        >
          Back
        </button>
        <button
          className="button button--gold"
          type="button"
          onClick={() => (isLastStep ? onClose() : onStepChange(stepIndex + 1))}
        >
          {isLastStep ? "Finish" : "Next"} <Icon name="arrow" size={17} />
        </button>
      </div>
    </aside>
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
      label: "Company documents",
      detail: "Open or download the published PDFs",
      icon: "document",
      href: "#/documents",
    },
    {
      label: "Official website",
      detail: "Visit buysmartprocurement.com",
      icon: "globe",
      href: content.links.website,
      external: true,
    },
    {
      label: "Official social accounts",
      detail: "Compare the handles before you follow",
      icon: "people",
      href: "#/socials",
    },
    {
      label: "Office and location",
      detail: "Find our Lagos office and directions",
      icon: "location",
      href: "#/location",
    },
    {
      label: "Contact BuySmart",
      detail: "Request a quote or speak with our team",
      icon: "mail",
      href: "#/contact",
    },
  ];

  return (
    <main className="page home-page">
      <Header />
      <section className="hero">
        <p className="eyebrow">Official trust centre</p>
        <h1>
          Verify BuySmart
          <br />
          <span>with confidence.</span>
        </h1>
        <p className="hero-purpose">
          This is the official place to review BuySmart Procurement Limited’s public documents, open
          trusted sources and complete your own check before you buy.
        </p>
        <div className="hero__actions">
          <a
            className="button button--gold"
            href={content.links.cacSearch}
            target="_blank"
            rel="noreferrer"
          >
            Verify with CAC <Icon name="arrow" size={17} />
          </a>
          <a className="button button--secondary" href="#/documents">
            <Icon name="document" size={17} /> Browse documents
          </a>
        </div>
        <TourPrompt />
        <div className="registration-badge">
          <Icon name="building" size={17} />
          <span>CAC Nigeria · RC {content.site.registrationNumber}</span>
          <a href={content.links.cacSearch} target="_blank" rel="noreferrer">
            {cacSearchHost}
          </a>
        </div>
      </section>

      <section className="purpose-strip" aria-label="How this page helps you">
        <div>
          <Icon name="document" size={21} />
          <span>
            <strong>Review</strong>
            Public company documents
          </span>
        </div>
        <div>
          <Icon name="globe" size={21} />
          <span>
            <strong>Verify</strong>
            Open the official source
          </span>
        </div>
        <div>
          <Icon name="check" size={21} />
          <span>
            <strong>Confirm</strong>
            Mark your own check
          </span>
        </div>
      </section>

      <CACVerificationPanel />

      <section className="link-section" aria-labelledby="explore-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trust centre</p>
            <h2 id="explore-title">Explore BuySmart</h2>
          </div>
        </div>
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
      </section>
      <Footer />
    </main>
  );
}

function CACVerificationPanel({ compact = false }: { compact?: boolean }) {
  const titleId = compact ? "documents-cac-title" : "home-cac-title";

  return (
    <section
      className={`verification-panel ${compact ? "verification-panel--compact" : ""}`}
      aria-labelledby={titleId}
    >
      <div className="verification-panel__heading">
        <span className="verification-panel__icon">
          <img
            className="cac-logo"
            src={content.links.cacLogo}
            alt="Corporate Affairs Commission logo"
          />
        </span>
        <div>
          <p className="eyebrow">Official company check</p>
          <h2 id={titleId}>Verify BuySmart with CAC</h2>
          <p>Use the government’s public search, then compare the record yourself.</p>
        </div>
      </div>

      {!compact && (
        <ol className="verification-steps">
          <li>
            <span>1</span>
            <div>
              <strong>Copy our exact details</strong>
              <p>Use the company name or RC number shown below.</p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <strong>Open the official CAC search</strong>
              <p>The independent government source is {cacSearchHost}.</p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <strong>Compare the record</strong>
              <p>Match the name, RC number, status and incorporation date.</p>
            </div>
          </li>
          <li>
            <span>4</span>
            <div>
              <strong>Come back and mark your check</strong>
              <p>Your confirmation is saved for this browser tab only.</p>
            </div>
          </li>
        </ol>
      )}

      <div className="verification-panel__copy">
        <span>Search with</span>
        <div className="copy-grid">
          <CopyButton value={content.registration.registeredName} />
          <CopyButton value={content.site.registrationNumber} />
        </div>
        <p className="verification-panel__record">
          Registered {content.registration.incorporated} · {content.registration.address}
        </p>
      </div>

      {compact && (
        <p className="verification-panel__compact-guide">
          Copy a detail, compare the official record, then return here and mark your check.
        </p>
      )}

      <div className="verification-panel__actions">
        <a
          className="button button--gold"
          href={content.links.cacSearch}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            Open official CAC search
            <small>{cacSearchHost}</small>
          </span>
          <Icon name="arrow" size={18} />
        </a>
        <VerificationCheck
          storageKey="buysmart-cac-check"
          label="I compared the official record"
          title="CAC comparison marked complete"
          description="You compared the official record."
        />
      </div>
      <p className="verification-panel__source">
        <Icon name="globe" size={15} />
        Independent government source ·{" "}
        <a href={content.links.cacSearch} target="_blank" rel="noreferrer">
          {cacSearchHost}
        </a>
      </p>
    </section>
  );
}

function CopyButton({ value, compact = false }: { value: string; compact?: boolean }) {
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
    <>
      <button
        className={`copy-button ${compact ? "copy-button--compact" : ""}`}
        onClick={copy}
        type="button"
        aria-label={compact ? `Copy ${value}` : undefined}
      >
        {!compact && <span>{value}</span>}
        <span className="copy-button__action">
          <Icon name="copy" size={16} />
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `${value} copied` : ""}
      </span>
    </>
  );
}

function VerificationCheck({
  label,
  storageKey,
  title = "Your check is complete",
  description = "This is your confirmation, not an independent verification by BuySmart.",
}: {
  label: string;
  storageKey?: string;
  title?: string;
  description?: string;
}) {
  const [checked, setChecked] = useState(() => (storageKey ? readSessionFlag(storageKey) : false));
  const [persisted, setPersisted] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  function markChecked() {
    setChecked(true);
    setPersisted(storageKey ? writeSessionFlag(storageKey, true) : true);
    setShowToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 4500);
  }

  function resetCheck() {
    setChecked(false);
    setShowToast(false);
    setPersisted(storageKey ? writeSessionFlag(storageKey, false) : true);
  }

  const persistenceMessage = !storageKey
    ? "This check applies to the current page view."
    : persisted
      ? "Your check is saved for this tab only."
      : "Browser storage is unavailable, so this check may not remain after a reload.";

  return (
    <div className="verification-check">
      <div className="verification-check__controls">
        <button
          className={`verification-check__button ${checked ? "is-complete" : ""}`}
          type="button"
          onClick={markChecked}
          aria-pressed={checked}
          disabled={checked}
        >
          <Icon name={checked ? "check" : "shield"} size={18} />
          {checked ? "Checked by you" : label}
        </button>
        {checked && (
          <button className="verification-check__undo" type="button" onClick={resetCheck}>
            Undo
          </button>
        )}
      </div>
      {showToast && (
        <div className="verification-toast" role="status" aria-live="polite">
          <span className="verification-toast__tick">
            <Icon name="check" size={34} />
          </span>
          <div>
            <strong>{title}</strong>
            <p>
              {description} {persistenceMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function OfficialSourceLink({ document }: { document: DocumentEntry }) {
  const isOfficialRegistry = Boolean(document.officialUrl);
  const href = isOfficialRegistry ? document.officialUrl : content.links.website;
  const sourceHost = isOfficialRegistry
    ? getUrlHost(document.officialUrl)
    : "buysmartprocurement.com";

  return (
    <a className="official-source" href={href} target="_blank" rel="noreferrer">
      <span className="official-source__icon">
        {document.issuerLogo ? (
          <img
            className={`official-source__logo official-source__logo--${document.issuerCode.toLowerCase()}`}
            src={document.issuerLogo}
            alt=""
          />
        ) : (
          <Icon name="globe" size={20} />
        )}
      </span>
      <span className="official-source__copy">
        <small>
          {isOfficialRegistry
            ? document.officialSourceName ||
              (isCacSource(document)
                ? "Official CAC verification"
                : "Official registry verification")
            : "Official company website"}
        </small>
        <strong>{sourceHost}</strong>
      </span>
      <Icon name="arrow" size={19} />
    </a>
  );
}

function DocumentSteps({ document }: { document: DocumentEntry }) {
  const hasOfficialRegistry = Boolean(document.officialUrl);
  const cacSource = isCacSource(document);
  const officialCheckDescription = hasOfficialRegistry
    ? document.verificationHint ||
      (cacSource
        ? "Search CAC with our name or RC number, then compare the record."
        : "Open the official registry and compare the record.")
    : "Use our official website to compare the company name and contact details.";

  return (
    <ol className="document-steps" aria-label={`How to review ${document.title}`}>
      <li>
        <span>1</span>
        <div>
          <strong>Open or download the PDF</strong>
          <p>
            Review {document.pages === 1 ? "the page" : `all ${document.pages} pages`} before you
            continue.
          </p>
        </div>
      </li>
      <li>
        <span>2</span>
        <div>
          <strong>
            {hasOfficialRegistry ? "Check the official record" : "Compare the company details"}
          </strong>
          <p>{officialCheckDescription}</p>
        </div>
      </li>
      <li>
        <span>3</span>
        <div>
          <strong>Come back here</strong>
          <p>Mark your check below after comparing the details.</p>
        </div>
      </li>
    </ol>
  );
}

function DocumentCard({ document }: { document: DocumentEntry }) {
  const hasOfficialRegistry = Boolean(document.officialUrl);
  const fileUrl = publicAssetUrl(document.file);

  return (
    <article className="document-card" id={document.id}>
      <div className="document-preview">
        <img className="document-preview__watermark" src={brandMarkUrl} alt="" />
        {document.thumbnail ? (
          <img
            src={publicAssetUrl(document.thumbnail)}
            alt={`First page of ${document.title}`}
            loading="lazy"
          />
        ) : (
          <div className="document-preview__placeholder" aria-hidden="true">
            {document.issuerLogo ? (
              <img
                className={`document-preview__issuer-logo document-preview__issuer-logo--${document.issuerCode.toLowerCase()}`}
                src={document.issuerLogo}
                alt=""
              />
            ) : (
              <span>{document.issuerCode}</span>
            )}
            <strong>PDF</strong>
            <small>Public document</small>
          </div>
        )}
        <span className="document-preview__issuer">
          <span>{document.issuerCode}</span>
          {document.issuerName}
        </span>
        <span className="page-count">
          {document.pages} {document.pages === 1 ? "page" : "pages"}
        </span>
      </div>
      <div className="document-card__body">
        <div className="badge-row">
          <span className="status-badge status-badge--published">Published document</span>
          {hasOfficialRegistry && (
            <span className="status-badge status-badge--official">Official check</span>
          )}
        </div>
        <h2>{document.title}</h2>
        <p className="document-purpose">{document.purpose}</p>
        {document.notice && <p className="document-notice">{document.notice}</p>}
        {document.details.length > 0 && (
          <dl className="document-details">
            {document.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>
                  {detail.label === "Tax ID" ? (
                    <span className="document-details__value">
                      <span>{detail.value}</span>
                      <CopyButton value={detail.value} compact />
                    </span>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <DocumentSteps document={document} />
        <OfficialSourceLink document={document} />
        <div className="file-meta">
          <span>Updated {document.lastUpdated}</span>
          {document.fileSize && <span>{document.fileSize}</span>}
        </div>
        <div className="document-actions">
          <a className="button button--gold" href={fileUrl} target="_blank" rel="noreferrer">
            View PDF <Icon name="arrow" size={17} />
          </a>
          <a className="button button--secondary" href={fileUrl} download>
            <Icon name="download" size={17} /> Download PDF
          </a>
        </div>
        <VerificationCheck
          storageKey={`buysmart-document-${document.id}`}
          label={
            hasOfficialRegistry ? "I compared the official record" : "I reviewed this document"
          }
          title={hasOfficialRegistry ? "Official record compared" : "Document review complete"}
          description={
            hasOfficialRegistry
              ? "You compared the official record."
              : "You reviewed this company document."
          }
        />
      </div>
    </article>
  );
}

function DocumentsPage({ focus }: { focus?: string }) {
  const documents = focus
    ? content.documents.filter((document) => document.id === focus)
    : content.documents;
  const publishedDocuments = documents.filter((document) => document.status === "published");

  return (
    <main className="page documents-page">
      <Header />
      <div className="page-heading">
        {focus && (
          <a className="header-back" href="#/documents">
            &larr; All documents
          </a>
        )}
        <p className="eyebrow">{focus ? "Published document" : "Documents and verification"}</p>
        <h1>{focus ? documents[0]?.title : "Company documents"}</h1>
        <p>
          {focus
            ? documents[0]?.purpose
            : "Open or download each published PDF, follow the official source where one is available, then return and mark your own check."}
        </p>
      </div>

      {!focus && <CACVerificationPanel compact />}

      <section className="document-section" aria-label="Published company documents">
        {!focus && (
          <div className="section-heading">
            <div>
              <p className="eyebrow">Available now</p>
              <h2>Ready to review</h2>
            </div>
            <span className="section-heading__count">
              {publishedDocuments.length}{" "}
              {publishedDocuments.length === 1 ? "document" : "documents"}
            </span>
          </div>
        )}
        <div className="documents-list">
          {publishedDocuments.map((document) => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
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
      description="Use the registered address from the company's CAC and tax records, then open Google Maps for directions."
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
  const [showSplash, setShowSplash] = useState(() => {
    const initialRoute = window.location.hash || "#/";
    return initialRoute === "#/" && !readSessionFlag(splashStorageKey);
  });
  const restoreSplashFocus = useRef(false);
  const tourOpenRef = useRef(false);
  const tourNavigationRoute = useRef<string | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const navigateTour = useCallback((stepIndex: number) => {
    const step = content.tour[stepIndex];
    if (!step) return;

    setTourStep(stepIndex);
    if (window.location.hash === step.route) {
      tourNavigationRoute.current = null;
      setRoute(step.route);
      return;
    }

    tourNavigationRoute.current = step.route;
    window.location.hash = step.route;
  }, []);

  const completeSplash = useCallback(() => {
    const shouldStartTour = !readSessionFlag(tourStorageKey);
    writeSessionFlag(splashStorageKey, true);
    writeSessionFlag(tourStorageKey, true);
    restoreSplashFocus.current = true;
    setShowSplash(false);
    if (shouldStartTour) {
      tourOpenRef.current = true;
      setTourStep(0);
      setTourOpen(true);
    }
  }, []);

  const startTour = useCallback(() => {
    writeSessionFlag(tourStorageKey, true);
    tourOpenRef.current = true;
    setTourOpen(true);
    navigateTour(0);
  }, [navigateTour]);

  const closeTour = useCallback(() => {
    tourOpenRef.current = false;
    tourNavigationRoute.current = null;
    setTourOpen(false);
    window.setTimeout(() => {
      document.querySelector<HTMLButtonElement>(".tour-button")?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = window.location.hash || "#/";
      if (tourOpenRef.current && tourNavigationRoute.current !== nextRoute) {
        tourOpenRef.current = false;
        tourNavigationRoute.current = null;
        setTourOpen(false);
      } else if (tourNavigationRoute.current === nextRoute) {
        tourNavigationRoute.current = null;
      }

      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      "#/documents": "Company Documents | BuySmart Trust Centre",
      "#/documents/profile": "Company Profile | BuySmart Trust Centre",
      "#/documents/policy": "Policies and Terms | BuySmart Trust Centre",
      "#/documents/cac-certificate": "CAC Certificate of Incorporation | BuySmart Trust Centre",
      "#/documents/tax-registration": "Tax Identification Certificate | BuySmart Trust Centre",
      "#/socials": "Verified Socials | BuySmart Trust Centre",
      "#/location": "Location | BuySmart Trust Centre",
      "#/contact": "Contact | BuySmart Trust Centre",
    };
    document.title = titles[route] || "BuySmart Trust Centre | Official Documents & Verification";
  }, [route]);

  useEffect(() => {
    if (showSplash || !restoreSplashFocus.current) return;
    const heading = document.querySelector<HTMLElement>("main h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    restoreSplashFocus.current = false;
  }, [showSplash]);

  if (showSplash) return <SplashScreen onComplete={completeSplash} />;

  let page: ReactNode;
  if (route === "#/documents/profile") page = <DocumentsPage focus="profile" />;
  else if (route === "#/documents/policy") page = <DocumentsPage focus="policy" />;
  else if (route === "#/documents/cac-certificate")
    page = <DocumentsPage focus="cac-certificate" />;
  else if (route === "#/documents/tax-registration")
    page = <DocumentsPage focus="tax-registration" />;
  else if (route.startsWith("#/documents")) page = <DocumentsPage />;
  else if (route === "#/socials") page = <SocialsPage />;
  else if (route === "#/location") page = <LocationPage />;
  else if (route === "#/contact") page = <ContactPage />;
  else page = <HomePage />;

  return (
    <TourContext.Provider value={{ startTour }}>
      {page}
      <GuidedTour
        open={tourOpen}
        route={route}
        stepIndex={tourStep}
        onStepChange={navigateTour}
        onClose={closeTour}
      />
    </TourContext.Provider>
  );
}
