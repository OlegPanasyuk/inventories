export type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function normalizeString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getPasswordErrors(password: string) {
  const errors: string[] = [];

  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  return errors;
}

export function validateSignupForm(formData: FormData) {
  const data: SignupInput = {
    firstName: normalizeString(formData.get("firstName")),
    lastName: normalizeString(formData.get("lastName")),
    email: normalizeEmail(normalizeString(formData.get("email"))),
    password: normalizeString(formData.get("password")),
  };

  const errors: NonNullable<FormState>["errors"] = {};

  if (!data.firstName) {
    errors.firstName = ["First name is required."];
  }

  if (!data.lastName) {
    errors.lastName = ["Last name is required."];
  }

  if (!data.email) {
    errors.email = ["Email is required."];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ["Enter a valid email address."];
  }

  const passwordErrors = getPasswordErrors(data.password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
  }

  return {
    data,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateLoginForm(formData: FormData) {
  const data: LoginInput = {
    email: normalizeEmail(normalizeString(formData.get("email"))),
    password: normalizeString(formData.get("password")),
  };

  const errors: NonNullable<FormState>["errors"] = {};

  if (!data.email) {
    errors.email = ["Email is required."];
  }

  const passwordErrors = getPasswordErrors(data.password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
  }

  return {
    data,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}