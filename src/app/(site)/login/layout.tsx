export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{ paddingTop: "max(8rem, var(--nav-h, 11rem))" }}
    >
      {children}
    </div>
  );
}

