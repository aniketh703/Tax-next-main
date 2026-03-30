import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomCTA from "./MobileBottomCTA";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-[#FBFBF9] flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pb-[72px] sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
