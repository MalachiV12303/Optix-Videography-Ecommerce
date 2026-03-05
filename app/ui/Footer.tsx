export default function Footer() {
  return (
    <div className="container flex text-sm justify-between border-t-1 border-foreground h-24 pt-1">
        <a href="https://www.malachidev.com" target="_blank" rel="noreferrer noopener" className="text-foreground-muted hover:text-foreground transition-colors">: website by malachi</a>
        <span className="text-end">mock website, <span className="font-semibold">no purchases possible</span></span>
    </div>
  );
};