# Instagram Reel Downloader

A full-stack application for downloading Instagram reels, posts, and IGTV videos with a modern React frontend and Cloudflare Worker backend.

## Features

- 🎥 Download Instagram reels, posts, and IGTV videos
- 🎨 Modern, responsive UI with gradient design
- ⚡ Fast processing with Cloudflare Workers
- 📱 Mobile-friendly interface
- 🔒 Client-side URL validation
- 💫 Smooth animations and micro-interactions

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Cloudflare Workers** for serverless API
- **ScrapeOps Proxy** for web scraping

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account (for worker deployment)

### Frontend Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Deployment

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy the worker:
```bash
wrangler deploy
```

4. Update the `workerUrl` in `src/App.tsx` with your deployed worker URL

## Project Structure

```
├── src/
│   ├── App.tsx          # Main React component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── worker/
│   └── index.js         # Cloudflare Worker code
├── wrangler.toml        # Worker configuration
└── package.json         # Dependencies and scripts
```

## Usage

1. Copy an Instagram post, reel, or IGTV URL
2. Paste it into the input field
3. Click "Download Video"
4. The video will be downloaded to your device

## Supported URLs

- Instagram Posts: `https://www.instagram.com/p/[POST_ID]/`
- Instagram Reels: `https://www.instagram.com/reel/[REEL_ID]/`
- IGTV Videos: `https://www.instagram.com/tv/[VIDEO_ID]/`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Setup

The application uses a Cloudflare Worker as the backend API. Make sure to:

1. Deploy your worker using `wrangler deploy`
2. Update the `workerUrl` in `App.tsx` with your actual worker URL
3. Ensure CORS is properly configured in the worker

## Legal Notice

This tool is for educational purposes only. Please respect Instagram's terms of service and only download content you have permission to use. The developers are not responsible for any misuse of this tool.

## License

MIT License - see LICENSE file for details