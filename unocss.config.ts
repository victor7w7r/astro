import { defineConfig, presetMini } from 'unocss'

export default defineConfig({
  presets: [presetMini({})],
  safelist: [
    'color-button',
    'color-button-selected',
    'flex',
    'w-full',
    'items-center',
    'justify-center',
    'gap-5',
    'size-10',
    'rounded-full',
    'border',
    'border-white/20',
    'transition',
    'duration-300',
    'hover:scale-110',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-white/60',
    'bg-[#6603fc]',
    'bg-[#9c1c85]',
    'bg-[#1c959c]',
    'shadow-lg',
    'shadow-[#9c1c85]/40',
    'shadow-[#1c959c]/40',
    'shadow-2xl',
    'shadow-[#6603fc]/75',
    'relative',
    'z-10',
    'max-w-xl',
    'mt-4',
    'max-w-md',
    'text-base',
    'leading-7',
    'text-slate-700',
    'text-white/70',
    'sm:text-lg',
    'dark:hidden',
    'hidden',
    'dark:block',
    'store-input'
  ],
  theme: { fontFamily: { amina: 'AminaReska' } },
  rules: [
    ['blur-3xl', { filter: 'blur(64px)' }],
    ['backdrop-blur-xl', { 'backdrop-filter': 'blur(24px)' }]
  ],
  shortcuts: {
    'content-width': 'mx-auto w-full max-w-7xl',
    'inline-group': 'flex items-center gap-3',
    'display-font': 'font-amina',
    'glass-panel':
      'rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl',
    'primary-button':
      'rounded-full bg-[#6603fc] px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#9c1c85]',
    'decorative-orb':
      'pointer-events-none absolute -z-10 rounded-full blur-3xl',
    'toggle-design':
      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer appearance-none items-center justify-start rounded-full border border-slate-500 bg-slate-700 p-0 align-middle transition-colors duration-300 after:absolute after:left-[0px] after:top-1/2 after:h-[18px] after:w-[18px] after:-translate-y-1/2 after:rounded-full after:border after:border-slate-400 after:bg-white after:transition-all after:content-[''] focus:outline-none focus:ring-2 focus:ring-[#1c959c]/60 dark:border-slate-500 dark:bg-slate-700",
    'store-input':
      'w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-base text-slate-900 shadow-lg shadow-black/10 outline-none transition placeholder:text-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 focus:border-[#1c959c]/70 focus:bg-white/8 focus:shadow-[#1c959c]/10',
    'color-button':
      'size-10 rounded-full border border-white/20 transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/60',
    'color-button-selected': 'shadow-2xl shadow-[#6603fc]/75'
  },
  preflights: [
    {
      getCSS() {
        return `
	        @font-face {
	          font-family: 'AminaReska';
	          src: url('/fonts/amina-reska.woff') format('woff');
	          font-weight: 400;
	          font-style: normal;
	          font-display: swap;
	        }
				`
      }
    }
  ]
})
