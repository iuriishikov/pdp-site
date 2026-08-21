import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

/**
 * Architectural linting: enforces the Feature-Sliced Design layer rules —
 * no importing from a layer above, no cross-slice imports, public API only.
 *
 * Run with `pnpm lint:fsd`. Point it at `./src`; the Next.js `app/` directory
 * at the repository root is routing, not an FSD layer.
 */
export default defineConfig([
  ...fsd.configs.recommended,

  {
    /**
     * The FSD layers named `app` and `pages` are prefixed with an underscore,
     * as the official Next.js guide requires: Next.js claims both `app/` and
     * `pages/` inside `src/`, and would either shadow them or try to route
     * them. steiger 0.6 does not strip that prefix, so it reads `_app` as a
     * misspelled sliced layer and reports its segments as segmentless slices.
     * All three findings are artefacts of the prefix, not real violations.
     */
    files: ['./src/_app/**', './src/_pages/**'],
    rules: {
      'fsd/typo-in-layer-name': 'off',
      'fsd/no-segmentless-slices': 'off',
      'fsd/no-segments-on-sliced-layers': 'off',
    },
  },

  {
    // Shared deliberately uses per-component barrels rather than one barrel per
    // segment, which is what the FSD docs recommend for tree-shaking.
    files: ['./src/shared/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },

  {
    /**
     * `assets` holds fonts, logos and animation documents. The rule wants
     * segment names to state a purpose, but every purpose-shaped alternative
     * reads worse for a folder of static files, and `shared/assets` is the
     * convention across FSD projects.
     */
    files: ['./src/shared/assets/**'],
    rules: {
      'fsd/segments-by-purpose': 'off',
    },
  },

  {
    // A four-section marketing site legitimately has slices referenced once.
    // The rule exists to catch premature abstraction in large applications.
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
])
