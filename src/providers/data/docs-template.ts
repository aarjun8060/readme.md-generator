import { SectionTemplates } from "@/types/dashboard";

export const sectionTemplates: SectionTemplates[] = [
  {
    slug: "headings_and_paragraphs",
    name: "Headings and Paragraphs",
    markdown: `
# Heading 1
## Heading 2
### Heading 3
---
This is a paragraph of text. Markdown allows you to write naturally without worrying about HTML tags.
    `,
  },
  {
    slug: "lists",
    name: "Lists",
    markdown: `
## Lists

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item
    `,
  },
  {
    slug: "links_and_images",
    name: "Links and Images",
    markdown: `
## Links and Images

[Link to Example Website](https://aarjun8060.vercel.app/)

![Image Alt Text](https://raw.githubusercontent.com/aarjun8060/readme.md-generator/main/public/assets/dashboard-light.png)
    `,
  },
  {
    slug: "code_blocks",
    name: "Code Blocks",
    markdown: `
## Code Blocks

\`\`\`javascript
function greet() {
  console.log("Hello, World!");
}
greet();
\`\`\`
    `,
  },
  {
    slug: "blockquotes",
    name: "Blockquotes",
    markdown: `
## Blockquotes

> This is a blockquote. Use it for quotes or important notes.
    `,
  },
  {
    slug: "horizontal_rule",
    name: "Horizontal Rule",
    markdown: `
## Horizontal Rule

---
    `,
  },
  {
    slug: "tables",
    name: "Tables",
    markdown: `
## Tables

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
    `,
  },
  {
    slug: "emphasize_text",
    name: "Emphasize Text",
    markdown: `
## Emphasize Text

*Italic text* and **bold text**
    `,
  },
  {
    slug: "inline_code",
    name: "Inline Code",
    markdown: `
## Inline Code

Use \`const message = "Hello, Markdown!";\` for inline code.
    `,
  },
  {
    slug: "task_lists",
    name: "Task Lists",
    markdown: `
## Task Lists

- [x] Task 1
- [ ] Task 2
- [ ] Task 3
    `,
  },
  {
    slug: "footnotes",
    name: "Footnotes",
    markdown: `
## Footnotes

Here's a footnote[^1].

[^1]: This is the footnote.
    `,
  },
  {
    slug: "headers_and_footers",
    name: "Headers and Footers",
    markdown: `
## Headers and Footers

Headers and footers can be added for more styling.
    `,
  },
  {
    slug: "keyboard_keys",
    name: "Keyboard Keys",
    markdown: `
## Keyboard Keys

Use \`Ctrl+C\` to copy text.
    `,
  },
  {
    slug: "strikethrough",
    name: "Strikethrough",
    markdown: `
## Strikethrough

~~Strikethrough text~~
    `,
  },
  {
    slug: "superscript_and_subscript",
    name: "Superscript and Subscript",
    markdown: `
## Superscript and Subscript

10^2^ = 100 and H~2~O
    `,
  },
  {
    slug: "math_expressions",
    name: "Math Expressions",
    markdown: `
## Math Expressions

Markdown supports math expressions: \(ax^2 + bx + c = 0\)
    `,
  },
  {
    slug: "definition_lists",
    name: "Definition Lists",
    markdown: `
## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2
    `,
  },
  {
    slug: "abbreviations",
    name: "Abbreviations",
    markdown: `
## Abbreviations

This is HTML (Hypertext Markup Language).
    `,
  },
  {
    slug: "comments",
    name: "Comments",
    markdown: `
## Comments

<!-- This is a comment -->
    `,
  },
  {
    slug: "videos",
    name: "Videos",
    markdown: `
## Videos

Embedding videos: 
![Video Title](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
    `,
  },
  {
    slug: "fonts",
    name: "Fonts",
    markdown: `
## Fonts

<font color="green">This is some text!</font>
    `,
  },
  {
    slug: "headers",
    name: "Headers",
    markdown: `
## Headers

<header>
<h1>This is a Heading</h1>
</header>
    `,
  },
  {
    slug: "articles",
    name: "Articles",
    markdown: `
## Articles

<article>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
</article>
    `,
  },
  {
    slug: "sections",
    name: "Sections",
    markdown: `
## Sections

<section>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
</section>
    `,
  },
  {
    slug: "aside",
    name: "Aside",
    markdown: `
## Aside

<aside>
<h4>Extra Information</h4>
<p>This is some extra information.</p>
</aside>
    `,
  },
  {
    slug: "address",
    name: "Address",
    markdown: `
## Address

<address>
Written by Arjun Singh <a href="mailto:arjunsingh0335639@gmail.com">arjunsingh0335639@gmail.com</a><br>
Visit us at: <a href="https://aarjun8060.vercel.app/">aarjun.vercel.app</a><br><br>,Noida
India
</address>
    `,
  },
  {
    slug: "emoji",
    name: "Emoji",
    markdown: `
## Emoji

You can add emoji to your Markdown content. :smile: :+1: :sparkles:
    `,
  },
  {
    slug: "highlight",
    name: "Highlight",
    markdown: `
## Highlight

You can highlight text using HTML tags. <mark>This text is highlighted!</mark>
    `,
  },
  {
    slug: "toc",
    name: "Table of Contents",
    markdown: `
## Table of Contents

You can create a table of contents:

- [Heading 1](#heading-1)
- [Heading 2](#heading-2)
- [Heading 3](#heading-3)
    `,
  },
  {
    slug: "nested_lists",
    name: "Nested Lists",
    markdown: `
## Nested Lists

- Item 1
  - Subitem 1.1
  - Subitem 1.2
- Item 2
  - Subitem 2.1
  - Subitem 2.2
    `,
  },
  {
    slug: "escaped_characters",
    name: "Escaped Characters",
    markdown: `
## Escaped Characters

You can escape characters using a backslash: \\*this text is not italic\\*
    `,
  },
];
