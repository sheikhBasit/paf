// lib/api.ts
export const fetchNews = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
    const url = `https://gnews.io/api/v4/search?q=sports&country=pk&lang=en&max=6&apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch news");
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
