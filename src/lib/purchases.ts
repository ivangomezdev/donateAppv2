import { Op } from "sequelize";
import { Payment } from "../model/users";

type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};

export async function getConfirmedPayments(): Promise<Purchase[]> {

  const data = await Payment.findAll({
    where: { status: 'confirmed' },
  });

 
    const mapData = data.map(i=>{
      return i.dataValues
    })

  return mapData
  
}

export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  await Payment.sync({ alter: true });
  const purchase = {
    ...newPurchInput,
    date: new Date(),
    status: "pending",
  };

  const createDbPayment = await Payment.create(purchase);

  await createDbPayment.save();

  const idPay = createDbPayment.getDataValue("id");

  return idPay;
}

export async function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB

  await Payment.update(
    { status: "confirmed" },
    {
      where: {
        id: purchaseId,
      },
    }
  );

  console.log(`Purchase ${purchaseId} confirmed`);

  return true;
}
