# 📄 PDF Viewer Component

A lightweight client-side **React PDF viewer** built with **pdf.js**, designed to render and display uploaded PDF files seamlessly inside your web app.

---

## 🚀 Features

* ⚡ **Client-side rendering** — No server dependency
* 📚 **Multi-page support** — Renders every page dynamically
* 🧠 **Efficient memory use** — Prevents redundant re-rendering
* 🧩 **Easy integration** — Drop into any React or Next.js app
* 🎨 **Customizable container** — Style with Tailwind or CSS

---

## 🧱 Tech Stack

* **React / Next.js** (client component)
* **pdfjs-dist** (`pdf.js` library for parsing and rendering PDFs)
* **TypeScript**

---

## 📦 Installation

```bash
# Using npm
npm install pdfjs-dist

# OR using yarn
yarn add pdfjs-dist
```

---

## 🧩 Usage

### 1. Add the worker file

You need the PDF.js worker file (`pdf.worker.min.mjs`) to be available in your public folder.

**Structure:**

```
/public/pdfjs/pdf.worker.min.mjs
```

You can get it from:

```
node_modules/pdfjs-dist/build/pdf.worker.min.mjs
```

---

### 2. Import and use the component

```tsx
"use client";
import PdfViewer from "@/components/PdfViewer";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-4 space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) setFile(selectedFile);
        }}
      />

      {file && <PdfViewer file={file} />}
    </div>
  );
}
```

---

## 🧠 Component Details

### **File:** `PdfViewer.tsx`

```tsx
"use client";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { useEffect, useRef } from "react";

GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

export default function PdfViewer({ file }: { file: File }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (!file || file.size === 0) return;
    if (hasRendered.current) return;

    hasRendered.current = true;
    const container = containerRef.current;
    if (!container) return;

    const renderPDF = async () => {
      container.innerHTML = "";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        canvas.id = `page_${i}`;
        container.appendChild(canvas);
      }
    };

    renderPDF();

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [file]);

  return (
    <div
      ref={containerRef}
      className="pdf-container overflow-auto h-full shadow-xl"
    />
  );
}
```

---

## 🎨 Styling Example (Optional)

```css
.pdf-container {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
canvas {
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

---

## ⚠️ Notes

* Make sure the **PDF.js worker file path** matches:

  ```ts
  GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
  ```
* This component renders each page on a separate `<canvas>`.
* For large PDFs, consider lazy loading or pagination to improve performance.

---

## 🧑‍💻 License

This component is released under the **MIT License** — free to use and modify in your projects.
