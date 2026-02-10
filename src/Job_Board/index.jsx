import { useState, useEffect } from "react";
import "./styles.css";

async function getJobIds() {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
    const data = await res.json();
    return data;
}

async function getJobDetails(id) {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const data = await res.json();
    return data;
}

const JobBoard = () => {
    const [jobIds, setJobIds] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showIndex, setShowIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            // doubt - why .then?
            const ids = await getJobIds();
            setJobIds(ids);
            setIsLoading(false);
        }
        loadInitialData();
    }, []);

    useEffect(() => {
        if (jobIds.length) {
            onLoadMoreJobs();
        }
    }, [jobIds]);

    const onLoadMoreJobs = async () => {
        if (isLoading) return;
        const newJobs = [];
        setIsLoading(true);
        for (let i = showIndex; i < (showIndex + 6) && (i < jobIds.length); i++) {
            const details = await getJobDetails(jobIds[i]);
            newJobs.push(details);
        }
        setShowIndex(prev => prev + 6);
        setJobs(prev => [...prev, ...newJobs]);
        setIsLoading(false);
    }

    return (
        <div>
            <div className="jobs">
                {jobs.map(job => (
                    <div key={job.id.toString()}>
                        {job.url ? <a href={job.url}>{job.title}</a> : `${job.title}`}
                    </div>
                ))}
            </div>
            <button onClick={onLoadMoreJobs}>
                {isLoading ? 'Loading...' : 'Load More'}
            </button>
        </div>
    )
}

export default JobBoard;