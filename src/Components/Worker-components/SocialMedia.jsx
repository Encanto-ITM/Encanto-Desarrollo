import React from 'react';

export function SocialMedia() {
  return (
    <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md">
      <h3 className="text-lg font-semibold">Social Media</h3>
      <div className="flex gap-4 mt-2">
        <a href="https://facebook.com" className="text-blue-600">Facebook</a>
        <a href="https://instagram.com" className="text-purple-600">Instagram</a>
        <a href="https://twitter.com" className="text-blue-400">Twitter</a>
      </div>
    </div>
  );
}