// import "./App.css";
import { useState } from "react";

import { useSwipeable } from "react-swipeable";

import Layout from "./layout";
import Header from "./component/Header";
import Carousel from "./component/Carousel";
import ListContent from "./component/ListContent";

function App() {
  const categories = ["차트", "Whook", "이벤트", "뉴스", "스토어", "충전소"];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  const images = [
    {
      src: "https://via.placeholder.com/400x200",
      link: "https://example.com/1",
    },
    {
      src: "https://via.placeholder.com/400x200",
      link: "https://example.com/2",
    },
    {
      src: "https://via.placeholder.com/400x200",
      link: "https://example.com/3",
    },
    {
      src: "https://via.placeholder.com/400x200",
      link: "https://example.com/4",
    },
    {
      src: "https://via.placeholder.com/400x200",
      link: "https://example.com/5",
    },
  ];

  const initialItems = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    title: `Item ${index + 1}`,
    imageUrl: "https://via.placeholder.com/100",
    description: `Description for item ${index + 1}`,
  }));

  const handleCategoryClick = (index: number) => {
    if (index !== currentCategoryIndex) {
      setSlideDirection(index > currentCategoryIndex ? "left" : "right");
      triggerAnimation(() => setCurrentCategoryIndex(index));
    }
  };

  const triggerAnimation = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const handleSwipe = (direction: string) => {
    if (direction === "left" && currentCategoryIndex < categories.length - 1) {
      setSlideDirection("left"); // 슬라이드 방향 설정
      triggerAnimation(() => setCurrentCategoryIndex((prev) => prev + 1));
    } else if (direction === "right" && currentCategoryIndex > 0) {
      setSlideDirection("right"); // 슬라이드 방향 설정
      triggerAnimation(() => setCurrentCategoryIndex((prev) => prev - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  return (
    <Layout>
      <div>
        <Header
          categories={categories}
          currentCategoryIndex={currentCategoryIndex}
          onCategoryClick={handleCategoryClick}
        />
        <Carousel images={images} interval={3000} />
        <div {...handlers} className="relative overflow-hidden">
          <div
            className={`transition-transform duration-300 ${
              isAnimating
                ? slideDirection === "left"
                  ? "transform -translate-x-full opacity-50"
                  : "transform translate-x-full opacity-50"
                : "opacity-100"
            }`}
          >
            <ListContent
              curationTitle={categories[currentCategoryIndex]}
              initialItems={initialItems}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
