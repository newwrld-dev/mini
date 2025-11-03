const config = require('../config');

function runtime(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

module.exports = {
  command: "menu",
  description: "Show full stylish bot menu.",
  react: "👑",
  category: "main",

  execute: async (sock, msg) => {
    try {
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || from;
      const pushname = msg.pushName || "there";
      const totalCommands = 40;

      const menuMsg = `
┏━━━〘 ✨ 𝗣𝗢𝗣𝗞𝗜𝗗 𝗫𝗠𝗗✨ 〙━━━⊷
┃ 👤 *User:* ${pushname}
┃ 💬 *Prefix:* ${config.PREFIX}
┃ ⚙️ *Mode:* PUBLIC
┃ 🧩 *Version:* 2.0.0
┃ ⚡ *Commands:* ${totalCommands}
┃ ⏱ *Uptime:* ${runtime(process.uptime())}
┗━━━━━━━━━━━━━━━━━━⊷

┏━━━〘 🧭 𝗠𝗔𝗜𝗡 〙━━━⊷
┃ 💫 alive
┃ ⚡ ping
┃ ⏱ uptime
┃ 🧭 menu
┗━━━━━━━━━━━━━━━━━━⊷

┏━━━〘 🎵 𝗠𝗘𝗗𝗜𝗔 〙━━━⊷
┃ 🎧 song
┃ 🎬 video
┃ 🎥 tiktok
┃ 🖼 img
┃ 🌦 weather
┃ 📘 fb
┗━━━━━━━━━━━━━━━━━━⊷

┏━━━〘 👑 𝗢𝗪𝗡𝗘𝗥 / 𝗚𝗥𝗢𝗨𝗣 〙━━━⊷
┃ 👑 owner
┃ 🆙 promote
┃ 👇 demote
┃ 🚫 kickall
┃ 🔇 mute
┃ 🔊 unmute
┃ 🏷 tagall
┃ 🕶 hidetag
┃ 🔑 pair
┃ 🪩 join
┃ 🔓 unblock
┗━━━━━━━━━━━━━━━━━━⊷

┏━━━〘 🤖 𝗙𝗨𝗡 / 𝗔𝗜 〙━━━⊷
┃ 🤖 voicegpt
┃ 😹 joke
┃ 🌐 wabeta
┗━━━━━━━━━━━━━━━━━━⊷

┏━━━〘 💬 𝗦𝗨𝗣𝗣𝗢𝗥𝗧 〙━━━⊷
┃ 💬 support
┃ 🧩 about
┗━━━━━━━━━━━━━━━━━━⊷

*👑 𝗣𝗢𝗣𝗞𝗜𝗗 𝗫𝗠𝗗 - 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗣𝗢𝗣𝗞𝗜𝗗 👑*
`;

      await sock.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/kiy0hl.jpg' },
        caption: menuMsg,
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363289379419860@newsletter',
            newsletterName: '𝗽𝗼𝗽𝗸𝗶𝗱 𝘅𝗺𝗱',
            serverMessageId: 143
          }
        }
      }, { quoted: msg });

    } catch (e) {
      console.error("❌ Menu Error:", e);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ ERROR: ${e.message}`
      }, { quoted: msg });
    }
  }
};
