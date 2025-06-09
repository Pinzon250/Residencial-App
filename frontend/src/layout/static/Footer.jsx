export default function Footer() {
  return (
    <footer className="bg-neutral-50 py-6 border-t border-neutral-200">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="m-auto flex items-center gap-4">
          <p className="text-primario font-normal text-zinc-500 text-center">
            © 2025 Conjunto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
