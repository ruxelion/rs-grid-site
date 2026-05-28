import { useState } from 'react';
import styles from './index.module.css';

interface IframeDemoProps {
  src: string;
  title: string;
  loadingLabel?: string;
  openLabel?: string;
}

export default function IframeDemo({
  src,
  title,
  loadingLabel = 'Loading demo…',
  openLabel = 'Open in new tab ↗',
}: IframeDemoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className={styles.iframeWrapper}>
        <div className={styles.loadingOverlay} data-loaded={loaded}>
          <div className={styles.spinner} />
          <span>{loadingLabel}</span>
        </div>
        <iframe
          className={styles.iframe}
          src={src}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className={styles.footer}>
        <span>{title}</span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openLink}
        >
          {openLabel}
        </a>
      </div>
    </div>
  );
}
