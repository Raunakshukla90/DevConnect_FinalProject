import { useEffect, useState } from "react";
import "./App.css";

const STORAGE_KEY = "personal-reading-list";

function App() {
  const params = new URLSearchParams(window.location.search);
  const forcedState = params.get("state");

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(
    forcedState === "loading"
      ? "loading"
      : forcedState === "error"
        ? "error"
        : "loading"
  );

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (forcedState === "loading") {
      const timer = setTimeout(() => {
        setStatus("success");
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (forcedState === "error") {
      setStatus("error");
      return;
    }

    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setItems(saved ? JSON.parse(saved) : []);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [forcedState]);

  useEffect(() => {
    if (status === "success") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, status]);

  function addItem(e) {
    e.preventDefault();

    if (!title.trim() || !url.trim()) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      url: url.trim(),
    };

    setItems((current) => [newItem, ...current]);
    setTitle("");
    setUrl("");
  }

  function removeItem(id) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function retry() {
    window.location.href = window.location.pathname;
  }

  if (status === "loading") {
    return (
      <div className="app">
        <Header />
        <main className="container">
          <section className="state-card loading">
            <div className="spinner" />
            <h2>Loading your reading list...</h2>
            <p>
              We’re getting your saved articles and resources.
            </p>
          </section>
        </main>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="app">
        <Header />
        <main className="container">
          <section className="state-card error">
            <div className="state-icon">!</div>

            <h2>We couldn’t load your reading list</h2>

            <p>
              Something went wrong while retrieving your
              saved articles. Please try again.
            </p>

            <button
              className="primary-button"
              onClick={retry}
            >
              Try Again
            </button>
          </section>
        </main>
      </div>
    );
  }

  if (forcedState === "empty") {
    return (
      <div className="app">
        <Header />
        <main className="container">
          <EmptyState />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="intro">
          <div>
            <p className="eyebrow">PERSONAL READING LIST</p>

            <h1>Save it. Read it later.</h1>

            <p className="description">
              Keep useful articles and resources in one simple
              place so you can come back to them whenever you
              are ready.
            </p>
          </div>
        </section>

        <section className="form-card">
          <h2>Add an article</h2>

          <form onSubmit={addItem}>
            <div className="field">
              <label htmlFor="title">Title</label>

              <input
                id="title"
                type="text"
                placeholder="e.g. Learn React"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="url">URL</label>

              <input
                id="url"
                type="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Add to reading list
            </button>
          </form>
        </section>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="list-section">
            <div className="section-heading">
              <div>
                <h2>Your saved items</h2>
                <p>
                  {items.length}{" "}
                  {items.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            <div className="reading-list">
              {items.map((item) => (
                <article
                  className="reading-item"
                  key={item.id}
                >
                  <div className="article-icon">🔖</div>

                  <div className="article-info">
                    <h3>{item.title}</h3>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.url}
                    </a>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">📚</span>
        <span>Reading List</span>
      </div>
    </header>
  );
}

function EmptyState() {
  return (
    <section className="state-card empty">
      <div className="state-icon book">📖</div>

      <h2>Your reading list is empty</h2>

      <p>
        Save articles and useful resources here so you can
        easily find and read them later.
      </p>

      <button
        className="primary-button"
        onClick={() => {
          const input = document.getElementById("title");

          if (input) {
            input.focus();
          } else {
            window.location.href = window.location.pathname;
          }
        }}
      >
        Add your first article
      </button>
    </section>
  );
}

export default App;
