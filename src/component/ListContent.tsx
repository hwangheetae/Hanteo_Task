import React, { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

interface ListContentProps {
  curationTitle: string;
  category: string;
}

const ListContent: React.FC<ListContentProps> = ({
  curationTitle,
  category,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  //초기 데이터 패칭
  // api 가 없는 상태에서 더미 데이터로 대체
  const fetchItemsByCategory = async (category: string) => {
    setIsLoading(true);
    try {
      // const response = await fetch(``);
      // const data = await response.json();
      const dummyData = Array.from({ length: 10 }, (_, index) => ({
        id: `${category}-${uuidv4()}`,
        title: `Item ${index + 1} in ${category}`,
        imageUrl: "https://placehold.co/100",
        description: `Description for item ${index + 1} in ${category}`,
      }));
      setItems(dummyData);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //무한스크롤
  const fetchMoreItems = useCallback(
    (category: string) => {
      const startIndex = items.length;
      const newItems = Array.from({ length: 10 }, (_, index) => {
        return {
          id: `${category}-${uuidv4()}`,
          title: `Item ${startIndex + index + 1} in ${category} by 무한스크롤`,
          imageUrl: "https://placehold.co/100",
          description: `Description for item ${
            startIndex + index + 1
          } in ${category}`,
        };
      });
      return newItems;
    },
    [items]
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setItems((prevItems) => [...prevItems, ...fetchMoreItems(category)]);
          setIsLoading(false);
        }, 1000);
      }
    },
    [isLoading, fetchMoreItems, category]
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    fetchItemsByCategory(category);
  }, [category]);

  useEffect(() => {
    const node = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [handleObserver]);

  return (
    <div className="w-full max-w-md mx-auto  rounded-lg">
      <div className="sticky top-0  z-10 px-4 py-2 ">
        <h3 className="text-lg font-bold">{curationTitle}</h3>
      </div>
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto scrollbar-hidden"
        style={{
          height: "calc(100vh - 340px)",
        }}
      >
        <div className="space-y-4 px-4 py-2 ">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md "
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg mr-4  bg-gray-500"
              />
              <div className="flex-1">
                <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div ref={observerRef} className="h-10"></div>
        {isLoading && (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ListContent;
