export const login = {
  title: "Log in to your account",
  form: {
    fields: {
      email: "Email",
      password: {
        label: "Password",
        help: "Forgot your password?",
      },
    },
    button: "Log in",
  },
  footer: {
    link1: {
      text: "Don't have an account?",
      linkText: "Create an account",
    },
  },
  errors: {
    401: "Invalid credentials",
    404: "User not found or not verified",
  },
};
