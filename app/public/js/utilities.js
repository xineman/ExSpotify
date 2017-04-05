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
