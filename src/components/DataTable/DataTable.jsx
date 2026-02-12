import { useState } from 'react';
import { users } from '@data/usersData';
import styles from './DataTable.module.css';

const paginateUsers = (users, page, itemsToShow) => {
    const TOTAL_PAGES = Math.ceil(users.length / itemsToShow);
    const from = (page - 1) * itemsToShow;
    const to = from + itemsToShow;
    const pageUsers = users.slice(from, to);

    return {
        pageUsers,
        TOTAL_PAGES,
    };
};

const sortUsers = (usersList, sortBy, isAscSorted) => {
    const usersClone = usersList.slice();
    switch (sortBy) {
        case 'id':
        case 'age': {
            if (isAscSorted) {
                return usersClone.sort((a, b) => a[sortBy] - b[sortBy]);
            } else {
                return usersClone.sort((a, b) => b[sortBy] - a[sortBy]);
            }
        }
        case 'name':
        case 'occupation': {
            if (isAscSorted) {
                return usersClone.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
            } else {
                return usersClone.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
            }
        }
        default: {
            return usersClone;
        }
    }
};

const DataTable = () => {
    const [page, setPage] = useState(1);
    const [itemsToShow, setItemsToShow] = useState(20);
    const [sortBy, setSortBy] = useState(null);
    const [isAscSorted, setAscSorted] = useState(false);

    const sortedUsers = sortUsers(users, sortBy, isAscSorted);

    const { pageUsers, TOTAL_PAGES } = paginateUsers(
        sortedUsers,
        page,
        itemsToShow
    );

    const handlePrev = () => {
        setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        setPage((prev) => prev + 1);
    };

    const handleCountChange = (event) => {
        const value = Number(event.target.value);
        setPage(1);
        setItemsToShow(value);
    };

    const handleHeaderClick = (event) => {
        const value = event.target.dataset.key;
        if (sortBy == value) {
            setAscSorted((prev) => !prev);
        } else {
            setSortBy(value);
            setAscSorted(true);
        }
        setPage(1);
    };

    return (
        <div>
            <h1>Data Table</h1>
            <table>
                <thead>
                    <tr className={styles.clickable} onClick={handleHeaderClick}>
                        {[
                            { label: 'ID', key: 'id' },
                            { label: 'Name', key: 'name' },
                            { label: 'Age', key: 'age' },
                            { label: 'Occupation', key: 'occupation' },
                        ].map(({ label, key }) => (
                            <th key={key} data-key={key}>
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pageUsers.map(({ id, name, age, occupation }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{occupation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.controls}>
                <button disabled={page == 1} onClick={handlePrev}>
                    Prev
                </button>
                <button disabled={page == TOTAL_PAGES} onClick={handleNext}>
                    Next
                </button>
                <span>
                    Number of users -
                    <select value={itemsToShow} onChange={handleCountChange}>
                        {[5, 10, 20].map((count) => (
                            <option key={count.toString()}>{count}</option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
    );
};

export default DataTable;
