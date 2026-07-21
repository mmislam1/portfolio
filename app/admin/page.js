import AdminEditor from "@/app/components/AdminEditor";
import { getPortfolioData } from "@/lib/portfolioDb";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Edit Portfolio | Mohaiminul Islam",
};

export default async function AdminPage() {
  const data = await getPortfolioData();

  return <AdminEditor initialData={data} />;
}
