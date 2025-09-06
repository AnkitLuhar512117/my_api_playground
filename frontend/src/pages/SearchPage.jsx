// src/pages/SearchPage.jsx
import { useState } from "react";
import { api } from "../services/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const { data } = await api.get("/search", { params: { q: query } });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Search</h1>

      <div className="flex gap-2">
        <input
          placeholder="Search by keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 border rounded-xl"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
        >
          Go
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {results.map((r, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 bg-white dark:bg-gray-800"
            >
              <h2 className="font-semibold">{r.title}</h2>
              <p className="text-sm text-gray-600">{r.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {r.owner.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-col gap-1">
                {r.links?.map((l, i) => (
                  <a
                    key={i}
                    href={l}
                    target="_blank"
                    className="text-indigo-600 underline text-sm"
                  >
                    {l}
                  </a>
                ))}
              </div>
              <p className="text-xs mt-1 text-gray-500">by {r.owner.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
