import { getCampaign } from "@/lib/campaign";
import styles from "./page.module.scss";
import Link from "next/link";

export default async function Home() {
  const campaign = await getCampaign();

  
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>¡¡¡Gracias!!!</h1>
        <p>Pronto verás tu donación en la <Link href="/" className={styles.link}>página principal</Link></p>
      </div>
    </div>
  );
}
