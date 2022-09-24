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
