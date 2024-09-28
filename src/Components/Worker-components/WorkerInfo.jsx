import React from 'react';

export function WorkerInfo() {
  return (
    <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md">
      <h3 className="text-lg font-semibold">Worker Information</h3>
      <p className="mt-2"><strong>Profession:</strong> Barber</p>
      <p className="mt-2"><strong>Experience:</strong> More than 5 years</p>
      <div className="flex gap-2 mt-2">
        <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full">Beard Styles</span>
        <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full">Hair Blurring</span>
      </div>
    </div>
  );
}