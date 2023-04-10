// Remember to document your code!
const projects = document.querySelectorAll(".project-item");

projects.forEach((project) => {
	const link = JSON.parse(project.getAttribute("data-primary-link"));
	const embed = project.querySelector(".project-image");
	const name = project
		.querySelector(".project-details")
		.querySelector("a").innerHTML;

	if ("soundcloud" in link) {
		embed.insertAdjacentHTML(
			"afterbegin",
			`<iframe
			title="Play Track: ${name}"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://w.soundcloud.com/player/?url=${encodeURIComponent(
				link.soundcloud
			)}&color=%2378a659&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
    ></iframe>`
		);
		embed.querySelector("a").remove();
	} else if ("youtube" in link) {
		let yt = document.getElementById("yt");
		if (yt === null) {
			var style = document.createElement("link");
			style.href = "/css/lite-yt-embed.css";
			style.type = "text/css";
			style.rel = "stylesheet";
			document.head.appendChild(style);

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "/js/lite-yt-embed.js";
			script.id = "yt";
			document.head.appendChild(script);
		}
		const videoid = new RegExp("(?<=v=|.be/).*?(?=$|&)");
		const listid = new RegExp("(?<=list=).*?(?=$|&)");

		let playlist = "";
		if (listid.test(link.youtube)) {
			playlist = `&listType=playlist&list=${link.youtube.match(listid)}`;
		}

		embed.insertAdjacentHTML(
			"afterbegin",
			`<lite-youtube videoid="${link.youtube.match(
				videoid
			)}" style="background-image: url('https://i.ytimg.com/vi/${link.youtube.match(
				videoid
			)}/hqdefault.jpg');" params="modestbranding=1&fs=0&rel=0&disablekb=1${playlist}">
  			<button type="button" class="lty-playbtn">
      		<span class="lyt-visually-hidden">Play Video: ${name}</span>
    		</button>
			</lite-youtube>`
		);
		embed.querySelector("a").remove();
	}
});
