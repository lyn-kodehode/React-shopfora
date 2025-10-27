export default function Footer() {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    currentYear > startYear ? `${startYear}-${currentYear}` : `${startYear}`;
  return (
    <footer className="bg-text-dark text-text-light py-8">
      <div className="container mx-auto px-4 text-center font-body">
        <p className="text-sm">©{yearDisplay} Shopfora. All rights reserved.</p>
      </div>
    </footer>
  );
}
