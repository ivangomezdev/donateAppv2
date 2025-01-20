
import styles from "./page.module.scss";
import { getConfirmedPayments } from "@/lib/purchases";
import { getCampaign } from "@/lib/campaign";
import Link from "next/link";
import { sequelize } from "@/lib/sequelize";


export default async function Home() {
  const confirmed = await getConfirmedPayments();
  const totalDonations = confirmed.reduce((a, b) => a + b.amount, 0);
  const campaign = await getCampaign();
  const donationsGoal = campaign.amount;
  const progressPercent = Math.round((totalDonations / donationsGoal) * 100);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>ChangeDonateApp</h1>
        <div className={styles.goal}>
          <img
            className={styles.goalImg}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvfkAPPRs9Xo1SQ-EoiztC5Oz1yzoyF7_TjA&s"
          />
          <div className={styles.goalTexts}>
            <h2 className={styles.goalTitle}>{campaign.title}</h2>
            <div className={styles.goalDonations}>
              <span className={styles.totalDonations}>${totalDonations.toLocaleString()}</span>{" "}/{" "}
              ${donationsGoal.toLocaleString()}
            </div>
            <div
              className={styles.goalProgressBar}
              style={{ "--progress": progressPercent } as any}
            ></div>
            <p className={styles.goalDesc} dangerouslySetInnerHTML={{ __html: campaign.description.replace(/\n/g, "<br>") }} />
          </div>
        </div>
        <div className={styles.donations}>
          {confirmed.map((i) => (
            <div
              key={i.id}
              className={styles.donation}
            >
              <div className={styles.donationAmount}>
                ${i.amount.toLocaleString()}
              </div>
              <div className={styles.donationText}>
                <span>
                  {i.message}
                </span>
                <span>
                  {i.from}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Link href='/donate' className={styles.donateButton}>Sumate a la causa</Link>
      </div>
    </div>
  );
}
