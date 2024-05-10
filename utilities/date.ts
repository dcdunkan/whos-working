export function getMonth(year: number, month: number) {
  const date = new Date(year, month + 1, 0);
  return {
    days: date.getDate(),
    name: date.toLocaleString("default", { month: "long" }),
  };
}
