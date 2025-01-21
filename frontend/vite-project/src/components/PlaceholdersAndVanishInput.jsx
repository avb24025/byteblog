import React, { useState } from 'react';

export function PlaceholdersAndVanishInput({ placeholders, onChange, onSubmit }) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const handleFocus = () => {
    setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <input
        type="text"
        placeholder={placeholders[currentPlaceholder]}
        onFocus={handleFocus}
        onChange={onChange}
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
}