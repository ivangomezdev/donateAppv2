// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_TOKEN as string,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

const BASE_URL = process.env.VERCEL_URL || "donate-appv2.vercel.app";

// Step 3: Initialize the API object
const pref = new Preference(client);

type CreatePrefOptions = {
  productName: string;
  productDescription: string;
  productId: string;
  productPrice: number;
  transactionId: string;
};

export async function createSingleProductPreference(
  options: CreatePrefOptions
) {
  return pref.create({
    body: {
      items: [
        {
          id: options.productId,
          title: options.productName,
          description: options.productDescription,
          quantity: 1,
          currency_id: "ARS",
          unit_price: options.productPrice,
        },
      ],

      back_urls: {
        success: "https://" + BASE_URL + "donate/success",
        failure: "https://" + BASE_URL + "/donate/failure",
        pending: "https://" + BASE_URL + "/donate/pending",
      },

      external_reference: options.transactionId,
    },
  });
}

export async function getPaymentById(id: string) {
  const payment = new Payment(client);
  return payment.get({ id });
}

export type WebhokPayload = {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
};
