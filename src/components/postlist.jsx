import React, { useState } from "react";
import EditPost from "./editpost";

export default function PostList({ posts, user, onDelete, onEdit }) {
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          {editingIndex === index ? (
            <EditPost
              post={post}
              onSave={(updatedPost) => {
                onEdit(index, updatedPost);
                setEditingIndex(null);
              }}
              onCancel={() => setEditingIndex(null)}
            />
          ) : (
            <>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <small>
                By <strong>{post.name}</strong> at {post.createdAt}
              </small>
              {user.name === post.name && (
                <div>
                  <button onClick={() => setEditingIndex(index)}>Edit</button>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
