import React from "react";

const Header: React.FC = () => {
  const categories = ["차트", "Whook", "이벤트", "뉴스", "스토어", "충전소"];

  return (
    <header className="bg-pink-300 text-white flex text-center py-2">
      <div className="flex overflow-x-auto scrollbar-hidden">
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 text-center text-lg font-semibold"
          >
            {item}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
