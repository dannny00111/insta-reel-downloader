export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const inputUrl = searchParams.get("url");
    if (!inputUrl) return new Response("Missing `url` query param", { status: 400 });

    const proxyAPI = `https://proxy.scrapeops.io/v1/browser?api_key=free&url=${encodeURIComponent("https://igram.io/i/")}&render_js=false&method=POST&post_body=url=${encodeURIComponent(inputUrl)}&content_type=application/x-www-form-urlencoded`;

    try {
      const htmlRes = await fetch(proxyAPI);
      const html = await htmlRes.text();
      const match = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);

      if (!match) return new Response("No video URL found", { status: 404 });

      const videoRes = await fetch(match[1]);

      return new Response(videoRes.body, {
        headers: {
          "Content-Type": "video/mp4",
          "Content-Disposition": "attachment; filename=instagram.mp4",
          "Cache-Control": "no-store"
        }
      });
    } catch (err) {
      return new Response("Error: " + err.message, { status: 500 });
    }
  }
};
