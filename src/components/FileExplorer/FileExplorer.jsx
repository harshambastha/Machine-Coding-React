import { useState } from "react";
import styles from "./FileExplorer.module.css";

const FileExplorer = ({ data }) => {
    const [fileData, setFileData] = useState(data);
    const [folderOpen, setFolderOpen] = useState([]);
    
    const handleFolderClick = (id) => {
        // if id is there remove else add
        const currentIndex = folderOpen.indexOf(id);
        if (currentIndex == -1) {
            setFolderOpen(prev => [...prev, id]);
        } else {
            setFolderOpen(prev => prev.filter((_, index) => index !== currentIndex));
        }
    };

    const addFolder = (parentId) => {
        const addNewFolder = (list) => {
            return list.map(item => {
                if (item.id === parentId) {
                    const newFolder = {
                        id: Date.now(),
                        name: `New Folder ${Date.now()}`,
                        children: []
                    };
                    return { ...item, children: [...(item.children || []), newFolder] };
                }
                return { ...item, ...(item.children && { children: addNewFolder(item.children) }) };
            });
        }
        setFileData(prev => addNewFolder(prev));
    }

    const deleteFolder = (id) => {
        const deleteFolderById = (list) => {
            return list.filter(item => item.id !== id).map(item => {
                if (item.children) {
                    return { ...item, children: deleteFolderById(item.children) };
                }
                return item;
            });
        }
        setFileData(prev => deleteFolderById(prev));
    }
    return (
        <File data={fileData} handleFolderClick={handleFolderClick} folderOpen={folderOpen} addFolder={addFolder} deleteFolder={deleteFolder} />
    )
}

const File = ({ data, handleFolderClick, folderOpen, addFolder, deleteFolder }) => {
    return (<div>
        {data.map(item => {
            if (item.children) {
                const folderExpanded = folderOpen.includes(item.id);
                return (
                    <div key={item.id.toString()} className={styles['folder-container']}>
                        <span onClick={() => handleFolderClick(item.id)} className={styles.folder}>{item.name}{folderExpanded ? '[-]' : '[+]'}</span>
                        <button className={styles.button} onClick={() => addFolder(item.id)}>Add</button>
                        <button className={styles.button} onClick={() => deleteFolder(item.id)}>Delete</button>
                        {folderExpanded && <File data={item.children} folderOpen={folderOpen} handleFolderClick={handleFolderClick} addFolder={addFolder} deleteFolder={deleteFolder} />}
                    </div>
                )
            } else {
                return <div key={item.id.toString()} className={styles['folder-container']}>{item.name}</div>
            }
        })}
    </div>)
}
export default FileExplorer;