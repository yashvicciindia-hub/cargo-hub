# Cargo Hub — Website

Static marketing site for Cargo Hub, built with plain HTML5, CSS3, and vanilla
JavaScript. No build step required.

## Structure

```
cargo-hub/
  index.html
  style.css
  script.js
  vercel.json
  assets/
    cargohub-logo.jpeg
```

## Run locally

Any static file server works, e.g.:

```
npx serve .
```

or just open `index.html` directly in a browser.

## Deploy to Vercel

1. Push this folder to a GitHub repo (or drag-and-drop it in the Vercel
   dashboard).
2. Import the repo in Vercel. No framework preset / build command needed —
   Vercel will serve it as a static site.

## Connecting the two forms to Google Forms

Both "Book Mandi Slot" and "List Facility / Warehouse" are custom modal
forms (no embedded iframes). To wire them to a real Google Form:

1. Create your Google Form and grab its prefilled link (Form → ⋮ → "Get
   pre-filled link"), which reveals each field's `entry.NNNNNNNN` ID.
2. Open `script.js` and edit the `FORM_CONFIG` object near the top:
   - Set `baseUrl` to your form's `.../viewform` URL.
   - Replace each placeholder `entry.0000000XX` with the real entry ID for
     that field.
3. If you want submissions to post silently in the background instead of
   just showing a success message, uncomment the fetch call inside
   `submitToGoogleForm()`.

## Editing content

All copy lives directly in `index.html`, organized by section with clear
comments (`<!-- ===== SECTION NAME ===== -->`). Colors and type scale are
defined as CSS custom properties at the top of `style.css`.
