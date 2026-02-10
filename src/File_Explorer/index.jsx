import { useState, useCallback, useEffect } from "react";
import "./styles.css";

const FileExplorer = ({ data }) => {
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

    return (
        <File data={data} handleFolderClick={handleFolderClick} folderOpen={folderOpen} />
    )
}

const File = ({ data, handleFolderClick, level = 0, folderOpen }) => {
    return (<div>
        {data.map(item => {
            if (item.children) {
                const folderExpanded = folderOpen.includes(item.id);
                return (
                    <div key={item.id.toString()} style={{ paddingLeft: 10 * level }}>
                        <div onClick={() => handleFolderClick(item.id)} className="folder">{item.name}{folderExpanded ? '[-]' : '[+]'}</div>
                        {folderExpanded && <File level={level + 1} data={item.children} folderOpen={folderOpen} handleFolderClick={handleFolderClick} />}
                    </div>
                )
            } else {
                return <div key={item.id.toString()} style={{ paddingLeft: 10 * level }}>{item.name}</div>
            }
        })}
    </div>)
}
export default FileExplorer;