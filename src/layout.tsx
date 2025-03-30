import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto border border-gray-300 shadow-lg max-w-[425px]">
      <Header />
      <main className="flex-1 overflow-y-auto  bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
