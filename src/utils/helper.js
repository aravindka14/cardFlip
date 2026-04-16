export const convertToISO = (dateStr) => {
  if (!dateStr) return null;
  const normalized = String(dateStr).split("T")[0];
  const [year, month, day] = normalized.split("-");
  if (year && month && day) {
    return `${day}-${month}-${year}`;
  }
  return dateStr;
};