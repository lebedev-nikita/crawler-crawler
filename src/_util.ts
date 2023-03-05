export const fmtError = (str: string, details: any) => {
  return ["#Error:", str, JSON.stringify(details, null, 2)].join("\n");
};
