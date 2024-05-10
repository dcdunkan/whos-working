import { DayData } from "../types.ts";

export const kv = await Deno.openKv();

export async function writeItems(key: Deno.KvKey, value: DayData[]) {
  await kv.set(key, value);
}
