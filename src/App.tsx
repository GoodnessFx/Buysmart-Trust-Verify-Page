import { useState } from "react";
import { MainButton, SecondaryButton } from "./components/TrustUI";
import { Header } from "./layout/Header";
import { ShareButton, QRCode } from "./components/TrustUI";
import { schemaOrgOrganization } from "./lib/schema";
import content from "./content.json";
import { VerifiedDocumentsPage } from "./pages/VerifiedDocumentsPage";
import { VerifiedSocialsPage } from "./pages/VerifiedSocialsPage";
import { GoogleBusinessPage } from "./pages/GoogleBusinessPage";
import { CompanyProfilePage } from "./pages/CompanyProfilePage";
import { HomePage } from "./pages/HomePage";

function App() {
  const [currentPath, setCurrentPath] = useState("/");
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
  };

  const pageData = content.pages[currentPath.slice(1) || "home"] || {
    title: "BuySmart Procurement Limited",
    buttons: [
      { label: "Verify Us", href: "/verified-documents" },
      { label: "Our Socials", href: "/socials" },
    ]
  };

  const routes: Record<string, React.ComponentType> = {
    "/": HomePage,
    "/verified-documents": VerifiedDocumentsPage,
    "/socials": VerifiedSocialsPage,
    "/google-business": GoogleBusinessPage,
    "/company-profile": CompanyProfilePage,
  };

  const PageComponent = routes[currentPath] || HomePage;

  return (
    <div className="min-h-screen bg-[color:var(--fallback-canvas-color,_#FAFAF8)] font-inter">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <PageComponent {...pageData} />
      <Footer currentPath={currentPath} onNavigate={navigate} />
      <ShareButton url={window.location.href} />
      <QRCode url={window.location.href} />
    </div>
  );
}

export default App;