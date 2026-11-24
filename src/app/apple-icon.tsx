import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d0f",
        }}
      >
        <svg width="156" height="156" viewBox="0 0 64 64" fill="none">
          <path
            d="M12 3H52L61 12V52L52 61H12L3 52V12L12 3Z"
            fill="#12161a"
            stroke="#2f3a42"
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
      </div>
    ),
    { ...size }
  );
}
