import { useState, useEffect } from "react";
import "./styles.css";

const BirthYearHistogram = () => {
    const [yAxis, setYAxis] = useState([]);
    const [xAxis, setXAxis] = useState([]);

    const getHistogram = ()=>{
        const yearsWithCount = new Map();
        const formattedYAxis = [];
        const formattedXAxis = [];
        let max = 0;
    
        const getData = async () => {
            const res = await fetch(`https://www.random.org/integers/?num=200&min=1950&max=2019&col=1&base=10&format=plain`);
            const data = await res.text();
            const dataInArray = data.split('\n').filter(year => Boolean(year)).map(year => +year);
            formatData(dataInArray);
        }
        const formatData = (dataInArray) => {
            dataInArray.forEach(year => {
                const from = Math.floor(year / 10) * 10;
                if (yearsWithCount.has(from)) {
                    yearsWithCount.set(from, yearsWithCount.get(from) + 1);
                } else {
                    yearsWithCount.set(from, 1);
                }
                max = Math.max(max, yearsWithCount.get(from));
            });
    
            max = Math.floor((max + 10) / 10) * 10;
            for (let val = 0; val <= max; val += 10) {
                formattedYAxis.push(val);
            }
            yearsWithCount.forEach((val, key) => {
                formattedXAxis.push([key, val]);
            })
            formattedXAxis.sort((a, b) => a[0] - b[0]);
            setYAxis(formattedYAxis);
            setXAxis(formattedXAxis);
        }
        getData();
    }

    useEffect(() => {
        getHistogram();
    }, []);

    const getNewData=()=>{
        getHistogram();
    }

    return (
        <div className="parent-container">
        <div className="container">
            <div className="y-axis">
                {yAxis.map(count => <div key={count.toString()}>{count > 0 ? `${count}` : ''}</div>)}
            </div>
            <div className="data-container">
                <div className="histogram">
                    {xAxis.map(year => <div key={`year-${year[0]} count-${year[1]}`}
                        style={{ height: `${(year[1] / yAxis[yAxis.length - 1]) * 100}%` }}
                    ></div>)}
                </div>
                <div className="years">
                    {xAxis.map(year => <div key={year[0].toString()}>{year[0]}</div>)}
                </div>
            </div>
        </div>
        <button onClick={getNewData} className="reset-btn">Reset</button>
        </div>
    )
}

export default BirthYearHistogram;