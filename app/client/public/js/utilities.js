export const PROJECT_URL = "http://localhost:3000/";
export const VK_AUDIO_URL = "https://vk.com/al_audio.php";
export function getExtensionUrl() {
	return chrome.extension.getURL('public/index.html');
}

export function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

export function refreshToken(callback, fail) {
	chrome.cookies.get({url: "http://localhost", name:"refresh_token"}, (cookie) => {
		if (cookie) {
			console.log("Going to refresh token");
			$.ajax({
				url: PROJECT_URL+"refresh_token",
				data: {
					refresh_token: cookie.value
				}
			}).done((data) => {
				console.log("Refreshed");
				callback();
			});
		} else {
			// fail();
		}
	});
}

export function hasMore(list) {
	if (list) {
		return list.next?true:false;
	}
	return false;
}

export function loginVk(cb) {
	var popup = window.open("localhost:3000/auth/vk", "","width=655,height=350,status=no,left=300,top=150");
	var checking = setInterval(() => {
		if (popup.closed) {
			console.log("just closed");
			clearInterval(checking);

			chrome.cookies.get({url: "http://localhost", name:"vk_access_token"}, (cookie) => cb(cookie.value));

			// cb(getCookie("vk_access_token"));
		}
	}, 1000);
}
