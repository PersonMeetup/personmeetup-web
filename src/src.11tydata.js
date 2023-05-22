// Credit to Peter deHaan for the draft code
// (https://github.com/pdehaan/11ty-drafts)

module.exports = {
	eleventyComputed: {
		permalink(data) {
			// If the page is in `draft:true` mode, don't write it to disk...
			if (data.draft) {
				return false;
			}
			// Return the original value (which could be `false`, or a custom value,
			// or default empty string).
			return data.permalink;
		},
		eleventyExcludeFromCollections(data) {
			// If the page is in `draft:true` mode, exclude it from any collections
			// since it shouldn't be visible anywhere.
			if (data.draft) {
				return true;
			}
			return data.eleventyExcludeFromCollections;
		},
	},
};
