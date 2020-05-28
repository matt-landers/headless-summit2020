export const scrub = (text: string) => {
  if (!text) return "";
  let newText: string;
  newText = text.replace(/src="https:\/\//g, `src="/api/proxy/`);
  newText = newText.replace(/(?=(width|height|style)\=")(.*?)(?=" )./g, "");
  return newText;
};

export const clone = (o: any) => JSON.parse(JSON.stringify(o));
