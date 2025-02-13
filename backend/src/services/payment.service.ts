import type { Stripe } from "stripe";

export default class PaymentService {
  private readonly stripe: Stripe;

  constructor() {
    console.log("THIS STRIPE", this.stripe);
    console.log("STRIPE_PRIVATE_API_KEY", process.env.STRIPE_PRIVATE_API_KEY);
    this.stripe = require("stripe")(process.env.STRIPE_PRIVATE_API_KEY!);
    console.log("THIS STRIPE", this.stripe);
  }

  async createLineItems() {}
  async createSession() {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Mon produit",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment/success", // visuel, aucunement fonctionnel
      cancel_url: "http://localhost:5173/payment/cancel",
    });
    return session;
  }
}
