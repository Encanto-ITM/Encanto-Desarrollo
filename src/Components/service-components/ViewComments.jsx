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

  const handleCommentUpdated = (updatedComment) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleEditClick = (comment) => {
    // Solo permite editar si el comentario es del usuario logueado
    if (comment.user_id === userId) {
      setEditingComment(comment);
    }
  };

  const handleCloseEdit = () => {
    setEditingComment(null);
  };

  if (loading) return <div className="text-gray-500">Cargando comentarios...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-purple mb-4">Comentarios</h3>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="p-4 border-b border-gray-300 flex justify-between items-start">
            <div className="flex-1">
              <p className="text-lg">{comment.comment}</p>
              <p className="text-yellow">
                {"★".repeat(comment.rate)}{"☆".repeat(5 - comment.rate)}
              </p>
            </div>
            {/* Mostrar el botón de editar solo si el comentario es del usuario actual */}
            {comment.user_id === userId && (
              <button className="btn-edit" onClick={() => handleEditClick(comment)}>
                Editar
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}

      {editingComment && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-blue mb-4">Editar Comentario</h3>
          <CommentsService
            serviceId={serviceId}
            userId={userId}
            initialComment={editingComment.comment}
            initialRating={editingComment.rate}
            commentId={editingComment.id}
            onClose={handleCloseEdit}
            onCommentUpdated={handleCommentUpdated}
          />
        </div>
      )}
    </div>
  );
}
