import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import AllergiesColumns from "@/components/UI/table/allergiesColumn";

export const metadata = {
  title: "Allergies",
};

const AllergiesPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Allergies" />
      <AllergiesColumns />
    </SiteShell>
  );
};

export default AllergiesPage;
