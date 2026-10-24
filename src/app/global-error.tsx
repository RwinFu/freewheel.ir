"use client";

// مرز خطای ریشه — جایگزین کل layout می‌شود، پس html/body خودش را دارد
// و حداق‌لازم را بدون وابستگی به استایل سایت رندر می‌کند.
export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f6f4f0",
          color: "#221d18",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            مشکلی پیش آمد
          </h1>
          <p style={{ marginBottom: "1.5rem", lineHeight: 2 }}>
            بارگذاری سایت کامل نشد؛ لطفاً دوباره تلاش کنید.
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              border: "1px solid #d9d2c7",
              borderRadius: "9999px",
              padding: "0.6rem 1.5rem",
              fontWeight: 700,
              cursor: "pointer",
              background: "#e8b64c",
            }}
          >
            تلاش دوباره
          </button>
        </main>
      </body>
    </html>
  );
}
