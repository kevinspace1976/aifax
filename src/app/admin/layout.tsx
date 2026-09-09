/**
 * The admin area was built on the original dark theme and its pages use
 * dark-ground utility classes throughout. Wrapping it in .theme-dark keeps
 * it readable after the marketing site moved to a light theme.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-dark min-h-screen">{children}</div>;
}
