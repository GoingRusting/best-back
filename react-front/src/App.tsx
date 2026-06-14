import { useState } from "react";

const ports = [8080, 8081] as const;

const endpointsByPort: Record<
  number,
  { label: string; path: string; method: string }[]
> = {
  8080: [
    { label: "Health", path: "/health", method: "GET" },
    { label: "Hello World", path: "/hello-world", method: "GET" },
    { label: "List Users", path: "/users/list", method: "GET" },
    { label: "Create User", path: "/users/create", method: "POST" },
    { label: "Get User #1", path: "/users/get/1", method: "GET" },
  ],
  8081: [
    { label: "Health", path: "/health", method: "GET" },
    { label: "Home", path: "/", method: "GET" },
    { label: "List Users", path: "/users", method: "GET" },
  ],
};

function App() {
  const [port, setPort] = useState(8080);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoints = endpointsByPort[port];

  async function sendRequest(endpoint: (typeof endpoints)[0]) {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const opts: RequestInit = { method: endpoint.method };
      const res = await fetch(`http://localhost:${port}${endpoint.path}`, opts);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "12px 24px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-h)",
            marginRight: "auto",
          }}
        >
          best_back
        </h1>

        <span style={{ fontSize: 13 }}>Port:</span>
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "var(--bg)",
            borderRadius: 8,
            padding: 3,
          }}
        >
          {ports.map((p) => (
            <button
              key={p}
              onClick={() => setPort(p)}
              style={{
                padding: "6px 16px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: port === p ? "var(--accent)" : "transparent",
                color: port === p ? "#fff" : "var(--text)",
                transition: "all .15s",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--text)",
            padding: "4px 10px",
            borderRadius: 6,
            background: "var(--bg)",
          }}
        >
          {port === 8080 ? "Go (Gin)" : "JS (Fastify)"}
        </div>
      </header>

      <main
        style={{
          flex: 1,
          padding: 24,
          maxWidth: 800,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {endpoints.map((ep) => (
            <button
              key={ep.path}
              onClick={() => sendRequest(ep)}
              disabled={loading}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                cursor: loading ? "wait" : "pointer",
                fontSize: 13,
                fontWeight: 500,
                background: "var(--surface)",
                color: "var(--text-h)",
                transition: "all .15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--surface)")
              }
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "1px 6px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  marginRight: 8,
                  background:
                    ep.method === "GET" ? "var(--success)" : "var(--accent)",
                  color: "#fff",
                }}
              >
                {ep.method}
              </span>
              {ep.label}
            </button>
          ))}
        </div>

        {loading && (
          <div
            style={{ padding: 20, textAlign: "center", color: "var(--text)" }}
          >
            Loading...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              background: "rgba(239,68,68,.1)",
              border: "1px solid var(--danger)",
              color: "var(--danger)",
              marginBottom: 16,
            }}
          >
            ❌ {error}
          </div>
        )}

        {response && (
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              Response
            </div>
            <pre
              style={{
                padding: 16,
                borderRadius: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                overflow: "auto",
                fontSize: 13,
                fontFamily: "var(--mono)",
                lineHeight: 1.6,
                color: "var(--text-h)",
                maxHeight: "60vh",
              }}
            >
              {response}
            </pre>
          </div>
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "12px 24px",
          borderTop: "1px solid var(--border)",
          fontSize: 12,
          color: "var(--text)",
        }}
      >
        Go (8080) · JS (8081) · PostgreSQL
      </footer>
    </>
  );
}

export default App;
