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
  // Mock data
  return [
    {
      id: "1",
      from: "Pepito",
      amount: 33000,
      message: "Ahi te va mi aporte",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: "2",
      from: "Juanita",
      amount: 54000,
      message: "Apoyo esta campaña",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: "3",
      from: "Pepita",
      amount: 60000,
      message: "Ojalá que llegues",
      date: new Date(),
      status: "confirmed",
    },
  ];
}

export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  await Payment.sync({ alter: true });
  const purchase = {
    ...newPurchInput,
    date: new Date(),
    status: "pending",
    mp_payment_id: null,
  };

  const createDbPayment = await Payment.create(purchase);
  const idPayment = createDbPayment.id;
  
  await createDbPayment.save();

  
  return idPayment;
}

export function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB
  console.log(`Purchase ${purchaseId} confirmed`);

  return true;
}
