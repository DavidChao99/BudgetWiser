function isAccountIDValid() {
	accountId = document.getElementById("Username").value;
	var url = "http://api.reimaginebanking.com/accounts/" + accountId + "/?key=e400f7071110f8b870bea5508aeb92c6";
	console.log(url);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	        if (request.status === 200) {
	            alert('we all good');
	        } else {
	            alert('uh oh');
	        }
	    }
	};
	request.open("GET", url , true);
	request.send(null);
}