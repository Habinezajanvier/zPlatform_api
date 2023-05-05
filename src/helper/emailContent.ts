const { VERIFICATION_HOST } = process.env;

/**
 * createEmailVerification content
 * @param token 
 * @returns 
 */
export const verifyEmailContent = (token: string): string => {
  const link = `${VERIFICATION_HOST}/verify?token=${token}`;
  const mail = `
    <p>Click on this <a href="${link} target="_blank" rel="noreferrer">link</a> to verify your email</p>
    `;
  return mail;
};
/**
 * resetPasswordEmail content
 * @param token 
 * @returns 
 */
export const resetPasswordEmailContent = (token: string): string => {
  const link = `${VERIFICATION_HOST}/reset/?token=${token}`;
  const mail = `
    <p>Click on this <a href="${link} target="_blank" rel="noreferrer">link</a> to reset your password</p>
    `;
  return mail;
};

export const sendOtpEmail = (otp: string | number):string => {
  return `<p>Your OTP to use on z-platform is <strong>otp</strong></p>`
}
