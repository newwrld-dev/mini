const config = require('../config');

module.exports = {
  command: "menu",
  description: "To get the menu.",
  react: "👑",
  category: "main",

  execute: async (socket, msg, args, number) => {
    try {
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || from;
      const pushname = msg.pushName || "there";

      const menumsg = `
╭───────────────⭓
│ 👑 *𝗽𝗼𝗽𝗸𝗶𝗱 𝘅𝗺𝗱 𝗯𝗼𝘁 𝗺𝗲𝗻𝘂*
│
│ 👤 *USER:* ${pushname}
│ 🆔 *JID:* @${sender.split("@")[0]}
│ ⚙️ *MODE:* PUBLIC
│ 💬 *PREFIX:* ${config.PREFIX}
│ 🧩 *VERSION:* 2.0.0
│
│ 🌹 *HI ${pushname}!* ʜᴇʀᴇ ɪꜱ ʏᴏᴜʀ ᴍᴇɴᴜ 👇
│
│ ╭─────────────●●►
│ ├ 🎵 *SONG*
│ ├ 🎬 *VIDEO*
│ ├ 🎥 *TIKTOK*
│ ├ 📘 *FB*
│ ├ 📦 *APK*
│ ├ 🖼️ *IMG*
│ ╰─────────────●●►
│
│ ╭─────────────●●►
│ ├ 💫 *ALIVE*
│ ├ ⚡ *PING*
│ ├ ⏱️ *UPTIME*
│ ╰─────────────●●►
│
│ ╭─────────────●●►
│ ├ 🔎 *VV*
│ ╰─────────────●●►
│
│ 👑 𝗽𝗼𝗽𝗸𝗶𝗱 𝘅𝗺𝗱 - ʙʏ ᴘᴏᴘᴋɪᴅ 👑
╰───────────────⭓
`;

      await socket.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/kiy0hl.jpg' },
        caption: menumsg,
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
      console.error(e);
      await socket.sendMessage(msg.key.remoteJid, {
        text: `❌ ERROR: ${e.message}`
      }, { quoted: msg });
    }
  }
};