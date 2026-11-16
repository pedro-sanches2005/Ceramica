---
name: Incargel
description: Landing page de blocos cerâmicos. A carga saindo da fábrica, contada pelas cores, pelos dados e pelo próprio bloco.
colors:
  barro: "#B4532C"
  barro2: "#8F3F1F"
  barro-tx: "#7A3418"
  kraft: "#D9C6A0"
  cal: "#EFE7D8"
  papel: "#F7F2E8"
  tinta: "#1C1A17"
  corpo: "#2C2925"
  cinza: "#4A463F"
  regua: "#1C1A1733"
  fita: "#2F5D9E"
  fita-cl: "#8FB1E8"
  fita-kr: "#244A80"
  corte: "#C8322B"
  brasa: "#C9622F"
  brasa2: "#E08A55"
  brasaD: "#8F3F1F"
typography:
  display:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(3.3rem, 7.2vw, 7.4rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.005em"
  numeral:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(3.6rem, min(18vw, 15svh), 11rem)"
    fontWeight: 800
    lineHeight: 0.85
  statement:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.12
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    letterSpacing: "0em"
  data:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "1rem"
    fontWeight: 700
  button:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 800
    letterSpacing: "0.07em"
  stencil:
    fontFamily: "Big Shoulders Stencil, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 900
    lineHeight: 1.42
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(64px, 9vw, 120px)"
  header: "60px"
  row: "12px"
  stack: "22px"
  target: "44px"
components:
  button-primary:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.fita}"
    textColor: "{colors.cal}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-outline-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
  button-on-dark:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-on-dark-hover:
    backgroundColor: "{colors.brasa2}"
    textColor: "{colors.tinta}"
  button-small:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
    rounded: "{rounded.none}"
    padding: "8px 14px"
  catalog-card:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "16px"
  catalog-card-back:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "16px"
  line-badge:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  qtd-stepper:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    height: "{spacing.target}"
  qtd-add:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "11px 14px"
  qtd-add-hover:
    backgroundColor: "{colors.fita}"
    textColor: "{colors.cal}"
  digit-cell:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
    typography: "{typography.stencil}"
    rounded: "{rounded.none}"
    width: "1.05em"
    height: "1.42em"
  digit-cell-cut:
    backgroundColor: "{colors.corte}"
    textColor: "{colors.cal}"
    typography: "{typography.stencil}"
    rounded: "{rounded.none}"
  field-boxed:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.cal}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  select-ruled:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 40px 12px 14px"
  quote-bar:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.cal}"
    rounded: "{rounded.none}"
    padding: "10px 10px 10px 18px"
  privacy-banner:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "18px 22px"
  header:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.tinta}"
    height: "{spacing.header}"
---

# Design System: Incargel

## Overview

**Creative North Star: "A Carga de Expedição"**

The page is the load leaving the factory, told with its colours, its data and the block itself. Each section is one flat, full-bleed field of a material on the pallet: deep fired clay, kraft, lime-washed paper, ink. On those fields the facts are laid out like a dispatch sheet: condensed uppercase claims, typed values in Courier, ruled lists, real photos set straight. Strap blue is the one colour that is not a material of the load, and it marks what the visitor can act on.

Ornament comes from the product, never from a library. The hero ground is a running-bond wall drawn at the real module (29 × 19 cm block plus 1 cm joint) that lays itself course by course and then drifts right like a conveyor; the contact ground is the block's hollow face in the same bond, drifting slower. Button hovers lay five blocks one by one. A small brick face, the **tijolinho**, is the system's only pictogram for "a piece placed": it rides the factory rail, sets the commitments, and flies from any "Adicionar" button to the quote counter.

Density follows the decision. The hero, the factory rail and the commitments are spacious and loud; the catalog, the family sheet, the simulator and the quote panel are dense tools with typed values, steppers and technical drawings that assemble themselves. Corners are square everywhere; structure is drawn with 1–3px ink rules.

**Key Characteristics:**
- One flat full-bleed ground per section: deep clay (hero, comparison), lime (factory, simulator, commitments), kraft (catalog), ink (contact and footer).
- Strap blue means "act here": links, focus, button hover fill, the header's bottom strap.
- Brasa is the colour of the fired piece: the tijolinho, reached rail ticks, the counter pulse, drawings and the range thumb.
- Big Shoulders condensed uppercase for claims and step numerals; Big Shoulders Stencil only for the footer carimbo and digit counters; Courier Prime for every measured value; Archivo for reading and labels.
- Backgrounds and motion are derived from the block: the wall, the hollow face, the course of five, the brick that flies. Motion is mechanical, stepped where it lays blocks, and every piece has a reduced-motion form.

## Colors

Fired clay, kraft, lime and ink from the pallet itself; one strap blue for action; brasa for the fired piece; one red for cut pieces.

### Primary
- **Fita de Arquear** (fita): the action colour. Text-link underlines, the global 3px focus ring, the hover course inside ink buttons, selection, caret, the 3px strap under the fixed header, the blue text actions on cards ("Ver medidas", "Calcular parede com esta linha", "+ 1 carga").
- **Fita Clara** (fita-cl): the same strap lightened for dark grounds: link underlines, focus ring and the focused field rule on clay and ink.
- **Fita de Kraft** (fita-kr): the strap darkened for small text set directly on kraft (the "Arraste" hint of the mobile catalog), where fita falls short of 5:1.

### Secondary
- **Barro Fundo** (barro2): the ground of the hero and the comparison; on light grounds, accent text (`em` is a colour change, never italic), the 6px top edge of the family sheet, the active segment of the mobile factory progress, the stencil carimbo on ink, the accepted choice in the privacy banner.
- **Barro Queimado** (barro): fired clay at brand scale only (theme colour, wordmark contexts). Too light for small text.
- **Barro de Texto** (barro-tx): clay darkened for small text on kraft.

### Tertiary
- **Brasa / Brasa Clara / Brasa Escura** (brasa, brasa2, brasaD): the fired piece. Brasa fills the tijolinho, the reached ticks of the factory rail, the "bate" pulse of the quote counter, whole blocks in the wall drawing and the range thumb. Brasa2 is the half block, the brand mark, the progress ring of the scroll guide and the hover course inside light buttons on dark grounds. BrasaD is the U-channel face in drawings.
- **Corte** (corte): the cut piece and nothing else: digit cells of the cut counter, the 45° hatch of cut pieces, the simulator tip border when cuts are needed.

### Neutral
- **Cal** (cal): page ground and light section field; text on every dark ground; header, card front, family sheet, quote panel and privacy banner ground.
- **Papel** (papel): the white sheet: card back, family piece tiles, drawing frames, steppers, select, boxed quote fields.
- **Kraft** (kraft): the catalog field; on ink, secondary text (contact intro, labels, footer).
- **Tinta** (tinta): headings, rules, buttons, digit cells, line badges, the quote bar, the contact field.
- **Corpo** (corpo): running text on light grounds.
- **Cinza** (cinza): secondary text, spec labels, notes, the trash state of the stepper.
- **Régua** (regua): ink at 20% for hairline row dividers. Cal at 25% (`#EFE7D840`) plays the same role on ink and clay.

### Named Rules
**The One Strap Rule.** Strap blue is the only accent and always means "you can act here". It never fills a section, never decorates a heading, never colours data.

**The Fired Piece Rule.** Brasa marks a piece of the load: the tijolinho, progress already made, a piece arriving in the quote, the block in a drawing. It is never a link colour and never fills a section.

**The Red Means Cut Rule.** Corte appears only where a piece is cut or a wall will need cuts.

**The Lime On Clay Rule.** Small text on deep clay is set in cal, never kraft. Small clay text on kraft uses barro-tx; small blue text on kraft uses fita-kr.

## Typography

**Display Font:** Big Shoulders (800/900), with sans-serif fallback
**Stencil Font:** Big Shoulders Stencil (900), loaded without preload
**Body Font:** Archivo, with system-ui fallback
**Data Font:** Courier Prime (400/700), with Courier New fallback

**Character:** Condensed uppercase cargo marking for the claims and the step numerals, a stencil sprayed on the load for the name across the footer and the counts, a typewriter for every value on the sheet, and a sober grotesque for reading.

### Hierarchy
- **Display** (900, clamp(3.3rem, 7.2vw, 7.4rem), 1.0, uppercase): hero h1 only, max 9ch; clamp(2.8rem, 14vw, 3.8rem) under 560px.
- **Headline** (800, clamp(2.6rem, 5.6vw, 4.6rem), 1.1, uppercase, balanced): every section h2; contact up to 4.8rem; overlays (family sheet, quote panel) 1.7–2.8rem.
- **Numeral** (Big Shoulders 800, up to 11rem, 0.85): the factory step numbers 01–05, full ink, like a number painted on the load.
- **Statement** (800, clamp(1.5rem, 3.2vw, 2.5rem), 1.12, uppercase): the ruled commitment list; mobile menu links at 1.7rem.
- **Title** (Archivo 700, 1.2rem, 1.2): h3/h4 inside sections.
- **Body** (Archivo 400, 1rem, 1.55): paragraphs capped at 44–62ch; hero lead up to 1.22rem.
- **Label** (Archivo 600, 0.8–0.9rem, sentence case): field labels, spec labels, table heads, dt captions. There is no uppercase tracked label.
- **Data** (Courier Prime 700, 0.85–1.55rem): dimensions (card titles), pçs/m², kg, MPa, line badges, stepper values, the norms line, captions, comparison results, carousel counters.
- **Stencil** (Big Shoulders Stencil 900): the INCARGEL carimbo fitted edge to edge across the footer (line-height 0.86, in barro2), and the simulator digit cells (1.75rem/1.42).
- **Button** (Big Shoulders 800, 1.12rem, 0.07em, uppercase): every button; small 0.98rem.

### Named Rules
**The Typed Value Rule.** Every measured value is set in Courier Prime with tabular numerals; its label stays in Archivo.

**The Stencil Is For Counting Rule.** The stencil face carries only the carimbo and the digit counters. It never sets a sentence or a heading.

## Layout

- **Full-bleed fields, no container.** Every section spans the viewport with `gutter` side padding and `section` vertical padding; readability comes from ch caps. The hero grid caps at 1340px, the family sheet at 1240px, the quote panel at 480px.
- **Fixed header** of 60px with a 3px strap; anchors use a 62px scroll margin. Desktop "Cotar" reserves 150px so the "(N)" count never shifts the nav.
- **Section order and grounds:** hero (deep clay) → factory (lime) → catalog (kraft) → simulator (lime) → comparison (deep clay) → commitments (lime) → contact and footer (ink).
- **Factory rail (desktop):** a sticky 100svh scene inside 300svh of scroll. One step is shown whole at a time; the track springs to the next panel when the tijolinho reaches that step's tick (6% before the tick). Ticks are clickable and scroll to their step; a "Pular para os blocos" link sits beside the heading.
- **Factory rail (≤760px or short landscape):** a stories carousel, 86% cards with scroll-snap, five segment bars on top, 44px arrow buttons and a typed position line below.
- **Catalog:** an Estruturais / Vedação segmented control, then a grid of cards `auto-fill, minmax(270px, 1fr)`. Under 700px the grid becomes a snap carousel of min(80vw, 310px) cards with a typed counter, dots and an "Arraste" hint.
- **Family sheet:** a bottom sheet over an ink scrim, piece tiles in `auto-fill, minmax(240px, 1fr)` (two columns under 560px), a ruled footer with the calculator link and "Revisar e enviar (N)".
- **Quote:** a fixed bottom bar (max 560px) when the list has items; a right-hand panel for review and the WhatsApp form.
- **Simulator:** 380px controls beside the drawing from 960px; below that the drawing sticks under the header (max 28svh).
- **Breakpoints:** 960px, 900px, 760px (burger, mobile rail), 700px (catalog carousel), 560px, 480px (bar on one line), 420px, 360px, max-height 500px landscape.
- **Touch:** under `pointer: coarse`, small buttons reach 44px, and inline links get an invisible hit area (12–14px vertical) so targets reach 44px without changing the drawing.

## Elevation & Depth

Sections are flat: depth between them is a change of field, never a shadow. Inside a section depth is stated by rule weight (3px for the top of a list or the header strap, 2px for controls and frames, 1px for rows) and by the papel sheet. Three things are lifted, and only these: product photos stand on a soft floor shadow, the floating overlays (quote bar, privacy banner) carry one ambient shadow, and the flying tijolinho carries a small drop shadow. Overlay sheets (family sheet, quote panel, mobile menu) sit over an ink scrim instead of a shadow.

### Shadow Vocabulary
- **Floor** (`radial-gradient(closest-side, #3A160677, transparent)` ellipse under the card photo; `radial-gradient(ellipse 60% 14% at 50% 88%, #3A160655, transparent 70%)` under family pieces): the block resting on the ground.
- **Float** (`box-shadow: 0 10px 26px #1C1A1755` quote bar; `0 14px 34px #1C1A1747` privacy banner): fixed overlays that sit over content.
- **Flight** (`filter: drop-shadow(0 4px 6px #1C1A1755)`): the tijolinho in the air.
- **Scrim** (`#1C1A17cc` family sheet, `#1C1A17aa` quote panel, `#1C1A1799` mobile menu).

### Named Rules
**The Grounded Load Rule.** Only objects of the load and floating overlays leave a shadow. Sections, cards, buttons and fields stay flat.

## Shapes

Every corner is square (0px): buttons, cards, steppers, fields, selects, badges, digit cells, frames, sheets, photos. Borders are ink rules in three weights: 3px for the header strap and the top of the commitment list; 2px for buttons, steppers, drawing frames, card backs, sheet edges and field underlines; 1px (ink or cal at 20–25%) for rows and card fronts. A 1.5px dashed ink rule frames the "+N peças da linha" button on a card. The block's own geometry is the recurring silhouette: the running bond, the hollow face, the five-block course, the isometric block with U and J channel profiles. The only rounded element is the floating scroll guide pill of the factory scene. Photos and headings are never rotated; only a piece in motion (the flying or landing tijolinho, the card photo on hover) tilts, by 2–14°.

## Components

### Buttons
Heavy ink slabs; on hover a course of five blocks is laid inside, one by one, left to right.
- **Shape:** square, 2px border matching the fill.
- **Primary:** tinta fill, cal text, Button type, 14px 24px padding, 10px icon gap. Quote actions carry the drawn WhatsApp icon.
- **Hover:** a fita panel scales from `scaleX(0)` to full over 0.4s `steps(5, end)`, painted with four joints (ink at 19%) so it reads as five blocks; the border turns fita. Hover only on `hover: hover`. Active scales to 0.97.
- **Outline:** transparent with ink border; the course is ink and the text turns cal once half the course is laid (color .12s delayed .2s).
- **On dark grounds (hero, contact, quote bar):** the slab turns cal with ink text and the course is brasa2; the outline turns cal with a cal course.
- **Small:** 8px 14px, 0.98rem (header "Cotar (N)", quote bar).
- **Reduced motion:** the course appears at once; no press scale.
- **Reassurance line:** under each main quote button, Archivo 0.88rem with a phone link underlined in fita.

### Text actions
- **Underline links:** no colour change; a 2px fita (fita-cl on dark) bottom border: phones, e-mail, nav hover, "Pular para os blocos", "catálogo" in the empty quote.
- **Blue actions:** fita text, a 2px underline appears on hover: "Ver medidas", "Ver as N peças", "Calcular parede com esta linha", "+ 1 carga", "Desfazer".

### Tijolinho (brick icon)
The face of the ceramic block, 34 × 20 viewBox: brasa body with a 2px ink stroke and four hollow cells in ink at 75%. It is the marker that rides the factory rail (46 × 27), the bullet of each commitment (laid one by one with 90ms stagger, dropping 18px with a -6° tilt the first time the list is seen), and the piece that flies from any add button along an arc (640ms) to the quote target ("Cotar (N)" in the header, or "Revisar e enviar (N)" in an open family sheet), which then pulses (scale 1.09 and brasa fill, 0.5s). Under reduced motion there is no flight and no drop: only the colour pulse and a fade.

### Catalog Card
- **Front:** cal, 1px régua border, 16px padding: line badge (Courier on ink) and family name, the product cut-out standing on a floor shadow (lifts 8px and tilts -2° on hover), the dimensions as a Courier title, two typed specs, the "+N peças da linha" dashed button with mini cut-outs, the quantity control and "Ver medidas".
- **Back:** papel with an ink border; the card turns 180° on Y (0.7s `cubic-bezier(.2,.8,.2,1)`), and the isometric drawing of the block assembles: front face and its dimensions first, then the piece extrudes in depth, then the length dimension (0.9s after 0.25s). Drawings cover the plain block, horizontal and vertical hollows, and U and J channels. Below: a two-column spec list under a 2px rule, "Ver bloco" (outline small), "Ver as N peças", and "Calcular parede com esta linha" which loads the simulator with that line.
- **Reduced motion:** the flip and the drawing are instant.

### Segmented control
Two ink-framed halves (Estruturais / Vedação, with a line count). The selected half is ink with cal text; the ink indicator slides between halves on a spring.

### Family sheet
A bottom sheet (cal, 6px barro2 top edge) that rises on a spring over an ink scrim. Header with Headline-sized line name and a typed badge; a 48px square close. Piece tiles on papel with 1px borders: photo on a floor shadow, or, after "Ver medidas", the piece's own assembling drawing at the same 4:3 height; name, Courier dimensions, spec chips, and a compact quantity control. Footer: calculator link and "Revisar e enviar (N)".

### Quantity control
- **Empty:** "Adicionar ao orçamento", an ink slab (Big Shoulders 800 1rem) that fills fita on hover and launches the tijolinho.
- **Stepper:** 44px − / typed value / + on papel in a 2px ink frame; the value is editable Courier. At 1 piece the − becomes a trash icon in cinza, so the item is never removed by accident. Over the limit, an ink note appears pinned under the stepper.
- **"+ 1 carga":** a blue action under the stepper adding one truckload, with the piece count typed in cinza.

### Quote (Orçamento)
- **Bar:** fixed at the bottom when the list has items, ink with a 2px cal border and the Float shadow, a typed count of items and pieces, "Revisar e enviar" on-dark button. Hidden while the mobile menu is open.
- **Panel:** right side, cal, 2px ink left edge, sticky header. Rows: 48px cut-out, name, typed dimensions and line, "Excluir", and a stepper. Fields are boxed papel with a 1.5px ink border and a 2px fita focus outline. Footer: typed total, full-width send button, "Limpar orçamento" with a 5s "Desfazer". After sending, a confirmation state with "Abrir o WhatsApp de novo" and "Começar novo orçamento".

### Simulator (Paginador de Parede)
- **Controls:** a papel select with 2px ink border and drawn chevron; range sliders with a 3px ink track and a square brasa thumb in a 2px ink frame (larger on touch); a 20px ink checkbox.
- **Digit counters:** three fixed stencil cells per count, ink ground and cal digits, leading zeros dimmed; only the changed digit drops in (0.34s). The cut counter turns its cells corte.
- **Wall drawing:** courses on papel in a 2px ink frame, brasa whole, brasa2 half, brasaD U-channel, red hatch for cuts, a cinza dimension line and a typed caption. Courses drop in (0.35s, 50ms stagger) only when the wall changes, never on first paint.
- **Tip:** 2px corte box when cuts are needed, 2px fita when the wall closes clean.

### Product backgrounds
- **Parede (hero):** the running bond (120 × 80 module) in 1.2px kraft strokes at 20% opacity (13% on phones), masked lighter toward the text side. On load a barro2 curtain shrinks over it in 24 steps (1.5s), laying the wall course by course from the bottom; then the wall drifts right by one module every 18s, seamless, paused when offscreen. Reduced motion: no curtain, a still wall.
- **Furos (contact):** the block's hollow face in the same bond, cal at 7% on ink, drifting on the same conveyor at 26s, paused offscreen. Reduced motion: still.

### Factory rail
A 2px ink line with five 2px ticks; reached ticks turn brasa and grow 1.35×; the tijolinho rides the line with scroll (spring-smoothed). A floating pill guide shows a brasa2 progress ring and "Role para avançar", turning into a check and fading when the scene ends. Reduced motion: the scene unpins into a vertical list of the five steps, with no rail and no guide.

### Inputs / Fields
- **Contact fields:** on ink, no box: a 2px cal bottom rule, 10px vertical padding, Archivo 500 1.08rem in cal; labels Archivo 600 0.9rem in kraft. Focus turns the rule fita-cl; the caret is fita.
- **Quote fields:** boxed papel, 1.5px ink border, Archivo 500; focus is a 2px fita outline.

### Navigation
- **Header:** fixed 60px, cal, 3px fita strap. Brand mark plus INCARGEL in Big Shoulders 900 with an Archivo subtitle. Links Archivo 600 0.95rem gaining a 2px fita underline on hover. "Cotar" becomes "Cotar (N)" and opens the quote panel once the list has items.
- **Mobile (≤760px):** a 44px square burger whose two bars cross into an X; a cal panel springs down from the header over an ink scrim, with 48px kraft tiles, Statement-sized links between rules, a full-width quote button and typed phone buttons.

### Privacy banner
Fixed at the bottom, cal with a 2px ink border and the Float shadow, rising 0.6s after load. Outline buttons in Big Shoulders 800 ("Somente necessários", "Personalizar") and the accepting choice filled barro2. "Personalizar" reveals checkbox categories. Reopened from "Privacidade" in the footer.

### Footer
Brand, nav and a quote button between cal 25% rules; the INCARGEL carimbo in stencil barro2 spanning the full width; a typed base line with "Privacidade" and "Voltar ao topo".

## Do's and Don'ts

### Do:
- **Do** give each section one flat full-bleed ground from the palette, in the order clay, lime, kraft, lime, clay, lime, ink.
- **Do** reserve strap blue (#2F5D9E, #8FB1E8 on dark, #244A80 for small text on kraft) for links, focus, button hover and the header strap.
- **Do** draw ornament from the block itself at its real module (29 × 19 + 1 cm joint): the running bond, the hollow face, the course of five, the tijolinho.
- **Do** use the tijolinho in brasa as the one pictogram for a piece placed, reached or loaded.
- **Do** lay blocks with stepped timing (`steps()`), and run ambient motion as a slow linear conveyor that pauses offscreen.
- **Do** set every measured value in Courier Prime with tabular numerals and keep its label in Archivo.
- **Do** keep h1 and h2 in Big Shoulders uppercase, line-height 1.1 (hero 1.0), balanced.
- **Do** keep every corner square and separate content with 1–3px ink rules.
- **Do** give every animation a reduced-motion form: still backgrounds, instant flips and drawings, no flight, colour-only pulse, the factory scene as a plain list.
- **Do** gate hover behind `hover: hover` and reach 44px touch targets under `pointer: coarse` without changing the drawing.
- **Do** show photos straight, at native size or smaller.

### Don't:
- **Don't** imitate paper objects: no shipping tags, stubs, grommets, perforations, tractor holes, stamps, stapled or tilted photos.
- **Don't** import decorative effects from component libraries (dot fields, topographic lines, rolling text, hand-drawn marks); derive them from the product.
- **Don't** use gradients as section grounds or grid/blueprint wallpaper.
- **Don't** add a second accent hue or use blue for decoration.
- **Don't** use brasa as a link or button colour, or corte for anything except cut pieces.
- **Don't** shadow sections, cards, buttons or fields; only grounded products, floating overlays and the flying tijolinho cast one.
- **Don't** set fired clay (#B4532C) as small text.
- **Don't** set sentences or headings in the stencil face.
- **Don't** count numbers up or re-animate the wall when nothing changed.
- **Don't** keep ambient motion running offscreen.

## Histórico: sistema anterior (substituído em 2026-11-14)

> **Non-normative. Superseded.** This section preserves the previous visual world for reference only. It was replaced on 2026-11-14 by the system above. Do not use any token, rule or component below for new work.

**Creative North Star (old): "A Prancheta da Fábrica"**

The previous site read like a technical drawing pinned up inside the factory: dark graphite backgrounds with faint blueprint grids, monospaced dimensions (IBM Plex Mono), a dimensioned isometric block assembled by scroll, and kiln orange (Brasa) as the only warm voice. Headings were Archivo at 125% width, 800, uppercase, very tight. Surfaces alternated graphite, bone and one full-bleed brasa band.

**Old palette:** grafite #15181A, grafite-elevado #1E2326, osso #ECE7DC, osso-sombra #DDD6C6, osso-suave #CFCABF, brasa #F08A24, brasa-clara #F6B565, brasa-queimada #9A4C08, cinza-cota #8A9094, linha-fina #ffffff1f, corte #E5484D, corte-claro #FF8A8F.

**Old rules (superseded):** The One Fire Rule (brasa the only accent, no blues); The Contrast Swap Rule (brasa-queimada on bone); The Red Means Cut Rule; The Second Line Burns Rule (`em` turns brasa); The Every Number Is a Measurement Rule (IBM Plex Mono for data); The One Shout Rule; The Only Things That Cast Shadows Are Bricks Rule (floor shadows under product photos); The Blueprint Texture Rule (1px grids behind drawings).

**Old components (superseded):** brasa-filled quote buttons with an osso panel sliding up; flip-card catalog on grafite-elevado with floor shadows and a 3D-rotating back; segmented control; dimension tags; scroll-driven hero extrusion and a sticky horizontal factory rail; underline contact fields in osso.

### 2026-11-16: revisão pelo site publicado

> **Non-normative.** Summary of what changed between the 2026-11-14 document and the shipped build it now describes.

- **Catalog:** the ruled comparison table with rows opening in place was replaced by a segmented control (Estruturais / Vedação) and flip cards on cal (front: cut-out on a floor shadow, typed specs, quantity; back: the assembling isometric drawing, now with U and J channels), plus the family bottom sheet with "Ver medidas" per piece.
- **Quote:** new quote cart (bottom bar, side panel, stepper with trash at 1 and "+ 1 carga", WhatsApp send), "Cotar (N)" in the header, and the privacy banner.
- **Backgrounds and motion:** KokonutUI effects (dot field, topographic background, rolling button text) were removed in favour of product-derived ones: the running-bond hero wall that lays itself and drifts as a conveyor, the hollow-face contact pattern, the five-block button course (`steps(5)`), and the tijolinho (rail marker, commitment bullets, the flight to the quote). Ambient motion pauses offscreen; every animation has a reduced-motion form.
- **Factory:** the snap scroller with arrows became a pinned, step-based rail with clickable ticks and a scroll guide on desktop, and a stories carousel on phones.
- **Rules revised:** "no cards" and "no shadows" were dropped (cards and three named shadow roles ship); check marks in strap blue became brasa tijolinhos; Big Shoulders Stencil narrowed to the footer carimbo and digit counters (step numbers are now Big Shoulders 800); uppercase tracked labels are gone; contact input is Archivo, not Courier; new tokens fita-kr and brasaD.
