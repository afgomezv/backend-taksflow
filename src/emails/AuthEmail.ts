import { transporter } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const info = await transporter.sendMail({
      from: "TaskFlow <admin@taskflow.com>",
      to: user.email,
      subject: "TaskFlow - Confirmar tu cuenta",
      html: `<p>Hola: ${user.name}, has creado tu cuenta en TaskFlow, ya casi esta lista, solo debes confirmar tu cuenta</p>
          <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
          <a href="">Confirma cuenta</a>
          <p>Ingresa el siguiente código: <b>${user.token}</b></p>
          <p>Es código expira en 10 minutos</p>
          `,
    });

    console.log("Mensaje Enviado", info.messageId);
  };
}
