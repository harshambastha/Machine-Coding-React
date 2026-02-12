import { useState, useEffect, useId } from "react";
import styles from "./Autocomplete.module.css";

const Autocomplete = () => {
    const [query, setQuery] = useState('');
    const [allResults, setAllResults] = useState([]);
    const searchInput = useId();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/todos/');
            const inJSON = await data.json();
            setAllResults(inJSON);
        }
        fetchData();
    }, []);

    const filteredValue = allResults.filter(item => item.title.includes(query));

    return (
        <div className={styles['autocomplete-container']}>
            <input
                id={searchInput}
                name="searchInput"
                className={styles['autocomplete-input']}
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
            />
            {query && filteredValue.length > 0 && (
                <ul className={styles['autocomplete-list']}>
                    {filteredValue.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Autocomplete;