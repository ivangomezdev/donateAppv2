import { getPaymentById, WebhokPayload } from "@/lib/mercadopago";
import { confirmPurchase } from "@/lib/purchases";


export async function POST(request: Request, { params }) {
 
  const body: WebhokPayload = await request.json();

  const mpPayment = await getPaymentById(body.data.id);
  console.log(mpPayment.status,"status");
  

  if (body.type === "payment") {
    const mpPayment = await getPaymentById(body.data.id);
    console.log(mpPayment.status,"status");
    
    if (mpPayment.status === "approved") {
      console.log(`Payment ${mpPayment.id} approved`);

      
      
      const purchaseId = mpPayment.external_reference;
      
      await confirmPurchase(purchaseId);
    }
  }


  return Response.json({ received: true });
}
