import React from "react";

interface HeaderProps {
  categories: string[];
  currentCategoryIndex: number;
  onCategoryClick: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  currentCategoryIndex,
  onCategoryClick,
}) => {
  return (
    <header className="bg-pink-300 text-white flex text-center py-2">
      <div className="flex overflow-x-auto scrollbar-hidden">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-4 text-center text-lg font-semibold cursor-pointer ${
              currentCategoryIndex === index ? "text-white" : "text-black"
            }`}
            onClick={() => onCategoryClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
