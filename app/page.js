import PortfolioView from "@/app/components/PortfolioView";
import { getPortfolioData } from "@/lib/portfolioDb";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();

  return <PortfolioView data={data} />;
}
