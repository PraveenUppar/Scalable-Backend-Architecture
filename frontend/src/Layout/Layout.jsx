import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-black ">
      <Header />
      <main className="container py-3 mx-auto flex-grow border-l-2 border-r-2 border-white p-2 ">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
