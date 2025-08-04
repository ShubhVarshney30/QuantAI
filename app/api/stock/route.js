// app/api/stock/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbolsParam = searchParams.get("symbols"); // e.g. AAPL,GOOGL,MSFT
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!symbolsParam) {
    return NextResponse.json({ stocks: [] });
  }

  const symbols = symbolsParam.split(",").join(","); // comma-separated string

  const url = `https://api.twelvedata.com/price?symbol=${symbols}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    let results = [];

    // If multiple stocks, it's an object with symbol keys
    if (!Array.isArray(data)) {
      for (const symbol in data) {
        const item = data[symbol];
        results.push({
          symbol,
          price: item?.price || "N/A",
        });
      }
    } else {
      // Single stock response
      results = [{
        symbol: data?.symbol || "N/A",
        price: data?.price || "N/A",
      }];
    }

    return NextResponse.json({ stocks: results });
  } catch (err) {
    console.error("TwelveData API error:", err);
    return NextResponse.json({ stocks: [] }, { status: 500 });
  }
}
