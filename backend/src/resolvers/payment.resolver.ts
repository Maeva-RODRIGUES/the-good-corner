import PaymentService from "@/services/payment.service";

export default {
  Query: {
    async createSession(_: any, { productSessionInput }: any) {
      console.log(productSessionInput);
      const paymentService = new PaymentService();
      return await paymentService.createSession();
    },
  },
};
