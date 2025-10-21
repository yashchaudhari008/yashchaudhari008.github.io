import { useEffect, useState } from "react";
import styles from "./appListing.module.scss";
import axios from "axios";
import { FaCode, FaCodeFork, FaGithub, FaStar, FaUpRightFromSquare } from "react-icons/fa6";

type AppDetails = {
    id: number;
    name: string;
    description: string;
    archived: boolean;
    html_url: string;
    homepage: string;
    forks: number;
    stargazers_count: number;
    language: string;
}
type AppDetails_List = AppDetails[];

const AppListing = () => {
    const [appList, setAppList] = useState<AppDetails[]>([]);

    useEffect(() => {
        axios.get<AppDetails_List>("https://api.github.com/users/yashchaudhari008/repos").then(
            response => {
                const data: AppDetails_List = response.data.filter((app: AppDetails) => !app.name.startsWith("yashchaudhari008"))
                    .sort(
                        (repo1, repo2) => {
                            // archived last: treat archived true as 1, false as 0
                            const repo1Archived = repo1.archived ? 1 : 0;
                            const repo2Archived = repo2.archived ? 1 : 0;
                            if (repo1Archived !== repo2Archived) return repo1Archived - repo2Archived; // non-archived (0) before archived (1)

                            // within each group sort by total = forks + stars (descending)
                            const repo1Total = (repo1.forks || 0) + (repo1.stargazers_count || 0);
                            const repo2Total = (repo2.forks || 0) + (repo2.stargazers_count || 0);
                            if (repo2Total !== repo1Total) return repo2Total - repo1Total;

                            return 0;
                        }
                    )
                setAppList(data);
            }
        ).catch(
            error => console.error("Failed to fetch repository data", error)
        )
    }, []);

    return (
        <div className={styles.appListing}>
            <div className={styles.cardHolder}>
                {appList.map((entry) => {
                    return <div key={entry.id} id={entry.name} className={styles.card}>
                        <div className={styles.cardStats}>
                            <div className={styles.cardStatV1}>
                                <FaCode className={styles.cardStatIcon} />
                                <p>{entry.language}</p>
                            </div>
                        </div>
                        <div className={styles.cardHeader}>
                            <h1 title={entry.name}>{entry.name}</h1>
                            <div className={styles.cardHeaderIconHolder}>
                                <a href={entry.html_url} target="_blank" rel="noopener noreferrer">
                                    <FaGithub className={styles.cardHeaderIcon} title="Github Page" />
                                </a>
                                {entry.homepage && <a href={entry.homepage} target="_blank" rel="noopener noreferrer">
                                    <FaUpRightFromSquare className={styles.cardHeaderIcon} title="App Link" />
                                </a>}
                            </div>
                        </div>
                        <div className={styles.cardStats}>
                            {entry.archived && <div className={styles.cardStat}>
                                <p>Archived</p>
                            </div>}
                            <div className={styles.cardStat}>
                                <FaCodeFork className={styles.cardStatIcon} />
                                <p>{entry.forks}</p>
                            </div>
                            <div className={styles.cardStat}>
                                <FaStar className={styles.cardStatIcon} />
                                <p>{entry.stargazers_count}</p>
                            </div>
                        </div>
                        {entry.description && <div className={styles.cardDescription}>
                            <p>{entry.description}</p>
                        </div>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default AppListing