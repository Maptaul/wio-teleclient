import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";
import Navbar from "../Components/Navbar/Navbar";

const Root = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("signin") ||
    location.pathname.includes("signUp");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  if (isLoading) {
    return <Loading message="Initializing application..." />;
  }

  return (
    <div className="bg-base-200">
      {!noHeaderFooter && (
        <header>
          <Navbar />
        </header>
      )}

      <main className="min-h-screen">
        <Outlet />
      </main>

      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Root;
