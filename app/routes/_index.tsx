import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import authStore from "~/stores/auth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Iconic Profiles" },
    { name: "description", content: "Searching through your favorite figure's profile!" },
  ];
};

export default function Index() {
  const { account } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(account);  
      if ((!account) || (account === null)) {
        navigate("/dashboard/register");
      }
    }, 100);
  
    return () => clearTimeout(timer);
  }, [account, navigate]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {account && <Sidebar />}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden text-black">
          {/* <!-- ===== Header Start ===== --> */}
          <Header  />     
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            {/* <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 text-black"> */}
              <div id="default-carousel" className="relative w-full" data-carousel="slide">

                <div className="relative h-56 overflow-hidden md:h-screen">

                    {["/background1_iconic.jpg", "/background2_iconic.jpg", "/background3_iconic.jpg"].map((e, i) => (
                      <div className="hidden duration-1000 ease-in-out" data-carousel-item key={i}>
                        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                          <img
                            alt=""
                            src={e}
                            className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center brightness-[.5]"
                          />
                          <div className="mx-auto max-w-7xl px-6 lg:px-20">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-7xl">Welcome to Iconic Profiles!</h2>
                              <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
                                Searching through your favorite figure's profile!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                </div>

                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>

                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
              </div>
            {/* </div> */}
          </main>
          {/* <!-- ===== Main Content End ===== --> */}

        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>     
)
}
