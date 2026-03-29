import './AppMarquee.css'

const CDN = 'https://typeless-static.com/webpage/assets/homepage/appIcons'

// Two rows of app icons — names must match the CDN filenames exactly
const ROW_1 = [
  { name: 'Notability',    file: 'Notability' },
  { name: 'PDF Reader',    file: 'PDF_Reader' },
  { name: 'OneNote',       file: 'OneNote' },
  { name: 'Teams',         file: 'Teams' },
  { name: 'Outlook',       file: 'Outlook' },
  { name: 'Zoom',          file: 'Zoom' },
  { name: 'Things',        file: 'Things' },
  { name: 'OneDrive',      file: 'OneDrive' },
  { name: 'Notion',        file: 'Notion' },
  { name: 'Slack',         file: 'Slack' },
  { name: 'Gmail',         file: 'Gmail' },
  { name: 'Google Docs',   file: 'GoogleDocs' },
]

const ROW_2 = [
  { name: 'ChatGPT',       file: 'ChatGPT' },
  { name: 'Claude',        file: 'Claude' },
  { name: 'VS Code',       file: 'VSCode' },
  { name: 'Figma',         file: 'Figma' },
  { name: 'Obsidian',      file: 'Obsidian' },
  { name: 'Bear',          file: 'Bear' },
  { name: 'GitHub',        file: 'GitHub' },
  { name: 'Canva',         file: 'Canva' },
  { name: 'Linear',        file: 'Linear' },
  { name: 'Messenger',     file: 'Messenger' },
  { name: 'Snapchat',      file: 'Snapchat' },
  { name: 'Excel',         file: 'Excel' },
]

function IconImg({ app }) {
  return (
    <div className="marquee-icon" title={app.name}>
      <img
        src={`${CDN}/${app.file}.webp`}
        alt={app.name}
        width="48"
        height="48"
        loading="lazy"
        onError={(e) => {
          // Fallback: show first 2 letters on error
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement.classList.add('marquee-icon--fallback')
          e.currentTarget.parentElement.setAttribute('data-label', app.name.slice(0, 2).toUpperCase())
        }}
      />
    </div>
  )
}

function MarqueeRow({ icons, reverse = false }) {
  // Duplicate for seamless loop
  const doubled = [...icons, ...icons]
  return (
    <div className={`marquee-row${reverse ? ' marquee-row--reverse' : ''}`}>
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((app, i) => (
          <IconImg key={`${app.file}-${i}`} app={app} />
        ))}
      </div>
    </div>
  )
}

export default function AppMarquee() {
  return (
    <div className="app-marquee-outer">
      <MarqueeRow icons={ROW_1} />
      <MarqueeRow icons={ROW_2} reverse />
    </div>
  )
}
