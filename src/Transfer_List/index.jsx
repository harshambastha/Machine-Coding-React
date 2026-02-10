import { useState } from "react";
import './styles.css';

const TransferList = ({ list1, list2 }) => {
    const [list1Items, setList1Items] = useState([...list1]);
    const [list2Items, setList2Items] = useState([...list2]);
    const [selectedItems, setSelectedItems] = useState([]);

    console.log('list1Items', list1Items);
    console.log('list2Items', list2Items);


    const onMoveAllToLeft = () => {
        // remove all the items from list2
        // add all the list2 items to list1 <<
        const tempList2Items = structuredClone(list2Items);
        setList1Items(prev => [...prev, ...tempList2Items]);
        setList2Items([]);
    }

    const onMoveAllToRight = () => {
        // remove all the items from list1
        // add all the list1 items to list2 >>
        const tempList1Items = structuredClone(list1Items);
        setList2Items(prev => [...prev, ...tempList1Items]);
        setList1Items([]);
    }

    const handleCheckboxClick = (id) => {
        let idInSet = false;
        selectedItems.forEach(item => {
            if (item == id) {
                idInSet = true;
            }
        });
        if (idInSet) {
            setSelectedItems(prev => prev.filter(item => item !== id))
        } else {
            setSelectedItems(prev => [...prev, id]);
        }
    }

    const onMoveToLeft = () => {
        const itemsToMove = [], itemsToStay = [];
        list2Items.forEach(item => {
            if (selectedItems.includes(item.id)) {
                itemsToMove.push(item);
            } else {
                itemsToStay.push(item);
            }
        });
        setList1Items(prev => [...prev, ...itemsToMove]);
        setList2Items(itemsToStay);
    }

    const onMoveToRight = () => {
        const itemsToMove = [], itemsToStay = [];
        list1Items.forEach(item => {
            if (selectedItems.includes(item.id)) {
                itemsToMove.push(item);
            } else {
                itemsToStay.push(item);
            }
        });
        setList2Items(prev => [...prev, ...itemsToMove]);
        setList1Items(itemsToStay);
    }

    return (
        <div className="list-container">
            <div className="list">
                {list1Items.map(item => (
                    <div key={item.id} className="list-item">
                        <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxClick(item.id)} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="list">
                <button disabled={list2Items.length == 0} onClick={onMoveAllToLeft}>{'<<'}</button>
                <button onClick={onMoveToLeft}>{'<'}</button>
                <button onClick={onMoveToRight}>{'>'}</button>
                <button disabled={list1Items.length == 0} onClick={onMoveAllToRight}>{'>>'}</button>
            </div>
            <div className="list">
                {list2Items.map(item => (
                    <div key={item.id} className="list-item">
                        <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxClick(item.id)} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TransferList;