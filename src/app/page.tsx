export default function RootPage() {
  return (
    <main style={{ display: "none" }} aria-hidden="true">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace("/en-US");`,
        }}
      />
      <noscript>
        <a href="/en-US">Continue</a>
      </noscript>
    </main>
  );
}
