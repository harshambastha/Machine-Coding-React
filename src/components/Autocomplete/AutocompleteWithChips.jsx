import { useState, useEffect, useRef } from 'react';
import styles from "./Autocomplete.module.css";

const AutocompleteWithChips = () => {
    const [query, setQuery] = useState('');
    const [allData, setAllData] = useState([]);
    const [allQueries, setAllQueries] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const containerRef = useRef();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(res => res.json())
            .then(setAllData)
    }, []);

    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if(containerRef.current && !containerRef.current.contains(event.target)){
                setShowResult(false);
            }
        }

        document.addEventListener('click',handleClickOutside);

        return ()=>{
            document.removeEventListener('click', handleClickOutside);
        }
    },[]);

    const onChipClick = (queryToRemove) => {
        const tempAllQueries = allQueries.filter(q => q !== queryToRemove);
        setAllQueries(tempAllQueries);
    }

    const addItem = (item) => {
        setAllQueries(prevQueries => [...prevQueries, item.title]);
    }

    const filteredResults = allData.filter(item => item.title.includes(query));

    return (
        <div className={styles['autocomplete-container']} ref={containerRef}>
            <div className={styles['search-field']}>
                <span className={styles['all-chips']}>
                    {allQueries.map((q, index) => (
                        <Chip key={q + index.toString()} label={q} handleChipDelete={onChipClick} />
                    ))}
                </span>
                <input 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  className={styles['autocomplete-input']} 
                  placeholder="Search and add items..."
                  onClick={()=>setShowResult(true)}
                  autoComplete="off"
                />
            </div>
            {showResult && query && filteredResults.length > 0 && (
                <ul className={styles['autocomplete-list']}>
                    {filteredResults.map(q => (
                        <li key={q.id?.toString()} onClick={e => addItem(q)} className={styles['list-item']}>{q.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const Chip = ({ label, handleChipDelete }) => {
    return (<span className={styles.chip}>
        {label} <span onClick={e=>handleChipDelete(label)} className={styles['close-button']}>x</span>
    </span>)
}

export default AutocompleteWithChips;