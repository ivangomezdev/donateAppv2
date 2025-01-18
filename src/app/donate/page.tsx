import { getCampaign } from "@/lib/campaign";
import { DonationForm } from "./form";
import styles from "./page.module.scss";
import Link from "next/link";

export default async function Home() {
  const campaign = await getCampaign();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{campaign.title}</h1>
          <h2 className={styles.subtitle}>
            Con tu donación me ayudás a acercarme mi objetivo.
          </h2>
        </div>
        <DonationForm />
        <div>
          <Link href="/" className={styles.backLink}> &lt; Volver</Link>
        </div>
      </div>
    </div>
  );
}
