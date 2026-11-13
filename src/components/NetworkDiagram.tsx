export function NetworkDiagram() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 860"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover opacity-55"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Fine architectural grid lines */}
        <g stroke="#20211E" strokeOpacity="0.06" strokeWidth="1">
          <line x1="120" y1="0" x2="120" y2="860" />
          <line x1="480" y1="0" x2="480" y2="860" />
          <line x1="880" y1="0" x2="880" y2="860" />
          <line x1="1280" y1="0" x2="1280" y2="860" />
          <line x1="0" y1="180" x2="1440" y2="180" />
          <line x1="0" y1="520" x2="1440" y2="520" />
          <line x1="0" y1="720" x2="1440" y2="720" />
        </g>

        {/* Orthogonal infrastructure bus traces */}
        <g stroke="#777B61" strokeOpacity="0.28" strokeWidth="1.2">
          <path d="M 80 220 H 420 V 360 H 780 V 210 H 1240" />
          <path d="M 160 640 H 540 V 460 H 960 V 620 H 1360" />
          <path d="M 420 220 V 90 H 920 V 180" />
          <path d="M 780 360 V 560 H 1120 V 400 H 1380" />
        </g>

        {/* Animated signal flow overlays */}
        <g stroke="#C65B36" strokeOpacity="0.45" strokeWidth="1.4">
          <path
            d="M 80 220 H 420 V 360 H 780 V 210 H 1240"
            className="animate-signal-slow"
          />
          <path
            d="M 160 640 H 540 V 460 H 960 V 620 H 1360"
            className="animate-signal-reverse"
          />
        </g>

        {/* Server Rack Schematic Module (Top Right Background) */}
        <g transform="translate(1060, 120)" stroke="#20211E" strokeOpacity="0.18" strokeWidth="1">
          <rect x="0" y="0" width="160" height="210" fill="#FAF9F5" fillOpacity="0.35" />
          <line x1="0" y1="42" x2="160" y2="42" />
          <line x1="0" y1="84" x2="160" y2="84" />
          <line x1="0" y1="126" x2="160" y2="126" />
          <line x1="0" y1="168" x2="160" y2="168" />
          <line x1="18" y1="21" x2="96" y2="21" />
          <line x1="18" y1="63" x2="112" y2="63" />
          <line x1="18" y1="105" x2="88" y2="105" />
          <line x1="18" y1="147" x2="120" y2="147" />
          <rect x="132" y="15" width="12" height="12" stroke="#C65B36" strokeOpacity="0.45" />
          <rect x="132" y="57" width="12" height="12" />
          <rect x="132" y="99" width="12" height="12" />
        </g>

        {/* Endpoint & Switch Junction Nodes */}
        {[
          { x: 420, y: 220, label: 'SW-01' },
          { x: 780, y: 360, label: 'AD-DC' },
          { x: 960, y: 460, label: 'GW-VPN' },
          { x: 540, y: 640, label: 'EP-MGT' },
          { x: 1120, y: 400, label: 'M365' },
        ].map((node) => (
          <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
            <circle r="11" fill="#F1EEE5" stroke="#777B61" strokeOpacity="0.45" strokeWidth="1" />
            <circle r="3" fill="#C65B36" fillOpacity="0.65" />
            <text
              x="16"
              y="4"
              fill="#777B61"
              fillOpacity="0.55"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              letterSpacing="1.2"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
