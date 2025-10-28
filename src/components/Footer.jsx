// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-10 py-6 px-6 md:px-12 text-center text-gray-600 text-sm md:text-base">
      <p className="mb-2">© {new Date().getFullYear()} Monteput d.o.o. Sva prava zadržana.</p>
      <p>
        Dizajn i izrada:{" "}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Monteput Dev Team
        </a>
      </p>
    </footer>
  );
}
