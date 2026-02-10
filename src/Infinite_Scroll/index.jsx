import { useEffect, useRef, useState } from "react";
import "./styles.css";

const InfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    // Mock API call
    const loadMoreItems = async () => {
        const newItems = Array.from({ length: 10 }, (_, i) => `Item ${i + items.length + 1}`);
        setItems((prev) => [...prev, ...newItems]);
    };

    // Observe loader to trigger fetching
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, []);

    useEffect(() => {
        loadMoreItems();
    }, [page]);

    return (
        <div className="infinite-container">
            {items.map((item, idx) => (
                <div key={idx} className="item-box">
                    {item}
                </div>
            ))}
            <div ref={loader} className="loader-box">
                <span>Loading more...</span>
            </div>
        </div>
    );
};

export default InfiniteScroll;
