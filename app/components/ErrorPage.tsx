import authStore from "../stores/auth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect } from "react";

interface ErrorMessage{
    message: string
}

const ErrorPage = ({message}: ErrorMessage)=>{
    const { account } = authStore();
    // const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!account) return; // waiting for zustand to be loaded
    }, [account]);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <!-- ===== Page Wrapper Start ===== --> */}
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            {/* {account && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />} */}
            {account && <Sidebar />}
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
              <Header />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 text-black">
                  Error: {message}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}

            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
          {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>     
    )
}

export default ErrorPage