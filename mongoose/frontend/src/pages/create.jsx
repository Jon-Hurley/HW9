 import { useEffect } from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const correct = "DQK35v6te5hutvc"
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content});
    if (correct == password) {
      const headers = {"content-type": "application/json"};
        const req = fetch("http://localhost:3000/blog/create-post", {
          method: "POST",
          headers: headers,
          body: requestData
        })
        setDone(true);
        setPasswordMessage("");
    }
    else {
      setPasswordMessage("Incorrect password");
    }
  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button type="submit">Post</button>
      <div>{passwordMessage}</div>
    </form>
  );
}
