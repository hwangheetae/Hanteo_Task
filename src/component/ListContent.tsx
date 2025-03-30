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
  initialItems: Item[];
}

const ListContent: React.FC<ListContentProps> = ({
  curationTitle,
  initialItems,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreItems = useCallback(() => {
    const newItems = Array.from({ length: 10 }, () => {
      return {
        id: uuidv4(), // UUID로 고유한 ID 생성
        title: `Item`,
        imageUrl: "https://via.placeholder.com/100",
        description: `Description`,
      };
    });
    return newItems;
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setItems((prevItems) => [...prevItems, ...fetchMoreItems()]);
          setIsLoading(false);
        }, 1000);
      }
    },
    [isLoading, fetchMoreItems]
  );

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
    <div className="w-full max-w-md mx-auto border rounded-lg">
      <div className="sticky top-0 bg-white z-10 px-4 py-2 border-b">
        <h3 className="text-lg font-bold">{curationTitle}</h3>
      </div>
      <div
        className="overflow-y-auto"
        style={{
          height: "calc(100vh - 340px)",
        }}
      >
        <div className="space-y-4 px-4 py-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg mr-4 border bg-gray-500"
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
