"use client"
import { NavigationBar } from "@/components/navigation-bar";
import MainTable from "@/components/Table/MainTable";
import { TopBar } from "@/components/top-bar";

export default function Home() {
  return (
    <div className="h-screen flex">
            <div className="hidden md:flex h-full w-[72px]
            z-30 flex-col fixed inset-y-0 bg-black">
                <NavigationBar/>
            </div>
            <main className="md:pl-[72px] h-full w-full bg-white">
              <div className="w-full h-[72px] text-black">
                  <TopBar/>
              </div>
              <div className="m-4 p-6 bg-[#f9fbfc] rounded-lg max-h-[calc(100vh-72px-32px)] w-[calc(100%-32px)] overflow-y-auto shadow-sm"> 
                <MainTable/>
              </div>
            </main>
        </div>
  );
}
