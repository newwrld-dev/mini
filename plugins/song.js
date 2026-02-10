const fetch = require('node-fetch');
const yts = require('yt-search');

module.exports = {
  command: 'play',
  alias: ["play", "mp3", "audio", "music", "s", "so", "son", "songs"],
  description: "Download YouTube song (Audio)",
  category: "download",
  react: "🎵",
  usage: ".song <song name>",

  execute: async (socket, msg, args) => {
    const sender = msg.key.remoteJid;
    const query = args.join(" ");

    if (!query) {
      return socket.sendMessage(sender, {
        text: "❌ Please provide a song name.\nExample:\n.song Shape of You"
      }, { quoted: msg });
    }

    try {
      // Searching message
      await socket.sendMessage(sender, {
        text: `🎵 Searching for: *${query}*...`
      });

      // Search YouTube
      const search = await yts(query);
      if (!search.videos.length) {
        return socket.sendMessage(sender, {
          text: "❌ No song found. Try another title."
        }, { quoted: msg });
      }

      const video = search.videos[0];
      const videoUrl = video.url;

      // GTech API
      const apiUrl = `https://gtech-api-xtp1.onrender.com/api/audio/yt?apikey=APIKEY&url=${encodeURIComponent(videoUrl)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data?.status || !data?.result?.downloadUrl) {
        return socket.sendMessage(sender, {
          text: "❌ Failed to fetch song. Try again."
        }, { quoted: msg });
      }

      const dlUrl = data.result.downloadUrl;
      const title = data.result.title || video.title;
      const duration = data.result.duration || video.timestamp;
      const channelName = data.result.channel || video.author.name;
      const thumbnail = video.thumbnail;

      // Fetch thumbnail
      let thumbBuffer = null;
      try {
        const thumbRes = await fetch(thumbnail);
        thumbBuffer = Buffer.from(await thumbRes.arrayBuffer());
      } catch {}

      // Caption
      const caption =
`🎶 *${title}*
📺 ${channelName}
⏱ ${duration}
POPKID MD BOT`;

      // Send thumbnail or caption only
      if (thumbBuffer) {
        await socket.sendMessage(sender, { image: thumbBuffer, caption }, { quoted: msg });
      } else {
        await socket.sendMessage(sender, { text: caption }, { quoted: msg });
      }

      // Send audio
      await socket.sendMessage(sender, {
        audio: { url: dlUrl },
        mimetype: "audio/mpeg",
        fileName: `${title.replace(/[\\/:*?"<>|]/g, "").slice(0, 80)}.mp3`
      }, { quoted: msg });

      // Success reaction
      await socket.sendMessage(sender, { react: { text: "✅", key: msg.key } });

    } catch (err) {
      console.error("Audio download error:", err);
      await socket.sendMessage(sender, {
        text: "❌ Something went wrong. Try again later."
      }, { quoted: msg });
    }
  }
};
