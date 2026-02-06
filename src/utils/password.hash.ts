import bcrypt from "bcryptjs";

export const passwordHashed = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

export const generateOtp = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  return otp;
};

export const expiresAt = async () => {
  const expired = new Date(Date.now() + 5 * 60 * 1000);

  return expired;
};
