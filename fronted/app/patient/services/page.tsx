import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import DiagnosisColumns from "@/components/UI/table/diagnosisColumn";
import SearchBar from "@/components/AppSearchbar";

export const metadata = {
  title: "Services",
};

const DiagnosisPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Services offered" />
      <SearchBar placeholder="search services...."/>
      <DiagnosisColumns />
    </SiteShell>
  );
};

export default DiagnosisPage;
