function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-1 px-4 text-center text-xs ">
        <p>
          Colin Fink © 2025 • Built by{' '}
          <a 
            href="https://remysedlak.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-gray-300 inline-flex items-center gap-1"
          >
            Remy Sedlak
            <svg
              width="8"
              height="8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline"
            >
              <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
            </svg>
          </a>
        </p>
      </footer>
    )
}
export default Footer;