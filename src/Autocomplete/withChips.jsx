import { useState, useEffect, useRef } from 'react';
import "./style.css";

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
        <div className="autocomplete-container" ref={containerRef}>
            <div className="search-field">
                <span className='all-chips'>
                    {allQueries.map((q, index) => (
                        <Chip key={q + index.toString()} label={q} handleChipDelete={onChipClick} />
                    ))}
                </span>
                <input value={query} onChange={(e) => setQuery(e.target.value)} className='search-input' onClick={()=>setShowResult(true)}/>
            </div>
            {showResult && query && filteredResults.length > 0 && (
                <ul className='autocomplete-list'>
                    {filteredResults.map(q => (
                        <li key={q.id?.toString()} onClick={e => addItem(q)} className='list-item'>{q.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const Chip = ({ label, handleChipDelete }) => {
    return (<span className='chip'>
        {label} <span onClick={e=>handleChipDelete(label)} className='close-button'>x</span>
    </span>)
}

export default AutocompleteWithChips;