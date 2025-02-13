export const refreshEmailVerification = {
  title: "Request a verification email",
  form: {
    button: "Send",
  },
  footer: {
    link1: {
      text: "Already verified your account?",
      linkText: "Log in",
    },
  },
  success: "A verification email has been sent to your email address.",
  errors: {
    404: "User not found.",
    409: "The email has already been verified.",
  },
};
