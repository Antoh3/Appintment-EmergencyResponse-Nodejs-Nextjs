import HomePage from "@/app/patient/(home)/HomePage";
import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";

export const metadata = {
    title: "Home",
}

const PatientPage = () => {
    return (
        <SiteShell>
            <SiteHeader heading="Home" />
            <HomePage />
        </SiteShell>
    )
}

export default PatientPage
