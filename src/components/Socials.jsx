function Socials() {
  return (
    <ul className="flex flex-col grid-cols-2 gap-4 mt-8">
      <li className="flex flex-row gap-x-2">
        <img
          src="public/icons/linkedin.svg"
          alt="LinkedIn"
          className="size-7"
        />
        <a
          className="hover:underline text-2xl"
          href="https://www.imdb.com/name/nm1234567/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </li>
      <li className="flex flex-row gap-x-2">
        <img
          src="public/icons/instagram.svg"
          alt="Instagram"
          className="size-7"
        />
        <a
          className="hover:underline text-2xl"
          href="https://www.imdb.com/name/nm1234567/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li className="flex flex-row gap-x-2">
        <img src="public/icons/imdb.svg" alt="IMDB" className="size-7" />
        <a
          className="hover:underline text-2xl"
          href="https://www.imdb.com/name/nm16958516/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IMDb
        </a>
      </li>
      <li className="flex flex-row gap-x-2">
        <img src="public/icons/X.svg" alt="Twitter" className="size-7" />
        <a
          className="hover:underline text-2xl"
          href="https://twitter.com/ColinBFink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </li>
      <li className="flex flex-row gap-x-2">
        <img src="public/icons/youtube.png" alt="Youtube" className="size-7" />
        <a
          className="hover:underline text-2xl"
          href="https://www.youtube.com/channel/UC123456789"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube
        </a>
      </li>
      <li className="flex flex-row gap-x-2">
        <img src="public/icons/vimeo.png" alt="Vimeo" className="size-7" />
        <a
          className="hover:underline text-2xl"
          href="https://www.vimeo.com/ColinBFink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vimeo
        </a>
      </li>
      <li className="flex flex-row gap-x-2">
        <img
          src="public/icons/facebook.svg"
          alt="Facebook"
          className="size-7"
        />
        <a
          className="hover:underline text-2xl"
          href="https://www.facebook.com/ColinBFink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </li>
    </ul>
  );
}
export default Socials;
