"use server";

import { createSingleProductPreference } from "@/lib/mercadopago";
import { createPurchase } from "@/lib/purchases";
import { redirect } from "next/navigation";

export async function donateAction(data: FormData) {
  const name = data.get("name") as string;
  const message = data.get("message") as string;
  const amount = Number(data.get("amount"));

  const newPurchId = await createPurchase({
    from: name,
    amount,
    message: message,
  });

  const newPref = await createSingleProductPreference({
    productName: "Donation",
    productDescription: message as string,
    productId: newPurchId,
    productPrice: amount,
    transactionId: newPurchId,
  })
  

  redirect(newPref.init_point);
}
