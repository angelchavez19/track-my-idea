export const refreshEmailVerification = {
  title: "Pedir un correo de verificación",
  form: {
    button: "Enviar",
  },
  footer: {
    link1: {
      text: "¿Ya has verificado tu cuenta?",
      linkText: "Inicia sesión",
    },
  },
  success: "Se a enviado un correo de verificación a tu correo electrónico.",
  errors: {
    404: "No se encontró el usuario.",
    409: "El correo ya a sido verificado.",
  },
};
