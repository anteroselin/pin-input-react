export const getPinStatus = async (pin: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const status = Math.random() > 0.5 ? "Valid" : "InValid";
  return status;
}