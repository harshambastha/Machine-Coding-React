import { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ data }) => {
    const [openIds, setOpenIds] = useState([]);
    
    const handleAccordionClick = (itemId) => {
        // if itemID exists i will remove else add
        const found = openIds.find(item => item === itemId);
        if (found) {
            setOpenIds(prev => prev.filter(item => item !== itemId));
            return;
        }
        setOpenIds(prev => [...prev, itemId]);
    }
    return (
        <div className={styles['accordion-container']}>
            {data.map(item => (
                <div key={item.id} className={styles['accordion-item']}>
                    <button className={styles['accordion-title']} onClick={() => handleAccordionClick(item.id)}>{item.title}
                        <span className={`${styles['accordion-icon']} ${openIds.includes(item.id) ? styles['accordion-icon--rotated'] : ''}`}></span>
                    </button>
                    <div hidden={!openIds.includes(item.id)} className={styles['accordion-content']}>{item.content}</div>
                </div>
            ))}
        </div>
    )
}

export default Accordion;