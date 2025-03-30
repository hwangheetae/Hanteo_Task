// import "./App.css";
import Carousel from "./component/Carousel";
import Layout from "./layout";

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

  return (
    <Layout>
      <div>
        <Carousel images={images} interval={3000} />
        <h2 className="text-lg font-semibold">Main Content</h2>
        <p className="text-gray-700">This is the main content area.</p>
      </div>
    </Layout>
  );
}

export default App;
