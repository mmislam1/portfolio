import AdminEditor from "@/app/components/AdminEditor";
import { isPortfolioAdminEnabled } from "@/lib/adminAccess";
import { getPortfolioData } from "@/lib/portfolioDb";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Edit Portfolio | Mohaiminul Islam",
};

export default async function AdminPage() {
  if (!isPortfolioAdminEnabled()) {
    notFound();
  }

  const data = await getPortfolioData();

  return <AdminEditor initialData={data} />;
}
