export const PROJECT_URL = "http://localhost:3000/";
export function getExtensionUrl() {
	return chrome.extension.getURL('public/index.html');
}

export function refreshToken(callback) {
	console.log("Going to refresh token");
	$.ajax({
		url: "/refresh_token",
		data: {
			refresh_token: getCookie("refresh_token")
		}
	}).done((data) => {
		console.log("Refreshed");
		callback();
	})
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
