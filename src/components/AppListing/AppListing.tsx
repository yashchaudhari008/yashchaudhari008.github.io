import { useEffect, useState } from "react";
import styles from "./appListing.module.scss";
import axios from "axios";
import { FaCodeFork, FaGithub, FaLink, FaStar } from "react-icons/fa6";

type AppDetails = {
    id: number;
    name: string;
    description: string;
    archived: boolean;
    html_url: string;
    homepage: string;
    forks: number;
    stargazers_count: number;
}
type AppDetails_List = AppDetails[];

const AppListing = () => {
    const [appList, setAppList] = useState<AppDetails[]>([]);

    useEffect(() => {
        axios.get<AppDetails_List>("https://api.github.com/users/yashchaudhari008/repos").then(
            response => {
                const data: AppDetails_List = response.data.filter((app: AppDetails) => !app.name.startsWith("yashchaudhari008")).sort(repo =>
                    repo.archived ? 1 : -1
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
                        <div className={styles.cardHeader}>
                            <h1 title={entry.name}>{entry.name}</h1>
                            <div className={styles.cardHeaderIconHolder}>
                                {/* TODO: Use anchor tags */}
                                <FaGithub className={styles.cardHeaderIcon} title="Github" onClick={() =>
                                    window.open(entry.html_url, "_blank", "noopener noreferrer")
                                } />
                                <FaLink className={styles.cardHeaderIcon} title="Website" onClick={() =>
                                    window.open(entry.homepage, "_blank", "noopener noreferrer")
                                } />
                            </div>
                        </div>
                        <div className={styles.cardStats}>
                            <div className={styles.cardStat}>
                                <FaCodeFork className={styles.cardStatIcon} />
                                <p>{entry.forks}</p>
                            </div>
                            <div className={styles.cardStat}>
                                <FaStar className={styles.cardStatIcon} />
                                <p>{entry.stargazers_count}</p>
                            </div>
                        </div>
                        <p>{entry.description}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default AppListing