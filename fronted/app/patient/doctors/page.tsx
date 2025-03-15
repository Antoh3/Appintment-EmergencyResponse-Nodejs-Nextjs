import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
// import LabColumns from "@/components/UI/table/doctorColumns";
import DoctorColumns from "@/components/UI/table/doctorColumns";

export const metadata = {
  title: "Doctors",
};

const LabRecordsPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Available Doctors" />
      {/* <LabColumns /> */}
      <DoctorColumns/>
    </SiteShell>
  );
};

export default LabRecordsPage;
