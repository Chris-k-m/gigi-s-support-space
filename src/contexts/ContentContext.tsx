import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    email: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    tagline: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  programs: {
    title: string;
    description: string;
    highlights: string[];
    expectations: string[];
  };
  philosophy: {
    title: string;
    paragraphs: string[];
    quote: string;
  };
  speaking: {
    title: string;
    subtitle: string;
    topics: { title: string; description: string }[];
  };
  quiz: {
    title: string;
    subtitle: string;
  };
  testimonials: {
    title: string;
    items: { quote: string; author: string; role: string; stars: number }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
  };
}

const ContentContext = createContext<{ content: SiteContent | null; loading: boolean }>({
  content: null,
  loading: true,
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content.json")
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Failed to load content:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  );
};
