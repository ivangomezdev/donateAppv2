import { getPaymentById, WebhokPayload } from "@/lib/mercadopago";
import { confirmPurchase } from "@/lib/purchases";

export async function POST(request: Request, { params }) {
  const body: WebhokPayload = await request.json();

  const mpPayment = await getPaymentById(body.data.id);

  if (body.type === "payment") {
    const mpPayment = await getPaymentById(body.data.id);

    if (mpPayment.status === "approved") {
      console.log(`Payment ${mpPayment.id} approved`);

      const purchaseId = mpPayment.external_reference;
      console.log(purchaseId,"REF EXTERNA PARA VNCULAR CON EL USERID");
      
      await confirmPurchase(purchaseId);
    }
  }

  return Response.json({ received: true });
}
