# NoCluely Website

A modern, responsive landing page for the NoCluely project - a tool designed to detect the Cluely AI assistant and promote cognitive health awareness.

## Features

- **Responsive Design**: Beautiful, modern UI built with Next.js 15, Tailwind CSS, and shadcn/ui
- **GitHub Integration**: Users can download the tool after starring the repository
- **Real-time Validation**: API endpoint checks if users have starred the GitHub repository
- **Download Management**: Secure download process that validates GitHub stars
- **Modern UI Components**: Built with shadcn/ui for consistent, accessible design
- **Dark Mode Support**: Automatic dark/light mode support
- **SEO Optimized**: Proper metadata, OpenGraph, and Twitter card support

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **Icons**: Lucide React
- **API**: Next.js API Routes for GitHub integration

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── check-star/
│   │       └── route.ts          # GitHub star validation API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main landing page
├── components/
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── badge.tsx
└── lib/
    └── utils.ts                  # Utility functions
```

## Key Features

### 1. GitHub Star Validation
- Users enter their GitHub username
- API checks if they've starred the repository
- Download is only available after starring

### 2. Modern UI Components
- Responsive design that works on all devices
- Beautiful gradient backgrounds
- Card-based layout for content sections
- Interactive dialogs for download process

### 3. Content Sections
- **Hero Section**: Main value proposition and download CTA
- **Detection Explanation**: How NoCluely detects Cluely
- **SDK Information**: Available packages (Python, JavaScript, Rust)
- **Benefits**: Why use NoCluely for cognitive health

### 4. API Integration
The `/api/check-star` endpoint:
- Accepts POST requests with GitHub username
- Calls GitHub API to check if user starred the repo
- Returns validation status without exposing API keys

## Setup and Installation

1. **Clone and Install**:
   ```bash
   npx create-next-app@latest no-cluely-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   cd no-cluely-website
   ```

2. **Setup shadcn/ui**:
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card input dialog badge
   ```

3. **Install Dependencies**:
   ```bash
   npm install lucide-react
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## GitHub API Integration

The website integrates with GitHub's REST API to:
- Check if users have starred the repository
- Provide download access only to users who have starred
- Maintain engagement with the open-source project

### API Endpoint: `/api/check-star`

**Request**:
```json
POST /api/check-star
Content-Type: application/json

{
  "username": "github-username"
}
```

**Response**:
```json
{
  "starred": true | false
}
```

## Design Philosophy

The website follows the same philosophy as NoCluely itself:
- **Transparency**: Clear about what it does and why
- **User-Centric**: Focused on cognitive health benefits
- **Accessible**: Modern, inclusive design patterns
- **Open Source**: Encourages community engagement

## Deployment

The website is optimized for deployment on:
- **Vercel**: Native Next.js support
- **Netlify**: Static site generation
- **Any Node.js hosting**: Production build support

## Contributing

This website represents the NoCluely project's values:
1. Transparency in AI tool usage
2. Cognitive health awareness
3. Educational integrity
4. Open source collaboration

## License

MIT License - Built for transparency and cognitive health awareness.

---

Built with ❤️ using Next.js 15, shadcn/ui, and modern web technologies.
