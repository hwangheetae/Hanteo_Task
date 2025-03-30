// import "./App.css";
import Layout from "./layout";

import Carousel from "./component/Carousel";
import ListContent from "./component/ListContent";
function App() {
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

  return (
    <Layout>
      <div>
        <Carousel images={images} interval={3000} />
        <ListContent
          curationTitle={"콘텐츠 큐레이션 제목"}
          initialItems={initialItems}
        />
      </div>
    </Layout>
  );
}

export default App;
