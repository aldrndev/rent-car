declare module "midtrans-client" {
  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });

    createTransaction(parameter: unknown): Promise<{
      token: string;
      redirect_url: string;
    }>;
  }

  export class CoreApi {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });

    transaction: {
      notification(notificationJson: unknown): Promise<{
        transaction_status: string;
        fraud_status: string;
        order_id: string;
        [key: string]: unknown;
      }>;
    };
  }
}
