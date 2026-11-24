import { ImageResponse } from "next/og";

export const alt = "M. Vicky Mosafan — Full-Stack Developer & AI-Augmented Software Engineer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #070a0d 0%, #0d1218 55%, #121a21 100%)",
          padding: "64px 72px",
          color: "#f3f5f2",
          fontFamily: "sans-serif",
          border: "2px solid rgba(200,245,60,0.28)",
        }}
      >
        {/* Top Identity Row with Bespoke VM Brand Mark */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <svg width="78" height="78" viewBox="0 0 64 64" fill="none">
              <path
                d="M12 3H52L61 12V52L52 61H12L3 52V12L12 3Z"
                fill="#12161a"
                stroke="#334049"
                strokeWidth="2"
              />
              <path
                d="M44 3H52L61 12V20"
                stroke="#c8f53c"
                strokeWidth="2.8"
                strokeLinecap="square"
              />
              <path
                d="M35.8 19L41.8 33.4L47.2 19H53V46H47.2V31.6L42.9 42H40.3L33.4 25.8L35.8 19Z"
                fill="#f3f5f2"
              />
              <path
                d="M11 19H17.6L23.5 36.2L29.8 19H36.2L26.2 46H20.8L11 19Z"
                fill="#c8f53c"
              />
              <path
                d="M23.7 18.2L27.1 21.6L23.7 25L20.3 21.6L23.7 18.2Z"
                fill="#56ccf2"
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "#c8f53c",
                  textTransform: "uppercase",
                }}
              >
                VM // STUDIO PORTFOLIO
              </span>
              <span style={{ fontSize: 20, color: "#9aa7b0", marginTop: 4 }}>
                Full-Stack × AI-Augmented Engineering
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              border: "1px solid rgba(200,245,60,0.45)",
              background: "rgba(200,245,60,0.1)",
              color: "#c8f53c",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            GPA 3.94 · CRAFTRIG MCP
          </div>
        </div>

        {/* Center Main Display Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.02em" }}>
            M. Vicky Mosafan
          </div>
          <div style={{ fontSize: 32, color: "#cfd7dc", lineHeight: 1.35, maxWidth: 960 }}>
            Full-Stack Web Developer building production Next.js, NestJS &amp; PostgreSQL systems
            with Deterministic PRDs, Craftrig MCP &amp; Hybrid RAG.
          </div>
        </div>

        {/* Bottom Proof Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(243,245,242,0.16)",
            paddingTop: 24,
            fontSize: 20,
            color: "#9aa7b0",
          }}
        >
          <div style={{ display: "flex", gap: 36 }}>
            <span style={{ color: "#c8f53c", fontWeight: 700 }}>91.67% RAG Recall</span>
            <span style={{ color: "#56ccf2", fontWeight: 700 }}>45+ MCP Tools</span>
            <span style={{ color: "#4ade80", fontWeight: 700 }}>12-Module BuildFlow ERP</span>
          </div>
          <span>github.com/vickyymosafan</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
