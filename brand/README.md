# GIGA brand source

Steven's official logo library (`GIGA LOGOS`, delivered 2026-07-22). **Source artwork — not served.**
`brand` is in the `firebase.json` ignore list, so nothing here ships to Hosting.

Production assets are copied into `assets/` and referenced from `index.html`.

## Which file is which

| File | Mode | Notes |
|---|---|---|
| `giga_logo_N03_dark_animated.svg` | **dark** | The one the site uses. Wordmark `#F7F6F2`, on a `#102A43` plate. |
| `giga_logo_N01_soft_blue.svg` | light | Navy wordmark on a soft-blue plate. |
| `giga_logo_N01_soft_blue_animated.svg` | light | Animated version of N01. |
| `giga_logo_N02_soft_blue_thin.svg` | light | Thinner connector strokes. |
| `giga_logo_N01_soft_blue.png` | light | Raster of N01. |
| `giga_action_board_version3_nostretch.svg` | — | Just the orange arrow element, not a lockup. |
| `giga_f01_f03_matched_dark_correction.svg` | — | Working/correction artboard, mostly empty. Not for use. |
| `giga_logo_*.gif`, `giga_signature_*.gif` | both | Raster versions, superseded by the SVGs above. |
| `giga-enterprises-lockup-light-emailed.gif` | light | What Steven originally emailed. 226×109, opaque white bg, 5px-tall tagline — **unusable on the dark site**, kept for provenance. See #46. |
| `GIGA_Proposal_Fonts/` | — | Inter + Source Serif 4 (OFL). For **proposal documents**, not the website — the logo SVGs use a system Arial stack and need no font files. |

## Brand colors

Taken from the SVG source, and consistent with the emailed GIF:

| Role | Hex |
|---|---|
| Wordmark (dark mode) | `#F7F6F2` |
| Wordmark (light mode) | `#102A43` |
| Plate (dark mode) | `#102A43` |
| Dots | `#4E8A2C` |
| Arrow / tagline | `#DA7101` |

## The one modification we make

`assets/giga-enterprises-lockup-dark.svg` is `giga_logo_N03_dark_animated.svg` with **the `#102A43` plate `<rect>` removed** — the site background is `--navy: #0F172A`, so the plate would otherwise read as a lighter card floating on the page. Nothing else is altered; the animation and all colors are Steven's.

Regenerate it with:

```sh
python3 -c "
import re
s = open('brand/giga_logo_N03_dark_animated.svg').read()
open('assets/giga-enterprises-lockup-dark.svg','w').write(
    re.sub(r'\s*<rect[^>]*fill=\"#102A43\"[^>]*/>', '', s))
"
```
