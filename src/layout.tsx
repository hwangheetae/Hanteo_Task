import React from "react";
import Header from "./component/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto border border-gray-300 shadow-lg max-w-[425px]">
      <Header />
      <main className="flex-1 overflow-y-auto  bg-gray-100">{children}</main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
