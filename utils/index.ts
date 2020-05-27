export const scrub = (text: string) => {
  if (!text) return "";
  let newText: string;

  newText = text.replace(/src="https:\/\//g, `src="/api/proxy/`);
  return newText;
};

export const clone = (o: any) => JSON.parse(JSON.stringify(o));
