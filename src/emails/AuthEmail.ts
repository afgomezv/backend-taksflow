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
          <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma cuenta</a>
          <p>Ingresa el siguiente código: <b>${user.token}</b></p>
          <p>Es código expira en 10 minutos</p>
          `,
    });

    console.log("Mensaje Enviado", info.messageId);
  };

  static sendPasswordResetToken = async (user: EmailType) => {
    const info = await transporter.sendMail({
      from: "TaskFlow <admin@taskflow.com>",
      to: user.email,
      subject: "TaskFlow - Reestablece tu contraseña",
      html: `<p>Hola: ${user.name}, has solicitado reestablecer tu contraseña</p>
          <p>Para reestablecer tu contraseña, haz click en el siguiente enlace:</p>
          <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer contraseña</a>
          <p>Ingresa el siguiente código: <b>${user.token}</b></p>
          <p>Es código expira en 10 minutos</p>
          `,
    });

    console.log("Mensaje Enviado", info.messageId);
  };
}
