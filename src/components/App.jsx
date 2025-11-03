import React, { useState } from "react";
import BlogPostForm from "./blogpostform";
import PostList from "./postlist";
import Signup from "./signup";
import Signin from "./signin";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home"); // "home", "signup", "signin"

  return (
    <div className="app">
      <header>
        <h1>Mini Blog</h1>
        {user ? (
          <div>
            Welcome, {user.name}!
            <button onClick={() => setUser(null)}>Sign Out</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setPage("signin")}>Sign In</button>
            <button onClick={() => setPage("signup")}>Sign Up</button>
          </div>
        )}
      </header>

      {page === "signup" && (
        <Signup
          onSignup={(newUser) => {
            setUser(newUser);
            setPage("home");
          }}
        />
      )}

      {page === "signin" && (
        <Signin
          onSignin={(loggedInUser) => {
            setUser(loggedInUser);
            setPage("home");
          }}
        />
      )}

      {page === "home" && user && (
        <>
          <BlogPostForm
            user={user}
            onAddPost={(post) => setPosts([post, ...posts])}
          />
          <PostList
            posts={posts}
            user={user}
            onDelete={(index) => setPosts(posts.filter((_, i) => i !== index))}
            onEdit={(index, updatedPost) => {
              const newPosts = [...posts];
              newPosts[index] = updatedPost;
              setPosts(newPosts);
            }}
          />
        </>
      )}

      {page === "home" && !user && (
        <p>Please sign in to view and create posts.</p>
      )}
    </div>
  );
}
