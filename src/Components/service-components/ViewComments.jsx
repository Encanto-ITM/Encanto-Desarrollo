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
              <p className="text-lg">{comment.comment}</p>
              <p className="text-yellow-400">
                {"★".repeat(comment.rate)}{"☆".repeat(5 - comment.rate)}
              </p>
            </div>
            
            <button class="btn-edit" onClick={() => handleEditClick(comment)}>Editar 
              <svg class="svg" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
            </button>
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
            onClose={handleCloseEdit} 
            commentId={editingComment.id} 
          />
        </div>
      )}
    </div>
  );
}