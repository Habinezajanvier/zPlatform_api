/**
 * generate Otp
 * @param size
 * @returns
 */
export const otp = (size = 6): number => {
  let digits = "0123456789";
  let id = "";
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += digits[(Math.random() * 10) | 0];
  }
  return Number(id);
};
