export const login = {
  title: "Inicia sesión en tu cuenta",
  form: {
    fields: {
      email: "Correo electrónico",
      password: {
        label: "Contraseña",
        help: "¿Olvidaste tu contraseña?",
      },
    },
    button: "Iniciar sesión",
  },
  footer: {
    link1: {
      text: "¿No tienes una cuenta?",
      linkText: "Crea una cuenta",
    },
  },
  errors: {
    401: "Credenciales inválidas",
    404: "Usuario no encontrado o no verificado",
  },
};
