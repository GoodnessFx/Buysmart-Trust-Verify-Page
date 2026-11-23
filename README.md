# BuySmart Trust Page

A fast, static React/Vite trust page for BuySmart Procurement Limited. It has no backend, login, database, or private storage.

## Content updates

All public text, dates, links, and document metadata live in `src/content.json`. PDFs live in `public/documents/`, and their first-page thumbnails live in `public/images/`.

To add or replace a public document:

1. Confirm the file is intended for public viewing and contains no client, password, banking, or private information.
2. Keep the PDF under about 5 MB.
3. Copy it into `public/documents/` using a clear filename without spaces.
4. Create a lightweight WebP or PNG thumbnail of page one in `public/images/`.
5. Add or update its entry in `src/content.json`, including its file path, thumbnail path, page count, file size, and `lastUpdated` date.
6. Use an `officialUrl` only when a visitor can use a real public official page to independently check that specific record. Otherwise leave it empty so the card is labelled `Company document`.
7. Run `pnpm build`.

Example:

```json
{
  "id": "example",
  "title": "Document title",
  "purpose": "One sentence explaining what it shows.",
  "status": "published",
  "lastUpdated": "9 July 2026",
  "file": "/documents/example.pdf",
  "thumbnail": "/images/example-thumbnail.webp",
  "fileSize": "850 KB",
  "pages": 4,
  "officialUrl": "",
  "details": [],
  "notice": ""
}
```

## Publication safeguards

- Do not publish client invoices or receipts. If a sample is needed, use fake client details.
- Publish only `BuySmart-Company-Policy-updated.pdf`; the older policy contains a personal email address.
- Do not publish the capability statement until the unsupported `99.9% Oil and Gas Procurement Capability` and `24/7` cover claims are removed.
- Do not label training records as company or process ISO certification. The approved label is `Leadership training`.
- Do not add a trademark verification button until the founder or trademark agent supplies a working official registry URL.
- Keep pending items clearly marked `FILE PENDING`.

## Local commands

The Figma Make development server starts automatically. For a production check:

```bash
pnpm build
```

Deploy the generated static site to Vercel or Pxxl and point `trust.buysmartprocurement.com` to that deployment.
