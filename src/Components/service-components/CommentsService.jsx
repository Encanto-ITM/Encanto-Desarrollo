import React, { useState, useEffect } from 'react';

export function CommentsService({ serviceId, userId, initialComment = '', initialRating = 0, onClose, commentId }) {
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating);
  const [hasCommented, setHasCommented] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const hasCommentedKey = `hasCommented_${serviceId}_${userId}`;
    const previouslyCommented = localStorage.getItem(hasCommentedKey);

    if (previouslyCommented) {
      setHasCommented(true);
    }

    if (!token) return;

    const checkIfCommented = async () => {
      try {
        const response = await fetch(`https://tulookapiv2.vercel.app/api/api/comments/${userId}/service`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setHasCommented(true);
            localStorage.setItem(hasCommentedKey, 'true');
          }
        } 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkIfCommented();
  }, [serviceId, userId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const commentData = {
      user_id: userId,
      service_id: serviceId,
      comment: comment,
      rate: rating,
    };

    try {
      const method = commentId ? 'PUT' : 'POST';
      const url = commentId ? `https://tulookapiv2.vercel.app/api/api/comments/${commentId}` : 'https://tulookapiv2.vercel.app/api/api/comments';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setHasCommented(true);
      localStorage.setItem(`hasCommented_${serviceId}_${userId}`, 'true');
      if (onClose) onClose(); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl font-semibold text-purple mb-4">{commentId ? 'Editar comentario' : 'Deja tu comentario y valoración'}</h3>
      {hasCommented ? (
        <p className="text-gray-500">Ya has dejado un comentario para este servicio.</p>
      ) : (
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
                className={`text-2xl ${index < rating ? 'text-yellow' : 'text-gray-400'}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-purple text-white py-2 rounded-lg transition duration-300 hover:bg-blue-700"
          >
            {commentId ? 'Actualizar comentario' : 'Enviar comentario'}
          </button>
        </form>
      )}
    </div>
  );
}
