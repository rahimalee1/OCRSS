declare module "nodemailer" {
  export interface TransportAuth {
    user?: string;
    pass?: string;
  }

  export interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: TransportAuth;
  }

  export interface SendMailOptions {
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
  }

  export interface Transporter {
    sendMail(mailOptions: SendMailOptions): Promise<unknown>;
  }

  export function createTransport(options: TransportOptions): Transporter;
}


