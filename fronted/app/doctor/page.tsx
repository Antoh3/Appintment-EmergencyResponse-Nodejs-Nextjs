import HomePage from "@/app/doctor/(home)/HomePage";
import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";

export default function page() {
    return (
        // <SiteShell>
        //     <SiteHeader heading="home">
        //         <HomePage/>
        //     </SiteHeader>
        // </SiteShell>
        <div>
            <HomePage/>
        </div>
    )
}
