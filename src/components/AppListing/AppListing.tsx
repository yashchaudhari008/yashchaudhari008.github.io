import styles from "./appListing.module.scss";

const appList = [];

const AppListing = () => {
    return (
        <div className={styles.appListing}>
            <div className={styles.cardHolder}>
                {appList.filter(entry => !entry.archived).map((entry) => {
                    return <div key={entry.id} id={entry.name} className={styles.card}>
                        <h1>{entry.name}</h1>
                        <p>{entry.description}</p>
                    </div>
                })}

            </div>
            <div className={styles.break}></div>
            <div className={styles.cardHolder}>
                {appList.filter(entry => entry.archived).map((entry) => {
                    return <div key={entry.id} id={entry.name} className={styles.card}>
                        <h1>{entry.name}</h1>
                        <p>{entry.description}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default AppListing