import FloatImage from "./FloatImage";

interface DocumentLinkProps {
  img: string;
  alt: string;
  links: { title: string, url: string }[];
};

const DocumentLinkPreview = ({ img, alt, links }: DocumentLinkProps) => {
  return (
    <li className="project-link">
      <FloatImage
        src={img}
        alt={alt}
      />
      <ul className="empty-list" style={{ flex: 1, display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {links.map(link => (
          <li key={link.title} style={{ marginBottom: 8 }}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default DocumentLinkPreview;