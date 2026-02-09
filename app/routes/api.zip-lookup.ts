import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getStateAbbr } from "~/lib/mexican-states";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("zip_code") ?? "";

  if (!/^\d{5}$/.test(code)) {
    return json({ error: "Invalid zip code" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://sepomex.icalialabs.com/api/v1/zip_codes?zip_code=${code}&per_page=200`
    );

    if (!res.ok) {
      return json(
        { error: "Upstream API error" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const records = data.zip_codes;

    if (!records || records.length === 0) {
      return json(
        { error: "ZIP code not found" },
        { status: 404 }
      );
    }

    const first = records[0];
    const rawState = first.d_estado ?? "";
    const state = getStateAbbr(rawState) ?? "";
    const city = first.d_ciudad || first.d_mnpio || "";

    const coloniesSet = new Set<string>();
    for (const record of records) {
      if (record.d_asenta) {
        coloniesSet.add(record.d_asenta);
      }
    }
    const colonies = [...coloniesSet].sort((a, b) => a.localeCompare(b, "es"));

    return json(
      { state, city, colonies },
      { headers: { "Cache-Control": "public, max-age=86400" } }
    );
  } catch {
    return json(
      { error: "Failed to fetch ZIP data" },
      { status: 502 }
    );
  }
}
