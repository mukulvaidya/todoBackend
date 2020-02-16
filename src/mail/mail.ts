import * as nodemailer from "nodemailer";

export default class GMailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(
      `smtps://mukul.vaidya11@gmail.com:mukul@9671@smtp.gmail.com`
    );
  }
  sendMail(to: string, subject: string, content: string): Promise<void> {
    let options = {
      from: "mukul.vaidya11@gmail.com",
      to: to,
      subject: subject,
      text: content
    };

    // Promisify the sendMail function
    return new Promise<void>(
      (resolve: (msg: any) => void, reject: (err: Error) => void) => {
        this.transporter.sendMail(options, (error:Error, info:any) => {
          if (error) {
            console.log(`error: ${error}`);
            reject(error);
          } else {
            console.log(`Mail Sent for expired tasks`);
            resolve(`Message Sent ${info.response}`);
          }
        });
      }
    );
  }
}
