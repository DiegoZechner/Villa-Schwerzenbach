export default function BackgroundDesign() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{
        backgroundImage: "url('/images/backgrounddesign.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '420px auto',
      }}
    />
  );
}
