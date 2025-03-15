import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import TriageDashboard from "@/components/patient/TriageDashboard";

export const metadata = {
  title: "AdditionalInfo",
};

const TriagePage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="AdditionalInfo" />
      <TriageDashboard />
    </SiteShell>
  );
};

export default TriagePage;
