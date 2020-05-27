export const scrub = (text: string) => {
  let newText: string;

  newText = text.replace(/src="https:\/\//g, `src="/api/proxy/`);
  return newText;
};
