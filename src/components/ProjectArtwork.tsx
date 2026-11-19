import { useId } from 'react'
import './project-artwork.css'

export type ProjectArtworkKind = 'aura' | 'vision' | 'pay' | 'traffic'

type ArtworkProps = { kind: ProjectArtworkKind }

function AuraArtwork({ id }: { id: string }) {
  return (
    <svg className="art-scene" viewBox="0 0 600 380" fill="none">
      <defs>
        <linearGradient
          id={`${id}-background`}
          x1="31"
          y1="23"
          x2="557"
          y2="380"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E9DB" />
          <stop offset="1" stopColor="#B8C5B4" />
        </linearGradient>
        <linearGradient
          id={`${id}-phone`}
          x1="330"
          y1="20"
          x2="521"
          y2="371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#455149" />
          <stop offset=".4" stopColor="#101813" />
          <stop offset="1" stopColor="#34453A" />
        </linearGradient>
        <radialGradient
          id={`${id}-glow`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(442 141) rotate(90) scale(193 133)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#586D51" stopOpacity=".56" />
          <stop offset="1" stopColor="#15211A" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-30%" width="200%" height="180%">
          <feDropShadow dx="3" dy="23" stdDeviation="17" floodColor="#2B392B" floodOpacity=".28" />
        </filter>
        <filter id={`${id}-tile-shadow`} x="-30%" y="-60%" width="160%" height="240%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#2B392B" floodOpacity=".15" />
        </filter>
        <pattern id={`${id}-dots`} width="17" height="17" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".65" fill="#3C523A" fillOpacity=".12" />
        </pattern>
      </defs>
      <path fill={`url(#${id}-background)`} d="M0 0h600v380H0z" />
      <path fill={`url(#${id}-dots)`} d="M0 0h600v380H0z" />
      <circle cx="399" cy="197" r="158" stroke="#F0F4E9" strokeOpacity=".7" />
      <circle cx="399" cy="197" r="185" stroke="#F0F4E9" strokeOpacity=".37" />
      <path
        d="M0 322c110-77 255 25 362-25 100-46 131-87 238-73"
        stroke="#74876A"
        strokeOpacity=".2"
      />
      <text x="32" y="36" className="art-mono" fontSize="9" letterSpacing="1.5" fill="#4F604B">
        INTELLIGENCE, LOCAL.
      </text>
      <g fill="#293D2D" className="art-display" fontSize="30" fontWeight="500" letterSpacing="-1.5">
        <text x="34" y="112">
          A little more
        </text>
        <text x="34" y="148">
          intelligence.
        </text>
        <text x="34" y="198" fill="#667A5E">
          A lot more
        </text>
        <text x="34" y="234" fill="#667A5E">
          yours.
        </text>
      </g>
      <g transform="rotate(12 430 204)" filter={`url(#${id}-shadow)`}>
        <rect x="339" y="22" width="184" height="373" rx="31" fill="#19241B" />
        <rect
          x="331"
          y="17"
          width="184"
          height="373"
          rx="31"
          fill={`url(#${id}-phone)`}
          stroke="#798576"
          strokeWidth="1.3"
        />
        <path
          d="M334 115v34m0 11v20m181-65v49"
          stroke="#A4AE9F"
          strokeOpacity=".45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="337" y="23" width="172" height="361" rx="26" fill="#142019" />
        <rect x="337" y="23" width="172" height="361" rx="26" fill={`url(#${id}-glow)`} />
        <rect x="401" y="30" width="44" height="10" rx="5" fill="#0A120D" />
        <text x="350" y="44" fontSize="7" className="art-mono" fill="#A1AF9C">
          9:41
        </text>
        <g stroke="#ADBAA4" strokeWidth="1.3" strokeLinecap="round">
          <path d="M481 38v5m4-7v7m4-9v9" />
          <rect x="495" y="37" width="8" height="5" rx="1" />
        </g>
        <text x="352" y="75" className="art-display" fontSize="11" fontWeight="600" fill="#D3DDC7">
          aura<tspan fill="#89997E"> /</tspan>
        </text>
        <path d="M485 66h10m-10 4h7" stroke="#A9B69E" strokeWidth="1.1" strokeLinecap="round" />
        <g transform="translate(410 100)" stroke="#D0E9AB" strokeWidth="1.1">
          <path d="M13 0c0 9-4 13-13 13 9 0 13 4 13 13 0-9 4-13 13-13-9 0-13-4-13-13Z" />
          <path d="M29 24c0 4-2 6-6 6 4 0 6 2 6 6 0-4 2-6 6-6-4 0-6-2-6-6Z" />
        </g>
        <text
          x="353"
          y="160"
          fontSize="23"
          fontWeight="500"
          letterSpacing="-1.1"
          className="art-display"
          fill="#E2E9D8"
        >
          Your ideas.
        </text>
        <text
          x="353"
          y="188"
          fontSize="23"
          fontWeight="500"
          letterSpacing="-1.1"
          className="art-display"
          fill="#A9BF8E"
        >
          Your device.
        </text>
        <text x="353" y="207" fontSize="7.2" fill="#81917C" className="art-mono">
          A private space to think.
        </text>
        <g fontSize="6.5" className="art-mono" fill="#BBC8AE">
          <rect
            x="352"
            y="224"
            width="36"
            height="18"
            rx="9"
            fill="#28372A"
            stroke="#526149"
            strokeWidth=".6"
          />
          <text x="362" y="236">
            Chat
          </text>
          <rect
            x="392"
            y="224"
            width="42"
            height="18"
            rx="9"
            fill="none"
            stroke="#45563F"
            strokeWidth=".6"
          />
          <text x="401" y="236">
            Vision
          </text>
          <rect
            x="438"
            y="224"
            width="56"
            height="18"
            rx="9"
            fill="none"
            stroke="#45563F"
            strokeWidth=".6"
          />
          <text x="447" y="236">
            Documents
          </text>
        </g>
        <rect
          x="351"
          y="262"
          width="144"
          height="35"
          rx="9"
          fill="#2A3829"
          stroke="#3A4B35"
          strokeWidth=".6"
        />
        <text x="362" y="282" fontSize="8" fill="#BDCCAF">
          Summarize my notes
        </text>
        <path
          d="m481 277 4 3-4 3"
          stroke="#98B37F"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="351" y="306" width="144" height="37" rx="11" stroke="#46553E" strokeWidth=".7" />
        <text x="362" y="328" fontSize="7.5" fill="#7A8A72">
          Ask anything…
        </text>
        <circle cx="480" cy="325" r="9" fill="#B5D08C" />
        <path
          d="M480 329v-7m-3 3 3-3 3 3"
          stroke="#24331E"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="402" y="374" width="42" height="3" rx="1.5" fill="#96A48A" fillOpacity=".5" />
      </g>
      <g transform="rotate(-6 237 299)" filter={`url(#${id}-tile-shadow)`}>
        <rect
          x="169"
          y="262"
          width="169"
          height="76"
          rx="13"
          fill="#F0F3E7"
          stroke="#FFF"
          strokeOpacity=".6"
        />
        <g
          transform="translate(185 279)"
          stroke="#4B6340"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="1" y="3" width="17" height="19" rx="4" />
          <path d="M6 10h7m-7 4h7m-5-14v3m5-3v3M8 22v3m5-3v3M-2 9h3m-3 7h3m17-7h3m-3 7h3" />
        </g>
        <text
          x="218"
          y="291"
          fill="#2B432C"
          className="art-display"
          fontSize="16"
          fontWeight="600"
          letterSpacing="-.7"
        >
          100% on device.
        </text>
        <text x="218" y="312" fill="#7A8971" className="art-mono" fontSize="7.5">
          YOUR DATA STAYS YOURS.
        </text>
      </g>
      <text x="32" y="354" fill="#617459" className="art-mono" fontSize="8" letterSpacing="1">
        CHAT · VISION · KNOWLEDGE
      </text>
    </svg>
  )
}

function VisionArtwork({ id }: { id: string }) {
  return (
    <svg className="art-scene" viewBox="0 0 600 380" fill="none">
      <defs>
        <linearGradient
          id={`${id}-background`}
          x1="600"
          y1="0"
          x2="0"
          y2="380"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4B533C" />
          <stop offset="1" stopColor="#242D22" />
        </linearGradient>
        <linearGradient
          id={`${id}-sky`}
          x1="300"
          y1="75"
          x2="300"
          y2="303"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#89957B" />
          <stop offset=".55" stopColor="#B5BCA0" />
          <stop offset="1" stopColor="#7B866D" />
        </linearGradient>
        <linearGradient
          id={`${id}-road`}
          x1="300"
          y1="143"
          x2="300"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#79836C" />
          <stop offset="1" stopColor="#4A5444" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-50%" width="160%" height="220%">
          <feDropShadow dy="15" stdDeviation="13" floodColor="#0B1308" floodOpacity=".35" />
        </filter>
        <clipPath id={`${id}-feed`}>
          <rect x="61" y="68" width="478" height="267" rx="12" />
        </clipPath>
        <pattern id={`${id}-scan`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 .5h6" stroke="#EDF8CC" strokeOpacity=".035" />
        </pattern>
      </defs>
      <path fill={`url(#${id}-background)`} d="M0 0h600v380H0z" />
      <circle cx="300" cy="214" r="221" stroke="#D9E5B9" strokeOpacity=".07" />
      <circle cx="300" cy="214" r="252" stroke="#D9E5B9" strokeOpacity=".05" />
      <g className="art-mono" fontSize="9" letterSpacing="1.2" fill="#C6D4AE">
        <text x="31" y="35">
          VISIONAID++
        </text>
        <text x="412" y="35" fill="#A1AE8D">
          ASSISTED PERCEPTION
        </text>
      </g>
      <g transform="rotate(-4 300 201)" filter={`url(#${id}-shadow)`}>
        <rect
          x="57"
          y="64"
          width="486"
          height="275"
          rx="16"
          fill="#AEB69A"
          stroke="#D7E2BC"
          strokeOpacity=".36"
        />
        <g clipPath={`url(#${id}-feed)`}>
          <rect x="61" y="68" width="478" height="267" fill={`url(#${id}-sky)`} />
          <circle cx="357" cy="103" r="45" fill="#D8DFC1" fillOpacity=".15" />
          <path d="m61 68 107 20 69 67v170H61Z" fill="#4C5944" />
          <path d="m61 68 97 23v233H61Z" fill="#394A36" />
          <path d="m158 91 79 64v170l-79-13Z" fill="#667457" />
          <g stroke="#A9B58B" strokeOpacity=".29" strokeWidth="1.5">
            <path d="m172 109 46 39m-46-17 46 35m-46-12 46 34m-46-13 46 32m-46-11 46 29m-46-10 46 26m-46-9 46 23" />
            <path d="M181 117v181m18-164v166m18-149v151" />
          </g>
          <g fill="#7F8A6D" fillOpacity=".45">
            <path d="M78 94h17v28H78zm34 8h17v28h-17zM78 145h17v28H78zm34 7h17v28h-17zM78 198h17v28H78zm34 6h17v28h-17z" />
          </g>
          <path d="m539 64-93 34-62 58v167l155 8Z" fill="#69775A" />
          <path d="m446 98 93-34v267l-93-16Z" fill="#485A3E" />
          <g stroke="#AAB88B" strokeOpacity=".35" strokeWidth="1.5">
            <path d="m458 119 65-21m-65 55 65-17m-65 54 65-12m-65 45 65-6m-65 41h65" />
            <path d="M477 113v196m23-204v208" />
          </g>
          <path d="m237 155 57-15h47l43 16v168H237Z" fill="#8A9578" />
          <path d="m257 157 37-17v180h-37zm84-17 26 18v162h-26z" fill="#7F8A6D" />
          <path d="m277 185 32-30 21 1 37 29 88 150H155Z" fill={`url(#${id}-road)`} />
          <path d="m307 155-41 180H148l137-166Z" fill="#A0AA8B" />
          <path d="m330 156 42 179h85L353 179Z" fill="#939E7F" />
          <path
            d="m290 222-28 113h116l-34-113-21-43Z"
            fill="#C6E99D"
            fillOpacity=".14"
            stroke="#C9EA99"
            strokeOpacity=".8"
            strokeDasharray="5 5"
          />
          <path
            d="m324 300-2-60m-8 11 8-11 9 11"
            stroke="#D8F7B2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="m388 155 9-38 4 43" stroke="#3E5037" strokeWidth="6" />
          <circle cx="398" cy="111" r="28" fill="#526846" />
          <circle cx="380" cy="125" r="22" fill="#5C7250" />
          <circle cx="416" cy="128" r="23" fill="#556C48" />
          <path
            d="M252 202v25m0-12-12 18m12-18 12 13m-12-1-9 25m9-25 8 25"
            stroke="#2C3B2B"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="252" cy="193" r="7" fill="#2C3B2B" />
          <rect x="232" y="179" width="42" height="78" rx="2" stroke="#D3F29E" strokeWidth="1.4" />
          <rect x="232" y="164" width="42" height="14" rx="2" fill="#C8E99A" />
          <text x="237" y="174" fill="#35472C" className="art-mono" fontSize="7">
            Person
          </text>
          <rect x="359" y="236" width="32" height="15" rx="2" fill="#D1EDAC" />
          <text x="365" y="247" fill="#3A4A2E" className="art-mono" fontSize="7">
            Path
          </text>
          <path fill={`url(#${id}-scan)`} d="M61 68h478v267H61z" />
          <rect x="79" y="84" width="86" height="21" rx="10.5" fill="#18251B" fillOpacity=".7" />
          <circle cx="91" cy="94.5" r="2.5" fill="#C5E897" />
          <text x="101" y="97" fill="#DCE6CB" className="art-mono" fontSize="7">
            Camera view
          </text>
          <g stroke="#E5EED3" strokeWidth="1.1" strokeOpacity=".7">
            <path d="M82 127v-8h8m419 0h8v8M82 306v8h8m419 0h8v-8" />
          </g>
        </g>
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <rect
          x="143"
          y="282"
          width="315"
          height="65"
          rx="13"
          fill="#1A251C"
          stroke="#889B6F"
          strokeOpacity=".4"
        />
        <circle cx="175" cy="314" r="17" fill="#354831" />
        <path
          d="m175 323 1-17m-6 6 6-6 5 7"
          stroke="#D8EDA8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="203" y="310" fill="#E5EDD5" className="art-display" fontSize="13" fontWeight="500">
          Understand your surroundings.
        </text>
        <text x="203" y="329" fill="#93A582" className="art-mono" fontSize="7.2" letterSpacing=".4">
          SCENE GUIDANCE · ON DEVICE
        </text>
        <g stroke="#B3C792" strokeWidth="1.3" strokeLinecap="round">
          <path d="M426 311v7m4-12v17m4-14v11" />
        </g>
      </g>
      <text x="31" y="363" fill="#7E9071" className="art-mono" fontSize="7.5" letterSpacing="1.2">
        PERCEPTION WITH A PURPOSE.
      </text>
    </svg>
  )
}

function PayArtwork({ id }: { id: string }) {
  return (
    <svg className="art-scene" viewBox="0 0 600 380" fill="none">
      <defs>
        <linearGradient
          id={`${id}-background`}
          x1="0"
          y1="0"
          x2="600"
          y2="380"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1E6D7" />
          <stop offset="1" stopColor="#DAB5A1" />
        </linearGradient>
        <linearGradient
          id={`${id}-card`}
          x1="232"
          y1="198"
          x2="423"
          y2="308"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B46348" />
          <stop offset="1" stopColor="#713F31" />
        </linearGradient>
        <linearGradient
          id={`${id}-phone`}
          x1="350"
          y1="12"
          x2="481"
          y2="372"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF7E9" />
          <stop offset="1" stopColor="#C9B5A0" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-30%" width="200%" height="190%">
          <feDropShadow dx="7" dy="22" stdDeviation="16" floodColor="#7D422C" floodOpacity=".23" />
        </filter>
        <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".65" fill="#986347" fillOpacity=".13" />
        </pattern>
      </defs>
      <path fill={`url(#${id}-background)`} d="M0 0h600v380H0z" />
      <path fill={`url(#${id}-dots)`} d="M0 0h600v380H0z" />
      <text x="31" y="35" className="art-mono" fontSize="9" letterSpacing="1.6" fill="#9D624B">
        LESS NETWORK. MORE POSSIBILITY.
      </text>
      <text
        x="17"
        y="191"
        fill="#B97155"
        fillOpacity=".35"
        fontSize="159"
        fontWeight="500"
        letterSpacing="-12"
        className="art-display"
      >
        *99#
      </text>
      <ellipse
        cx="344"
        cy="208"
        rx="222"
        ry="104"
        transform="rotate(-26 344 208)"
        stroke="#FFF7E8"
        strokeOpacity=".8"
      />
      <ellipse
        cx="344"
        cy="208"
        rx="238"
        ry="118"
        transform="rotate(-26 344 208)"
        stroke="#B06B4F"
        strokeOpacity=".13"
      />
      <g transform="rotate(-18 323 246)" filter={`url(#${id}-shadow)`}>
        <rect
          x="214"
          y="185"
          width="218"
          height="132"
          rx="13"
          fill={`url(#${id}-card)`}
          stroke="#CF8F6E"
        />
        <path
          d="M214 273c63-70 132-86 218-67m-218 87c69-70 137-85 218-68"
          stroke="#ECC0A0"
          strokeOpacity=".13"
        />
        <rect x="236" y="216" width="28" height="22" rx="4" fill="#D0AF79" />
        <path d="M236 224h28m-18-8v22m9-22v22" stroke="#9F7D54" strokeWidth=".8" />
        <text x="237" y="285" fill="#F1CCAC" fontSize="10" letterSpacing="1.5" className="art-mono">
          SIMPLY. CONNECTED.
        </text>
        <circle cx="391" cy="211" r="11" stroke="#F2C7A3" strokeOpacity=".6" />
        <circle cx="405" cy="211" r="11" stroke="#F2C7A3" strokeOpacity=".35" />
      </g>
      <g transform="rotate(12 426 208)" filter={`url(#${id}-shadow)`}>
        <rect x="344" y="20" width="180" height="370" rx="31" fill="#BCA48D" />
        <rect
          x="337"
          y="16"
          width="180"
          height="370"
          rx="31"
          fill={`url(#${id}-phone)`}
          stroke="#FFF9ED"
          strokeWidth="1.4"
        />
        <rect x="343" y="22" width="168" height="358" rx="25" fill="#F9F1E5" />
        <path d="M517 104v48" stroke="#957D67" strokeWidth="2" strokeLinecap="round" />
        <rect x="405" y="29" width="44" height="10" rx="5" fill="#D4C4B2" />
        <text x="356" y="42" fontSize="7" className="art-mono" fill="#99836F">
          9:41
        </text>
        <path d="M486 35v6m4-9v9" stroke="#A18A72" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="496" y="35" width="8" height="5" rx="1" stroke="#A18A72" />
        <g transform="translate(356 61)">
          <path d="m0 10 8-10v7h7L6 19v-9Z" fill="#B96748" />
          <text
            x="21"
            y="14"
            fill="#774A35"
            fontSize="12"
            fontWeight="650"
            className="art-display"
            letterSpacing="-.5"
          >
            turantpay
          </text>
        </g>
        <circle cx="427" cy="140" r="36" fill="#EBD6BF" />
        <circle cx="427" cy="140" r="29" stroke="#CCA37D" strokeOpacity=".5" />
        <text x="414" y="155" fill="#AA6646" fontSize="42" className="art-display" fontWeight="400">
          ₹
        </text>
        <text
          x="427"
          y="202"
          textAnchor="middle"
          fill="#7D4F36"
          fontSize="16"
          fontWeight="600"
          className="art-display"
          letterSpacing="-.6"
        >
          Money moves.
        </text>
        <text
          x="427"
          y="222"
          textAnchor="middle"
          fill="#AC7B5A"
          fontSize="16"
          fontWeight="500"
          className="art-display"
          letterSpacing="-.6"
        >
          Even offline.
        </text>
        <text x="427" y="247" textAnchor="middle" fill="#AA8D73" fontSize="7" className="art-mono">
          A simpler way to UPI.
        </text>
        <rect x="357" y="270" width="140" height="38" rx="10" fill="#A76243" />
        <text
          x="427"
          y="294"
          textAnchor="middle"
          fill="#FFF4E4"
          fontSize="12"
          className="art-mono"
          letterSpacing="1"
        >
          Dial *99#
        </text>
        <path d="M413 334h28" stroke="#B3967C" strokeWidth=".8" />
        <text
          x="427"
          y="351"
          textAnchor="middle"
          fill="#B2997E"
          fontSize="6.5"
          className="art-mono"
        >
          BUILT FOR EVERY CONNECTION
        </text>
        <rect x="405" y="371" width="44" height="3" rx="1.5" fill="#BDA78E" />
      </g>
      <text
        x="33"
        y="283"
        fill="#85543E"
        fontSize="24"
        fontWeight="500"
        letterSpacing="-1"
        className="art-display"
      >
        Pay without
      </text>
      <text
        x="33"
        y="313"
        fill="#85543E"
        fontSize="24"
        fontWeight="500"
        letterSpacing="-1"
        className="art-display"
      >
        the internet.
      </text>
      <text x="34" y="347" fill="#AB7A5E" fontSize="8" letterSpacing="1" className="art-mono">
        UPI, OVER USSD.
      </text>
      <circle cx="550" cy="275" r="5" fill="#DCC1A9" stroke="#F9E6D2" />
      <circle cx="278" cy="65" r="3" fill="#B77856" />
    </svg>
  )
}

function MapCar({
  x,
  y,
  color,
  rotate = false,
}: {
  x: number
  y: number
  color: string
  rotate?: boolean
}) {
  return (
    <g transform={`translate(${x} ${y})${rotate ? ' rotate(90)' : ''}`}>
      <rect x="-11" y="-20" width="24" height="43" rx="7" fill="#1D3941" fillOpacity=".23" />
      <rect
        x="-10"
        y="-22"
        width="20"
        height="38"
        rx="5"
        fill={color}
        stroke="#36505A"
        strokeWidth=".7"
      />
      <path d="m-7-13 1 7H6l1-7ZM-7 8l1-5H6l1 5Z" fill="#355663" fillOpacity=".8" />
      <path d="M-9-1v8M9-1v8" stroke="#36505A" strokeWidth="1" />
      <path d="M-7-19h4m6 0h4" stroke="#F4F3D8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M-7 13h3m8 0h3" stroke="#BD7459" strokeWidth="1.3" strokeLinecap="round" />
    </g>
  )
}

function TrafficArtwork({ id }: { id: string }) {
  return (
    <svg className="art-scene" viewBox="0 0 600 380" fill="none">
      <defs>
        <linearGradient
          id={`${id}-background`}
          x1="35"
          y1="14"
          x2="562"
          y2="380"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D6E1E0" />
          <stop offset="1" stopColor="#A6BFC3" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-40%" y="-50%" width="180%" height="220%">
          <feDropShadow dy="12" stdDeviation="13" floodColor="#2B5660" floodOpacity=".2" />
        </filter>
        <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" stroke="#5C8A91" strokeOpacity=".1" strokeWidth=".7" />
        </pattern>
      </defs>
      <path fill={`url(#${id}-background)`} d="M0 0h600v380H0z" />
      <path fill={`url(#${id}-grid)`} d="M0 0h600v380H0z" />
      <text x="31" y="35" className="art-mono" fontSize="9" letterSpacing="1.3" fill="#41636A">
        A LITTLE MORE IN SYNC.
      </text>
      <text x="475" y="35" className="art-mono" fontSize="8" letterSpacing="1.1" fill="#6F9197">
        SENSE / ADAPT
      </text>
      <ellipse cx="309" cy="260" rx="218" ry="76" fill="#668C94" fillOpacity=".15" />
      <g transform="translate(300 197)">
        <path d="m0-160 277 160v15L0 175-277 15V0Z" fill="#8BA5A8" />
        <path d="M0 160v15l277-160V0Z" fill="#78999E" />
        <g transform="matrix(.866 .5 -.866 .5 0 0)">
          <rect x="-160" y="-160" width="320" height="320" fill="#C5D2CE" />
          <path d="M-160-57H-57v-103H57v103h103V57H57v103H-57V57h-103Z" fill="#E2E9DB" />
          <path d="M-160-46H-46v-114H46v114h114V46H46v114H-46V46h-114Z" fill="#53737D" />
          <path
            d="M-160 0h100M0-160v100M60 0h100M0 60v100"
            stroke="#CDDBD2"
            strokeWidth="1"
            strokeDasharray="11 8"
          />
          <g fill="#D9E1D3">
            {[-37, -25, -13, -1, 11, 23, 35].map((x) => (
              <path key={x} d={`M${x}-68h6v17h-6zM${x}51h6v17h-6z`} />
            ))}
            {[-37, -25, -13, -1, 11, 23, 35].map((y) => (
              <path key={y} d={`M-68 ${y}h17v6h-17zM51 ${y}h17v6H51z`} />
            ))}
          </g>
          <path d="M-44-76h88M-44 76h88M-76-44v88M76-44v88" stroke="#DCE6D7" strokeWidth="2.5" />
          <g stroke="#8EAAA6" strokeWidth=".7">
            <path d="M-159-101h100m-100-31h100m.5-27v100m-34-100v100M60-101h100m-100-31h100M101-159v100m31-100v100M-159 101h100m-100 31h100M-101 60v100m-31-100v100M60 101h100m-100 31h100M101 60v100m31-100v100" />
          </g>
          <rect x="-143" y="-143" width="64" height="64" rx="6" fill="#8DA99C" />
          <rect x="82" y="82" width="60" height="60" rx="7" fill="#8DA99C" />
          <rect x="82" y="-143" width="60" height="64" rx="4" fill="#B3C4C0" stroke="#8AA3A0" />
          <path d="M89-136h46v50H89Z" fill="#DCE4DB" />
          <path d="M96-129h32v36H96Z" stroke="#ABC1BB" />
          <rect x="-141" y="80" width="61" height="63" rx="4" fill="#B3C4C0" stroke="#8AA3A0" />
          <path d="M-133 87h45v49h-45Z" fill="#DCE4DB" />
          <g fill="#567D6F" stroke="#A7C1A8" strokeWidth="1">
            <circle cx="-124" cy="-123" r="12" />
            <circle cx="-99" cy="-104" r="10" />
            <circle cx="104" cy="102" r="11" />
            <circle cx="124" cy="123" r="13" />
          </g>
          <path
            d="M22-76V-27q0 6-6 6h-49"
            stroke="#C8ECA6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 5"
          />
          <path
            d="m-25-27-8 6 8 5"
            stroke="#C8ECA6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <MapCar x={-23} y={-111} color="#E9D9A8" />
          <MapCar x={22} y={101} color="#DFE8DE" />
          <MapCar x={22} y={143} color="#A7BDBA" />
          <MapCar x={104} y={-23} color="#C0D3C6" rotate />
          <MapCar x={-104} y={23} color="#D6AE94" rotate />
          <MapCar x={-147} y={23} color="#DAE3D6" rotate />
          <rect
            x="8"
            y="76"
            width="29"
            height="49"
            rx="4"
            stroke="#D5F2B6"
            strokeWidth="1.3"
            strokeDasharray="4 3"
          />
          <rect
            x="79"
            y="-38"
            width="49"
            height="29"
            rx="4"
            stroke="#D5F2B6"
            strokeWidth="1.3"
            strokeDasharray="4 3"
          />
          <circle cx="-58" cy="-59" r="5" fill="#58777B" />
          <circle cx="58" cy="59" r="5" fill="#58777B" />
        </g>
      </g>
      <g transform="translate(300 152)">
        <path d="M0 0v-62" stroke="#47656A" strokeWidth="5" />
        <ellipse cx="0" cy="1" rx="8" ry="4" fill="#45646B" />
        <path d="m-12-113 22-1 6 5v60l-6 5-22-3Z" fill="#314E56" />
        <rect
          x="-16"
          y="-114"
          width="25"
          height="66"
          rx="8"
          fill="#234149"
          stroke="#7B9698"
          strokeWidth=".8"
        />
        <circle cx="-3.5" cy="-100" r="6" fill="#5B5E51" />
        <circle cx="-3.5" cy="-81" r="6" fill="#7E7F51" />
        <circle cx="-3.5" cy="-62" r="6" fill="#C4E8A4" />
        <circle cx="-3.5" cy="-62" r="10" stroke="#CFEEB2" strokeOpacity=".25" />
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <rect
          x="30"
          y="279"
          width="213"
          height="69"
          rx="10"
          fill="#29464D"
          stroke="#A1BCC0"
          strokeWidth=".6"
        />
        <circle cx="49" cy="298" r="3" fill="#C5EBA6" />
        <text x="60" y="301" fill="#B5CAC7" fontSize="7.5" className="art-mono" letterSpacing=".5">
          COMPUTER VISION
        </text>
        <text
          x="46"
          y="330"
          fill="#E4ECDD"
          fontSize="17"
          className="art-display"
          letterSpacing="-.5"
        >
          Adaptive signals.
        </text>
        <path
          d="m220 318 6 6-6 6m-7-6h13"
          stroke="#BFD5C3"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="art-mono" fontSize="8" letterSpacing=".8" fill="#4F747D">
        <text x="459" y="324">
          SEE THE FLOW.
        </text>
        <text x="449" y="340">
          SHAPE THE CITY.
        </text>
      </g>
    </svg>
  )
}

export function ProjectArtwork({ kind }: ArtworkProps) {
  const id = `art-${useId().replace(/:/g, '')}`
  return (
    <div className={`artwork art-${kind}`} aria-hidden="true">
      {kind === 'aura' && <AuraArtwork id={id} />}
      {kind === 'vision' && <VisionArtwork id={id} />}
      {kind === 'pay' && <PayArtwork id={id} />}
      {kind === 'traffic' && <TrafficArtwork id={id} />}
    </div>
  )
}

export default ProjectArtwork
