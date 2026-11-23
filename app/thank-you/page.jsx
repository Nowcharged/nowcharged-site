import styles from '../faq/support.module.css';

export const metadata = {title:'Preview status'};
export default function Status(){return <main className={styles.shell} id="main-content"><section className={styles.receipt}><p className={styles.kicker}>Request status</p><span className={styles.pill}>Preview only</span><h1>No request was sent.</h1><p>This is a demonstration. No booking was made and no callback was scheduled.</p><div className={styles.actions}><a href="/request">Back to request preview →</a><a href="/">Return home →</a></div></section></main>}
