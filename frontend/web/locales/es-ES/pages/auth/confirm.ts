export const confirm = {
  title: "Confirma tu cuenta",
  description: "Tu cuenta está siendo confirmada.",
  success: {
    title: "Cuenta confirmada",
    description: "Tu cuenta ha sido confirmada con éxito.",
  },
  error: {
    400: {
      title: "Token inválido",
      description:
        "La confirmación de la cuenta falló debido a un token inválido.",
    },
    404: {
      title: "Token inválido",
      description: "El usuario ya ha sido confirmado o el usuario no existe.",
    },
  },
  footer: {
    link1: {
      text: "¿Ya confirmaste tu cuenta?",
      linkText: "Inicia sesión",
    },
    link2: {
      text: "¿El correo de verificación ha expirado?",
      linkText: "Solicita uno nuevo",
    },
  },
};
