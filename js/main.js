if ("serviceWorker" in navigator) {
	if (navigator.serviceWorker.controller) {
		console.log("[kumar blog] active service worker found, no need to register");
	} else {
		navigator.serviceWorker.register("kumar-sw.js", {
				scope: "/"
		}).then(function (reg) {
			console.log("[kumar blog] Service worker has been registered for scope: " + reg.scope);
		});
	}
}
