import React, { useState } from 'react';
import { Download, Instagram, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface DownloadState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  downloadUrl?: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });

  const isValidInstagramUrl = (url: string) => {
    const instagramRegex = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
    return instagramRegex.test(url);
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      setDownloadState({ status: 'error', message: 'Please enter an Instagram URL' });
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setDownloadState({ status: 'error', message: 'Please enter a valid Instagram post/reel URL' });
      return;
    }

    setDownloadState({ status: 'loading' });

    try {
      // Replace with your actual Cloudflare Worker URL
      const workerUrl = 'https://insta-reel-downloader.your-subdomain.workers.dev';
      const response = await fetch(`${workerUrl}?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to download video');
      }

      // Create a blob URL for download
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'instagram-video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(downloadUrl);

      setDownloadState({ 
        status: 'success', 
        message: 'Video downloaded successfully!' 
      });
    } catch (error) {
      setDownloadState({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'An error occurred while downloading' 
      });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (downloadState.status !== 'idle') {
      setDownloadState({ status: 'idle' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Instagram Reel Downloader
            </h1>
            <p className="text-gray-600 text-lg">
              Download Instagram reels, posts, and IGTV videos easily
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="space-y-6">
              {/* URL Input */}
              <div>
                <label htmlFor="instagram-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram URL
                </label>
                <div className="relative">
                  <input
                    id="instagram-url"
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://www.instagram.com/p/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    disabled={downloadState.status === 'loading'}
                  />
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={downloadState.status === 'loading'}
                className={clsx(
                  'w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200',
                  downloadState.status === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] active:scale-[0.98]'
                )}
              >
                {downloadState.status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Video
                  </>
                )}
              </button>

              {/* Status Messages */}
              {downloadState.status !== 'idle' && (
                <div className={clsx(
                  'flex items-center gap-3 p-4 rounded-lg',
                  downloadState.status === 'success' && 'bg-green-50 text-green-800',
                  downloadState.status === 'error' && 'bg-red-50 text-red-800'
                )}>
                  {downloadState.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {downloadState.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                  <span className="font-medium">{downloadState.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to use:</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Copy the Instagram post, reel, or IGTV URL from your browser or app</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Paste the URL in the input field above</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Click "Download Video" and wait for the download to start</span>
              </li>
            </ol>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500">
            <p className="text-sm">
              This tool respects Instagram's terms of service. Only download content you have permission to use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;