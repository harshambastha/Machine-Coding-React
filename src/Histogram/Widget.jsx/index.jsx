import "./styles.css";

const Widget = ({ births }) => {
    const count = [50, 40, 30, 20, 10];
    console.log(births);
    return (
        <div className="widget-container">
            <div className="y-axis">
                {count.map(num=>(
                    <div className="y-axis-num ">{num}</div>
                ))}
            </div>
            <div className="bar-container">
                {births.map(birth => (
                    <div className="bar">
                        <div className="bar-paint" style={{ height: birth[1] * 10 }}></div>
                        <div className="bar-text">{birth[0]}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Widget;