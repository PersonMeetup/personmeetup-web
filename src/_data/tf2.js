const eleventyFetch = require("@11ty/eleventy-fetch");
require("dotenv").config();

module.exports = async function getUser() {
  var hours = {
    total: 0,
    Scout: 0,
    Soldier: 0,
    Pyro: 0,
    Demoman: 0,
    Heavy: 0,
    Engineer: 0,
    Medic: 0,
    Sniper: 0,
    Spy: 0
  }

  try {
    // Get playtime for Team Fortress 2
    const overall = await eleventyFetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=76561198121851448&include_played_free_games=true&format=json`, {
      duration: '1d',
      type: 'json'
    });
    overall.response.games.forEach(game => {
      if (game.appid == 440) {
        hours.total = Math.round(game.playtime_forever / 60);
      }
    });

    // Get playtime for individual classes
    const indiv = await eleventyFetch(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=${process.env.STEAM_API_KEY}&steamid=76561198121851448&format=json`, {
      duration: '1d',
      type: 'json'
    });
    indiv.playerstats.stats.forEach(stat => {
      if (stat.name.includes(".accum.iPlayTime")) {
				/**
				Apply each classes playtime to the `hours` object

				The JSON this loop works with has the following format:
				{ name: 'Scout.accum.iPlayTime', value: 1124137 }
				Note also that `value` is playtime given in seconds.

				The loop below compares the `name` value of the current `stat` 
				object with the `hours` objects keys in similar notation.
				If the two are equal, the `mercFlag` variable is set with
				the equalizing `hours` object key.

				Going through the loop again, the raised flag is detected
				and sets the value of the key within the `hours` object
				with the `value` interger, converting it from seconds to
				hours.
				 */
				var mercFlag = null;

				for (const [key, value] of Object.entries(stat)) {
					if (!(mercFlag === null)) {
						hours[mercFlag] = Math.round(value / (60 ** 2));
						mercFlag = null;
					} else {
						for (const [merc, playtime] of Object.entries(hours)) {
							if (value === `${merc}.accum.iPlayTime`) {
								mercFlag = merc;
		};};};};};});
  } catch (error) {
    console.error(error);
  };

  return hours
};