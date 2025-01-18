import { getPaymentById, WebhokPayload } from "@/lib/mercadopago";
import { confirmPurchase } from "@/lib/purchases";

export async function POST(request: Request) {
  let body: WebhokPayload;

  try {
    body = await request.json();
    console.log("Webhook received", body);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return new Response("Invalid JSON", { status: 400 });
  }

  if (body.type === "payment") {
    let mpPayment;

    try {
      mpPayment = await getPaymentById(body.data.id);
    } catch (error) {
      console.error("Error fetching payment from MercadoPago:", error);
      return new Response("Error fetching payment", { status: 500 });
    }

    if (mpPayment.status === "approved") {
      console.log(`Payment ${mpPayment.id} approved`);
      const purchaseId = mpPayment.external_reference;

      try {
        await confirmPurchase(purchaseId);
        console.log(`Purchase ${purchaseId} confirmed`);
      } catch (error) {
        console.error("Error confirming purchase:", error);
        return new Response("Error confirming purchase", { status: 500 });
      }
    }
  }

  // Responder siempre a MercadoPago
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}