import { useEffect, useState } from "react";

interface PageContent {
  tagline?: string;
  buttons?: Array<{ id: string; label: string; href: string }>;
  title?: string;
  intro?: string;
  cards?: Array<{
    id: string;
    title: string;
    badge?: string;
    badgeColor?: string;
    file?: string;
    status?: string;
    viewOnly?: boolean;
    thumbnail?: string;
    pdf?: string;
    pdfs?: string[];
    href?: string;
    download?: string;
  }>;
  platforms?: Array<{
    id: string;
    name: string;
    handle: string;
    url: string;
    color: string;
  }>;
  description?: string;
  mapUrl?: string;
  businessProfile?: string;
  reviews?: { rating: string; count: string };
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  companyProfile?: PageContent;
  contact?: PageContent;
  googleBusiness?: PageContent;
  verifiedDocuments?: PageContent;
  verifiedSocials?: PageContent;
}

export function useContent(page: keyof PageContent) {
  const [data, setData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this would fetch from content.json
    // For now, use the embedded data
    import("../content.json").then((module) => {
      const content = (module.default as Record<string, PageContent>)[page];
      if (content) {
        setData(content);
      }
      setLoading(false);
    });
  }, [page]);

  return { data, loading };
}
