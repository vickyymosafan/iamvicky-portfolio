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
          background: "linear-gradient(135deg, #07090f 0%, #0d111a 55%, #141b28 100%)",
          padding: "64px 72px",
          color: "#f5f6f8",
          fontFamily: "sans-serif",
          border: "2px solid rgba(245,166,35,0.32)",
        }}
      >
        {/* Top Identity Row with Bespoke VM Brand Mark */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <svg width="78" height="78" viewBox="0 0 64 64" fill="none">
              <path
                d="M12 3H52L61 12V52L52 61H12L3 52V12L12 3Z"
                fill="#0f131b"
                stroke="#334054"
                strokeWidth="2"
              />
              <path
                d="M44 3H52L61 12V20"
                stroke="#f5a623"
                strokeWidth="2.8"
                strokeLinecap="square"
              />
              <path
                d="M35.8 19L41.8 33.4L47.2 19H53V46H47.2V31.6L42.9 42H40.3L33.4 25.8L35.8 19Z"
                fill="#f5f6f8"
              />
              <path
                d="M11 19H17.6L23.5 36.2L29.8 19H36.2L26.2 46H20.8L11 19Z"
                fill="#f5a623"
              />
              <path
                d="M23.7 18.2L27.1 21.6L23.7 25L20.3 21.6L23.7 18.2Z"
                fill="#38bdf8"
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "#f5a623",
                  textTransform: "uppercase",
                }}
              >
                VICKY MOSAFAN // PORTFOLIO
              </span>
              <span style={{ fontSize: 20, color: "#93a0b2", marginTop: 4 }}>
                Full-Stack Developer &amp; AI Systems Engineer
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              border: "1px solid rgba(245,166,35,0.45)",
              background: "rgba(245,166,35,0.12)",
              color: "#f5a623",
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
          <div style={{ fontSize: 32, color: "#cbd3de", lineHeight: 1.35, maxWidth: 960 }}>
            Full-Stack Developer building fast, scalable web applications, AI retrieval engines,
            and reliable backend platforms.
          </div>
        </div>

        {/* Bottom Proof Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(245,246,248,0.16)",
            paddingTop: 24,
            fontSize: 20,
            color: "#93a0b2",
          }}
        >
          <div style={{ display: "flex", gap: 36 }}>
            <span style={{ color: "#f5a623", fontWeight: 700 }}>91.67% RAG Recall</span>
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>45+ MCP Tools</span>
            <span style={{ color: "#fb923c", fontWeight: 700 }}>12-Module BuildFlow ERP</span>
          </div>
          <span>github.com/vickyymosafan</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
