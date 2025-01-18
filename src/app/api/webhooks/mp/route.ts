import { getPaymentById, WebhokPayload } from "@/lib/mercadopago";
import { confirmPurchase } from "@/lib/purchases";
import { sequelize } from "../../../../lib/sequelize";
import { Payment } from "../../../../model/users";

export async function POST(request: Request, { params }) {
  await sequelize.sync({ force: true });
  const body: WebhokPayload = await request.json();
  console.log("Webhook received", body);
  
  if (body.type === "payment") {
    const mpPayment = await getPaymentById(body.data.id);
    if (mpPayment.status === "approved") {
      console.log(`Payment ${mpPayment.id} approved`);
      const jane = Payment.build({ id: mpPayment.id })
      const purchaseId = mpPayment.external_reference;
      
      await confirmPurchase(purchaseId);
    }
  }

  // Se le responde a MP siempre (si o si) para que no vuelva a llamar a este endpoint
  // con el mismo pago, aunque puede suceder
  return Response.json({ received: true });
}
