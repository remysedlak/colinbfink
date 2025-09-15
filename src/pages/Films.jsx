import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

function Films() {
  const [films, setFilms] = useState([]);
  const [sortOrder, setSortOrder] = useState("oldest");
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    fetch("/data/films.json")
      .then((res) => res.json())
      .then((data) => setFilms(Array.isArray(data.films) ? data.films : []))
      .catch(() => setFilms([]));
  }, []);

  const allGenres = useMemo(() => {
    const genreSet = new Set();
    films.forEach((film) => {
      if (Array.isArray(film.genre)) {
        film.genre.forEach((g) => genreSet.add(g));
      } else if (typeof film.genre === "string") {
        genreSet.add(film.genre);
      }
    });
    return Array.from(genreSet).sort();
  }, [films]);

  const displayedFilms = useMemo(() => {
    let filtered = films;
    if (genreFilter) {
      filtered = films.filter((film) => {
        if (Array.isArray(film.genre)) {
          return film.genre.includes(genreFilter);
        } else if (typeof film.genre === "string") {
          return film.genre === genreFilter;
        }
        return false;
      });
    }
    return [...filtered].sort((a, b) => {
      if (sortOrder === "earliest") {
        return (a.date || "").localeCompare(b.date || "");
      } else {
        return (b.date || "").localeCompare(a.date || "");
      }
    });
  }, [films, sortOrder, genreFilter]);

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-4xl text-center mb-2">My Films</h1>
        <div className="flex gap-4 items-center my-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-4 py-2 rounded text-xl"
          >
            <option value="earliest">Earliest</option>
            <option value="oldest">Most recent</option>
          </select>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border px-4 py-2 rounded text-xl"
          >
            <option value="">All Genres</option>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 md:px-32 lg:px-32 xl:px-64">
        {displayedFilms.map((film, i) => (
          <Link
            key={i}
            to={`/films/${encodeURIComponent(film.title)}`}
            className="flex flex-col items-center text-center"
          >
            {film.image ? (
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-auto aspect-[3/4] object-top rounded shadow"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-auto aspect-[3/4] bg-gray-200 flex items-center justify-center rounded">
                <span className="text-sm text-gray-500">No Image</span>
              </div>
            )}
            <span className="italic font-semibold mt-3 text-lg">{film.title}</span>
            <span className="text-md text-gray-600">
              ({film.date ? film.date.slice(0, 4) : ""})
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Films;
