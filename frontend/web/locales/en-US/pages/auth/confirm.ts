export const confirm = {
  title: "Confirm Your Account",
  description: "Your account is being confirmed.",
  success: {
    title: "Account Confirmed",
    description: "Your account has been successfully confirmed.",
  },
  error: {
    400: {
      title: "Invalid Token",
      description: "Account confirmation failed due to an invalid token.",
    },
    404: {
      title: "Invalid Token",
      description:
        "The user has already been confirmed, or the user does not exist.",
    },
  },
  footer: {
    link1: {
      text: "Already confirmed your account?",
      linkText: "Log in",
    },
    link2: {
      text: "Verification email expired?",
      linkText: "Request a new one",
    },
  },
};
