import * as nodemailer from "nodemailer";

export default class GMailService {
  private _transporter: nodemailer.Transporter;
  constructor() {
    this._transporter = nodemailer.createTransport(
      `smtps://<yourmail-Id>:<your-password>@smtp.gmail.com`
    );
  }
  sendMail(to: string, subject: string, content: string): Promise<void> {
    let options = {
      from: "mukul.vaidya11@gmail.com",
      to: to,
      subject: subject,
      text: content
    };

    return new Promise<void>(
      (resolve: (msg: any) => void, reject: (err: Error) => void) => {
        this._transporter.sendMail(options, (error, info) => {
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
