import React from "https://cdn.skypack.dev/react@18.2.0";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-6">
        CAN - Coding Anything Now
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-xl">
        Your expert coding assistant for building scalable, secure, and creative solutions.
      </p>
      <a
        href="https://github.com/poid-za/website"
        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Visit My GitHub
      </a>
    </div>
  );
}
