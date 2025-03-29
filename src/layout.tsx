import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-[425px] h-[900px] mx-auto border border-gray-300 shadow-lg flex flex-col">
      <header className="bg-blue-500 text-white text-center py-2">
        <h1 className="text-xl font-bold">Header</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">{children}</main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
