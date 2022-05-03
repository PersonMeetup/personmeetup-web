const axios = require("axios");
require("dotenv").config();

module.exports = async function getUser() {
  var hours = {
    total: 0,
    scout: 0,
    soldier: 0,
    pyro: 0,
    demoman: 0,
    heavyweapons: 0,
    engineer: 0,
    medice: 0,
    sniper: 0,
    spy: 0
  }

  try {
    // Get playtime for Team Fortress 2
    const overall = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=76561198121851448&include_played_free_games=true&format=json`);
    overall.data.response.games.forEach(game => {
      if (game.appid == 440) {
        hours.total = game.playtime_forever / 60;
      }
    });

    // Get playtime for individual classes
    const indiv = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=${process.env.STEAM_API_KEY}&steamid=76561198121851448&format=json`);
    indiv.data.playerstats.stats.forEach(stat => {
      if (stat.name.includes(".accum.iPlayTime")) {
        // Apply each classes playtime to the `hours` object
        console.log(stat)
      };
    });
  } catch (error) {
    console.error(error);
  };

  return hours
};