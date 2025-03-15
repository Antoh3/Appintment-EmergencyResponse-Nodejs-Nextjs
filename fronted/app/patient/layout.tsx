import { AppAccountNav } from "@/components/patient/AppAccountNav";
import AppNav from "@/components/patient/AppNav";
import { patientConfig } from "@/config/patient";

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6 ">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px]  flex-col md:flex">
          <AppNav items={patientConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-40 border-b bg-background mb-2 bg-green-400">
            <div className="container flex h-16 items-center justify-between py-4">
              <div className="text-xl font-bold">
                Welcome Emmanuel
                {/* Welcome {session?.user.name} */}
              </div>
              <div >
                <AppAccountNav />
              </div>
            </div>
          </header>
          <div className="flex-grow bg-primary/5 p-8 ">
            {children}
          </div>
          {/* <SiteFooter className="border-t" /> */}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
