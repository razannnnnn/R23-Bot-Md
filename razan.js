require("./config");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const axios = require("axios");
const path = require("path");
const os = require("os");
const fsx = require("fs-extra");
const jsobfus = require("javascript-obfuscator");
const moment = require("moment-timezone");
const { JSDOM } = require("jsdom");
const speed = require("performance-now");
const { performance } = require("perf_hooks");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const {
  TelegraPh,
  UploadFileUgu,
  webp2mp4File,
  floNime,
} = require("./lib/uploader");
const { toAudio, toPTT, toVideo, ffmpeg } = require("./lib/converter");
const { exec, spawn, execSync } = require("child_process");
const {
  smsg,
  getGroupAdmins,
  formatp,
  tanggal,
  formatDate,
  getTime,
  isUrl,
  await,
  sleep,
  clockString,
  msToDate,
  sort,
  toNumber,
  enumGetKey,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  delay,
  format,
  logic,
  generateProfilePicture,
  parseMention,
  getRandom,
  pickRandom,
  reSize,
} = require("./lib/myfunc");
const {
  addResponList,
  delResponList,
  isAlreadyResponList,
  isAlreadyResponListGroup,
  sendResponList,
  updateResponList,
  getDataResponList,
} = require("./lib/addlist");

// read database
global.db.data = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db.data)
  global.db.data = {
    users: {},
    premium: {},
    banned: {},
    group: {},
    database: {},
    settings: {},
    donate: {},
    others: {},
    sticker: {},
    ...(global.db.data || {}),
  };

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = conn = async (conn, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = prefa
      ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
        : ""
      : prefa ?? global.prefix;
    const isCmd = body.startsWith(prefix);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const full_args = body.replace(command, "").slice(1).trim();
    const pushname = m.pushName || "No Name";
    const botNumber = await conn.decodeJid(conn.user.id);
    const isCreator = [botNumber, global.owner, "6289513081052"]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const itsMe = m.sender == botNumber ? true : false;
    const text = (q = args.join(" "));
    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;
    const isMedia = /image|video|sticker|audio/.test(mime);

    const groupMetadata = m.isGroup
      ? await conn.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const groupOwner = m.isGroup ? groupMetadata.owner : "";
    const isGroupOwner = m.isGroup
      ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender)
      : false;
    const isPremium =
      isCreator ||
      global.premium
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .includes(m.sender) ||
      false;

    // Days
    const hariini = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
    const wib = moment.tz("Asia/Jakarta").format("HH : mm : ss");
    const wit = moment.tz("Asia/Jayapura").format("HH : mm : ss");
    const wita = moment.tz("Asia/Makassar").format("HH : mm : ss");

    const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "23:59:00") {
      var ucapanWaktu = "Selamat Malam 🏙️";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat Petang 🌆";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat Sore 🌇";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat Siang 🌤️";
    }
    if (time2 < "10:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌄";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat Subuh 🌆";
    }
    if (time2 < "03:00:00") {
      var ucapanWaktu = "Selamat Tengah Malam 🌃";
    }

    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat
          ? {
              remoteJid: `status@broadcast`,
            }
          : {}),
      },
      message: {
        contactMessage: {
          displayName: `${namaowner}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${namabot},;;;\nFN:${namabot}\nitem1.TEL;waid=${owner}:+${owner}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: thumb,
          thumbnail: thumb,
          sendEphemeral: true,
        },
      },
    };
    // Database Tambahan!!

    let prem = JSON.parse(fs.readFileSync("./database/premium.json"));
    let vnnya = JSON.parse(fs.readFileSync("./database/vnnya.json"));
    let db_error = JSON.parse(fs.readFileSync("./database/error.json"));
    let db_respon_list = JSON.parse(fs.readFileSync("./database/list.json"));

    // Const Tambahan Sc Gw

    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    const getCase = (cases) => {
      return (
        "case  " +
        `'${cases}'` +
        fs
          .readFileSync("./razan.js")
          .toString()
          .split("case '" + cases + "'")[1]
          .split("break")[0] +
        "break"
      );
    };
    const totalFitur = () => {
      var mytext = fs.readFileSync("./razan.js").toString();
      var numUpper = (mytext.match(/case '/g) || []).length;
      return numUpper;
    };
    const sendvn = (teks) => {
      conn.sendMessage(
        from,
        { audio: teks, mimetype: "audio/mp4", ptt: true },
        { quoted: m }
      );
    };

    for (let anju of vnnya) {
      if (budy === anju) {
        let buffer = fs.readFileSync(`./database/AUDIO/${anju}.mp3`);
        sendvn(buffer);
      }
    }

    // Function Created By AdrianTzy Alias Dryan ft .𝐗𝐓𝐑𝐀𝐌
    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())];
    }

    function generateRandomPassword() {
      return Array(10)
        .fill(null)
        .map(() => ((Math.random() * 16) | 0).toString(16))
        .join("");
    }

    async function obfus(query) {
      return new Promise((resolve, reject) => {
        try {
          const obfuscationResult = jsobfus.obfuscate(query, {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1,
          });
          const result = {
            status: 200,
            author: `AdrianTzy`,
            result: obfuscationResult.getObfuscatedCode(),
          };
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    }

    // Created By ArxzyDev
    async function newReply(teks) {
      const arxzy = {
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: ucapanWaktu,
            body: global.namabot,
            previewType: "PHOTO",
            thumbnailUrl: global.imageurl,
            sourceUrl: global.isLink,
          },
        },
        text: teks,
      };
      return conn.sendMessage(m.chat, arxzy, {
        quoted: m,
      });
    }

    try {
      let isNumber = (x) => typeof x === "number" && !isNaN(x);
      let limitUser = isPremium
        ? global.limitawal.premium
        : global.limitawal.free;
      let user = global.db.data.users[m.sender];
      if (typeof user !== "object") global.db.data.users[m.sender] = {};
      if (user) {
        if (!isNumber(user.afkTime)) user.afkTime = -1;
        if (!("afkReason" in user)) user.afkReason = "";
        if (!isNumber(user.limit)) user.limit = limitUser;
      } else
        global.db.data.users[m.sender] = {
          afkTime: -1,
          afkReason: "",
          limit: limitUser,
        };
      let group = global.db.data.group[m.chat];
      if (typeof group !== "object") global.db.data.group[m.chat] = {};
      if (group) {
        if (!("mute" in group)) group.mute = false;
        if (!("antilink" in group)) group.antilink = false;
        if (!("antilinkyt" in group)) group.antilinkyt = false;
        if (!("antilinktt" in group)) group.antilinktt = false;
        if (!("antivirtex" in group)) group.antivirtex = false;
        if (!("antisettings" in group)) group.antisettings = true;
        if (!("antilinkv2" in group)) group.antilinkv2 = false;
      } else
        global.db.data.group[m.chat] = {
          mute: false,
          antilink: false,
          antilinkyt: false,
          antilinktt: false,
          antivirtex: false,
          antisettings: true,
          antilinkv2: true,
        };
      let setting = global.db.data.settings[botNumber];
      if (typeof setting !== "object") global.db.data.settings[botNumber] = {};
      if (setting) {
        if (!isNumber(setting.status)) setting.status = 0;
        if (!("autobio" in setting)) setting.autobio = false;
        if (!("autoread" in setting)) setting.autoread = false;
      } else
        global.db.data.settings[botNumber] = {
          status: 0,
          autobio: false,
          autoread: false,
        };
    } catch (err) {
      console.error(err);
    }
    // Public & Self
    if (!conn.public) {
      if (!m.key.fromMe) return;
    }

    if (m.message) {
      if (global.db.data.settings[botNumber].autoread) {
        conn.readMessages([m.key]);
      }
    }

    // Push Message To Console && Auto Read
    if (m.message) {
      console.log(
        chalk.black(chalk.bgWhite("[ PESAN ]")),
        chalk.black(chalk.bgGreen(`${hariini} | ${wib}`)),
        "\n" + chalk.magenta("Dari: "),
        chalk.green(pushname),
        "\n" + chalk.blueBright("Di:   "),
        chalk.green(
          m.isGroup
            ? chalk.yellow("Group: ") + groupName
            : chalk.yellow("Private Chat: ") + `+` + m.chat.split("@")[0]
        ),
        "\n" + chalk.blue("Isi:  "),
        chalk.green(budy || m.mtype)
      );
    }

    let cron = require("node-cron");
    cron.schedule(
      "00 12 * * *",
      () => {
        let user = Object.keys(global.db.data.users);
        let limitUser = isPremium
          ? global.limitawal.premium
          : global.limitawal.free;
        for (let jid of user) global.db.data.users[jid].limit = limitUser;
        console.log("Reseted Limit");
      },
      {
        scheduled: true,
        timezone: "Asia/Jakarta",
      }
    );

    if (db.data.settings[botNumber].autobio) {
      let setting = global.db.data.settings[botNumber];
      if (new Date() * 1 - setting.status > 1000) {
        let _uptime = process.uptime() * 1000;
        let uptime = clockString(_uptime);
        await conn
          .updateProfileStatus(
            `I am ${namabot} | Aktif Selama ${uptime} ⏳ | Mode : ${
              conn.public ? "Public-Mode" : "Self-Mode"
            } | User : ${Object.keys(global.db.data.users).length}`
          )
          .catch((_) => _);
        setting.status = new Date() * 1;
      }
    }

    // Respon Cmd with media
    if (
      isMedia &&
      m.msg.fileSha256 &&
      m.msg.fileSha256.toString("base64") in global.db.data.sticker
    ) {
      let hash = global.db.data.sticker[m.msg.fileSha256.toString("base64")];
      let { text, mentionedJid } = hash;
      let messages = await generateWAMessage(
        m.chat,
        { text: text, mentions: mentionedJid },
        {
          userJid: conn.user.id,
          quoted: m.quoted && m.quoted.fakeObj,
        }
      );
      messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
      };
      conn.ev.emit("messages.upsert", msg);
    }

    if (db.data.group[m.chat].antilink) {
      if (budy.match(`chat.whatsapp.com`)) {
        newReply(
          `「 ANTI LINK WHATSAPP 」\n\nKamu Terdeteksi Mengirim Link Group, Maaf Kamu Akan Di Kick !`
        );
        if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`);
        let gclink =
          `https://chat.whatsapp.com/` + (await conn.groupInviteCode(m.chat));
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink)
          return newReply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`);
        if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`);
        if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`);
        conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    if (db.data.group[m.chat].antilinkv2) {
      if (budy.match(`chat.whatsapp.com`)) {
        newReply(`「 ANTI LINK WHATSAPP 」\n\n*JANGAN SHARE GC LAIN!!!*`);
        if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`);
        let gclink =
          `https://chat.whatsapp.com/` + (await conn.groupInviteCode(m.chat));
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink)
          return newReply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`);
        if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`);
        if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`);
        conn.sendMessage(m.chat, { delete: m.key });
      }
    }
    //Anti Link YouTube
    if (db.data.group[m.chat].antilinkyt) {
      if (budy.match(`https://youtu.be`)) {
        newReply(
          `「 ANTI LINK YOUTUBE 」\n\nKamu Terdeteksi Mengirim Link Youtube, Maaf Kamu Akan Di Kick !`
        );
        if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`);
        if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`);
        if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`);
        conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    //Anti Link Tiktok
    if (db.data.group[m.chat].antilinktt) {
      if (budy.match(`https://vt.tiktok.com`)) {
        newReply(
          `「 ANTI LINK TIKTOK 」\n\nKamu Terdeteksi Mengirim Link TikTok, Maaf Kamu Akan Di Kick !`
        );
        if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`);
        if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`);
        if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`);
        conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    //AntiVirtex
    if (db.data.group[m.chat].antivirtex) {
      if (budy.length > 3500) {
        newReply(
          `Seseorang mengirim spam virus!! tandai sebagai membaca⚠️\n`.repeat(
            300
          )
        );
        newReply(
          `「 ANTI VIRTEX 」\n\nKamu Terdeteksi Mengirim Virtex, Maaf Kamu Akan Di Kick !`
        );
        if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`);
        if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`);
        if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`);
        conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    if (db.data.group[m.chat].antisettings) {
      if (budy.startsWith("wa.me/settings")) {
        conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`);
        conn.sendMessage(m.chat, { delete: m.key });
      }
    }
    // Mute Chat
    if (db.data.group[m.chat].mute && !isAdmins && !isCreator) {
      return;
    }
    switch (command) {
      // Premium

      case "paptt":
        // if (!isPremium) return newReply(mess.prem);
        // if (!q) return newReply(`Example ${prefix + command} foto/video`);
        // let papttfoto = JSON.parse(fs.readFileSync("./lib/paptt-foto.json"));
        // let papttvideo = JSON.parse(fs.readFileSync("./lib/paptt-video.json"));
        // let titid1 = pickRandom(papttfoto);
        // let titid2 = pickRandom(papttvideo);
        // if (q == "foto") {
        //   newReply("Foto Akan Dikirim Lewat Private Chat ( *PC* )");
        //   conn.sendMessage(
        //     m.sender,
        //     { image: { url: titid1 }, caption: "Mana Tahan🥵" },
        //     { quoted: fkontak }
        //   );
        // } else if (q == "video") {
        //   newReply("Video Akan Dikirim Lewat Private Chat ( *PC* )");
        //   conn.sendMessage(
        //     m.sender,
        //     { video: { url: titid2 }, caption: "Mana Tahan🥵" },
        //     { quoted: fkontak }
        //   );
        // }

        newReply(`Astagfirullah bro, kamu ketahuan ${pushname}`);
        break;

      case "buatgc":
        if (!isPremium) return newReply(mess.prem);
        if (!text) return newReply("_Masukkan Nama Grup!_");
        try {
          newReply(mess.wait);
          let group = await conn.groupCreate(text, [m.sender]);
          let link = await conn.groupInviteCode(group.gid);
          let url = "https://chat.whatsapp.com/" + link;
          /// console.log(chalk.bold.red('Membuat Grup: ' + group.gid + '\nNama Grup: ' + text + '\n\nViolet'))
          newReply(
            "_Berhasil Membuat Grup *" +
              text +
              "*_\n\n*Nama:* " +
              text +
              "\n*ID:* " +
              group.gid +
              "\n*Link:* " +
              url
          );
        } catch (e) {
          let [namagc, partici] = text.split("|");
          if (!namagc) return newReply("Format Salah!!!");
          if (!partici) return newReply("Tag user sebagai member baru!");
          let mem = conn.parseMention(`@${parseInt(m.sender)} ${partici}`);
          let ha = await conn.groupCreate(namagc, mem).catch(console.error);
          console.log(JSON.stringify(ha));
          await newReply(`*GROUP CREATE*

\`\`\`Group Telah Dibuat @${m.sender.replace(/@.+/, "")}\`\`\`


${JSON.stringify(ha.participants)}`);
          conn.groupMakeAdmin(ha.gid, [m.sender]);
          if (!isCreator) {
            await conn
              .modifyChat(ha.gid, "delete", {
                includeStarred: false,
              })
              .catch(console.error);
            conn.groupLeave(ha.gid);
          }
        }
        break;
      // Owner Fitur
      // case "ambilcase":
      // lagi error boskuuu!!
      //   try {
      //     if (!isCreator) return newReply(mess.owner);
      //     if (!q) return newReply(`Example: ${prefix + command} antilink`);
      //     if (q.startsWith(prefix))
      //       return newReply("Query tidak boleh menggunakan prefix");
      //     let nana = await getCase(q);
      //     newReply(nana);
      //   } catch (err) {
      //     console.log(err);
      //     newReply(`Case ${q} tidak di temukan`);
      //   }
      //   break;
      case "cekapikey":
        if (!isCreator) return newReply(mess.owner);
        let lol = await fetchJson(
          `https://api.lolhuman.xyz/api/checkapikey?apikey=${apikey}`
        );
        newReply(mess.wait);
        if (lol.message == "success") {
          let ani = `• *ɴᴀᴍᴇ:* ${lol.result.username}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${lol.result.requests}
• *ʜɪᴛ ᴛᴏᴅᴀʏ:* ${lol.result.today}
• *ᴀᴄᴄᴏᴜɴᴛ:* ${lol.result.account_type}

• *ᴇxᴘɪʀᴇᴅ:* ${lol.result.expired}`;
          conn.sendMessage(
            m.chat,
            { image: thumb, caption: ani },
            { quoted: fkontak }
          );
        } else m.reply("ɪɴᴠᴀʟɪᴅ ᴀᴘɪᴋᴇʏ !");
        break;
      case "ambilsesi":
        if (!isCreator) return newReply(mess.owner);
        newReply("Tunggu Sebentar, Sedang mengambil file sesi mu");
        let sesi = await fs.readFileSync("./session/creds.json");
        conn.sendMessage(
          m.chat,
          {
            document: sesi,
            mimetype: "application/json",
            fileName: "creds.json",
          },
          { quoted: m }
        );
        break;

      case "autoread":
        if (!isCreator) return newReply(mess.owner);
        if (args.length < 1)
          return newReply(`Contoh ${prefix + command} on/off`);
        if (q === "on") {
          global.db.data.settings[botNumber].autoread = true;
          newReply(`Berhasil mengubah autoread ke ${q}`);
        } else if (q === "off") {
          global.db.data.settings[botNumber].autoread = false;
          newReply(`Berhasil mengubah autoread ke ${q}`);
        }
        break;

      case "autobio":
        if (!isCreator) return newReply(mess.owner);
        if (args.length < 1)
          return newReply(`Example ${prefix + command} on/off`);
        if (q == "on") {
          global.db.data.settings[botNumber].autobio = true;
          newReply(`Berhasil Mengubah AutoBio Ke ${q}`);
        } else if (q == "off") {
          global.db.data.settings[botNumber].autobio = false;
          newReply(`Berhasil Mengubah AutoBio Ke ${q}`);
        }
        break;

      case "public":
        {
          if (!isCreator) return newReply(mess.owner);
          conn.public = true;
          newReply("Sukses Ubah Ke Penggunaan Umum");
        }
        break;
      case "self":
        {
          if (!isCreator) return newReply(mess.owner);
          conn.public = false;
          newReply("Sukses Ubah Ke Penggunaan Sendiri");
        }
        break;

      case "addlist":
        if (!m.isGroup) return newReply(mess.group);
        if (!isAdmins && !isCreator) return newReply(mess.botAdmin);
        var args1 = q.split("@")[0];
        var args2 = q.split("@")[1];
        if (!q.includes("@"))
          return newReply(
            `Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`
          );
        if (isAlreadyResponList(m.chat, args1, db_respon_list))
          return newReply(
            `List respon dengan key : *${args1}* sudah ada di group ini.`
          );
        addResponList(m.chat, args1, args2, false, "-", db_respon_list);
        newReply(`Berhasil menambah List menu : *${args1}*`);
        break;

      case "dellist":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isCreator) return newReply(mess.botAdmin);
          if (db_respon_list.length === 0)
            return newReply(`Belum ada list message di database`);
          var arr_rows = [];
          for (let x of db_respon_list) {
            if (x.id === m.chat) {
              newReply(`Mau Delete Yang Mana?\n\n${x.key}`);
            }
          }
        }
        break;

      case "enc":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!q)
            return newReply(
              `Contoh ${prefix + command} const adrian = require('adrian-api')`
            );
          let meg = await obfus(q);
          newReply(`${meg.result}`);
        }
        break;

      case "pushkontak":
        {
          if (!text) return newReply(`Example ${prefix}${command} Hi Semuanya`);
          if (!isCreator) return newReply(mess.owner);
          let get = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let count = get.length;
          let sentCount = 0;
          newReply("*_Sedang Push Kontak..._*");
          for (let i = 0; i < get.length; i++) {
            setTimeout(function () {
              conn.sendMessage(get[i], { text: text });
              count--;
              sentCount++;
              if (count === 0) {
                newReply(
                  `*_Semua pesan telah dikirim!_*:\n*_Jumlah pesan terkirim:_* *_${sentCount}_*`
                );
              }
            }, i * 1000); // delay setiap pengiriman selama 1 detik
          }
        }
        break;

      case "addvn":
        {
          if (!isCreator) return newReply(mess.owner);
          if (args.length < 1) return newReply("Nama audionya apa");
          if (vnnya.includes(q))
            return newReply("Nama tersebut sudah di gunakan");
          let delb = await conn.downloadAndSaveMediaMessage(quoted);
          vnnya.push(q);
          await fsx.copy(delb, `./database/AUDIO/${q}.mp3`);
          fs.writeFileSync("./database/vnnya.json", JSON.stringify(vnnya));
          fs.unlinkSync(delb);
          newReply(`Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`);
        }
        break;
      case "delvn":
        {
          if (!isCreator) return newReply(mess.owner);
          if (args.length < 1) return newReply("Masukan query");
          if (!vnnya.includes(q))
            return newReply("Nama tersebut tidak ada di dalam data base");
          let wanu = vnnya.indexOf(q);
          vnnya.splice(wanu, 1);
          fs.writeFileSync("./database/vnnya.json", JSON.stringify(vnnya));
          fs.unlinkSync(`./database/AUDIO/${q}.mp3`);
          newReply(`Sukses delete vn ${q}`);
        }
        break;

      case "listvn":
        {
          let teksooo = "┌──⭓「 *LIST VN* 」\n│\n";
          for (let x of vnnya) {
            teksooo += `│⭔ ${x}\n`;
          }
          teksooo += `│\n└────────────⭓\n\n*Total ada : ${vnnya.length}*`;
          newReply(teksooo);
        }
        break;

      case "addprem":
        if (!isCreator) return newReply(mess.owner);
        if (!args[0])
          return newReply(
            `Penggunaan ${prefix + command} nomor\nContoh ${
              prefix + command
            } 6281214281312`
          );
        bnnd = q.split("|")[0].replace(/[^0-9]/g, "");
        let ceknye = await conn.onWhatsApp(bnnd + `@s.whatsapp.net`);
        if (ceknye.length == 0)
          return newReply(
            `Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`
          );
        premium.push(bnnd);
        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
        newReply(mess.done);
        break;

      case "delprem":
        if (!isCreator) return newReply(mess.owner);
        if (!args[0])
          return newReply(
            `Penggunaan ${prefix + command} nomor\nContoh ${
              prefix + command
            } 6281214281312`
          );
        yaki = q.split("|")[0].replace(/[^0-9]/g, "");
        unp = premium.indexOf(yaki);
        premium.splice(unp, 1);
        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
        newReply(mess.done);
        break;

      case "listprem":
        teksooo = "*List Premium*\n\n";
        for (let i of premium) {
          teksooo += `- ${i}\n`;
        }
        teksooo += `\n*Total : ${premium.length}*`;
        conn.sendMessage(
          m.chat,
          { text: teksooo.trim() },
          "extendedTextMessage",
          { quoted: m, contextInfo: { mentionedJid: premium } }
        );
        break;

      case "myip":
        {
          if (!isCreator) return newReply(mess.owner);
          var http = require("http");
          http.get(
            {
              host: "api.ipify.org",
              port: 80,
              path: "/",
            },
            function (resp) {
              resp.on("data", function (ip) {
                newReply("🔎 My public IP address is: " + ip);
              });
            }
          );
        }
        break;
      case "listpc":
        {
          if (!isCreator) return newReply(mess.owner);
          let anu = await store.chats
            .all()
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let tekslist = `*🔒 LIST PERSONAL CHAT*\n\n`;
          tekslist += `*📱 Total Chat :* ${anu.length} Chat\n\n`;
          for (let i of anu) {
            let nama = store.messages[i].array[0].pushName;
            tekslist += `📛 *Nama :* ${nama}\n`;
            tekslist += `👤 *User :* @${i.split("@")[0]}\n`;
            tekslist += `🔗 *Link Chat :* https://wa.me/${i.split("@")[0]}\n\n`;
            tekslist += `──────────────────────\n\n`;
          }
          newReply(tekslist);
        }
        break;
      case "listgc":
        {
          if (!isCreator) return newReply(mess.owner);
          let anu = await store.chats
            .all()
            .filter((v) => v.id.endsWith("@g.us"))
            .map((v) => v.id);
          let tekslistgc = `👥 *LIST GROUP CHAT*\n\n`;
          tekslistgc += `📱 Total Group : ${anu.length} Group\n\n`;
          for (let e of anu) {
            let metadata = await conn.groupMetadata(e);
            tekslistgc += `📛 *Nama :* ${metadata.subject}\n`;
            tekslistgc += `👤 *Owner Grup :* ${
              metadata.owner !== undefined
                ? "@" + metadata.owner.split`@`[0]
                : "Tidak diketahui"
            }\n`;
            tekslistgc += `🌱 *ID :* ${metadata.id}\n`;
            tekslistgc += `⏳ *Dibuat :* ${moment(metadata.creation * 1000)
              .tz("Asia/Jakarta")
              .format("DD/MM/YYYY HH:mm:ss")}\n`;
            tekslistgc += `👥 *Member :* ${metadata.participants.length}\n\n`;
            tekslistgc += `──────────────────────\n\n`;
          }
          newReply(tekslistgc);
        }
        break;

      case "chat":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!q)
            return newReply(
              "Option : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete"
            );
          if (args[0] === "mute") {
            conn
              .chatModify({ mute: "Infinity" }, m.chat, [])
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "unmute") {
            conn
              .chatModify({ mute: null }, m.chat, [])
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "archive") {
            conn
              .chatModify({ archive: true }, m.chat, [])
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "unarchive") {
            conn
              .chatModify({ archive: false }, m.chat, [])
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "read") {
            conn
              .chatModify({ markRead: true }, m.chat, [])
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "unread") {
            conn
              .chatModify({ markRead: false }, m.chat, [])
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "delete") {
            conn
              .chatModify(
                { clear: { message: { id: m.quoted.id, fromMe: true } } },
                m.chat,
                []
              )
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          }
        }
        break;

      case "react":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!args[0]) return newReply(`Example: ${prefix + command} Titid`);
          reactionMessage = {
            react: {
              text: args[0],
              key: { remoteJid: m.chat, fromMe: true, id: quoted.id },
            },
          };
          conn.sendMessage(m.chat, reactionMessage);
        }
        break;
      case "shutdown":
        {
          if (!isCreator) return newReply(mess.owner);
          newReply(`Otsukaresama deshita🖐`);
          await sleep(3000);
          process.exit();
        }
        break;
      case "join":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!text) return newReply("Masukkan Link Group!");
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            return newReply("Link Invalid!");
          newReply(mess.wait);
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await conn
            .groupAcceptInvite(result)
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "leave":
        {
          if (!isCreator) return newReply(mess.owner);
          await conn
            .groupLeave(m.chat)
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "setexif":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!text)
            return newReply(`Contoh : ${prefix + command} packname|author`);
          global.packname = text.split("|")[0];
          global.author = text.split("|")[1];
          newReply(
            `Exif berhasil diubah menjadi\n\n• Packname : ${global.packname}\n• Author : ${global.author}`
          );
        }
        break;
      case "setpp":
      case "setpp":
      case "setppbot":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!quoted)
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (!/image/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (/webp/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          var medis = await conn.downloadAndSaveMediaMessage(
            quoted,
            "ppbot.jpeg"
          );
          if (args[0] == "full") {
            var { img } = await generateProfilePicture(medis);
            await conn.query({
              tag: "iq",
              attrs: {
                to: botNumber,
                type: "set",
                xmlns: "w:profile:picture",
              },
              content: [
                {
                  tag: "picture",
                  attrs: { type: "image" },
                  content: img,
                },
              ],
            });
            fs.unlinkSync(medis);
            reply(mess.success);
          } else {
            var memeg = await conn.updateProfilePicture(botNumber, {
              url: medis,
            });
            fs.unlinkSync(medis);
            newReply(`Sukses`);
          }
        }
        break;

      // Menu
      case "speedtest":
        {
          newReply("Testing Speed...");
          let cp = require("child_process");
          let { promisify } = require("util");
          let exec = promisify(cp.exec).bind(cp);
          let o;
          try {
            o = await exec("python speed.py");
          } catch (e) {
            o = e;
          } finally {
            let { stdout, stderr } = o;
            if (stdout.trim()) m.reply(stdout);
            if (stderr.trim()) m.reply(stderr);
          }
        }
        break;
      case "owner":
      case "creator":
        {
          const vcard =
            "BEGIN:VCARD\n" + // metadata of the contact card
            "VERSION:3.0\n" +
            `FN:${namaowner}\n` + // full name
            `ORG:${namabot};\n` + // the organization of the contact
            `TEL;type=MSG;type=CELL;type=VOICE;waid=${owner}:+${owner}\n` + // WhatsApp ID + phone number
            "END:VCARD";
          conn.sendMessage(
            m.chat,
            {
              contacts: {
                displayName: namaowner,
                contacts: [{ vcard }],
              },
            },
            { quoted: fkontak }
          );
        }
        break;
      case "ceklimit":
      case "checklimit":
      case "limit":
        {
          newReply("*Limit Lu :* " + db.data.users[m.sender].limit);
        }
        break;
      case "runtime":
        newReply(`*Bot Telah Online Selama*\n*${runtime(process.uptime())}*`);

        break;

      case "totalfitur":
      case "fitur":
        newReply(`Total Fitur ${namabot} Adalah ${totalFitur()}`);
        break;

      case "ping":
        {
          const used = process.memoryUsage();
          const cpus = os.cpus().map((cpu) => {
            cpu.total = Object.keys(cpu.times).reduce(
              (last, type) => last + cpu.times[type],
              0
            );
            return cpu;
          });
          const cpu = cpus.reduce(
            (last, cpu, _, { length }) => {
              last.total += cpu.total;
              last.speed += cpu.speed / length;
              last.times.user += cpu.times.user;
              last.times.nice += cpu.times.nice;
              last.times.sys += cpu.times.sys;
              last.times.idle += cpu.times.idle;
              last.times.irq += cpu.times.irq;
              return last;
            },
            {
              speed: 0,
              total: 0,
              times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0,
              },
            }
          );
          let timestamp = speed();
          let latensi = speed() - timestamp;
          neww = performance.now();
          oldd = performance.now();
          respon = `Runtime & Specification Bot 
🔗 Runtime : ${runtime(process.uptime())}
🖥️ Kecepatan Respon : ${latensi.toFixed(4)} _Second_
🛑 RAM : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
⚙️ CPU Model : ${cpus[0].model.trim()}
🔰 CPU Core : ${cpus.length} _Core_

_NodeJS Memory Usaage_
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")}
`;
          newReply(respon);
        }
        break;

      case "tqto":
        {
          let tqtonya = `
  _*TERIMA KASIH KEPADA*_

  *• ALLAH SWT*
  *• NABI MUHAMMAD SAW*
  *• MY PARENTS*
  *• AdrianTzy ( Author )*
  *• LoL-Human ( Rest APIs )*
  *• XTRAM ( TEAMS )*
  *• DanuDev*
  *• Reii Code*
  *• WH MODS*
  *• YogzzDevX*
  *• KilersBotz*
  *• LuckyCat*
  *• Rullxzz*
  *• Razan*
  *• Para Subscriber*
  *• Para Penyedia Module*
  *• Para Donatur*
  `;
          conn.sendMessage(m.chat, {
            text: tqtonya,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu} ${pushname}`,
                body: "AdrianTzy",
                thumbnailUrl:
                  "https://telegra.ph/file/8633bf5076b7da7d3ce9e.jpg",
                sourceUrl: "https://chat.whatsapp.com/DRCrPjaOXcZ9tXbx2raQ10",
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          });
        }
        break;
      case "sc":
      case "script":
        newReply(
          `Script Bot ${namabot} https://youtube.com/playlist?list=PLRmLRCoejWJsauHXGmkKERWnptlwtOy2q`
        );
        break;
      // Group Fitur
      case "antilinkv2":
        if (!m.isGroup) return newReply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator)
          return newReply(mess.admin);
        if (args.length < 1)
          return newReply(`Example ${prefix + command} on/off`);
        if (q == "on") {
          global.db.data.group[m.chat].antilinkv2 = true;
          newReply(`Berhasil Mengaktifkan antilinkv2`);
        } else if (q == "off") {
          global.db.data.group[m.chat].antilinkv2 = false;
          newReply(`Berhasil Mematikan antilinkv2`);
        }
        break;
      case "kick":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn
            .groupParticipantsUpdate(m.chat, [users], "remove")
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "add":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          let users = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn
            .groupParticipantsUpdate(m.chat, [users], "add")
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "culik":
        {
          if (args.length < 1) return newReply("_*Masukin id grupnya*_");
          let pantek = [];
          for (let i of groupMembers) {
            pantek.push(i.jid);
          }
          conn.groupParticipantsUpdate(args[0], pantek);
        }
        break;
      case "promote":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn
            .groupParticipantsUpdate(m.chat, [users], "promote")
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "demote":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn
            .groupParticipantsUpdate(m.chat, [users], "demote")
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "block":
        {
          if (!isCreator) return newReply(mess.owner);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn
            .updateBlockStatus(users, "block")
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "unblock":
        {
          if (!isCreator) return newReply(mess.owner);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn
            .updateBlockStatus(users, "unblock")
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "setname":
      case "setsubject":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (!text) return "Text ?";
          await conn
            .groupUpdateSubject(m.chat, text)
            .then((res) => newReply(mess.success))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (!text) return "Text ?";
          await conn
            .groupUpdateDescription(m.chat, text)
            .then((res) => newReply(mess.success))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "setppgroup":
      case "setppgrup":
      case "setppgc":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins) return newReply(mess.admin);
          if (!isBotAdmins) return newReply(mess.botAdmin);
          if (!quoted)
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (!/image/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (/webp/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          var mediz = await conn.downloadAndSaveMediaMessage(
            quoted,
            "ppgc.jpeg"
          );
          if (args[0] == `/panjang`) {
            var { img } = await generateProfilePicture(mediz);
            await conn.query({
              tag: "iq",
              attrs: {
                to: m.chat,
                type: "set",
                xmlns: "w:profile:picture",
              },
              content: [
                {
                  tag: "picture",
                  attrs: { type: "image" },
                  content: img,
                },
              ],
            });
            fs.unlinkSync(mediz);
            reply(`Sukses`);
          } else {
            var memeg = await conn.updateProfilePicture(m.chat, { url: mediz });
            fs.unlinkSync(mediz);
            reply(`Sukses`);
          }
        }
        break;
      case "tagall":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          let teks = `*👥 Tag All By Admin*
 
                 🗞️ *Pesan : ${q ? q : "kosong"}*\n\n`;
          for (let mem of participants) {
            teks += `• @${mem.id.split("@")[0]}\n`;
          }
          conn.sendMessage(
            m.chat,
            {
              text: teks,
              mentions: participants.map((a) => a.id),
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "hidetag":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          conn.sendMessage(
            m.chat,
            {
              text: q ? q : "",
              mentions: participants.map((a) => a.id),
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "totag":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isBotAdmins) return mess.botAdmin;
          if (!isAdmins) return mess.admin;
          if (!m.quoted)
            return `Reply pesan dengan caption ${prefix + command}`;
          conn.sendMessage(m.chat, {
            forward: m.quoted.fakeObj,
            mentions: participants.map((a) => a.id),
          });
        }
        break;
      case "antilink":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "on") {
            if (db.data.group[m.chat].antilink)
              return newReply(`Sudah Aktif Sebelumnya 🕊️`);
            db.data.group[m.chat].antilink = true;
            newReply(`Antilink Group WhatsApp Aktif 🕊️`);
          } else if (args[0] === "off") {
            if (!db.data.group[m.chat].antilink)
              return newReply(`Sudah Nonaktif Sebelumnya 🕊`);
            db.data.group[m.chat].antilink = false;
            newReply(`Antilink Group WhatsApp Nonaktif 🕊️`);
          } else {
            newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`);
          }
        }
        break;
      case "antilinkyt":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "on") {
            if (db.data.group[m.chat].antilinkyt)
              return newReply(`Sudah Aktif Sebelumnya 🕊`);
            db.data.group[m.chat].antilinkyt = true;
            newReply(`Antilink YouTube Aktif 🕊️`);
          } else if (args[0] === "off") {
            if (!db.data.group[m.chat].antilinkyt)
              return newReply(`Sudah Nonaktif Sebelumnya 🕊`);
            db.data.group[m.chat].antilinkyt = false;
            newReply(`Antilink YouTube Nonaktif 🕊️`);
          } else {
            newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`);
          }
        }
        break;
      case "antilinktt":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "on") {
            if (db.data.group[m.chat].antilinktt)
              return newReply(`Sudah Aktif Sebelumnya 🕊`);
            db.data.group[m.chat].antilinktt = true;
            newReply(`Antilink TikTok Aktif 🕊️`);
          } else if (args[0] === "off") {
            if (!db.data.group[m.chat].antilinktt)
              return newReply(`Sudah Nonaktif Sebelumnya 🕊`);
            db.data.group[m.chat].antilinktt = false;
            newReply(`Antilink TikTok Nonaktif 🕊️`);
          } else {
            newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`);
          }
        }
        break;
      case "mutegc":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "on") {
            if (db.data.group[m.chat].mute)
              return newReply(`Sudah Aktif Sebelumnya 🕊`);
            db.data.group[m.chat].mute = true;
            newReply(`${ntiktok} telah di mute di group ini 🕊️`);
          } else if (args[0] === "off") {
            if (!db.data.group[m.chat].mute)
              return newReply(`Sudah Tidak Aktif Sebelumnya 🕊`);
            db.data.group[m.chat].mute = false;
            newReply(`${ntiktok} telah di unmute di group ini 🕊️`);
          } else {
            newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`);
          }
        }
        break;
      case "ephemeral":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "1") {
            await conn
              .groupToggleEphemeral(m.chat, 1 * 24 * 3600)
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "7") {
            await conn
              .groupToggleEphemeral(m.chat, 7 * 24 * 3600)
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "90") {
            await conn
              .groupToggleEphemeral(m.chat, 90 * 24 * 3600)
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "off") {
            await conn
              .groupToggleEphemeral(m.chat, 0)
              .then((res) => newReply(jsonformat(res)))
              .catch((err) => newReply(jsonformat(err)));
          } else {
            let sections = [
              {
                title: "CHANGE EFFECTIVE GROUP",
                rows: [
                  {
                    title: "⌲ Ephemeral 1 day",
                    rowId: `ephemeral 1`,
                    description: `Activate the ephemeral group for 1 day`,
                  },
                  {
                    title: "⌲ Ephemeral 7 day's",
                    rowId: `ephemeral 7`,
                    description: `Activate the ephemeral group for 7 day's`,
                  },
                  {
                    title: "⌲ Ephemeral 90 days's",
                    rowId: `ephemeral 90`,
                    description: `Activate the ephemeral group for 90 day's`,
                  },
                  {
                    title: "⌲ Ephemeral Off",
                    rowId: `ephemeral off`,
                    description: `Deactivate this Ephemeral group`,
                  },
                ],
              },
            ];
            conn.sendListMsg(
              m.chat,
              `Please select the following Ephemeral Options List !`,
              ntiktok,
              `Hello Admin ${groupMetadata.subject}`,
              `Touch Me (⁠≧⁠▽⁠≦⁠)`,
              sections,
              m
            );
          }
        }
        break;
      case "bcgc":
      case "bcgroup":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!text)
            return `Text mana?\n\nContoh : ${prefix + command} Akame ><`;
          let getGroups = await conn.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          newReply(
            `Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let i of anu) {
            await sleep(1500);
            let txt = `「 Broadcast Bot 」\n\n${text}`;
            let buttons = [
              {
                buttonId: ".donasi",
                buttonText: { displayText: "👑Sewa" },
                type: 1,
              },
              {
                buttonId: ".rules",
                buttonText: { displayText: "❗Rules" },
                type: 1,
              },
            ];
            await conn.sendButtonText(i, buttons, txt, ntiktok, m, {
              quoted: m,
            });
          }
          newReply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
        }
        break;
      case "bc":
      case "broadcast":
      case "bcall":
        {
          if (!isCreator) return newReply(mess.owner);
          if (!text)
            return `Text mana?\n\nContoh : ${prefix + command} Akame ><`;
          let anu = await store.chats.all().map((v) => v.id);
          newReply(
            `Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let yoi of anu) {
            await sleep(1500);
            let txt = `「 Broadcast Bot 」\n\n${text}`;
            let buttons = [
              {
                buttonId: ".donasi",
                buttonText: { displayText: "👑Sewa" },
                type: 1,
              },
              {
                buttonId: ".rules",
                buttonText: { displayText: "❗Rules" },
                type: 1,
              },
            ];
            await conn.sendButtonText(yoi, buttons, txt, ntiktok, m, {
              quoted: m,
            });
          }
          newReply("Sukses Broadcast");
        }
        break;
      case "group":
      case "grup":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "close") {
            await conn
              .groupSettingUpdate(m.chat, "announcement")
              .then((res) => newReply(`Sukses Menutup Group 🕊️`))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "open") {
            await conn
              .groupSettingUpdate(m.chat, "not_announcement")
              .then((res) => newReply(`Sukses Membuka Group 🕊️`))
              .catch((err) => newReply(jsonformat(err)));
          } else {
            newReply(
              `Mode ${command}\n\n\nKetik ${prefix + command}open/close`
            );
          }
        }
        break;
      case "editinfo":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          if (args[0] === "open") {
            await conn
              .groupSettingUpdate(m.chat, "unlocked")
              .then((res) => newReply(`Sukses Membuka Edit Info Group 🕊️`))
              .catch((err) => newReply(jsonformat(err)));
          } else if (args[0] === "close") {
            await conn
              .groupSettingUpdate(m.chat, "locked")
              .then((res) => newReply(`Sukses Menutup Edit Info Group 🕊️`))
              .catch((err) => newReply(jsonformat(err)));
          } else {
            newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`);
          }
        }
        break;
      case "linkgroup":
      case "linkgrup":
      case "linkgc":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          let response = await conn.groupInviteCode(m.chat);
          conn.sendText(
            m.chat,
            `👥 *INFO LINK GROUP*\n📛 *Nama :* ${
              groupMetadata.subject
            }\n👤 *Owner Grup :* ${
              groupMetadata.owner !== undefined
                ? "@" + groupMetadata.owner.split`@`[0]
                : "Tidak diketahui"
            }\n🌱 *ID :* ${
              groupMetadata.id
            }\n🔗 *Link Chat :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${
              groupMetadata.participants.length
            }\n`,
            m,
            {
              detectLink: true,
            }
          );
        }
        break;
      case "revoke":
        {
          if (!m.isGroup) return newReply(mess.group);
          if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin;
          if (!isBotAdmins) return mess.botAdmin;
          await conn
            .groupRevokeInvite(m.chat)
            .then((res) => {
              newReply(
                `Sukses Menyetel Ulang, Tautan Undangan Grup ${groupMetadata.subject}`
              );
            })
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "listonline":
      case "liston":
        {
          if (!m.isGroup) newReply(mess.group);
          let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
          let online = [...Object.keys(store.presences[id]), botNumber];
          conn.sendText(
            m.chat,
            "⏰ List Online:\n\n" +
              online.map((v) => "🌱 @" + v.replace(/@.+/, "")).join`\n`,
            m,
            {
              mentions: online,
            }
          );
        }
        break;
      // Fun Fitur

      case "apakah":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} text\n\nContoh : ${command} saya wibu`
            );
          const apa = ["Iya", "Tidak", "Bisa Jadi", "Betul"];
          const kah = apa[Math.floor(Math.random() * apa.length)];
          newReply(`Pertanyaan : Apakah ${q}\nJawaban : ${kah}`);
        }
        break;
      case "bisakah":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} text\n\nContoh : ${command} saya wibu`
            );
          const bisa = [
            "Bisa",
            "Gak Bisa",
            "Gak Bisa Ajg Aaokawpk",
            "TENTU PASTI KAMU BISA!!!!",
          ];
          const ga = bisa[Math.floor(Math.random() * bisa.length)];
          newReply(`Pertanyaan : Apakah ${q}\nJawaban : ${ga}`);
        }
        break;
      case "bagaimanakah":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} text\n\nContoh : ${command} saya wibu`
            );
          const gimana = [
            "Gak Gimana2",
            "Sulit Itu Bro",
            "Maaf Bot Tidak Bisa Menjawab",
            "Coba Deh Cari Di Gugel",
            "astaghfirallah Beneran???",
            "Pusing ah",
            "Owhh Begitu:(",
            "Yang Sabar Ya Bos:(",
            "Gimana yeee",
          ];
          const ya = gimana[Math.floor(Math.random() * gimana.length)];
          newReply(`Pertanyaan : Apakah ${q}\nJawaban : ${ya}`);
        }
        break;
      case "rate":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} text\n\nContoh : ${command} Gambar aku`
            );
          const ra = [
            "5",
            "10",
            "15",
            "20",
            "25",
            "30",
            "35",
            "40",
            "45",
            "50",
            "55",
            "60",
            "65",
            "70",
            "75",
            "80",
            "85",
            "90",
            "95",
            "100",
          ];
          const te = ra[Math.floor(Math.random() * ra.length)];
          newReply(`Rate : ${q}\nJawaban : *${te}%*`);
        }
        break;

      case "gantengcek":
      case "cekganteng":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} Nama\n\nContoh : ${command} Owner`
            );
          const gan = [
            '10% banyak" perawatan ya bang:v\nCanda Perawatan:v',
            "30% Semangat bang Merawat Dirinya><",
            "20% Semangat Ya bang👍",
            "40% Wahh bang><",
            "50% abang Ganteng deh><",
            "60% Hai Ganteng🐊",
            "70% Hai Ganteng🐊",
            "62% Bang Ganteng><",
            "74% abang ni ganteng deh><",
            "83% Love You abang><",
            "97% Assalamualaikum Ganteng🐊",
            "100% Bang Pake Susuk ya??:v",
            "29% Semangat Bang:)",
            "94% Hai Ganteng><",
            "75% Hai Bang Ganteng",
            "82% wihh abang Pasti Sering Perawatan kan??",
            "41% Semangat:)",
            "39% Lebih Semangat🐊",
          ];
          const teng = gan[Math.floor(Math.random() * gan.length)];
          newReply(`Nama : ${q}\nJawaban : *${teng}%`);
        }
        break;

      case "cantikcek":
      case "cekcantik":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} Nama\n\nContoh : ${command} Akame`
            );
          const can = [
            '10% banyak" perawatan ya kak:v\nCanda Perawatan:v',
            "30% Semangat Kaka Merawat Dirinya><",
            "20% Semangat Ya Kaka👍",
            "40% Wahh Kaka><",
            "50% kaka cantik deh><",
            "60% Hai Cantik🐊",
            "70% Hai Ukhty🐊",
            "62% Kakak Cantik><",
            "74% Kakak ni cantik deh><",
            "83% Love You Kakak><",
            "97% Assalamualaikum Ukhty🐊",
            "100% Kakak Pake Susuk ya??:v",
            "29% Semangat Kakak:)",
            "94% Hai Cantik><",
            "75% Hai Kakak Cantik",
            "82% wihh Kakak Pasti Sering Perawatan kan??",
            "41% Semangat:)",
            "39% Lebih Semangat🐊",
          ];
          const tik = can[Math.floor(Math.random() * can.length)];
          newReply(`Nama : ${q}\nJawaban : *${tik}%`);
        }
        break;

      case "sangecek":
      case "ceksange":
      case "gaycek":
      case "cekgay":
      case "lesbicek":
      case "ceklesbi":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} Nama\n\nContoh : ${command} ${pushname}`
            );
          const sangeh = [
            "5",
            "10",
            "15",
            "20",
            "25",
            "30",
            "35",
            "40",
            "45",
            "50",
            "55",
            "60",
            "65",
            "70",
            "75",
            "80",
            "85",
            "90",
            "95",
            "100",
          ];
          const sange = sangeh[Math.floor(Math.random() * sangeh.length)];
          newReply(`Nama : ${q}\nJawaban : *${sange}%*`);
        }
        break;

      case "kapankah":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q)
            return newReply(
              `Penggunaan ${command} Pertanyaan\n\nContoh : ${command} Saya Mati`
            );
          const kapan = [
            "5 Hari Lagi",
            "10 Hari Lagi",
            "15 Hari Lagi",
            "20 Hari Lagi",
            "25 Hari Lagi",
            "30 Hari Lagi",
            "35 Hari Lagi",
            "40 Hari Lagi",
            "45 Hari Lagi",
            "50 Hari Lagi",
            "55 Hari Lagi",
            "60 Hari Lagi",
            "65 Hari Lagi",
            "70 Hari Lagi",
            "75 Hari Lagi",
            "80 Hari Lagi",
            "85 Hari Lagi",
            "90 Hari Lagi",
            "95 Hari Lagi",
            "100 Hari Lagi",
            "5 Bulan Lagi",
            "10 Bulan Lagi",
            "15 Bulan Lagi",
            "20 Bulan Lagi",
            "25 Bulan Lagi",
            "30 Bulan Lagi",
            "35 Bulan Lagi",
            "40 Bulan Lagi",
            "45 Bulan Lagi",
            "50 Bulan Lagi",
            "55 Bulan Lagi",
            "60 Bulan Lagi",
            "65 Bulan Lagi",
            "70 Bulan Lagi",
            "75 Bulan Lagi",
            "80 Bulan Lagi",
            "85 Bulan Lagi",
            "90 Bulan Lagi",
            "95 Bulan Lagi",
            "100 Bulan Lagi",
            "1 Tahun Lagi",
            "2 Tahun Lagi",
            "3 Tahun Lagi",
            "4 Tahun Lagi",
            "5 Tahun Lagi",
            "Besok",
            "Lusa",
            `Abis Command Ini Juga Lu ${q}`,
          ];
          const kapankah = kapan[Math.floor(Math.random() * kapan.length)];
          newReply(`Pertanyaan : ${q}\nJawaban : *${kapankah}*`);
        }
        break;

      case "wangy":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q) return newReply(`Contoh : .wangy Riy`);
          qq = q.toUpperCase();
          awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`;
          newReply(awikwok);
        }
        break;

      case "cekmati":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!q) return newReply(`Invalid!\n\nYg mau di cek siapa kontol?`);
          predea = await axios.get(`https://api.agify.io/?name=${q}`);
          newReply(
            `Nama : ${predea.data.name}\n*Mati Pada Umur :* ${predea.data.age} Tahun.\n\n_Cepet Cepet Tobat Bro Soalnya Mati ga ada yang tau_`
          );
        }
        break;

      case "halah":
      case "hilih":
      case "huluh":
      case "heleh":
      case "holoh":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 2;
          newReply(`🚩 2 Limit Used`);
          if (!m.quoted && !text)
            return newReply(
              `Kirim/reply text dengan caption ${prefix + command}`
            );
          ter = command[1].toLowerCase();
          tex = m.quoted
            ? m.quoted.text
              ? m.quoted.text
              : q
              ? q
              : m.text
            : q
            ? q
            : m.text;
          newReply(
            tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase())
          );
        }
        break;

      // ISLAMIN FITUR
      case "iqra":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 1 Limit Used`);
          oh = `Contoh : ${
            prefix + command
          } 3\n\nIQRA Yang tersedia : 1,2,3,4,5,6`;
          if (!text) return newReply(oh);
          yy = await getBuffer(
            `https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${text}`
          );
          conn
            .sendMessage(
              m.chat,
              {
                document: yy,
                mimetype: "application/pdf",
                fileName: `iqra${text}.pdf`,
              },
              {
                quoted: m,
              }
            )
            .catch((err) => newReply(oh));
        }
        break;
      case "juzamma":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 1 Limit Used`);
          if (args[0] === "pdf") {
            newReply(mess.wait);
            conn.sendMessage(
              m.chat,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pdf",
                },
                mimetype: "application/pdf",
                fileName: "juz-amma-arab-latin-indonesia.pdf",
              },
              {
                quoted: m,
              }
            );
          } else if (args[0] === "docx") {
            newReply(mess.wait);
            conn.sendMessage(
              m.chat,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.docx",
                },
                mimetype:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                fileName: "juz-amma-arab-latin-indonesia.docx",
              },
              {
                quoted: m,
              }
            );
          } else if (args[0] === "pptx") {
            newReply(mess.wait);
            conn.sendMessage(
              m.chat,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pptx",
                },
                mimetype:
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileName: "juz-amma-arab-latin-indonesia.pptx",
              },
              {
                quoted: m,
              }
            );
          } else if (args[0] === "xlsx") {
            newReply(mess.wait);
            conn.sendMessage(
              m.chat,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.xlsx",
                },
                mimetype:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileName: "juz-amma-arab-latin-indonesia.xlsx",
              },
              {
                quoted: m,
              }
            );
          } else {
            newReply(
              `Mau format apa ? Contoh : ${
                prefix + command
              } pdf\nFormat yang tersedia : pdf, docx, pptx, xlsx`
            );
          }
        }
        break;
      case "hadis":
      case "hadist":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 1 Limit Used`);
          if (!args[0])
            return newReply(`Contoh:
${prefix + command} bukhari 1
${prefix + command} abu-daud 1

Pilihan tersedia:
abu-daud
1 - 4590
ahmad
1 - 26363
bukhari
1 - 7008
darimi
1 - 3367
ibnu-majah
1 - 4331
nasai
1 - 5662
malik
1 - 1594
muslim
1 - 5362`);
          if (!args[1])
            return newReply(
              `Hadis yang ke berapa?\n\ncontoh:\n${prefix + command} muslim 1`
            );
          try {
            let res = await fetchJson(
              `https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`
            );
            let { number, arab, id } = res.find((v) => v.number == args[1]);
            newReply(`No. ${number}

${arab}

${id}`);
          } catch (e) {
            newReply(`Hadis tidak ditemukan !`);
          }
        }
        break;
      case "tafsirsurah":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!args[0])
            return `Contoh penggunaan:\n${
              prefix + command
            } 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`;
          if (!args[1])
            return `Contoh penggunaan:\n${
              prefix + command
            } 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`;
          let res = await fetchJson(
            `https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`
          );
          let txt = `「 *Tafsir Surah*  」

*Pendek* : ${res.result.data.tafsir.id.short}

*Panjang* : ${res.result.data.tafsir.id.long}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`;
          newReply(txt);
        }
        break;
      case "asmaulhusna":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        newReply(mess.wait);
        axios
          .get(`https://api.rivqi.my.id/api/islamic/asmaulhusnarandom?apikey=${razankey}`)
          .then(({ data }) => {
            var text = `No : ${data.result.index}\n`;
            text += `Latin: ${data.result.latin}\n`;
            text += `Arab : ${data.result.ar}\n`;
            text += `Indonesia : ${data.result.id}\n`;
            text += `English : ${data.result.en}`;
            newReply(text);
          })
          .catch(console.error);
        break;

      case "alquranaudio":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 3 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${prefix + command} 18 or ${prefix + command} 18/10`
            );
          newReply(mess.wait);
          conn.sendMessage(
            m.chat,
            {
              audio: {
                url: `https://api.lolhuman.xyz/api/quran/audio/${args[0]}?apikey=${apikey}`,
              },
              mimetype: "audio/mp4",
              ptt: true,
            },
            { quoted: m }
          );
        }
        break;

      case "alquran":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        if (args.length < 1)
          return newReply(
            `Example: ${prefix + command} 18 or ${prefix + command} 18/10 or ${
              prefix + command
            } 18/1-10`
          );
        newReply(mess.wait);
        axios
          .get(`https://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${apikey}`)
          .then(({ data }) => {
            var ayat = data.result.ayat;
            var text = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`;
            for (var x of ayat) {
              text += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`;
            }
            text = text.replace(/<u>/g, "_").replace(/<\/u>/g, "_");
            text = text.replace(/<strong>/g, "*").replace(/<\/strong>/g, "*");
            newReply(text);
          })
          .catch(console.error);
        break;

      case "jadwalsolat":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 3 Limit Used`);
          if (!text) return newReply("Mana Kotanya?");
          newReply(mess.wait);
          let anu = await fetchJson(
            `https://api.lolhuman.xyz/api/sholat/${text}?apikey=${apikey}`
          );
          newReply(
            `Wilayah: ${anu.result.wilayah}\n\nTanggal: ${anu.result.tanggal}\nSahur: ${anu.result.sahur}\nImsak: ${anu.result.imsak}\nTerbit: ${anu.result.terbit}\nDhuha: ${anu.result.dhuha}\nDzuhur: ${anu.result.dzuhur}\nAshar: ${anu.result.ashar}\nMagrib: ${anu.result.maghrib}\nIsya: ${anu.result.isya}`
          );
        }
        break;

      case "kisahnabi":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} Muhammad`);
        newReply(mess.wait);
        axios
          .get(
            `https://api.lolhuman.xyz/api/kisahnabi/${full_args}?apikey=${apikey}`
          )
          .then(({ data }) => {
            var text = `Name : ${data.result.name}\n`;
            text += `Lahir : ${data.result.thn_kelahiran}\n`;
            text += `Umur : ${data.result.age}\n`;
            text += `Tempat : ${data.result.place}\n`;
            text += `Story : \n${data.result.story}`;
            newReply(text);
          })
          .catch(console.error);
        break;

      case "listsurah":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        newReply(mess.wait);
        axios
          .get(`https://api.lolhuman.xyz/api/quran?apikey=${apikey}`)
          .then(({ data }) => {
            var text = "List Surah:\n";
            for (var x in data.result) {
              text += `${x}. ${data.result[x]}\n`;
            }
            newReply(text);
          })
          .catch(console.error);
        break;

      // DOWNLOADER FITUR
      case "pindl":
      case "pindownload":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Contoh: ${prefix + command} https://pin.it/3E5fARH`
            );
          let anu = axios
            .get(
              `https://api.lolhuman.xyz/api/pinterestdl?apikey=${apikey}&url=${full_args}`
            )
            .then(({ data }) => {
              conn.sendMessage(
                m.chat,
                { video: { url: data.result }, caption: `${namabot}` },
                { quoted: fkontak }
              );
            });
        }
        break;
      case "git":
      case "gitclone":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!args[0])
            return newReply(
              `Mana link nya?\nContoh :\n${prefix}${command} https://github.com/razn-id/tes`
            );
          if (!isUrl(args[0]) && !args[0].includes("github.com"))
            return newReply(`Link invalid!!`);
          let regex1 =
            /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
          let [, user, repo] = args[0].match(regex1) || [];
          repo = repo.replace(/.git$/, "");
          let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
          let filename = (await fetch(url, { method: "HEAD" })).headers
            .get("content-disposition")
            .match(/attachment; filename=(.*)/)[1];
          conn
            .sendMessage(
              m.chat,
              {
                document: { url: url },
                fileName: filename + ".zip",
                mimetype: "application/zip",
              },
              { quoted: m }
            )
            .catch((err) => reply(mess.error));
        }
        break;
      case "ytplay":
      case "play":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 10;
        newReply(`🚩 10 Limit Used`);
        if (args.length == 0)
          return await newReply(`Example: ${prefix + command} melukis senja`);
        newReply(mess.wait);
        axios
          .get(
            `https://api.rivqi.my.id/api/search/ytplay?text=startboy&apikey=razanapi` //Jika Api Error Contact 6282228104562
          )
          .then(({ data }) => {
            conn
              .sendMessage(m.chat, {
                image: { url: data.result.thum },
                caption: `
⭔ Title : ${data.result.title}
⭔ Ext : Search
⭔ ID : ${data.result.id}
⭔ Duration : ${data.result.timestamp}
⭔ Viewers : ${data.result.view}
⭔ Upload At : ${data.result.uploadDate}
⭔ Author : ${data.result.author.name}
⭔ Channel : ${data.result.author.url}
⭔ Description : ${data.result.desc}
⭔ Url : ${data.result.urlVideo}`,
              })
              .then(() => {
                conn.sendMessage(m.chat, {
                  audio: { url: data.result.mp3.result },
                  mimetype: "audio/mp4",
                  fileName: `${data.result.title}.mp3`,
                });
              });
          });
        break;

      case "ytmp3":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(
            `Example: ${
              prefix + command
            } https://www.youtube.com/watch?v=qZIQAk-BUEc`
          );
        newReply(mess.wait);
        axios
          .get(
            `https://api.lolhuman.xyz/api/ytaudio2?apikey=${apikey}&url=${args[0]}`
          )
          .then(({ data }) => {
            var caption = `❖ Title    : *${data.result.title}*\n`;
            caption += `❖ Size     : *${data.result.size}*`;
            conn
              .sendMessage(m.chat, {
                image: { url: data.result.thumbnail },
                caption,
              })
              .then(() => {
                conn.sendMessage(m.chat, {
                  audio: { url: data.result.link },
                  mimetype: "audio/mp4",
                  fileName: `${data.result.title}.mp3`,
                });
              });
          })
          .catch(console.error);
        break;

      case "ytmp4":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(
            `Example: ${
              prefix + command
            } https://www.youtube.com/watch?v=qZIQAk-BUEc`
          );
        newReply(mess.wait);
        axios
          .get(
            `https://api.lolhuman.xyz/api/ytvideo2?apikey=${apikey}&url=${args[0]}`
          )
          .then(({ data }) => {
            var caption = `❖ Title    : *${data.result.title}*\n`;
            caption += `❖ Size     : *${data.result.size}*`;
            conn
              .sendMessage(m.chat, {
                image: { url: data.result.thumbnail },
                caption,
              })
              .then(() => {
                conn.sendMessage(m.chat, {
                  video: { url: data.result.link },
                  mimetype: "video/mp4",
                  fileName: `${data.result.title}.mp4`,
                });
              });
          })
          .catch(console.error);
        break;

      case "tiktok":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`
            );
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/tiktok?apikey=${apikey}&url=${args[0]}`
            )
            .then(({ data }) => {
              conn.sendMessage(m.chat, {
                video: { url: data.result.link },
                mimetype: "video/mp4",
              });
            });
        }
        break;

      case "tiktokaudio":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`
            );
          newReply(mess.wait);
          conn.sendMessage(m.chat, {
            audio: {
              url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${apikey}&url=${args[0]}`,
            },
            mimetype: "audio/mp4",
            fileName: `${data.result.title}.mp3`,
          });
        }
        break;

      case "igdl":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${
                prefix + command
              } https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`
            );
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/instagram?apikey=${apikey}&url=${args[0]}`
            )
            .then(({ data }) => {
              var url = data.result[0];
              if (url.includes(".mp4")) {
                conn.sendMessage(m.chat, {
                  video: { url },
                  mimetype: "video/mp4",
                });
              } else {
                conn.sendMessage(m.chat, { image: { url } });
              }
            });
        }
        break;

      case "igdl2":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${
                prefix + command
              } https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`
            );
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/instagram2?apikey=${apikey}&url=${args[0]}`
            )
            .then(({ data }) => {
              for (var x of data.result) {
                if (x.includes(".mp4")) {
                  conn.sendMessage(m.chat, {
                    video: { url: x },
                    mimetype: "video/mp4",
                  });
                } else {
                  conn.sendMessage(m.chat, { image: { url: x } });
                }
              }
            });
        }
        break;

      case "twtdl":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${
                prefix + command
              } https://twitter.com/gofoodindonesia/status/1229369819511709697`
            );
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/twitter?apikey=${apikey}&url=${args[0]}`
            )
            .then(({ data }) => {
              conn.sendMessage(m.chat, {
                video: {
                  url: data.result.link[data.result.link.length - 1].link,
                },
                mimetype: "video/mp4",
              });
            });
        }
        break;

      case "fbdl":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${
                prefix + command
              } https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`
            );
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/facebook?apikey=${apikey}&url=${args[0]}`
            )
            .then(({ data }) => {
              conn.sendMessage(m.chat, {
                video: { url: data.result },
                mimetype: "video/mp4",
              });
            });
        }
        break;

      // Tools Fitur
      case "hapus":
      case "delete":
      case "del":
      case "d":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!m.quoted) return false;
          let { chat, fromMe, id, isBaileys } = m.quoted;
          if (!isBaileys)
            return newReply("Pesan tersebut bukan dikirim oleh bot!");
          conn.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: true,
              id: m.quoted.id,
              participant: m.quoted.sender,
            },
          });
        }
        break;

      case "q":
      case "quoted":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1;
          newReply(`🚩 1 Limit Used`);
          if (!m.quoted) return newReply("Reply Pesannya!!");
          let wokwol = await conn.serializeM(await m.getQuotedObj());
          if (!wokwol.quoted)
            return newReply("Pesan Yang Anda Reply Tidak Mengandung Reply");
          await wokwol.quoted.copyNForward(m.chat, true);
        }
        break;

      case "ebinary":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 3 Limit Used`);
          let { eBinary } = require("./lib/binary");
          let teks = text
            ? text
            : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
          let eb = await eBinary(teks);
          newReply(eb);
        }
        break;
      case "dbinary":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 3 Limit Used`);
          let { dBinary } = require("./lib/binary");
          let teks = text
            ? text
            : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
          let db = await dBinary(teks);
          newReply(db);
        }
        break;

      case "ss":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        if (args.length == 0)
          return newReply(
            `Example: ${prefix + command} https://api.lolhuman.xyz`
          );
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/ssweb?apikey=${apikey}&url=${args[0]}`,
            },
            caption: `URL: ${args[0]}`,
          },
          { quoted: fkontak }
        );
        break;

      case "ssweb":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        if (args.length == 0)
          return newReply(
            `Example: ${prefix + command} https://api.lolhuman.xyz`
          );
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/sswebfull?apikey=${apikey}&url=${args[0]}`,
            },
            caption: `URL: ${args[0]}`,
          },
          { quoted: m }
        );
        break;

      case "shortlink":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        if (args.length == 0)
          return newReply(
            `Example: ${prefix + command} https://api.lolhuman.xyz`
          );
        axios
          .get(
            `https://api.lolhuman.xyz/api/ouoshortlink?apikey=${apikey}&url=${args[0]}`
          )
          .then(({ data }) => {
            newReply(data.result);
          });
        break;

      // AI FITUR
      case "aiimage":
        {
          if (!isPremium) return newReply(mess.prem);
          if (args.length == 0)
            return newReply(
              `Membuat gambar dari AI.\n\nContoh :\n${
                prefix + command
              } rumah mewah`
            );
          conn.sendMessage(
            m.chat,
            {
              image: {
                url: `https://api.lolhuman.xyz/api/dall-e?apikey=${apikey}&text=${args[0]}`,
              },
              caption: `${args[0]}`,
            },
            { quoted: m }
          );
        }
        break;

      case "ai":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 10;
        newReply(`🚩 10 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} ai adalah`);
        axios
          .get(
            `https://api.lolhuman.xyz/api/openai?apikey=${apikey}&text=${encodeURIComponent(
              full_args
            )}&user=${senderNumber}`
          )
          .then(({ data }) => {
            newReply(data.result);
          });
        break;

      // Information Fitur
      case "pinterest":
      case "image":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Example : ${prefix + command}`);
          newReply(mess.wait);
          let { pinterest } = require("./lib/scraper");
          anu = await pinterest(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(
            m.chat,
            { image: { url: result }, caption: mess.done },
            { quoted: m }
          );
        }
        break;

      case "google":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} fatih arridho`);
          let google = require("google-it");
          google({ query: text }).then((res) => {
            let teks = `Google Search From : ${text}\n\n`;
            for (let g of res) {
              teks += `• *Title* : ${g.title}\n`;
              teks += `• *Description* : ${g.snippet}\n`;
              teks += `• *Link* : ${g.link}\n\n────────────────────────\n\n`;
            }
            newReply(teks);
          });
        }
        break;

      case "infochat":
        {
          if (!m.quoted) newReply("Reply Pesan");
          let msg = await m.getQuotedObj();
          if (!m.quoted.isBaileys)
            return newReply("Pesan tersebut bukan dikirim oleh bot!");
          let teks = "";
          for (let i of msg.userReceipt) {
            let read = i.readTimestamp;
            let unread = i.receiptTimestamp;
            let waktu = read ? read : unread;
            teks += `👤 @${i.userJid.split("@")[0]}\n`;
            teks += `⏳ *Waktu :* ${moment(waktu * 1000).format(
              "DD/MM/YY HH:mm:ss"
            )}\n📈 *Status :* ${read ? "Dibaca" : "Terkirim"}\n\n`;
          }
          newReply(teks);
        }
        break;

      case "kbbi":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} kursi`);
          newReply(mess.wait);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/kbbi?apikey=${apikey}&query=${full_args}`
          );
          var titid = `\`\`\`Kata : ${data.result[0].nama}\`\`\`\n`;
          titid += `\`\`\`Kata Dasar : ${data.result[0].kata_dasar}\`\`\`\n`;
          titid += `\`\`\`Pelafalan : ${data.result[0].pelafalan}\`\`\`\n`;
          titid += `\`\`\`Bentuk Tidak Baku : ${data.result[0].bentuk_tidak_baku}\`\`\`\n\n`;
          for (var x of data.result) {
            titid += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`;
            titid += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`;
            titid += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`;
            titid += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `;
            titid += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`;
          }
          newReply(titid);
        }
        break;
      case "brainly":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} siapakah sukarno`);
          newReply(mess.wait);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/brainly?apikey=${apikey}&query=${full_args}`
          );
          var ti = "Beberapa Pembahasan Dari Brainly :\n\n";
          for (var x of data.result) {
            ti += `==============================\n`;
            ti += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`;
            ti += `\`\`\`Jawaban :\`\`\`\n${x.answer[0].content}\n`;
            ti += `==============================\n\n`;
          }
          newReply(ti);
        }
        break;
      case "roboguru":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} siapakah sukarno`);
          newReply(mess.wait);
          var { data } = await axios
            .get(
              `https://api.lolhuman.xyz/api/roboguru?apikey=${apikey}&query=${full_args}&grade=sma&subject=sejarah`
            )
            .catch((err) => console.error(err?.response?.data));
          var tit = "Beberapa Pembahasan Dari Roboguru :\n\n";
          for (var x of data.result) {
            tit += `==============================\n`;
            tit += `\`\`\`Pertanyaan :\`\`\`\n${x.question}\n\n`;
            tit += `\`\`\`Jawaban :\`\`\`\n${x.answer}\n`;
            tit += `==============================\n\n`;
          }
          newReply(tit);
        }
        break;

      case "jarak":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(
              `Example: ${prefix + command} jakarta - yogyakarta`
            );
          var titt1 = full_args.split("-")[0].trim();
          var titt2 = full_args.split("-")[1].trim();
          newReply(mess.wait);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/jaraktempuh?apikey=${apikey}&kota1=${titt1}&kota2=${titt2}`
          );
          var titt = `Informasi Jarak dari ${titt1} ke ${titt2} :\n\n`;
          titt += `\`\`\`◪ Asal :\`\`\` ${data.result.from.name}\n`;
          titt += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.from.latitude}\n`;
          titt += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.from.longitude}\n\n`;
          titt += `\`\`\`◪ Tujuan :\`\`\` ${data.result.to.name}\n`;
          titt += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.to.latitude}\n`;
          titt += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.to.longitude}\n\n`;
          titt += `\`\`\`◪ Jarak Tempuh :\`\`\` ${data.result.jarak}\n`;
          titt += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`;
          titt += `   ╭───────────────❏\n`;
          titt += `❍┤ Kereta Api : ${data.result.kereta_api}\n`;
          titt += `❍┤ Pesawat : ${data.result.pesawat}\n`;
          titt += `❍┤ Mobil : ${data.result.mobil}\n`;
          titt += `❍┤ Motor : ${data.result.motor}\n`;
          titt += `❍┤ Jalan Kaki : ${data.result.jalan_kaki}\n`;
          titt += `   ╰───────────────❏\n`;
          newReply(titt);
        }
        break;

      case "wikipedia":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} Tahu`);
        newReply(mess.wait);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/wiki?apikey=${apikey}&query=${full_args}`
        );
        newReply(data.result);
        break;

      case "translate":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} en Tahu Bacem`);
          newReply(mess.wait);
          var kode_negara = args[0];
          args.shift();
          var tittt = args.join(" ");
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=${apikey}&text=${tittt}`
          );
          init_txt = `From : ${data.result.from}\n`;
          init_txt += `To : ${data.result.to}\n`;
          init_txt += `Original : ${data.result.original}\n`;
          init_txt += `Translated : ${data.result.translated}\n`;
          init_txt += `Pronunciation : ${data.result.pronunciation}\n`;
          newReply(init_txt);
        }
        break;

      case "jadwaltv":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} RCTI`);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/jadwaltv/${args[0]}?apikey=${apikey}`
        );
        newReply(mess.wait);
        var titttt = `Jadwal TV ${args[0].toUpperCase()}\n`;
        for (var x in data.result) {
          titttt += `${x} - ${data.result[x]}\n`;
        }
        newReply(titttt);
        break;

      case "jadwaltvnow":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${apikey}`
        );
        newReply(mess.wait);
        var tittttt = `Jadwal TV Now :\n`;
        for (var x in data.result) {
          tittttt += `${x.toUpperCase()}${data.result[x]}\n\n`;
        }
        newReply(tittttt);
        break;

      case "newsinfo":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/newsinfo?apikey=${apikey}`
          );
          newReply(mess.wait);
          var titttttt = "Result :\n";
          for (var x of data.result) {
            titttttt += `Title : ${x.title}\n`;
            titttttt += `Author : ${x.author}\n`;
            titttttt += `Source : ${x.source.name}\n`;
            titttttt += `Url : ${x.url}\n`;
            titttttt += `Published : ${x.publishedAt}\n`;
            titttttt += `Description : ${x.description}\n\n`;
          }
          newReply(titttttt);
        }
        break;

      case "cnnindonesia":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/cnnindonesia?apikey=${apikey}`
          );
          newReply(mess.wait);
          var tittttttt = "Result :\n";
          for (var x of data.result) {
            tittttttt += `Judul : ${x.judul}\n`;
            tittttttt += `Link : ${x.link}\n`;
            tittttttt += `Tipe : ${x.tipe}\n`;
            tittttttt += `Published : ${x.waktu}\n\n`;
          }
          newReply(tittttttt);
        }
        break;

      case "cnnnasional":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=${apikey}`
          );
          newReply(mess.wait);
          var titttttttt = "Result :\n";
          for (var x of data.result) {
            titttttttt += `Judul : ${x.judul}\n`;
            titttttttt += `Link : ${x.link}\n`;
            titttttttt += `Tipe : ${x.tipe}\n`;
            titttttttt += `Published : ${x.waktu}\n\n`;
          }
          newReply(titttttttt);
        }
        break;

      case "cnninternasional":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=${apikey}`
          );
          newReply(mess.wait);
          var tittttttttt = "Result :\n";
          for (var x of data.result) {
            tittttttttt += `Judul : ${x.judul}\n`;
            tittttttttt += `Link : ${x.link}\n`;
            tittttttttt += `Tipe : ${x.tipe}\n`;
            tittttttttt += `Published : ${x.waktu}\n\n`;
          }
          newReply(tittttttttt);
        }
        break;

      case "infogempa":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/infogempa?apikey=${apikey}`
        );
        newReply(mess.wait);
        var caption = `Lokasi : ${data.result.lokasi}\n`;
        caption += `Waktu : ${data.result.waktu}\n`;
        caption += `Potensi : ${data.result.potensi}\n`;
        caption += `Magnitude : ${data.result.magnitude}\n`;
        caption += `Kedalaman : ${data.result.kedalaman}\n`;
        caption += `Koordinat : ${data.result.koordinat}`;
        conn.sendMessage(m.chat, { image: { url: data.result.map }, caption });
        break;

      case "lirik":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 3;
        newReply(`🚩 3 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} Melukis Senja`);
        newReply(mess.wait);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/lirik?apikey=${apikey}&query=${full_args}`
        );
        newReply(data.result);
        break;

      case "infocuaca":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} Yogyakarta`);
          newReply(mess.wait);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/cuaca/${args[0]}?apikey=${apikey}`
          );
          var titttttttttt = `Tempat : ${data.result.tempat}\n`;
          titttttttttt += `Cuaca : ${data.result.cuaca}\n`;
          titttttttttt += `Angin : ${data.result.angin}\n`;
          titttttttttt += `Description : ${data.result.description}\n`;
          titttttttttt += `Kelembapan : ${data.result.kelembapan}\n`;
          titttttttttt += `Suhu : ${data.result.suhu}\n`;
          titttttttttt += `Udara : ${data.result.udara}\n`;
          titttttttttt += `Permukaan laut : ${data.result.permukaan_laut}\n`;
          conn.sendMessage(m.chat, {
            location: {
              degreesLatitude: data.result.latitude,
              degreesLongitude: data.result.longitude,
            },
          });
          newReply(titttttttttt);
        }
        break;

      case "kodepos":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 2;
        newReply(`🚩 2 Limit Used`);
        if (args.length == 0)
          return newReply(
            `Example: ${prefix + command} Slemanan or ${prefix + command} 66154`
          );
        newReply(mess.wait);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/kodepos?apikey=${apikey}&query=${full_args}`
        );
        var tittttttttttt = `Provinsi : ${data.result[0].province}\n`;
        tittttttttttt += `Kabupaten : ${data.result[0].city}\n`;
        tittttttttttt += `Kecamatan : ${data.result[0].subdistrict}\n`;
        tittttttttttt += `Kelurahan : ${data.result[0].urban}\n`;
        tittttttttttt += `Kode Pos : ${data.result[0].postalcode}`;
        newReply(tittttttttttt);
        break;

      case "jadwalbola":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 7;
        newReply(`🚩 7 Limit Used`);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/jadwalbola?apikey=${apikey}`
        );
        newReply(mess.wait);
        var titttttttttttt = "Jadwal Bola :\n";
        for (var x of data.result) {
          titttttttttttt += `Pada : ${x.time}\n`;
          titttttttttttt += `Event : ${x.event}\n`;
          titttttttttttt += `Match : ${x.match}\n`;
          titttttttttttt += `TV : ${x.tv}\n\n`;
        }
        newReply(titttttttttttt);
        break;

      // ANIME FITUR
      case "genshin":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 15;
        newReply(`🚩 15 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} jean`);
        newReply(mess.wait);
        var { data } = await axios.get(
          `https://api.lolhuman.xyz/api/genshin/${full_args}?apikey=${apikey}`
        );
        var caption = `Name : ${data.result.title}\n`;
        caption += `Intro : ${data.result.intro}\n`;
        caption += `Icon : ${data.result.icon}\n`;
        await conn.sendMessage(m.chat, {
          image: { url: data.result.cover1 },
          caption,
        });
        await conn.sendMessage(m.chat, {
          audio: { url: data.result.cv[0].audio[0] },
          mimetype: "audio/mp4",
        });
        break;

      // CONVERT FITUR

      case "qc":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 7;
          newReply(`🚩 7 Limit Used`);
          const { quote } = require("./lib/quote.js");
          if (!q) return "Masukan Text";
          let ppnyauser = await await conn
            .profilePictureUrl(m.sender, "image")
            .catch((_) => "https://telegra.ph/file/6880771a42bad09dd6087.jpg");
          const rest = await quote(q, pushname, ppnyauser);
          newReply(mess.wait);
          conn.sendImageAsSticker(m.chat, rest.result, m, {
            packname: `${global.packname}`,
            author: `${global.author}`,
          });
        }
        break;

      case "sticker":
      case "stiker":
      case "s":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          if (!quoted)
            return newReply(
              `Balas Video/Image Dengan Caption ${prefix + command}`
            );
          newReply(mess.wait);
          if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
              packname: pushname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return newReply("Maksimal 10 detik!");
            let media = await quoted.download();
            let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {
              packname: pushname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else {
            return newReply(
              `Kirim Gambar/Video Dengan Caption ${
                prefix + command
              }\nDurasi Video 1-9 Detik`
            );
          }
        }
        break;

      case "smeme":
        {
          let respond = `Kirim/reply image/sticker dengan caption ${
            prefix + command
          } text1|text2`;
          if (!/image/.test(mime)) return newReply(respond);
          if (!text) return newReply(respond);
          newReply(mess.wait);
          atas = text.split("|")[0] ? text.split("|")[0] : "-";
          bawah = text.split("|")[1] ? text.split("|")[1] : "-";
          let dwnld = await conn.downloadAndSaveMediaMessage(qmsg);
          let fatGans = await TelegraPh(dwnld);
          let smeme = `https://api.lolhuman.xyz/api/memecreator?apikey=${apikey}&text1=${bawah}&text2=${atas}&img=${fatGans}`;
          conn.sendImageAsSticker(m.chat, smeme, m, {
            packname: global.packname,
            author: global.auhor,
          });
        }
        break;

      case "swm":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          let [teks1, teks2] = text.split`|`;
          if (!teks1)
            return newReply(
              `Kirim/reply image/video dengan caption ${
                prefix + command
              } teks1|teks2`
            );
          if (!teks2)
            return newReply(
              `Kirim/reply image/video dengan caption ${
                prefix + command
              } teks1|teks2`
            );
          newReply(mess.wait);
          if (/image/.test(mime)) {
            let media = await conn.downloadMediaMessage(qmsg);
            let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
              packname: teks1,
              author: teks2,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return newReply("Maksimal 10 detik!");
            let media = await conn.downloadMediaMessage(qmsg);
            let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {
              packname: teks1,
              author: teks2,
            });
            await fs.unlinkSync(encmedia);
          } else {
            return newReply(
              `Kirim Gambar/Video Dengan Caption ${
                prefix + command
              }\nDurasi Video 1-9 Detik`
            );
          }
        }
        break;

      case "emojimix":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 3 Limit Used`);
          let [emoji1, emoji2] = text.split`+`;
          if (!emoji1) return newReply(`Contoh : ${prefix + command} 😅+🤔`);
          if (!emoji2) return newReply(`Contoh : ${prefix + command} 😅+🤔`);
          newReply(mess.wait);
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              emoji1
            )}_${encodeURIComponent(emoji2)}`
          );
          for (let res of anu.results) {
            let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, {
              packname: global.packname,
              author: global.author,
              categories: res.tags,
            });
            await fs.unlinkSync(encmedia);
          }
        }
        break;

      case "emojimix2":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 3;
          newReply(`🚩 3 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 😅`);
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              text
            )}`
          );
          for (let res of anu.results) {
            let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, {
              packname: global.packname,
              author: global.author,
              categories: res.tags,
            });
            await fs.unlinkSync(encmedia);
          }
        }
        break;

      case "attp":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        try {
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} AdrianTzy`);
          await conn.sendMessage(
            m.chat,
            {
              sticker: {
                url: `https://api.lolhuman.xyz/api/attp?apikey=${apikey}&text=${full_args}`,
              },
            },
            { quoted: m }
          );
        } catch (e) {
          newReply(mess.error);
        }
        break;
      case "attp2":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        try {
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} AdrianTzy`);
          await conn.sendMessage(
            m.chat,
            {
              sticker: {
                url: `https://api.lolhuman.xyz/api/attp2?apikey=${apikey}&text=${full_args}`,
              },
            },
            { quoted: m }
          );
        } catch (e) {
          newReply(mess.error);
        }
        break;
      case "ttp":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        try {
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} AdrianTzy`);
          await conn.sendMessage(
            m.chat,
            {
              sticker: {
                url: `https://api.lolhuman.xyz/api/ttp?apikey=${apikey}&text=${full_args}`,
              },
            },
            { quoted: m }
          );
        } catch (e) {
          newReply(mess.error);
        }
        break;

      case "toimage":
      case "toimg":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 2;
          newReply(`🚩 2 Limit Used`);
          if (!/webp/.test(mime))
            return newReply(
              `Reply sticker dengan caption *${prefix + command}*`
            );
          newReply(mess.wait);
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) return err;
            let buffer = fs.readFileSync(ran);
            conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tomp4":
      case "tovideo":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 2;
          newReply(`🚩 2 Limit Used`);
          if (!/webp/.test(mime))
            return newReply(
              `Reply stiker dengan caption *${prefix + command}*`
            );
          newReply(mess.wait);
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          let webpToMp4 = await webp2mp4File(media);
          await conn.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;

      case "toaud":
      case "toaudio":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 2;
          newReply(`🚩 2 Limit Used`);
          if (!/video/.test(mime) && !/audio/.test(mime))
            return newReply(
              `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
                prefix + command
              }`
            );
          newReply(mess.wait);
          let media = await conn.downloadMediaMessage(qmsg);
          let audio = await toAudio(media, "mp4");
          conn.sendMessage(
            m.chat,
            { audio: audio, mimetype: "audio/mpeg" },
            { quoted: m }
          );
        }
        break;

      case "tomp3":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 9;
          newReply(`🚩 9 Limit Used`);
          if (!/video/.test(mime) && !/audio/.test(mime))
            return newReply(
              `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
                prefix + command
              }`
            );
          newReply(mess.wait);
          let media = await conn.downloadMediaMessage(qmsg);
          let audio = await toAudio(media, "mp4");
          conn.sendMessage(
            m.chat,
            {
              document: audio,
              mimetype: "audio/mpeg",
              fileName: `Convert By AdrianTzy.mp3`,
            },
            { quoted: m }
          );
        }
        break;

      case "tovn":
      case "toptt":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 8;
          newReply(`🚩 8 Limit Used`);
          if (!/video/.test(mime) && !/audio/.test(mime))
            return newReply(
              `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
                prefix + command
              }`
            );
          newReply(mess.wait);
          let media = await conn.downloadMediaMessage(qmsg);
          let { toPTT } = require("./lib/converter");
          let audio = await toPTT(media, "mp4");
          conn.sendMessage(
            m.chat,
            { audio: audio, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;

      case "togif":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!/webp/.test(mime))
            return newReply(
              `Reply stiker dengan caption *${prefix + command}*`
            );
          newReply(mess.wait);
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          let webpToMp4 = await webp2mp4File(media);
          await conn.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
              gifPlayback: true,
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;

      case "tourl":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          newReply(mess.wait);
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          if (/image/.test(mime)) {
            let anu = await TelegraPh(media);
            newReply(util.format(anu));
          } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media);
            newReply(util.format(anu));
          }
          await fs.unlinkSync(media);
        }
        break;

      // Stalk Fitur
      case "igstalk":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} whyzzxy`);
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/stalkig/${args[0]}?apikey=${apikey}`
            )
            .then(({ data }) => {
              var caption = `Username : ${data.result.username}\n`;
              caption += `Full Name : ${data.result.fullname}\n`;
              caption += `Posts : ${data.result.posts}\n`;
              caption += `Followers : ${data.result.followers}\n`;
              caption += `Following : ${data.result.following}\n`;
              caption += `Bio : ${data.result.bio}`;
              conn.sendMessage(m.chat, {
                image: { url: data.result.photo_profile },
                caption,
              });
            });
        }
        break;

      case "ttstalk":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} dryan.pu`);
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/stalktiktok/${args[0]}?apikey=${apikey}`
            )
            .then(({ data }) => {
              var caption = `Username : ${data.result.username}\n`;
              caption += `Nickname : ${data.result.nickname}\n`;
              caption += `Followers : ${data.result.followers}\n`;
              caption += `Followings : ${data.result.followings}\n`;
              caption += `Likes : ${data.result.likes}\n`;
              caption += `Video : ${data.result.video}\n`;
              caption += `Bio : ${data.result.bio}\n`;
              conn.sendMessage(m.chat, {
                image: { url: data.result.user_picture },
                caption,
              });
            });
        }
        break;

      case "mlstalk":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} 84830127/2169`);
          newReply(mess.wait);
          var { data } = await axios.get(
            `https://api.lolhuman.xyz/api/mobilelegend/${args[0]}?apikey=${apikey}`
          );
          newReply(data.result);
        }
        break;

      case "ghstalk":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} AdrianTzy`);
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/github/${args[0]}?apikey=${apikey}`
            )
            .then(({ data }) => {
              var caption = `Name : ${data.result.name}\n`;
              caption += `Link : ${data.result.url}\n`;
              caption += `Public Repo : ${data.result.public_repos}\n`;
              caption += `Public Gists : ${data.result.public_gists}\n`;
              caption += `Followers : ${data.result.followers}\n`;
              caption += `Following : ${data.result.following}\n`;
              caption += `Bio : ${data.result.bio}`;
              conn.sendMessage(m.chat, {
                image: { url: data.result.avatar },
                caption,
              });
            });
        }
        break;

      case "twstalk":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          if (args.length == 0)
            return newReply(`Example: ${prefix + command} jokowi`);
          newReply(mess.wait);
          axios
            .get(
              `https://api.lolhuman.xyz/api/twitter/${args[0]}?apikey=${apikey}`
            )
            .then(({ data }) => {
              var caption = `Username : ${data.result.screen_name}\n`;
              caption += `Name : ${data.result.name}\n`;
              caption += `Tweet : ${data.result.tweet}\n`;
              caption += `Joined : ${data.result.joined}\n`;
              caption += `Followers : ${data.result.followers}\n`;
              caption += `Following : ${data.result.following}\n`;
              caption += `Like : ${data.result.like}\n`;
              caption += `Description : ${data.result.description}`;
              conn.sendMessage(m.chat, {
                image: { url: data.result.profile_picture },
                caption,
              });
            });
        }
        break;

      case "ktpmaker":
        if (!isPremium) newReply(mess.prem);
        if (args.length == 0)
          return newReply(
            `Usage: ${
              prefix + command
            } nik|provinsi|kabupaten|nama|tempat, tanggal lahir|jenis kelamin|jalan|rt/rw|kelurahan|kecamatan|agama|status nikah|pekerjaan|warga negara|berlaku sampai|url_image\n\nExample: ${
              prefix + command
            } 456127893132123|bumipertiwi|fatamorgana|LoL Human|mars, 99-99-9999|belum ditemukan|jl wardoyo|999/999|turese|imtuni|alhamdulillah islam|jomblo kack|mikirin dia|indo ori no kw|hari kiamat|https://i.ibb.co/Xb2pZ88/test.jpg`
          );
        newReply(mess.wait);
        get_args = args.join(" ").split("|");
        nik = get_args[0];
        prov = get_args[1];
        kabu = get_args[2];
        name = get_args[3];
        ttl = get_args[4];
        jk = get_args[5];
        jl = get_args[6];
        rtrw = get_args[7];
        lurah = get_args[8];
        camat = get_args[9];
        agama = get_args[10];
        nikah = get_args[11];
        kerja = get_args[12];
        warga = get_args[13];
        until = get_args[14];
        img = get_args[15];
        ini_buffer = await getBuffer(
          `http://api.lolhuman.xyz/api/ktpmaker?apikey=${apikey}&nik=${nik}&prov=${prov}&kabu=${kabu}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&warga=${warga}&until=${until}&img=${img}`
        );
        conn.sendMessage(
          m.chat,
          { image: { url: ini_buffer }, caption: `Done?` },
          { quoted: m }
        );
        break;

      case "darkjoke":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${apikey}`,
            },
            caption: `Done?`,
          },
          { quoted: m }
        );
        break;

      case "meme":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/random/meme?apikey=${apikey}`,
            },
            caption: `Done?`,
          },
          { quoted: m }
        );
        break;

      case "memeindo":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/meme/memeindo?apikey=${apikey}`,
            },
            caption: `Done?`,
          },
          { quoted: m }
        );
        break;

      // Ramdon Foto
      case "art":
      case "bts":
      case "exo":
      case "elf":
      case "loli":
      case "neko":
      case "waifu":
      case "shota":
      case "husbu":
      case "sagiri":
      case "shinobu":
      case "megumin":
      case "wallnime":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 12;
          newReply(`🚩 12 Limit Used`);
          if (!isPremium) return newReply(mess.prem);
          newReply(mess.wait);
          conn.sendMessage(m.chat, {
            image: {
              url: `http://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}`,
            },
            caption: `Random image for ${command}`,
          });
        }
        break;

      // Creator Image
      case "bucinsertifikat":
      case "sertifikatbucin":
      case "bucincert":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} Justimun Kentod`);
        newReply(mess.wait);
        kueri = args.join(" ");
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/bucinserti?apikey=${apikey}&name=${kueri}`,
            },
            caption: "Sertifikatnya kack",
          },
          { quoted: m }
        );
        break;

      case "tololsert":
      case "tololcert":
      case "tololsertifikat":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} Justimun Kentod`);
        newReply(mess.wait);
        ytta = args.join(" ");
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/toloserti?apikey=${apikey}&name=${ytta}`,
            },
            caption: "Sertifikatnya kack",
          },
          { quoted: m }
        );
        break;

      case "pacarsertifikat":
      case "pacarcert":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        if (args.length == 0)
          return newReply(`Usage: ${prefix + command} nama1|nama2`);
        newReply(mess.wait);
        get_args = args.join(" ").split("|");
        nik = get_args[0];
        prov = get_args[1];
        titidnya = `Selamat yaa ${nik} ❤️ ${prov}`;
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/pacarserti?apikey=${apikey}&name1=${nik}&name2=${prov}`,
            },
            caption: titidnya,
          },
          { quoted: m }
        );
        break;

      case "carbon":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 8;
        newReply(`🚩 8 Limit Used`);
        if (!q)
          return newReply(
            `Example: ${prefix + command} const adrian = require('adrian-api')`
          );
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/carbon?apikey=${apikey}&code=${q}&language=nodejs`,
            },
            caption: `Created By AdrianTzy\n\n\nCode:\n\n${q}`,
          },
          { quoted: m }
        );
        break;

      // Ephoto1
      case "wetglass":
      case "multicolor3d":
      case "watercolor":
      case "luxurygold":
      case "galaxywallpaper":
      case "lighttext":
      case "beautifulflower":
      case "puppycute":
      case "royaltext":
      case "heartshaped":
      case "birthdaycake":
      case "galaxystyle":
      case "hologram3d":
      case "greenneon":
      case "glossychrome":
      case "greenbush":
      case "metallogo":
      case "noeltext":
      case "glittergold":
      case "textcake":
      case "starsnight":
      case "wooden3d":
      case "textbyname":
      case "writegalacy":
      case "galaxybat":
      case "snow3d":
      case "birthdayday":
      case "goldplaybutton":
      case "silverplaybutton":
      case "freefire":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 15;
        newReply(`🚩 15 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} AdrianTzy `);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${apikey}&text=${args}`,
            },
            caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
          },
          { quoted: m }
        );
        break;

      case "shadow":
      case "cup":
      case "cup1":
      case "romance":
      case "smoke":
      case "burnpaper":
      case "lovemessage":
      case "undergrass":
      case "love":
      case "coffe":
      case "woodheart":
      case "woodenboard":
      case "summer3d":
      case "wolfmetal":
      case "nature3d":
      case "underwater":
      case "golderrose":
      case "summernature":
      case "letterleaves":
      case "glowingneon":
      case "fallleaves":
      case "flamming":
      case "harrypotter":
      case "carvedwood":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 12;
        newReply(`🚩 12 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} AdrianTzy`);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${apikey}&text=${args}`,
            },
            caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
          },
          { quoted: m }
        );
        break;

      // Text Prome
      case "pornhub":
      case "glitch":
      case "avenger":
      case "space":
      case "ninjalogo":
      case "marvelstudio":
      case "lionlogo":
      case "wolflogo":
      case "steel3d":
      case "wallgravity":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 15;
        newReply(`🚩 15 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} AdrianTzy`);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/textprome2/${command}?apikey=${apikey}&text1=${args[0]}&text2=${args[1]}`,
            },
            caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
          },
          { quoted: m }
        );
        break;

      case "blackpink":
      case "neon":
      case "greenneon":
      case "advanceglow":
      case "futureneon":
      case "sandwriting":
      case "sandsummer":
      case "sandengraved":
      case "metaldark":
      case "neonlight":
      case "holographic":
      case "text1917":
      case "minion":
      case "deluxesilver":
      case "newyearcard":
      case "bloodfrosted":
      case "halloween":
      case "jokerlogo":
      case "fireworksparkle":
      case "natureleaves":
      case "bokeh":
      case "toxic":
      case "strawberry":
      case "box3d":
      case "roadwarning":
      case "breakwall":
      case "icecold":
      case "luxury":
      case "cloud":
      case "summersand":
      case "horrorblood":
      case "thunder":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 12;
        newReply(`🚩 12 Limit Used`);
        if (args.length == 0)
          return newReply(`Example: ${prefix + command} AdrianTzy`);
        newReply(mess.wait);
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${apikey}&text=${args}`,
            },
            caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
          },
          { quoted: m }
        );
        break;

      case "akira":
      case "akiyama":
      case "ana":
      case "asuna":
      case "ayuzawa":
      case "boruto":
      case "chitoge":
      case "deidara":
      case "doraemon":
      case "elaina":
      case "emilia":
      case "erza":
      case "gremory":
      case "hestia":
      case "hinata":
      case "inori":
      case "isuzu":
      case "itachi":
      case "itori":
      case "kaga":
      case "kagura":
      case "kakasih":
      case "kaori":
      case "keneki":
      case "kotori":
      case "kurumi":
      case "loli":
      case "madara":
      case "mikasa":
      case "miku":
      case "minato":
      case "naruto":
      case "nezuko":
      case "onepiece":
      case "pokemon":
      case "rize":
      case "sagiri":
      case "sakura":
      case "sasuke":
      case "shina":
      case "shinka":
      case "shizuka":
      case "shota":
      case "toukachan":
      case "tsunade":
      case "yuki":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          newReply(mess.wait);
          let anu = await fetchJson(
            `https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Random%20Anime/${command}.json`
          );
          result = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(
            m.chat,
            { image: { url: result }, caption: mess.done },
            { quoted: m }
          );
        }
        break;
      case "aesthetic":
      case "anjing":
      case "blankpink":
      case "boneka":
      case "darkjokes":
      case "hekel":
      case "justina":
      case "kpop":
      case "kucing":
      case "mobil":
      case "motor":
      case "pubg":
      case "rose":
      case "ryujin":
      case "wallhp":
        {
          newReply(mess.wait);
          let anu = await fetchJson(
            `https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Random%20Image/${command}.json`
          );
          result = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(
            m.chat,
            { image: { url: result }, caption: mess.done },
            { quoted: m }
          );
        }
        break;
      case "cyberspace":
      case "mountain":
      case "programming":
      case "technology":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          newReply(mess.wait);
          let anu = await fetchJson(
            `https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Wallpaper/${command}.json`
          );
          result = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(
            m.chat,
            { image: { url: result }, caption: mess.done },
            { quoted: m }
          );
        }
        break;
      case "cecan":
      case "china":
      case "cogan":
      case "indonesia":
      case "japan":
      case "korea":
      case "malaysia":
      case "thailand":
      case "vietnam":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          newReply(mess.wait);
          let anu = await fetchJson(
            `https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Cecan/${command}.json`
          );
          result = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(
            m.chat,
            { image: { url: result }, caption: mess.done },
            { quoted: m }
          );
        }
        break;
      case "couple":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 10;
          newReply(`🚩 10 Limit Used`);
          let anu = await fetchJson(
            "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
          );
          newReply(mess.wait);
          let random = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(
            m.chat,
            {
              image: {
                url: random.male,
              },
              caption: `Couple Male`,
            },
            {
              quoted: m,
            }
          );
          conn.sendMessage(
            m.chat,
            {
              image: {
                url: random.female,
              },
              caption: `Couple Female`,
            },
            {
              quoted: m,
            }
          );
        }
        break;

      case "tohd":
      case "remini":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 50;
          newReply(`🚩 50 Limit Used`);
          newReply(mess.wait);
          if (isMedia) {
            const media = await conn.downloadAndSaveMediaMessage(quoted);
            const anu = await TelegraPh(media);
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: `https://api.itsrose.site/image/unblur?url=${anu}&apikey=${rosekey}`,
                },
                caption: `Sukses membuat hd`,
              },
              { quoted: m }
            );
          } else {
            newReply("Reply gambar nya bang");
          }
        }
        break;

      case "jadianime":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 50;
          newReply(`🚩 50 Limit Used`);
          newReply(mess.wait);
          if (isMedia) {
            const media = await conn.downloadAndSaveMediaMessage(quoted);
            const anu = await TelegraPh(media);
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: `https://api.lolhuman.xyz/api/imagetoanime?apikey=${apikey}&img=${anu}`,
                },
                caption: mess.done,
              },
              { quoted: m }
            );
          } else {
            newReply("Reply gambar nya bang");
          }
        }
        break;

      case "nomerhoki":
      case "nomorhoki":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!Number(text))
            return newReply(`Contoh : ${prefix + command} 6288292024190`);
          let anu = await primbon.nomer_hoki(Number(text));
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nomor HP :* ${anu.message.nomer_hp}\n• *Angka Shuzi :* ${anu.message.angka_shuzi}\n• *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n• *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`,
            m
          );
        }
        break;
      case "artimimpi":
      case "tafsirmimpi":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} belanja`);
          let anu = await primbon.tafsir_mimpi(text);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Mimpi :* ${anu.message.mimpi}\n• *Arti :* ${anu.message.arti}\n• *Solusi :* ${anu.message.solusi}`,
            m
          );
        }
        break;
      case "ramalanjodoh":
      case "ramaljodoh":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${
                prefix + command
              } Dika, 7, 7, 2005, Novia, 16, 11, 2004`
            );
          let [
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2,
          ] = text.split`,`;
          let anu = await primbon.ramalan_jodoh(
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2
          );
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama Anda :* ${anu.message.nama_anda.nama}\n• *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n• *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n• *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "ramalanjodohbali":
      case "ramaljodohbali":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${
                prefix + command
              } Dika, 7, 7, 2005, Novia, 16, 11, 2004`
            );
          let [
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2,
          ] = text.split`,`;
          let anu = await primbon.ramalan_jodoh_bali(
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2
          );
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama Anda :* ${anu.message.nama_anda.nama}\n• *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n• *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n• *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "suamiistri":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${
                prefix + command
              } Dika, 7, 7, 2005, Novia, 16, 11, 2004`
            );
          let [
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2,
          ] = text.split`,`;
          let anu = await primbon.suami_istri(
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2
          );
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama Suami :* ${anu.message.suami.nama}\n• *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n• *Nama Istri :* ${anu.message.istri.nama}\n• *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "ramalancinta":
      case "ramalcinta":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${
                prefix + command
              } Dika, 7, 7, 2005, Novia, 16, 11, 2004`
            );
          let [
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2,
          ] = text.split`,`;
          let anu = await primbon.ramalan_cinta(
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2
          );
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama Anda :* ${anu.message.nama_anda.nama}\n• *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n• *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n• *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n• *Sisi Positif :* ${anu.message.sisi_positif}\n• *Sisi Negatif :* ${anu.message.sisi_negatif}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "artinama":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} Dika Ardianta`);
          let anu = await primbon.arti_nama(text);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama :* ${anu.message.nama}\n• *Arti :* ${anu.message.arti}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "kecocokannama":
      case "cocoknama":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} Dika, 7, 7, 2005`);
          let [nama, tgl, bln, thn] = text.split`,`;
          let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Life Path :* ${anu.message.life_path}\n• *Destiny :* ${anu.message.destiny}\n• *Destiny Desire :* ${anu.message.destiny_desire}\n• *Personality :* ${anu.message.personality}\n• *Persentase :* ${anu.message.persentase_kecocokan}`,
            m
          );
        }
        break;
      case "kecocokanpasangan":
      case "cocokpasangan":
      case "pasangan":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} Dika|Novia`);
          let [nama1, nama2] = text.split`|`;
          let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2);
          if (anu.status == false) return newReply(anu.message);
          conn.sendImage(
            m.chat,
            anu.message.gambar,
            `• *Nama Anda :* ${anu.message.nama_anda}\n• *Nama Pasangan :* ${anu.message.nama_pasangan}\n• *Sisi Positif :* ${anu.message.sisi_positif}\n• *Sisi Negatif :* ${anu.message.sisi_negatif}`,
            m
          );
        }
        break;
      case "jadianpernikahan":
      case "jadiannikah":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} 6, 12, 2020`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Tanggal Pernikahan :* ${anu.message.tanggal}\n• *karakteristik :* ${anu.message.karakteristik}`,
            m
          );
        }
        break;
      case "sifatusaha":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!ext)
            return newReply(`Contoh : ${prefix + command} 28, 12, 2021`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Lahir :* ${anu.message.hari_lahir}\n• *Usaha :* ${anu.message.usaha}`,
            m
          );
        }
        break;
      case "rejeki":
      case "rezeki":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Lahir :* ${anu.message.hari_lahir}\n• *Rezeki :* ${anu.message.rejeki}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "pekerjaan":
      case "kerja":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Lahir :* ${anu.message.hari_lahir}\n• *Pekerjaan :* ${anu.message.pekerjaan}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "ramalannasib":
      case "ramalnasib":
      case "nasib":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.ramalan_nasib(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Analisa :* ${anu.message.analisa}\n• *Angka Akar :* ${anu.message.angka_akar}\n• *Sifat :* ${anu.message.sifat}\n• *Elemen :* ${anu.message.elemen}\n• *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`,
            m
          );
        }
        break;
      case "potensipenyakit":
      case "penyakit":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Analisa :* ${anu.message.analisa}\n• *Sektor :* ${anu.message.sektor}\n• *Elemen :* ${anu.message.elemen}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "artitarot":
      case "tarot":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.arti_kartu_tarot(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendImage(
            m.chat,
            anu.message.image,
            `• *Lahir :* ${anu.message.tgl_lahir}\n• *Simbol Tarot :* ${anu.message.simbol_tarot}\n• *Arti :* ${anu.message.arti}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "fengshui":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return `Contoh : ${prefix + command} Dika, 1, 2005\n\nNote : ${
              prefix + command
            } Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`;
          let [nama, gender, tahun] = text.split`,`;
          let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tahun_lahir}\n• *Gender :* ${anu.message.jenis_kelamin}\n• *Angka Kua :* ${anu.message.angka_kua}\n• *Kelompok :* ${anu.message.kelompok}\n• *Karakter :* ${anu.message.karakter}\n• *Sektor Baik :* ${anu.message.sektor_baik}\n• *Sektor Buruk :* ${anu.message.sektor_buruk}`,
            m
          );
        }
        break;
      case "haribaik":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.petung_hari_baik(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Lahir :* ${anu.message.tgl_lahir}\n• *Kala Tinantang :* ${anu.message.kala_tinantang}\n• *Info :* ${anu.message.info}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "harisangar":
      case "taliwangke":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Lahir :* ${anu.message.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Info :* ${anu.message.info}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "harinaas":
      case "harisial":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.primbon_hari_naas(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Hari Lahir :* ${anu.message.hari_lahir}\n• *Tanggal Lahir :* ${anu.message.tgl_lahir}\n• *Hari Naas :* ${anu.message.hari_naas}\n• *Info :* ${anu.message.catatan}\n• *Catatan :* ${anu.message.info}`,
            m
          );
        }
        break;
      case "nagahari":
      case "harinaga":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.rahasia_naga_hari(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Hari Lahir :* ${anu.message.hari_lahir}\n• *Tanggal Lahir :* ${anu.message.tgl_lahir}\n• *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "arahrejeki":
      case "arahrezeki":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Hari Lahir :* ${anu.message.hari_lahir}\n• *tanggal Lahir :* ${anu.message.tgl_lahir}\n• *Arah Rezeki :* ${anu.message.arah_rejeki}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "peruntungan":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${prefix + command} DIka, 7, 7, 2005, 2022\n\nNote : ${
                prefix + command
              } Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`
            );
          let [nama, tgl, bln, thn, untuk] = text.split`,`;
          let anu = await primbon.ramalan_peruntungan(
            nama,
            tgl,
            bln,
            thn,
            untuk
          );
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "weton":
      case "wetonjawa":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7, 7, 2005`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.weton_jawa(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Tanggal :* ${anu.message.tanggal}\n• *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n• *Watak Hari :* ${anu.message.watak_hari}\n• *Naga Hari :* ${anu.message.naga_hari}\n• *Jam Baik :* ${anu.message.jam_baik}\n• *Watak Kelahiran :* ${anu.message.watak_kelahiran}`,
            m
          );
        }
        break;
      case "sifat":
      case "karakter":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} Dika, 7, 7, 2005`);
          let [nama, tgl, bln, thn] = text.split`,`;
          let anu = await primbon.sifat_karakter_tanggal_lahir(
            nama,
            tgl,
            bln,
            thn
          );
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Garis Hidup :* ${anu.message.garis_hidup}`,
            m
          );
        }
        break;
      case "keberuntungan":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} Dika, 7, 7, 2005`);
          let [nama, tgl, bln, thn] = text.split`,`;
          let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Hasil :* ${anu.message.result}`,
            m
          );
        }
        break;
      case "memancing":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(`Contoh : ${prefix + command} 12, 1, 2022`);
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Tanggal :* ${anu.message.tgl_memancing}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "masasubur":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${
                prefix + command
              } hari pertama menstruasi, siklus`
            );
          let [tgl, bln, thn, siklus] = text.split`,`;
          let anu = await primbon.masa_subur(tgl, bln, thn, siklus);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "zodiak":
      case "zodiac":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text) return newReply(`Contoh : ${prefix + command} 7 7 2005`);
          let zodiak = [
            ["capricorn", new Date(1970, 0, 1)],
            ["aquarius", new Date(1970, 0, 20)],
            ["pisces", new Date(1970, 1, 19)],
            ["aries", new Date(1970, 2, 21)],
            ["taurus", new Date(1970, 3, 21)],
            ["gemini", new Date(1970, 4, 21)],
            ["cancer", new Date(1970, 5, 22)],
            ["leo", new Date(1970, 6, 23)],
            ["virgo", new Date(1970, 7, 23)],
            ["libra", new Date(1970, 8, 23)],
            ["scorpio", new Date(1970, 9, 23)],
            ["sagittarius", new Date(1970, 10, 22)],
            ["capricorn", new Date(1970, 11, 22)],
          ].reverse();

          function getZodiac(month, day) {
            let d = new Date(1970, month - 1, day);
            return zodiak.find(([_, _d]) => d >= _d)[0];
          }
          let date = new Date(text);
          if (date == "Invalid Date") return date;
          let d = new Date();
          let [tahun, bulan, tanggal] = [
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate(),
          ];
          let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

          let zodiac = await getZodiac(birth[1], birth[2]);

          let anu = await primbon.zodiak(zodiac);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(
            m.chat,
            `• *Zodiak :* ${anu.message.zodiak}\n• *Nomor :* ${anu.message.nomor_keberuntungan}\n• *Aroma :* ${anu.message.aroma_keberuntungan}\n• *Planet :* ${anu.message.planet_yang_mengitari}\n• *Bunga :* ${anu.message.bunga_keberuntungan}\n• *Warna :* ${anu.message.warna_keberuntungan}\n• *Batu :* ${anu.message.batu_keberuntungan}\n• *Elemen :* ${anu.message.elemen_keberuntungan}\n• *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n• *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "shio":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          if (!text)
            return newReply(
              `Contoh : ${
                prefix + command
              } tikus\n\nNote : For Detail https://primbon.com/shio.htm`
            );
          let anu = await primbon.shio(text);
          if (anu.status == false) return newReply(anu.message);
          conn.sendText(m.chat, `• *Hasil :* ${anu.message}`, m);
        }
        break;

      case "bass":
      case "blown":
      case "deep":
      case "earrape":
      case "fast":
      case "fat":
      case "nightcore":
      case "reverse":
      case "robot":
      case "slow":
      case "smooth":
      case "tupai":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return newReply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 5;
          newReply(`🚩 5 Limit Used`);
          try {
            let set;
            if (/bass/.test(command))
              set = "-af equalizer=f=54:width_type=o:width=2:g=20";
            if (/blown/.test(command)) set = "-af acrusher=.1:1:64:0:log";
            if (/deep/.test(command)) set = "-af atempo=4/4,asetrate=44500*2/3";
            if (/earrape/.test(command)) set = "-af volume=12";
            if (/fast/.test(command))
              set = '-filter:a "atempo=1.63,asetrate=44100"';
            if (/fat/.test(command))
              set = '-filter:a "atempo=1.6,asetrate=22100"';
            if (/nightcore/.test(command))
              set = "-filter:a atempo=1.06,asetrate=44100*1.25";
            if (/reverse/.test(command)) set = '-filter_complex "areverse"';
            if (/robot/.test(command))
              set =
                "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
            if (/slow/.test(command))
              set = '-filter:a "atempo=0.7,asetrate=44100"';
            if (/smooth/.test(command))
              set =
                "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
            if (/tupai/.test(command))
              set = '-filter:a "atempo=0.5,asetrate=65100"';
            if (/audio/.test(mime)) {
              newReply(mess.wait);
              let media = await conn.downloadAndSaveMediaMessage(qmsg);
              let ran = getRandom(".mp3");
              exec(
                `ffmpeg -i ${media} ${set} ${ran}`,
                (err, stderr, stdout) => {
                  fs.unlinkSync(media);
                  if (err) return newReply(err);
                  let buff = fs.readFileSync(ran);
                  conn.sendMessage(
                    m.chat,
                    { audio: buff, mimetype: "audio/mpeg" },
                    { quoted: m }
                  );
                  fs.unlinkSync(ran);
                }
              );
            } else
              newReply(
                `Balas audio yang ingin diubah dengan caption *${
                  prefix + command
                }*`
              );
          } catch (e) {
            newReply(e);
          }
        }
        break;

      /*
            case 'setcmd': {
                if (!m.quoted) return newReply('Reply Pesan!')
                if (!m.quoted.fileSha256) return newReply('SHA256 Hash Tidak Ditemukan ❎')
                if (!text) return newReply(`Untuk Command Apa?`)
                let hash = m.quoted.fileSha256.toString('base64')
                if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) return newReply('Anda Tidak Diizinkan Untuk Mengubah Perintah Stiker Ini ❎')
                global.db.data.sticker[hash] = {
                    text,
                    mentionedJid: m.mentionedJid,
                    creator: m.sender,
                    at: +new Date,
                    locked: false,
                }
                newReply(mess.done)
            }
            break
            case 'delcmd': {
                let hash = m.quoted.fileSha256.toString('base64')
                if (!hash) return newReply(`Tidak Ada Hash`)
                if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) return newReply('Anda Tidak Diizinkan Untuk Mengubah Perintah Stiker Ini ❎')
                delete global.db.data.sticker[hash]
                newReply(mess.done)
            }
            break
            case 'listcmd': {
                let teks = `*List Hash 🚀*
Info: *bold* hash is Locked 🔒

*Hash ☕ :*
${Object.entries(global.db.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}
`.trim()
                conn.sendText(m.chat, teks, m, {
                    mentions: Object.values(global.db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])
                })
            }
            break
            case 'lockcmd': {
                if (!isCreator) return newReply(mess.owner)
                if (!m.quoted) return newReply('Reply Pesan!')
                if (!m.quoted.fileSha256) return newReply('SHA256 Hash Missing')
                let hash = m.quoted.fileSha256.toString('base64')
                if (!(hash in global.db.data.sticker)) return newReply('Hash Not Found In Database')
                global.db.data.sticker[hash].locked = !/^un/i.test(command)
                newReply('Done!')
            }
            break
            case 'addmsg': {
                if (!m.quoted) return newReply('Reply Message Yang Ingin Disave Di Database')
                if (!text) return newReply(`Contoh : ${prefix + command} Nama File`)
                let msgs = global.db.data.database
                if (text.toLowerCase() in msgs) return newReply(`'${text}' Telah Terdaftar Di List Pesan`)
                msgs[text.toLowerCase()] = quoted.fakeObj
                newReply(`Berhasil Menambahkan Pesan Di List Pesan Sebagai '${text}'
    
Akses dengan ${prefix}getmsg ${text}

Lihat list Pesan Dengan ${prefix}listmsg`)
            }
            break
            case 'getmsg': {
                if (!text) return newReply(`Contoh : ${prefix + command} File Name\n\nLihat List Pesan Dengan ${prefix}listmsg`)
                let msgs = global.db.data.database
                if (!(text.toLowerCase() in msgs)) return newReply(`'${text}' Tidak Terdaftar Di List Pesan`)
                conn.copyNForward(m.chat, msgs[text.toLowerCase()], true)
            }
            break
            case 'listmsg': {
                let msgs = JSON.parse(fs.readFileSync('./src/database.json'))
                let seplit = Object.entries(global.db.data.database).map(([nama, isi]) => {
                    return {
                        nama,
                        ...isi
                    }
                })
                let teks = 'LIST DATABASE 📂\n\n'
                for (let i of seplit) {
                    teks += `📛 *Name :* ${i.nama}`
                    teks += `🚀 *Type :* ${getContentType(i.message).replace(/Message/i, '')}\n────────────────────────\n\n`
                }
                newReply(teks)
            }
            break
            case 'delmsg':
            case 'deletemsg': {
                let msgs = global.db.data.database
                if (!(text.toLowerCase() in msgs)) return newReply(`'${text}' tidak terdaftar didalam list pesan`)
                delete msgs[text.toLowerCase()]
                newReply(`Berhasil menghapus '${text}' dari list pesan`)
            }
            break
            */
      case "sound1":
      case "sound2":
      case "sound3":
      case "sound4":
      case "sound5":
      case "sound6":
      case "sound7":
      case "sound8":
      case "sound9":
      case "sound10":
      case "sound11":
      case "sound12":
      case "sound13":
      case "sound14":
      case "sound15":
      case "sound16":
      case "sound17":
      case "sound18":
      case "sound19":
      case "sound20":
      case "sound21":
      case "sound22":
      case "sound23":
      case "sound24":
      case "sound25":
      case "sound26":
      case "sound27":
      case "sound28":
      case "sound29":
      case "sound30":
      case "sound31":
      case "sound32":
      case "sound33":
      case "sound34":
      case "sound35":
      case "sound36":
      case "sound37":
      case "sound38":
      case "sound39":
      case "sound40":
      case "sound41":
      case "sound42":
      case "sound43":
      case "sound44":
      case "sound45":
      case "sound46":
      case "sound47":
      case "sound48":
      case "sound49":
      case "sound50":
      case "sound51":
      case "sound52":
      case "sound53":
      case "sound54":
      case "sound55":
      case "sound56":
      case "sound57":
      case "sound58":
      case "sound59":
      case "sound60":
      case "sound61":
      case "sound62":
      case "sound63":
      case "sound64":
      case "sound65":
      case "sound66":
      case "sound67":
      case "sound68":
      case "sound69":
      case "sound70":
      case "sound71":
      case "sound72":
      case "sound73":
      case "sound74":
      case "sound75":
      case "sound76":
      case "sound77":
      case "sound78":
      case "sound79":
      case "sound80":
      case "sound81":
      case "sound82":
      case "sound83":
      case "sound84":
      case "sound85":
      case "sound86":
      case "sound87":
      case "sound88":
      case "sound89":
      case "sound90":
      case "sound91":
      case "sound92":
      case "sound93":
      case "sound94":
      case "sound95":
      case "sound96":
      case "sound97":
      case "sound98":
      case "sound99":
      case "sound100":
      case "sound101":
      case "sound102":
      case "sound103":
      case "sound104":
      case "sound105":
      case "sound106":
      case "sound107":
      case "sound108":
      case "sound109":
      case "sound110":
      case "sound111":
      case "sound112":
      case "sound113":
      case "sound114":
      case "sound115":
      case "sound116":
      case "sound117":
      case "sound118":
      case "sound119":
      case "sound120":
      case "sound121":
      case "sound122":
      case "sound123":
      case "sound124":
      case "sound125":
      case "sound126":
      case "sound127":
      case "sound128":
      case "sound129":
      case "sound130":
      case "sound131":
      case "sound132":
      case "sound133":
      case "sound134":
      case "sound135":
      case "sound136":
      case "sound137":
      case "sound138":
      case "sound139":
      case "sound140":
      case "sound141":
      case "sound142":
      case "sound143":
      case "sound144":
      case "sound145":
      case "sound146":
      case "sound147":
      case "sound148":
      case "sound149":
      case "sound150":
      case "sound151":
      case "sound152":
      case "sound153":
      case "sound154":
      case "sound155":
      case "sound156":
      case "sound157":
      case "sound158":
      case "sound159":
      case "sound160":
      case "sound161":
        if (!isPremium && global.db.data.users[m.sender].limit < 1)
          return newReply(mess.endLimit); // respon ketika limit habis
        db.data.users[m.sender].limit -= 5;
        newReply(`🚩 5 Limit Used`);
        arxzy = await getBuffer(
          `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`
        );
        await conn.sendMessage(
          m.chat,
          { audio: arxzy, mimetype: "audio/mp4", ptt: true },
          { quoted: m }
        );
        break;

        case "say": {
        if(!text) return newReply(`Example: ${prefix}say *<text>*`)
          m.reply(text)
        }
        break;
      //────────────────────[ MAIN MENU ]────────────────────
      case "menu":
      case "allmenu":
        {
          let dnew = new Date(new Date() + 3600000);
          let date = dnew.toLocaleDateString("id", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          let week = dnew.toLocaleDateString("id", {
            weekday: "long",
          });
          let dateIslamic = Intl.DateTimeFormat("id" + "-TN-u-ca-islamic", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(dnew);
          let menunya = `Hello, ${pushname}

Saya adalah ${namabot} sebuah robot whatsapp yang bisa membantu anda untuk memecahkan permasalahan anda, kami menjaga keamanan data anda dan tidak menggunakan data anda, sehingga bot whatsapp ini aman untuk digunakan.
 
乂 *B O T  I N F O*
    ☍ *Creator:* ${namaowner} 
    ☍ *Mode:* ${conn.public ? "Public-Mode 👥" : "Self-Mode 👤"}
    ☍ *Bailyes:* github:razn-id/Baileys-Library
    ☍ *Runtime:* ${runtime(process.uptime())}
    ☍ *Total User:* ${Object.keys(global.db.data.users).length}
    ☍ *Total Fitur:* ${totalFitur()}
  
乂 *T I M E  I N F O*
    ☍ *Jam*: ${wib}
    ☍ *Masehi:* ${week}, ${date}
    ☍ *Hijriah:* ${dateIslamic}

乂 *U S E R  I N F O*
    ☍ *Name:* ${pushname}
    ☍ *Number:* ${m.sender.split("@")[0]}
    ☍ *Status:* ${isCreator ? "Owner" : "User"}
    ☍ *User:* ${isPremium ? "Premium" : "Gratisan"}
    ☍ *Limit:* ${isCreator ? "Unlimited" : `${db.data.users[m.sender].limit}`}

${readmore}
乂 *O W N E R  M E N U*
◇ ‣ ${prefix}enc *<text>*
◇ ‣ ${prefix}pushkontak *<text>*
◇ ‣ ${prefix}autoread *<on/off>*
◇ ‣ ${prefix}cekapikey *<apikey>*
◇ ‣ ${prefix}autobio *<on/off>*
◇ ‣ ${prefix}bcgc *<text>*
◇ ‣ ${prefix}bc *<text>*
◇ ‣ ${prefix}lockcmd *<text>*
◇ ‣ ${prefix}addprem *<@user>*
◇ ‣ ${prefix}delprem *<@user>*
◇ ‣ ${prefix}addvn *<sound>*
◇ ‣ ${prefix}delvn *<sound>*
◇ ‣ ${prefix}join *<link>*
◇ ‣ ${prefix}leave *only group*
◇ ‣ ${prefix}setexif *<package | author>*
◇ ‣ ${prefix}setppbot *<reply | caption>*
◇ ‣ ${prefix}setppbot full *<reply | caption>*
◇ ‣ ${prefix}setnamabot *<text>*
◇ ‣ ${prefix}setbiobot *<text>*
◇ ‣ ${prefix}block *<@user>*
◇ ‣ ${prefix}unblock *<@user>*
◇ ‣ ${prefix}ambilsesi
◇ ‣ ${prefix}ambilcase
◇ ‣ ${prefix}listpc
◇ ‣ ${prefix}listgc
◇ ‣ ${prefix}public
◇ ‣ ${prefix}self
◇ ‣ ${prefix}myip
◇ ‣ ${prefix}chat 
◇ ‣ ${prefix}shutdown
◇ ‣  >
◇ ‣  =>

乂 *C O N V E R T  M E N U*
◇ ‣ ${prefix}stiker *<image>*
◇ ‣ ${prefix}swm *<image>*
◇ ‣ ${prefix}smeme *<image>*
◇ ‣ ${prefix}emojimix *<😫>*
◇ ‣ ${prefix}emojimix2 *<😫+🥶>*
◇ ‣ ${prefix}toimage *<reply sticker>*
◇ ‣ ${prefix}tomp4 *<reply sticker>*
◇ ‣ ${prefix}toaudio *<video>*
◇ ‣ ${prefix}tomp3 *<video>*
◇ ‣ ${prefix}tovn *<video>*
◇ ‣ ${prefix}togif *<image>*
◇ ‣ ${prefix}tourl *<media>*

乂 *S T A L K E R  M E N U*
◇ ‣ ${prefix}igstalk *<username>*
◇ ‣ ${prefix}ttstalk *<username>*
◇ ‣ ${prefix}mlstalk *<username>*
◇ ‣ ${prefix}ghstalk *<username>*
◇ ‣ ${prefix}twstalk *<username>*

乂 *G R O U P  M E N U*
◇ ‣ ${prefix}kick *<@user>*
◇ ‣ ${prefix}add *<@user>*
◇ ‣ ${prefix}culik *<@user>*
◇ ‣ ${prefix}promote *<@user>*
◇ ‣ ${prefix}demote *<@user>*
◇ ‣ ${prefix}setname *<text>*
◇ ‣ ${prefix}setdesc *<text>*
◇ ‣ ${prefix}setppgc *<reply | caption>*
◇ ‣ ${prefix}tagall *<text>*
◇ ‣ ${prefix}hidetag *<text>*
◇ ‣ ${prefix}totag *<text>*
◇ ‣ ${prefix}antilink *<on/off>*
◇ ‣ ${prefix}antilinkv2 *<on/off>*
◇ ‣ ${prefix}antilinkyt *<on/off>*
◇ ‣ ${prefix}antilinktt *<on/off>*
◇ ‣ ${prefix}group *<close/open>*
◇ ‣ ${prefix}editinfo *<text>*
◇ ‣ ${prefix}mutegc
◇ ‣ ${prefix}ephemeral
◇ ‣ ${prefix}linkgc 
◇ ‣ ${prefix}revoke
◇ ‣ ${prefix}liston

乂 *F U N   M E N U*
◇ ‣ ${prefix}apakah *<text>*
◇ ‣ ${prefix}bisakah *<text>*
◇ ‣ ${prefix}bagaimanakah *<text>*
◇ ‣ ${prefix}rate *<text>*
◇ ‣ ${prefix}gantengcek *<text>*
◇ ‣ ${prefix}cekganteng *<text>*
◇ ‣ ${prefix}cantikcek *<text>*
◇ ‣ ${prefix}cekcantik *<text>*
◇ ‣ ${prefix}sangecek *<text>*
◇ ‣ ${prefix}ceksange *<text>*
◇ ‣ ${prefix}gaycek *<text>*
◇ ‣ ${prefix}cekgay *<text>*
◇ ‣ ${prefix}lesbicek *<text>*
◇ ‣ ${prefix}ceklesbi *<text>*
◇ ‣ ${prefix}kapankah *<text>*
◇ ‣ ${prefix}wangy *<text>*
◇ ‣ ${prefix}cekmati *<text>*
◇ ‣ ${prefix}halah *<text>*
◇ ‣ ${prefix}hilih *<text>*
◇ ‣ ${prefix}huluh *<text>*
◇ ‣ ${prefix}heleh *<text>*
◇ ‣ ${prefix}holoh *<text>*
   
乂 *M A I N  M E N U*
◇ ‣ ${prefix}owner
◇ ‣ ${prefix}ping
◇ ‣ ${prefix}speedtest
◇ ‣ ${prefix}menu
◇ ‣ ${prefix}script
◇ ‣ ${prefix}tqto
◇ ‣ ${prefix}runtime
◇ ‣ ${prefix}ceklimit
◇ ‣ ${prefix}buyprem
◇ ‣ ${prefix}totalfitur

乂 *P R I M B O N  M E N U*
◇ ‣ ${prefix}nomorhoki *<number>*
◇ ‣ ${prefix}artimimpi *<text>*
◇ ‣ ${prefix}artinama *<text>*
◇ ‣ ${prefix}ramaljodoh *<text>*
◇ ‣ ${prefix}ramaljodohbali *<text>*
◇ ‣ ${prefix}suamiistri *<text>*
◇ ‣ ${prefix}ramalcinta *<text>*
◇ ‣ ${prefix}cocoknama *<text>*
◇ ‣ ${prefix}pasangan *<text>*
◇ ‣ ${prefix}jadiannikah *<text>*
◇ ‣ ${prefix}sifatusaha *<text>*
◇ ‣ ${prefix}rezeki *<text>*
◇ ‣ ${prefix}pekerjaan *<text>*
◇ ‣ ${prefix}nasib *<text>*
◇ ‣ ${prefix}penyakit *<text>*
◇ ‣ ${prefix}tarot *<text>*
◇ ‣ ${prefix}fengshui *<text>*
◇ ‣ ${prefix}haribaik *<text>*
◇ ‣ ${prefix}harisangar *<text>*
◇ ‣ ${prefix}harisial *<text>*
◇ ‣ ${prefix}nagahari *<text>*
◇ ‣ ${prefix}arahrezeki *<text>*
◇ ‣ ${prefix}peruntungan *<text>*
◇ ‣ ${prefix}weton *<text>*
◇ ‣ ${prefix}karakter *<text>*
◇ ‣ ${prefix}keberuntungan *<text>*
◇ ‣ ${prefix}memancing *<text>*
◇ ‣ ${prefix}masasubur *<text>*
◇ ‣ ${prefix}zodiak *<birthday day>*
◇ ‣ ${prefix}shio
   
乂 *D A T A  M E N U*
◇ ‣ ${prefix}setcmd [reply sticker/pesan]
◇ ‣ ${prefix}listcmd
◇ ‣ ${prefix}delcmd [reply sticker/pesan]
◇ ‣ ${prefix}lockcmd
◇ ‣ ${prefix}addmsg
◇ ‣ ${prefix}listmsg
◇ ‣ ${prefix}getmsg
◇ ‣ ${prefix}delmsg

乂 *R A M D O N  M E N U*
◇ ‣ ${prefix}pokemon
◇ ‣ ${prefix}rize
◇ ‣ ${prefix}sagiri
◇ ‣ ${prefix}aesthetic
◇ ‣ ${prefix}anjing
◇ ‣ ${prefix}blankpink
◇ ‣ ${prefix}boneka
◇ ‣ ${prefix}hekel
◇ ‣ ${prefix}justina
◇ ‣ ${prefix}kpop
◇ ‣ ${prefix}kucing
◇ ‣ ${prefix}mobil
◇ ‣ ${prefix}motor
◇ ‣ ${prefix}pubg
◇ ‣ ${prefix}rose
◇ ‣ ${prefix}ryujin
◇ ‣ ${prefix}wallhp
◇ ‣ ${prefix}cyberspace
◇ ‣ ${prefix}mountain
◇ ‣ ${prefix}programming
◇ ‣ ${prefix}technology 
◇ ‣ ${prefix}couple

乂 *A S U P A N  M E N U*
◇ ‣ ${prefix}cecan
◇ ‣ ${prefix}china
◇ ‣ ${prefix}cogan
◇ ‣ ${prefix}indonesia
◇ ‣ ${prefix}japan
◇ ‣ ${prefix}korea
◇ ‣ ${prefix}malaysia
◇ ‣ ${prefix}thailand
◇ ‣ ${prefix}vietnam

乂 *T O O L S  M E N U*
◇ ‣ ${prefix}bass *<audio>*
◇ ‣ ${prefix}blown *<audio>*
◇ ‣ ${prefix}deep *<audio>*
◇ ‣ ${prefix}earrape *<audio>*
◇ ‣ ${prefix}fast *<audio>*
◇ ‣ ${prefix}fat *<audio>*
◇ ‣ ${prefix}nightcore *<audio>*
◇ ‣ ${prefix}reverse *<audio>*
◇ ‣ ${prefix}robot *<audio>*
◇ ‣ ${prefix}slow *<audio>*
◇ ‣ ${prefix}tupai *<audio>*
◇ ‣ ${prefix}delete *<text>*
◇ ‣ ${prefix}quoted *<text>*
◇ ‣ ${prefix}ebinary
◇ ‣ ${prefix}dbinary

乂 *C R E A T O R  I M A G E*
◇ ‣ ${prefix}tololsertifikat *<name>*
◇ ‣ ${prefix}bucinsertifikat *<name>*
◇ ‣ ${prefix}pacarsertifikat *<name>*
◇ ‣ ${prefix}ttp *<text>*
◇ ‣ ${prefix}attp *<text>*
◇ ‣ ${prefix}attp2 *<text>*
◇ ‣ ${prefix}qc *<text>*

乂 *I S L A M  M E N U*
◇ ‣ ${prefix}asmaulhusna
◇ ‣ ${prefix}alquranaudio
◇ ‣ ${prefix}alquran
◇ ‣ ${prefix}jadwalsolat
◇ ‣ ${prefix}kisahnabi
◇ ‣ ${prefix}listsurah
◇ ‣ ${prefix}iqro
◇ ‣ ${prefix}juzamma
◇ ‣ ${prefix}hadist
◇ ‣ ${prefix}tasfirsurah

乂 *D O W N  M E N U*
◇ ‣ ${prefix}ytplay *<name>*
◇ ‣ ${prefix}ytmp3 *<link>*
◇ ‣ ${prefix}ytmp4 *<link>*
◇ ‣ ${prefix}tiktok *<link>*
◇ ‣ ${prefix}tiktokaudio *<link>*
◇ ‣ ${prefix}igdl *<link>*
◇ ‣ ${prefix}igdl2 *<link>*
◇ ‣ ${prefix}twtdl *<link>*
◇ ‣ ${prefix}fbdl *<link>*
◇ ‣ ${prefix}gitclone *<link>*

乂 *E P H O T O _1_*
◇ ‣ ${prefix}wetglass *<text>*
◇ ‣ ${prefix}multicolor3d *<text>*
◇ ‣ ${prefix}watercolor *<text>*
◇ ‣ ${prefix}luxurygold *<text>*
◇ ‣ ${prefix}galaxywallpaper *<text>*
◇ ‣ ${prefix}lighttext *<text>*
◇ ‣ ${prefix}beautifulflower *<text>*
◇ ‣ ${prefix}puppycute *<text>*
◇ ‣ ${prefix}royaltext *<text>*
◇ ‣ ${prefix}heartshaped *<text>*
◇ ‣ ${prefix}birthdaycake *<text>*
◇ ‣ ${prefix}galaxystyle *<text>*
◇ ‣ ${prefix}hologram3d *<text>*
◇ ‣ ${prefix}greenneon *<text>*
◇ ‣ ${prefix}glossychrome *<text>*
◇ ‣ ${prefix}greenbush *<text>*
◇ ‣ ${prefix}metallogo *<text>*
◇ ‣ ${prefix}noeltext *<text>*
◇ ‣ ${prefix}glittergold *<text>*
◇ ‣ ${prefix}textcake *<text>*
◇ ‣ ${prefix}starsnight *<text>*
◇ ‣ ${prefix}wooden3d *<text>*
◇ ‣ ${prefix}textbyname *<text>*
◇ ‣ ${prefix}writegalacy *<text>*
◇ ‣ ${prefix}galaxybat *<text>*
◇ ‣ ${prefix}snow3d *<text>*
◇ ‣ ${prefix}birthdayday *<text>*
◇ ‣ ${prefix}goldplaybutton *<text>*
◇ ‣ ${prefix}silverplaybutton *<text>*
◇ ‣ ${prefix}freefire *<text>*

乂 *P H O T O  O X Y _1_*
◇ ‣ ${prefix}shadow
◇ ‣ ${prefix}cup
◇ ‣ ${prefix}cup1
◇ ‣ ${prefix}romance
◇ ‣ ${prefix}smoke
◇ ‣ ${prefix}burnpaper
◇ ‣ ${prefix}lovemessage
◇ ‣ ${prefix}undergrass
◇ ‣ ${prefix}love
◇ ‣ ${prefix}coffe
◇ ‣ ${prefix}woodheart
◇ ‣ ${prefix}woodenboard
◇ ‣ ${prefix}summer3d
◇ ‣ ${prefix}wolfmetal
◇ ‣ ${prefix}nature3d
◇ ‣ ${prefix}underwater
◇ ‣ ${prefix}golderrose
◇ ‣ ${prefix}summernature
◇ ‣ ${prefix}letterleaves
◇ ‣ ${prefix}glowingneon
◇ ‣ ${prefix}fallleaves
◇ ‣ ${prefix}flamming
◇ ‣ ${prefix}harrypotter
◇ ‣ ${prefix}carvedwood

乂 *T E X T  P R O _1_*
◇ ‣ ${prefix}blackpink *<text>*
◇ ‣ ${prefix}neon *<text>*
◇ ‣ ${prefix}greenneon *<text>*
◇ ‣ ${prefix}advanceglow *<text>*
◇ ‣ ${prefix}futureneon *<text>*
◇ ‣ ${prefix}sandwriting *<text>*
◇ ‣ ${prefix}sandsummer *<text>*
◇ ‣ ${prefix}sandengraved *<text>*
◇ ‣ ${prefix}metaldark *<text>*
◇ ‣ ${prefix}neonlight *<text>*
◇ ‣ ${prefix}holographic *<text>*
◇ ‣ ${prefix}text1917 *<text>*
◇ ‣ ${prefix}minion *<text>*
◇ ‣ ${prefix}deluxesilver *<text>*
◇ ‣ ${prefix}newyearcard *<text>*
◇ ‣ ${prefix}bloodfrosted *<text>*
◇ ‣ ${prefix}halloween *<text>*
◇ ‣ ${prefix}jokerlogo *<text>*
◇ ‣ ${prefix}fireworksparkle *<text>*
◇ ‣ ${prefix}natureleaves *<text>*
◇ ‣ ${prefix}bokeh *<text>*
◇ ‣ ${prefix}toxic *<text>*
◇ ‣ ${prefix}strawberry *<text>*
◇ ‣ ${prefix}box3d *<text>*
◇ ‣ ${prefix}roadwarning *<text>*
◇ ‣ ${prefix}breakwall *<text>*
◇ ‣ ${prefix}icecold *<text>*
◇ ‣ ${prefix}luxury *<text>*
◇ ‣ ${prefix}cloud *<text>*
◇ ‣ ${prefix}summersand *<text>*
◇ ‣ ${prefix}horrorblood *<text>*
◇ ‣ ${prefix}thunder *<text>*

乂 *T E X T  P R O _2_*
◇ ‣ ${prefix}pornhub *<text>*
◇ ‣ ${prefix}glitch *<text>*
◇ ‣ ${prefix}avenger *<text>*
◇ ‣ ${prefix}space *<text>*
◇ ‣ ${prefix}ninjalogo *<text>*
◇ ‣ ${prefix}marvelstudio *<text>*
◇ ‣ ${prefix}lionlogo *<text>*
◇ ‣ ${prefix}wolflogo *<text>*
◇ ‣ ${prefix}steel3d *<text>*
◇ ‣ ${prefix}wallgravity *<text>*

乂 *I N F O R M A T I O N*
◇ ‣ ${prefix}kbbi *<text>*
◇ ‣ ${prefix}brainly *<text>*
◇ ‣ ${prefix}roboguru *<text>*
◇ ‣ ${prefix}wikipedia *<text>*
◇ ‣ ${prefix}translate *<text>*
◇ ‣ ${prefix}google *<text>*
◇ ‣ ${prefix}gimage *<text>*
◇ ‣ ${prefix}jarak *<city1|city2>*
◇ ‣ ${prefix}kodepos *<city>*
◇ ‣ ${prefix}infocuaca *<city>*
◇ ‣ ${prefix}lirik *<song>*
◇ ‣ ${prefix}jadwaltv
◇ ‣ ${prefix}jadwaltvnow
◇ ‣ ${prefix}jadwalbola
◇ ‣ ${prefix}newsinfo
◇ ‣ ${prefix}cnnindonesia
◇ ‣ ${prefix}cnnnasional
◇ ‣ ${prefix}cnninternasional
◇ ‣ ${prefix}infogempa
◇ ‣ ${prefix}infochat

乂 *A N I M E  M E N U*
◇ ‣ ${prefix}genshin
◇ ‣ ${prefix}akira
◇ ‣ ${prefix}akiyama
◇ ‣ ${prefix}ana
◇ ‣ ${prefix}asuna
◇ ‣ ${prefix}ayuzawa
◇ ‣ ${prefix}boruto
◇ ‣ ${prefix}chitoge
◇ ‣ ${prefix}deidara
◇ ‣ ${prefix}doraemon
◇ ‣ ${prefix}elaina
◇ ‣ ${prefix}emilia
◇ ‣ ${prefix}erza
◇ ‣ ${prefix}gremory
◇ ‣ ${prefix}hestia
◇ ‣ ${prefix}hinata
◇ ‣ ${prefix}inori
◇ ‣ ${prefix}isuzu
◇ ‣ ${prefix}itachi
◇ ‣ ${prefix}itori
◇ ‣ ${prefix}kaga
◇ ‣ ${prefix}kagura
◇ ‣ ${prefix}kakasih
◇ ‣ ${prefix}kaori
◇ ‣ ${prefix}keneki
◇ ‣ ${prefix}kotori
◇ ‣ ${prefix}kurumi
◇ ‣ ${prefix}loli
◇ ‣ ${prefix}madara
◇ ‣ ${prefix}mikasa
◇ ‣ ${prefix}miku
◇ ‣ ${prefix}minato
◇ ‣ ${prefix}naruto
◇ ‣ ${prefix}nezuko
◇ ‣ ${prefix}onepiece
◇ ‣ ${prefix}sakura
◇ ‣ ${prefix}sasuke
◇ ‣ ${prefix}shina
◇ ‣ ${prefix}shinka
◇ ‣ ${prefix}shizuka
◇ ‣ ${prefix}shota
◇ ‣ ${prefix}toukachan
◇ ‣ ${prefix}tsunade
◇ ‣ ${prefix}yuki


乂 *M E M E  M E N U*
◇ ‣ ${prefix}darkjoke
◇ ‣ ${prefix}ramdommeme
◇ ‣ ${prefix}memeindo`;
          conn.sendMessage(m.chat, {
            text: menunya,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: ucapanWaktu + " " + pushname,
                body: "" + namabot,
                thumbnailUrl: "" + imageurl,
                sourceUrl: "" + global.isLink,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          });
        }
        break;

      default:
        if (budy.startsWith("=>")) {
          if (!isCreator) return newReply(mess.owner);

          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return newReply(bang);
          }
          try {
            newReply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            newReply(String(e));
          }
        }

        if (budy.startsWith(">")) {
          if (!isCreator) return newReply(mess.owner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await newReply(evaled);
          } catch (err) {
            await newReply(String(err));
          }
        }

        if (budy.startsWith("$")) {
          if (!isCreator) return newReply(mess.owner);
          exec(budy.slice(2), (err, stdout) => {
            if (err) return newReply(err);
            if (stdout) return newReply(stdout);
          });
        }

        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          let msgs = global.db.data.database;
          if (!(budy.toLowerCase() in msgs)) return;
          conn.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
        }
    }
  } catch (err) {
    console.log("Eror Di Bagian razan.js " + util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
