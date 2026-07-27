import PortfolioView from "@/app/components/PortfolioView";
import { getPortfolioData } from "@/lib/portfolioDb";
import { seoKeywords, siteDescription, siteTitle, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  const profileLinks = (data.profile?.links || [])
    .map((link) => link.href)
    .filter(Boolean);
  const projectUrls = (data.projects || [])
    .flatMap((project) => [project.liveLink, project.link])
    .filter(Boolean);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: data.profile?.name || "Mohaiminul Islam",
      url: siteUrl,
      image: `${siteUrl}/mm.jpg`,
      jobTitle: "Full-Stack Developer",
      description: siteDescription,
      sameAs: profileLinks,
      knowsAbout: seoKeywords,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteTitle,
      url: siteUrl,
      description: siteDescription,
      keywords: seoKeywords.join(", "),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projectUrls.map((url, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url,
        })),
      },
    },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <PortfolioView data={data} />
    </>
  );
}
