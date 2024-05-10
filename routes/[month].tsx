import { Handlers, PageProps } from "$fresh/server.ts";
import { MonthData } from "../types.ts";
import RosterPage from "../islands/RosterPage.tsx";

export const handler: Handlers<MonthData> = {
  GET(_req, ctx) {
    const [year, month] = ctx.params.month.split("-").map((x) => Number(x));
    if (
      isNaN(year) || isNaN(month) || month - 1 < 0 || month > 12 ||
      year < 2024 || year >= 2040
    ) {
      return ctx.renderNotFound();
    }
    return ctx.render({ month: month - 1, year: year });
  },
};

export default function MonthPage({ data }: PageProps<MonthData>) {
  return <RosterPage {...data} />;
}
