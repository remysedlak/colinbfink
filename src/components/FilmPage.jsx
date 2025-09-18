import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Same utility function from Films component
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Function to find film by slug
const findFilmBySlug = (films, slug) => {
  return films.find(film => createSlug(film.title) === slug);
};

export default function FilmPage() {
  const { title: slug } = useParams(); // Now this is a slug, not encoded title
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch("/data/films.json")
      .then((res) => res.json())
      .then((data) => {
        const found = findFilmBySlug(data.films, slug);
        setFilm(found || null);
      });
  }, [slug]);

  if (!film) {
    return <h2 className="text-center mt-10">Film not found</h2>;
  }

  return (
    <div className="p-8 flex flex-col items-center">
      {film.image && (
        <img
          src={film.image}
          alt={film.title}
          className="w-64 h-auto rounded shadow mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{film.title}</h1>
      <p className="text-gray-600 mb-2">{film.date}</p>
      <p className="max-w-2xl text-center">{film.description || "No description available."}</p>
    </div>
  );
}