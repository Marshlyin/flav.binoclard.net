export const mapObjetKeysToSelectOption = <T>(obj: Object) => {
  return (Object.keys(obj) as T[]).map((key) => ({
    value: key,
    label: (key as string)
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase()),
  }));
};
