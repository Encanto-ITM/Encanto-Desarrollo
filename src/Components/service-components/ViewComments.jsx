import React, { useState, useEffect } from 'react';
import { CommentsService } from './CommentsService'; 

export function ViewComments({ userId, serviceId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://tulookapiv2.vercel.app/api/api/comments/${serviceId}/service`);
        if (!response.ok) {
          throw new Error(`Error al obtener los comentarios: ${response.statusText}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [serviceId]);

  const handleEditClick = (comment) => {
    setEditingComment(comment);
  };

  const handleCloseEdit = () => {
    setEditingComment(null);
  };

  if (loading) return <div className="text-gray-500">Cargando comentarios...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">Comentarios</h3>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="p-4 border-b border-gray-300 flex justify-between items-start">
            <div className="flex-1">
              <p className="text-lg font-semibold">{comment.user_name}:</p>
              <p className="text-lg">{comment.comment}</p>
              <p className="text-yellow-400">
                {"★".repeat(comment.rate)}{"☆".repeat(5 - comment.rate)}
              </p>
            </div>
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded-lg ml-4 hover:bg-blue-600"
              onClick={() => handleEditClick(comment)}
            >
              Editar
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
      {editingComment && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Editar Comentario</h3>
          <CommentsService 
            serviceId={serviceId} 
            userId={userId} 
            initialComment={editingComment.comment} 
            initialRating={editingComment.rate} 
            onClose={handleCloseEdit} 
            commentId={editingComment.id} 
          />
        </div>
      )}
    </div>
  );
}