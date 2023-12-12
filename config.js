const fs = require("fs");
const chalk = require("chalk");

// Api
global.APIs = {
  razan: "https://api.rivqi.my.id",
};

// Apikey
global.APIKeys = {
  "https://api.rivqi.my.id": "Your Key",
};

//—————「 Other Apikey 」—————//
global.apikey = "19ac618f93a08bd0f1a75122"; //https://api.lolhuman.xyz
global.razankey = "adminpunya"; //https://api.rivqi.my.id
global.rosekey = "-"; //https://api.itsrose.life

//—————「 Set Nama Bot & Own 」—————//
global.namabot = "R23Bot-MD";
global.namaowner = "Razan";

//—————「 Setting Owner 」—————//
global.owner = "6285736800927";
global.ownernomer = ["6285736800927"];
global.premium = ["6285736800927"];

//—————「 Set Wm 」—————//
global.packname = "";
global.author = "R23Botz - Md";
global.prefa = [".", "#", "$", "!", "?", "/", "~"];
global.sp = "•";

//—————「 Set Message 」—————//
global.mess = {
  done: "Done ✅",
  admin: "Feature Only for _*Admin Group*_",
  botAdmin:
    "Perintah Ini Hanya Bisa Digunakan Ketika Bot Menjadi Admin Group !",
  owner: "Feature Only for _*owner*_",
  prem: "Feature Only for _*premium*_, Please Contact Owner To Get Premium Access",
  group: "Feature Only for _*Group Chat*_",
  private: "Feature Only for _*Admin Group*_",
  wait: "Wait a Moment, for Process",
  endLimit: "Your imit has run out, Wait at 12 at night",
  error: "*!!!Feature Error!!!*",
};

//—————「 Set Limit 」—————//
global.limitawal = {
  premium: "Infinity",
  free: 50,
};

//—————「 Set Image 」—————//
global.imageurl = "https://telegra.ph/file/2bafb192a809ef80108f1.jpg";
global.isLink = `https://www.rivqi.my.id`;
global.thumb = fs.readFileSync("./media/thumb.jpg");

//—————「 Link 」—————//
global.linkig = "https://instagram/@rivqi.ajaa";
global.website = "https://www.rivqi.my.id";

//—————「 Batas Akhir 」—————//
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});

//Razan ラザン
