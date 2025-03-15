import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import AppointmentsColumns from "@/components/UI/table/appointmentColumns";
import SearchBar from "@/components/AppSearchbar";
import AppointmentForm from '@/components/patient/AppointmentForm'

export const metadata = {
  title: "Appointments",
};

const AppointmentsPage = () => {
  return (
    <SiteShell >
      <div className="flex justify-between">
        <SiteHeader heading="Appointments" />
        <AppointmentForm />
      </div>
      <p>Don't forget to provide how your are felling in the Addditional Info page</p>
      <SearchBar placeholder="search appointments....." />
      <AppointmentsColumns />
    </SiteShell>
  );
};

export default AppointmentsPage;
