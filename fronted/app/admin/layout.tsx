import { HospitalSidebar } from "./AdminSidebar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      // <main className="h-screen w-full  flex">
      //   <HospitalSidebar/>
      //   <div className="bg-primary/5 flex-grow ps-[200px]  2xl:ps-[250px] h-max sm:min-h-screen">
      //   <Toaster position="top-center" />
      //   {children}
      //   </div>
      // </main>
      <div className="flex min-h-screen flex-col space-y-6 mx-0">
            <div className="container grid flex-1 gap-0 md:grid-cols-[200px_1fr]">
              <aside className="hidden w-[200px]  flex-col md:flex ">
              <HospitalSidebar/>
              </aside>
              <main className="flex w-full flex-1 flex-col overflow-hidden">
                <header className="sticky top-0 z-40 border-b bg-background mb-2 bg-green-200">
                  <div className="container flex h-16 items-center justify-between py-4">
                    <div className="text-xl font-bold">
                      Welcome Admin
                      {/* Welcome {session?.user.name} */}
                    </div>
                  </div>
                </header>
                <div className="flex-grow bg-primary/5 p-2 ">
                 {children}
                </div>
                {/* <SiteFooter className="border-t" /> */}
              </main>
            </div>
          </div>
    )
  }