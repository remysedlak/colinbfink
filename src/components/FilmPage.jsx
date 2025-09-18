import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Vimeo from '@u-wave/react-vimeo';

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

function FilmPage() {
  const { title: slug } = useParams();
  const [film, setFilm] = useState(null);
  const [imageMap, setImageMap] = useState({});

  // Helper to normalize titles for matching
  // Improved normalization: remove apostrophes, smart quotes, replace &/and, collapse spaces, lowercase
  const normalizeTitle = (title) => {
    if (!title) return '';
    let t = title.toLowerCase().trim();
    t = t.replace(/[''"""]/g, ""); // remove quotes
    t = t.replace(/\band\b/g, "&"); // replace 'and' with '&'
    t = t.replace(/&/g, "and"); // replace '&' with 'and'
    t = t.replace(/[^\w\s-]/g, ''); // remove non-word except space/hyphen
    t = t.replace(/[\s_-]+/g, '-'); // collapse spaces/hyphens
    return t;
  };

  useEffect(() => {
    // Fetch image map from films.json
    fetch("/data/films.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.films)) {
          const map = {};
          data.films.forEach(f => {
            const key = normalizeTitle(f.title);
            map[key] = f.image;
          });
          setImageMap(map);
        }
      })
      .catch(() => setImageMap({}));
  }, []);

  useEffect(() => {
    fetch("/data/letterboxd_films.json")
      .then((res) => res.json())
      .then((data) => {
        const found = findFilmBySlug(data, slug);
        setFilm(found || null);
      });
  }, [slug]);

  if (!film) {
    return <h2 className="text-center mt-10">Loading film...</h2>;
  }

  // Use image directly from letterboxd_films.json
  const rawImgSrc = film.image;
  const imgSrc = rawImgSrc && !rawImgSrc.startsWith('/') ? `/${rawImgSrc}` : rawImgSrc;
  
  console.log("Image source debug:", {
    raw: rawImgSrc,
    processed: imgSrc,
    type: typeof imgSrc,
    truthy: !!imgSrc
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Poster Section */}
        <div className="flex-shrink-0">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={film.title}
              className="w-64 h-auto rounded shadow"
              onLoad={() => console.log("✅ Image loaded successfully:", imgSrc)}
              onError={(e) => {
                console.error("❌ Image failed to load:", {
                  src: imgSrc,
                  error: e.target.error,
                  message: "Image not found or failed to load"
                });
              }}
            />
          ) : (
            <div className="w-64 h-96 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500">No poster available</span>
            </div>
          )}
        </div>

        {/* Film Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{film.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{film.date}</p>

          {/* Genres */}
          {film.genre && (
            <div className="mb-4">
              {Array.isArray(film.genre)
                ? film.genre.map((genre, i) => (
                    <span key={i} className="inline-block bg-gray-200 px-3 py-1 text-sm mr-2 mb-2 rounded">
                      {genre}
                    </span>
                  ))
                : (
                    <span className="inline-block bg-gray-200 px-3 py-1 text-sm mr-2 mb-2 rounded">
                      {film.genre}
                    </span>
                  )}
            </div>
          )}

          {/* Duration */}
          {film.duration && (
            <p className="mb-2"><strong>Duration:</strong> {film.duration}</p>
          )}

          {/* Logline */}
          {film.logline && (
            <p className="italic text-lg text-gray-700 mb-4 border-l-4 border-gray-300 pl-4">
              "{film.logline}"
            </p>
          )}

          {/* Description */}
          {film.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed">{film.description}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="flex gap-6 mb-6 text-sm text-gray-600">
            {film.watch_count && (
              <div>
                <strong>Watched:</strong> {film.watch_count}
              </div>
            )}
            {film.list_count && (
              <div>
                <strong>Lists:</strong> {film.list_count}
              </div>
            )}
            {film.like_count && (
              <div>
                <strong>Likes:</strong> {film.like_count}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <div className="flex flex-col gap-2">
              {film.letterboxd_url && (
                <a
                  href={film.letterboxd_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 flex items-center gap-1 w-fit"
                >
                  <img src="/icons/letterboxd.svg" alt="Letterboxd" className="size-6" />
                  Letterboxd
                  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--launch-inline ipc-icon--inline ipc-link__launch-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path></svg>

                </a>
              )}
              {film.imdb_url && (
                <a
                  href={film.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 flex items-center gap-1 w-fit"
                >
                  <img src="/icons/imdb.svg" alt="IMDb" className="size-6" />
                  IMDb
                  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--launch-inline ipc-icon--inline ipc-link__launch-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path></svg>

                      </a>
              )}
              {film.vimeo_url && (
                <a
                  href={film.vimeo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Vimeo
                </a>
              )}
              {film.vimeo_url2 && (
                <a
                  href={film.vimeo_url2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Vimeo (Alt)
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {film.vimeo_url && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Watch</h3>
          <div className="aspect-video bg-black rounded overflow-hidden">
            <Vimeo
              video={film.vimeo_url}
              responsive={true}
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Cast and Crew Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Cast */}
        {film.cast && film.cast.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Cast</h3>
            <div className="space-y-3">
              {film.cast.map((person, i) => (
                <div key={i} className="border-b border-gray-200 pb-2 hover:bg-gray-100">
                  <div className="font-medium text-lg">{person.name}</div>
                  {person.role && person.role !== 'Actor' && (
                    <div className="text-gray-600">{person.role}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crew */}
        {film.crew && film.crew.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Crew</h3>
            <div className="space-y-3">
              {film.crew.map((person, i) => (
                <div key={i} className="border-b border-gray-200 pb-2 hover:bg-gray-100">
                  <div className="font-medium text-lg">{person.name}</div>
                  <div className="text-gray-600">{person.position}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Technical Details */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Technical Details</h3>
        <div className="text-sm text-gray-600 space-y-1">
          {film.film_id && <div><strong>Film ID:</strong> {film.film_id}</div>}
          {film.slug && <div><strong>Slug:</strong> {film.slug}</div>}
          {film.full_display_name && <div><strong>Full Title:</strong> {film.full_display_name}</div>}
        </div>
      </div>
    </div>
  );
}

export default FilmPage;