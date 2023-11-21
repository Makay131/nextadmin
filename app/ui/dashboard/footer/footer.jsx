import styles from "./footer.module.css";

export default function footer() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Logo</div>
            <div className={styles.text}>&copy; All rights reserved.</div>
        </div>
    )
}
