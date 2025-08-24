export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return children saja tanpa template/layout
  return <>{children}</>;
}