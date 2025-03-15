import JournalInput from "@/components/patient/JournalInput";
import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";

export const metadata = {
  title: "Feedback",
};

const JournalPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Feedback" text="Tell us your expirience?" />
      <JournalInput />
    </SiteShell>
  );
};

export default JournalPage;
