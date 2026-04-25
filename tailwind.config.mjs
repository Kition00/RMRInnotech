// tailwind.config.mjs
// ─────────────────────────────────────────────────────────────
// RMR Innotech — "Performance Design" Tailwind Configuration
//
// Dark mode strategy: 'class'
//   Tailwind's `dark:` variants activate when the <html> element
//   has the class "dark". Our ThemeToggle component manages this
//   via localStorage, preventing flicker on every route change.
//
// Design system: Charcoal Grays × Industrial Oranges
// ─────────────────────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
export default {
  // Only process files in src — keeps build lean
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],

  // ── Dark mode via class (controlled by ThemeToggle.astro) ──
  darkMode: 'class',

  theme: {
    extend: {

      // ── Brand palette ──────────────────────────────────────
      colors: {
        // Industrial orange spectrum
        brand: {
          DEFAULT: '#e8651a',   // Primary CTA, accents, hover states
          dark:    '#c4520e',   // Pressed / deeper variant
          glow:    '#f07c35',   // Lighter glow for dark-mode highlights
          muted:   '#7a3510',   // Subtle tint on very dark backgrounds
        },

        // Charcoal gray spectrum (Performance Design backbone)
        gray: {
          950: '#0a0a0a',   // Near-black — dark mode deepest bg
          900: '#111111',   // Dark base background
          800: '#1a1a1a',   // Card surface in dark mode
          750: '#222222',   // Elevated surfaces
          700: '#2a2a2a',   // Borders in dark mode
          600: '#333333',   // Body text on light, headings on dark
          500: '#555555',   // Secondary text
          400: '#888888',   // Muted / disabled
          300: '#aaaaaa',   // Placeholder text
          200: '#cccccc',   // Light borders
          100: '#e8e8e8',   // Dividers
          50:  '#f4f4f5',   // Page bg light mode
        },

        // Semantic aliases (reference these in components)
        surface: {
          DEFAULT: '#ffffff',       // Light mode card bg
          dark:    '#1a1a1a',       // Dark mode card bg
          raised:  '#f4f4f5',       // Light mode raised section
          'raised-dark': '#222222', // Dark mode raised section
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body:    ['Barlow', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },

      // ── Spacing extras ─────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // ── Shadow system — "deep industrial" ──────────────────
      // Layered shadows: tight ambient + wide diffuse penumbra
      boxShadow: {
        'card':       '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 20px 40px rgba(232,101,26,0.18), 0 8px 16px rgba(0,0,0,0.12)',
        'card-dark':  '0 4px 12px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.25)',
        'card-hover-dark': '0 20px 40px rgba(232,101,26,0.25), 0 8px 16px rgba(0,0,0,0.5)',
        'brand':      '0 0 0 3px rgba(232,101,26,0.25)',
        'inner-brand':'inset 0 0 0 1px rgba(232,101,26,0.3)',
      },

      // ── Border radius — industrial sharp ───────────────────
      borderRadius: {
        'industrial': '2px',   // Used on cards, buttons, toggles
      },

      // ── Transitions ────────────────────────────────────────
      transitionTimingFunction: {
        'industrial': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '220': '220ms',
        '350': '350ms',
      },

      // ── Background patterns (utility classes) ──────────────
      backgroundImage: {
        // Dot grid — matches the global.css isometric pattern
        'dot-grid': `
          radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px),
          radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)
        `,
        // CAD grid — used in VerticalCard hover overlay
        'cad-grid': `
          linear-gradient(rgba(232,101,26,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,101,26,0.08) 1px, transparent 1px)
        `,
        // Brand gradient (hero sections, CTAs)
        'brand-gradient': 'linear-gradient(135deg, #e8651a 0%, #c4520e 100%)',
      },

      // ── Z-index scale ───────────────────────────────────────
      zIndex: {
        'nav':      '100',
        'dropdown': '200',
        'modal':    '300',
        'toast':    '400',
      },
    },
  },

  plugins: [
    // ── Custom component layer ─────────────────────────────
    // Adds utility classes that work with dark: variants cleanly
    function ({ addComponents, theme }) {
      addComponents({
        // Industrial button — primary
        '.btn-industrial': {
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.5rem',
          padding:        '0.65rem 1.5rem',
          fontFamily:     theme('fontFamily.mono'),
          fontSize:       '0.75rem',
          letterSpacing:  '0.14em',
          textTransform:  'uppercase',
          fontWeight:     '600',
          borderRadius:   '2px',
          border:         '1.5px solid transparent',
          cursor:         'pointer',
          transition:     'all 0.22s ease',
          backgroundColor: theme('colors.brand.DEFAULT'),
          color:          '#ffffff',
          '&:hover': {
            backgroundColor: theme('colors.brand.dark'),
            boxShadow:       '0 4px 16px rgba(232,101,26,0.35)',
          },
        },

        // Industrial button — ghost
        '.btn-ghost-industrial': {
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.5rem',
          padding:        '0.65rem 1.5rem',
          fontFamily:     theme('fontFamily.mono'),
          fontSize:       '0.75rem',
          letterSpacing:  '0.14em',
          textTransform:  'uppercase',
          fontWeight:     '600',
          borderRadius:   '2px',
          border:         '1.5px solid currentColor',
          cursor:         'pointer',
          transition:     'all 0.22s ease',
          color:          theme('colors.brand.DEFAULT'),
          backgroundColor:'transparent',
          '&:hover': {
            backgroundColor: 'rgba(232,101,26,0.08)',
          },
        },

        // Mono label
        '.label-mono': {
          fontFamily:    theme('fontFamily.mono'),
          fontSize:      '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         theme('colors.gray.400'),
        },
      });
    },
  ],
};
