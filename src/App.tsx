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

  const handleSwipe = (direction: string) => {
    if (direction === "left" && currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prev: number) => prev + 1);
    } else if (direction === "right" && currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev: number) => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  const handleCategoryClick = (index: number) => {
    setCurrentCategoryIndex(index);
  };

  return (
    <Layout>
      <div>
        <Header
          categories={categories}
          currentCategoryIndex={currentCategoryIndex}
          onCategoryClick={handleCategoryClick}
        />
        <Carousel images={images} interval={3000} />
        <div {...handlers}>
          <ListContent
            curationTitle={"콘텐츠 큐레이션 제목"}
            initialItems={initialItems}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
