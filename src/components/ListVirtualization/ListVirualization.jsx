import { useState } from "react";
import styles from "./ListVirtualization.module.css";

const LIST_HEIGHT = 400;
const ROW_HEIGHT = 42;
const OVERSCAN = 10; // rendering buffer to prevent white space when scrolling fast

const ListVirtualization = ({ data }) => {
    const [scrollTop, setScrollTop] = useState(0);

    const listHeight = `${LIST_HEIGHT}px`;
    const rowHeight = `${ROW_HEIGHT}px`;

    const startIndex = Math.max(Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN, 0);

    const visibleRowCount = Math.ceil(LIST_HEIGHT / ROW_HEIGHT);
    const renderedRowCount = Math.min(data.length - startIndex, visibleRowCount + OVERSCAN * 2);

    function handleScroll(e) {
        requestAnimationFrame(() => {
            setScrollTop(e.target.scrollTop);
        });
    }
    
    return (
        <>
            <div
                onScroll={handleScroll}
                style={{ height: listHeight }}
                className={styles["infinite-scroll"]}
            >
                <div style={{ height: `${data.length * ROW_HEIGHT}px` }}>
                    <div
                        style={{ transform: `translateY(${startIndex * ROW_HEIGHT}px)` }}
                    >
                        {data
                            .slice(startIndex, startIndex + renderedRowCount)
                            .map((d, i) => {
                                return <div key={d.toString()} style={{ height: rowHeight }}>{renderRow(d)}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
            startIndex {startIndex} renderedRowCount {renderedRowCount}
        </>
    )
}

const renderRow = (row) => {
    return <div>{row}</div>;
}

export default ListVirtualization