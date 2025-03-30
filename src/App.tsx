import { useState } from "react";

import { useSwipeable } from "react-swipeable";

import Layout from "./layout";
import Header from "./component/Header";
import Carousel from "./component/Carousel";
import ListContent from "./component/ListContent";
import { carouselImages } from "./dummy_data/carousel_images";

const categories = ["차트", "Whook", "이벤트", "뉴스", "스토어", "충전소"];

function App() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  // 카테고리 스와이프 애니메이션 핸들러
  const triggerAnimation = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const changeCategory = (newIndex: number, direction: "left" | "right") => {
    setSlideDirection(direction);
    triggerAnimation(() => setCurrentCategoryIndex(newIndex));
  };

  const handleCategoryClick = (index: number) => {
    if (index !== currentCategoryIndex) {
      const direction = index > currentCategoryIndex ? "left" : "right";
      changeCategory(index, direction);
    }
  };

  const handleSwipe = (direction: string) => {
    if (direction === "left" && currentCategoryIndex < categories.length - 1) {
      changeCategory(currentCategoryIndex + 1, "left");
    } else if (direction === "right" && currentCategoryIndex > 0) {
      changeCategory(currentCategoryIndex - 1, "right");
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  // 카테고리 스와이프 애니메이션
  const getAnimationClass = () => {
    if (isAnimating) {
      return slideDirection === "left"
        ? "transform -translate-x-full opacity-50"
        : "transform translate-x-full opacity-50";
    }
    return "opacity-100";
  };

  return (
    <Layout>
      <div>
        <Header
          categories={categories}
          currentCategoryIndex={currentCategoryIndex}
          onCategoryClick={handleCategoryClick}
        />
        <Carousel images={carouselImages} interval={3000} />

        {/* 스와이프 이벤트 핸들러 */}
        <div {...swipeHandlers} className="relative overflow-hidden">
          <div
            className={`transition-transform duration-300 ${getAnimationClass()}`}
          >
            <ListContent
              curationTitle={categories[currentCategoryIndex]}
              category={categories[currentCategoryIndex]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
