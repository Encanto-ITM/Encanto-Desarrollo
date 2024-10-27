import React, { useState } from 'react';

export function CommentsService({ onSubmitComment }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment && rating) {
            onSubmitComment({ comment, rating });
            setComment('');
            setRating(0);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Deja tu comentario y valoración</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Escribe tu comentario..."
                    className="w-full p-2 border rounded-lg resize-none"
                    rows="4"
                />

                <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
                            onClick={() => handleStarClick(index)}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Enviar comentario
                </button>
            </form>
        </div>
    );
}