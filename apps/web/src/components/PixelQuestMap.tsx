import React from 'react';

interface PixelQuestMapProps {
  currentStage: string;
  onSelectAgentA: () => void;
  onSelectAgentB: () => void;
  onSelectAgentC: () => void;
}

export const PixelQuestMap: React.FC<PixelQuestMapProps> = ({
  currentStage,
  onSelectAgentA,
  onSelectAgentB,
  onSelectAgentC,
}) => {
  return (
    <div className="relative w-full h-[370px] lg:h-[400px] rounded-3xl overflow-hidden border-3 border-[#2A2353] shadow-md select-none">
      {/* 8-bit / 16-bit RPG Overworld Scene Background SVG */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 760 420"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Sky / Deep enchanted forest dusk gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C2F75" />
            <stop offset="40%" stopColor="#6754A8" />
            <stop offset="100%" stopColor="#9E7EC6" />
          </linearGradient>

          {/* Grass gradient */}
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7CC982" />
            <stop offset="100%" stopColor="#5CA662" />
          </linearGradient>

          {/* River gradient */}
          <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#63B8F6" />
            <stop offset="100%" stopColor="#3F88DC" />
          </linearGradient>

          {/* Portal glow */}
          <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#C084FC" />
            <stop offset="80%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#2E1065" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="760" height="220" fill="url(#skyGrad)" />

        {/* Stars in sky */}
        <rect x="80" y="30" width="3" height="3" fill="#FDE047" />
        <rect x="190" y="55" width="2" height="2" fill="#FFFFFF" />
        <rect x="340" y="25" width="4" height="4" fill="#FDE047" />
        <rect x="420" y="65" width="2" height="2" fill="#FFFFFF" />
        <rect x="680" y="40" width="3" height="3" fill="#FDE047" />

        {/* Distant Mountain Silhouettes */}
        <polygon points="0,180 90,110 210,180" fill="#4B3A82" />
        <polygon points="170,180 290,90 410,180" fill="#3A2D69" />
        <polygon points="360,180 480,110 590,180" fill="#4B3A82" />
        <polygon points="530,180 670,80 760,180" fill="#3A2D69" />

        {/* Rolling Lush Hills */}
        <path d="M0,210 Q 180,160 380,210 T 760,190 L 760,420 L 0,420 Z" fill="url(#grassGrad)" />
        <path d="M0,260 Q 220,230 450,265 T 760,250 L 760,420 L 0,420 Z" fill="#6FB875" />

        {/* Cherry Blossom / Sakura Trees */}
        {/* Left Giant Tree */}
        <rect x="50" y="240" width="18" height="90" fill="#5A3A29" />
        <circle cx="59" cy="220" r="46" fill="#F472B6" />
        <circle cx="40" cy="200" r="32" fill="#F9A8D4" />
        <circle cx="75" cy="210" r="34" fill="#FBCFE8" />

        {/* Tree Behind Portal */}
        <rect x="600" y="140" width="16" height="70" fill="#5A3A29" />
        <circle cx="608" cy="120" r="42" fill="#4ADE80" />
        <circle cx="630" cy="110" r="30" fill="#86EFAC" />

        {/* Curved River Flow */}
        <path
          d="M 470,190 C 440,240 400,280 490,340 C 530,370 520,400 500,420 L 610,420 C 630,390 620,340 560,300 C 500,260 540,220 570,190 Z"
          fill="url(#riverGrad)"
        />

        {/* Wooden Bridge crossing river */}
        <rect x="420" y="265" width="80" height="26" rx="4" fill="#854D0E" stroke="#451A03" strokeWidth="3" />
        <line x1="435" y1="265" x2="435" y2="291" stroke="#451A03" strokeWidth="2" />
        <line x1="450" y1="265" x2="450" y2="291" stroke="#451A03" strokeWidth="2" />
        <line x1="465" y1="265" x2="465" y2="291" stroke="#451A03" strokeWidth="2" />
        <line x1="480" y1="265" x2="480" y2="291" stroke="#451A03" strokeWidth="2" />

        {/* Goal Dimension Portal */}
        <g transform="translate(530, 110)">
          {/* Stone Archway */}
          <rect x="10" y="20" width="100" height="110" rx="14" fill="#4B5563" stroke="#1F2937" strokeWidth="4" />
          <rect x="25" y="30" width="70" height="95" rx="35" fill="#1F2937" />
          {/* Swirling energy */}
          <ellipse cx="60" cy="78" rx="28" ry="44" fill="url(#portalGlow)" />
          {/* Portal Sparks */}
          <circle cx="50" cy="60" r="3" fill="#FFFFFF" />
          <circle cx="70" cy="85" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Winding Yellow Cobblestone Pathway */}
        <path
          d="M 90,330 C 180,310 230,360 350,330 C 420,310 470,260 550,220"
          fill="none"
          stroke="#FDE047"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray="6 14"
          opacity="0.95"
        />

        {/* Glowing character podiums */}
        <ellipse cx="115" cy="335" rx="28" ry="12" fill="#FACC15" opacity="0.8" />
        <ellipse cx="270" cy="355" rx="28" ry="12" fill="#FACC15" opacity="0.8" />
        <ellipse cx="445" cy="385" rx="28" ry="12" fill="#FACC15" opacity="0.8" />
      </svg>

      {/* Parchment Banner Header inside map (Just like Reference Image 1) */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-[#2A2353] text-[#FDE047] px-3.5 py-1.5 rounded-xl font-black text-xs inline-flex items-center space-x-1.5 shadow-sm border border-[#4338CA]">
          <span>🚩 Current Quest</span>
        </div>
      </div>

      <div className="absolute top-12 left-4 max-w-sm sm:max-w-md bg-[#FFF9ED] text-[#2A2353] px-5 py-3 rounded-2xl border-3 border-[#D4A373] shadow-md z-20">
        <h3 className="font-extrabold text-xs sm:text-sm tracking-tight text-[#1E1B4B]">
          Investigate the bug, propose a fix, and verify the solution.
        </h3>
        <div className="mt-1 flex items-center space-x-2 text-[11px] font-bold text-amber-700">
          <span>⭐ Priority: High</span>
          <span className="text-[#9CA3AF]">·</span>
          <span>Stage: {currentStage.toUpperCase()}</span>
        </div>
      </div>

      {/* Goal Star Badge on Portal */}
      <div className="absolute top-16 right-20 sm:right-28 bg-[#FFF9ED] text-[#B45309] border-2 border-[#D4A373] px-3 py-1 rounded-xl font-black text-xs flex items-center space-x-1 shadow-sm z-20">
        <span>⭐ Goal Portal</span>
      </div>

      {/* Character 1: Agent A (Investigator / Mage) */}
      <div
        onClick={onSelectAgentA}
        className="absolute left-8 sm:left-14 bottom-14 z-30 cursor-pointer group flex flex-col items-center transition-transform hover:scale-110"
      >
        {/* Dialogue Bubble */}
        <div className="mb-1 bg-white text-[#1E1B4B] px-2.5 py-1 rounded-xl text-[11px] font-extrabold shadow-md border-2 border-[#1E1B4B] flex items-center space-x-1 whitespace-nowrap">
          <span>🔍 Agent A</span>
          <span className="text-sky-700">Investigate</span>
        </div>
        {/* Pixel Sprite: Blue Hooded Scholar */}
        <svg
          width="48"
          height="52"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: 'crispEdges' }}
          className="drop-shadow-md"
        >
          {/* Hood */}
          <rect x="5" y="3" width="14" height="12" fill="#2563EB" />
          <rect x="4" y="5" width="16" height="9" fill="#1D4ED8" />
          {/* Face opening */}
          <rect x="7" y="7" width="10" height="7" fill="#FED7AA" />
          {/* Cute eyes */}
          <rect x="9" y="9" width="2" height="3" fill="#1E1B4B" />
          <rect x="13" y="9" width="2" height="3" fill="#1E1B4B" />
          <rect x="8" y="12" width="2" height="1" fill="#F472B6" />
          <rect x="14" y="12" width="2" height="1" fill="#F472B6" />
          {/* Robe */}
          <rect x="6" y="15" width="12" height="8" fill="#1E3A8A" />
          <rect x="9" y="15" width="6" height="5" fill="#E0E7FF" />
          <rect x="11" y="16" width="2" height="2" fill="#FBBF24" />
          {/* Feet */}
          <rect x="7" y="23" width="3" height="2" fill="#1E1B4B" />
          <rect x="14" y="23" width="3" height="2" fill="#1E1B4B" />
        </svg>
      </div>

      {/* Character 2: Agent B (Implementer / Cat Wizard) */}
      <div
        onClick={onSelectAgentB}
        className="absolute left-[34%] sm:left-[35%] bottom-16 z-30 cursor-pointer group flex flex-col items-center transition-transform hover:scale-110"
      >
        <div className="mb-1 bg-white text-[#1E1B4B] px-2.5 py-1 rounded-xl text-[11px] font-extrabold shadow-md border-2 border-[#1E1B4B] flex items-center space-x-1 whitespace-nowrap">
          <span>&lt;/&gt; Agent B</span>
          <span className="text-orange-700">Implement</span>
        </div>
        {/* Pixel Sprite: Cat Mascot */}
        <svg
          width="48"
          height="52"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: 'crispEdges' }}
          className="drop-shadow-md"
        >
          {/* Cat Ears */}
          <rect x="5" y="3" width="4" height="4" fill="#312E81" />
          <rect x="6" y="4" width="2" height="2" fill="#F472B6" />
          <rect x="15" y="3" width="4" height="4" fill="#312E81" />
          <rect x="16" y="4" width="2" height="2" fill="#F472B6" />
          {/* Face */}
          <rect x="5" y="7" width="14" height="9" fill="#FFFFFF" />
          <rect x="7" y="10" width="2" height="3" fill="#1E1B4B" />
          <rect x="15" y="10" width="2" height="3" fill="#1E1B4B" />
          <rect x="6" y="12" width="2" height="1" fill="#FBCFE8" />
          <rect x="16" y="12" width="2" height="1" fill="#FBCFE8" />
          <rect x="11" y="11" width="2" height="2" fill="#F472B6" />
          {/* Backpack & Coat */}
          <rect x="6" y="16" width="12" height="7" fill="#4F46E5" />
          <rect x="10" y="17" width="4" height="3" fill="#FBBF24" />
          {/* Shoes */}
          <rect x="7" y="23" width="3" height="2" fill="#312E81" />
          <rect x="14" y="23" width="3" height="2" fill="#312E81" />
        </svg>
      </div>

      {/* Character 3: Agent C (Verifier / Bunny Paladin) */}
      <div
        onClick={onSelectAgentC}
        className="absolute left-[58%] sm:left-[60%] bottom-8 z-30 cursor-pointer group flex flex-col items-center transition-transform hover:scale-110"
      >
        <div className="mb-1 bg-white text-[#1E1B4B] px-2.5 py-1 rounded-xl text-[11px] font-extrabold shadow-md border-2 border-[#1E1B4B] flex items-center space-x-1 whitespace-nowrap">
          <span>🐰 Agent C</span>
          <span className="text-emerald-700 font-black">Verify ✓</span>
        </div>
        {/* Pixel Sprite: Bunny with Clipboard */}
        <svg
          width="48"
          height="52"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: 'crispEdges' }}
          className="drop-shadow-md"
        >
          {/* Bunny Ears */}
          <rect x="6" y="1" width="3" height="7" fill="#FFFFFF" />
          <rect x="7" y="2" width="1" height="5" fill="#F472B6" />
          <rect x="15" y="1" width="3" height="7" fill="#FFFFFF" />
          <rect x="16" y="2" width="1" height="5" fill="#F472B6" />
          {/* Face */}
          <rect x="5" y="7" width="14" height="9" fill="#FFFFFF" />
          <rect x="7" y="9" width="2" height="3" fill="#1E1B4B" />
          <rect x="15" y="9" width="2" height="3" fill="#1E1B4B" />
          <rect x="6" y="12" width="2" height="1" fill="#FBCFE8" />
          <rect x="16" y="12" width="2" height="1" fill="#FBCFE8" />
          {/* Jacket & Clip board */}
          <rect x="6" y="16" width="12" height="7" fill="#10B981" />
          <rect x="12" y="16" width="5" height="6" fill="#FDE047" stroke="#854D0E" strokeWidth="1" />
          {/* Feet */}
          <rect x="7" y="23" width="3" height="2" fill="#1E1B4B" />
          <rect x="14" y="23" width="3" height="2" fill="#1E1B4B" />
        </svg>
      </div>

      {/* Bottom Floating Info Pill inside Map */}
      <div className="absolute bottom-3 left-4 right-4 sm:right-auto sm:max-w-md bg-[#1E1B4B]/90 backdrop-blur-xs text-white px-4 py-2 rounded-2xl text-[11px] font-bold border border-white/20 shadow-lg flex items-center justify-between z-20">
        <div className="flex items-center space-x-2">
          <span className="text-amber-300">✨</span>
          <span>Agents collaborate using FalkorDB shared graph memory.</span>
        </div>
        <span className="text-amber-300 ml-2">›</span>
      </div>
    </div>
  );
};
