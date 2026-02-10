import { useState, useEffect } from 'react';
import Widget from './Widget.jsx';

const Histogram = ({ startYear, endYear }) => {
    const [births, setBirths] = useState([]);
    const yearMap = getHashMap(startYear, endYear);

    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://www.random.org/integers/?num=200&min=${startYear}&max=${endYear}&col=1&base=10&format=plain`);
            const data = await res.text();
            const cleanedData = data.trim().split('\n').map(num => parseInt(num, 10));
            for (const year of cleanedData) {
                let from = Math.floor(year / 10) * 10;
                const count = yearMap.get(from);
                yearMap.set(from, count + 1);
            }

            const formattedData = [];
            yearMap.forEach((value, key) => {
                formattedData.push([key, value]);
            });
            setBirths(formattedData);
        }
        getData();
    }, []);

    return (
        <div className='container'>
            <Widget births={births} />
        </div>
    )
}

const getHashMap = (start, end) => {
    const hash = new Map();
    while (start < end) {
        hash.set(start, 0);
        start += 10;
    }
    return hash;
}

export default Histogram;