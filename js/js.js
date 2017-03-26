var date = "2017-03-22";

var foodexpense = 0.0;
var transportexpense = 0.0;
var entertainmentexpense = 0.0;
var miscellaneousexpense = 0.0;
var totalexpense = 0.0;
var budget = 50.0;


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

function getTotalDate(wanted_date) {
	accountId = "58d7936e1756fc834d909b5f";
	var url = "http://api.reimaginebanking.com/accounts/" + accountId + "/purchases?key=e400f7071110f8b870bea5508aeb92c6";

	var totalMoneySpent = 0.00;

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	        if (request.status === 200) {
	        	console.log(request.responseText);
	        	var jsonResponse = JSON.parse(request.responseText);

	        	console.log(wanted_date);

	        	for(i = 0; i < jsonResponse.length; i ++) {
	        		console.log(wanted_date);
	        		if( jsonResponse[i]['purchase_date'].localeCompare(wanted_date) == 0 ) {
	        			console.log("HI");
	        			totalMoneySpent += jsonResponse[i]['amount'];
	        		}
	        	}
	        } else {
	            alert('uh oh');
	        }

		console.log(totalMoneySpent);
	    return totalMoneySpent;
	    }
	};
	request.open("GET", url , true);
	request.send(null);

}

function assignValues(wanted_date) {
	accountId = "58d7936e1756fc834d909b5f";
	var url = "http://api.reimaginebanking.com/accounts/" + accountId + "/purchases?key=e400f7071110f8b870bea5508aeb92c6";

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	        if (request.status === 200) {
	        	// console.log(request.responseText);
	        	var jsonResponse = JSON.parse(request.responseText);
	        	for(i = 0; i < jsonResponse.length; i ++) {
	        		console.log(wanted_date);
	        		if( jsonResponse[i]['purchase_date'].localeCompare(wanted_date) == 0 ) {
	        			if( jsonResponse[i]['description'].localeCompare("food") == 0) {
	        				foodexpense += jsonResponse[i]['amount'];
	        			}
	        			if( jsonResponse[i]['description'].localeCompare("transportation") == 0) {
	        				transportexpense += jsonResponse[i]['amount'];
	        			}
	        			if( jsonResponse[i]['description'].localeCompare("entertainment") == 0) {
	        				entertainmentexpense += jsonResponse[i]['amount'];
	        			}
	        			if( jsonResponse[i]['description'].localeCompare("miscellaneous") == 0) {
	        				miscellaneousexpense += jsonResponse[i]['amount'];
	        			}
	        			totalexpense += jsonResponse[i]['amount'];
	        			
	        		}
	        	}
	        } else {
	            alert('uh oh');
	        }

		updateAll();
	    }
	};
	request.open("GET", url , true);
	request.send(null);
}

function addPurchase(amount, description ) {

	var amount = document.getElementById("Cost").value;
	var description = document.getElementById("Category").value;

	accountId = "58d7936e1756fc834d909b5f";
	var url = "http://api.reimaginebanking.com/accounts/" + accountId + "/purchases?key=e400f7071110f8b870bea5508aeb92c6";
	// var params = "merchant_id=58d6ddac1756fc834d906a9d&medium=balance&purchase_date=" + date + "&amount=" + amount +"&description=" + description;
	var payload = { "merchant_id": "58d6ddac1756fc834d906a9d", "medium": "balance", "purchase_date": date, "amount": parseFloat(amount), "description": description }

	var request = new XMLHttpRequest();
	request.open("POST", url , true);

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	        if (request.status === 201) {
	        	updateAll();
	        } else {
	            console.log(request.status);
	            alert('uh oh');
	        }

		updateAll();
	    }
	};

	request.send(JSON.stringify(payload));


}

window.onload = function() {
	assignValues(date);
}

function updateAll() {

	document.getElementById("DateH1").innerHTML=date;

	document.getElementById("percent").innerHTML="$"+totalexpense + " /$" + budget;

	var foodpercent = foodexpense/budget;
	foodpercent = foodpercent/2;
	console.log(foodpercent);
	// $("#foodtag").css({webkitTransform:"rotate(" + foodpercent*100 + "deg)"})
	// $("#foodtag").css({transform: rotate(.1turn);})
	foodDiv = document.getElementById("foodtag");
	foodPrice = document.getElementById("foodPrice");
	foodPrice.innerHTML = "$" + foodexpense;
	console.log(foodDiv);
	document.getElementById("foodtag").style.webkitTransform = "rotate(" + foodpercent + "turn)";
	console.log($("#foodtag"));
	var transportpercent = transportexpense/budget;
	transportpercent = transportpercent/2;
	transportpercent = transportpercent + foodpercent
	console.log(transportpercent);
	// $("#foodtag").css({webkitTransform:"rotate(" + foodpercent*100 + "deg)"})
	// $("#foodtag").css({transform: rotate(.1turn);})
	transportDiv = document.getElementById("transporttag");
	transPrice = document.getElementById("transPrice");
	transPrice.innerHTML = "$" + transportexpense;
	console.log(transportDiv);
	document.getElementById("transporttag").style.webkitTransform = "rotate(" + transportpercent+"turn)";
	console.log($("#transporttag"));
	var entertainmentpercent = entertainmentexpense/budget;
	entertainmentpercent = entertainmentpercent/2;
	entertainmentpercent = transportpercent + entertainmentpercent
	console.log(entertainmentpercent);
	// $("#foodtag").css({webkitTransform:"rotate(" + foodpercent*100 + "deg)"})
	// $("#foodtag").css({transform: rotate(.1turn);})
	entertainmentDiv = document.getElementById("entertainmenttag");
	entPrice = document.getElementById("entPrice");
	entPrice.innerHTML = "$" + entertainmentexpense;
	console.log(entertainmentDiv);
	document.getElementById("entertainmenttag").style.webkitTransform = "rotate(" + entertainmentpercent + "turn)";
	console.log($("#entertainmenttag"));
	var miscellaneouspercent = miscellaneousexpense/budget;
	miscellaneouspercent = miscellaneouspercent/2;
	miscellaneouspercent = miscellaneouspercent+entertainmentpercent
	console.log(miscellaneouspercent);
	// $("#foodtag").css({webkitTransform:"rotate(" + foodpercent*100 + "deg)"})
	// $("#foodtag").css({transform: rotate(.1turn);})
	miscellaneousDiv = document.getElementById("miscellaneoustag");
	miscPrice = document.getElementById("miscPrice");
	miscPrice.innerHTML = "$" + miscellaneousexpense;
	console.log(miscellaneousDiv);
	document.getElementById("miscellaneoustag").style.webkitTransform = "rotate(" + miscellaneouspercent + "turn)";
	console.log($("#miscellaneoustag"));

	function displayfoodchart(){
	    document.getElementById("foodtag").style.opacity = 0.0
	    setTimeout(function(){document.getElementById("foodtag").style.opacity = 0.7;}, 1000)
	    setTimeout(function(){document.getElementById("foodtag").style.opacity = 0.9;}, 1000)
	    setTimeout(function(){document.getElementById("foodtag").style.opacity = 1;}, 1000)
	}
	function displaytransportchart(){
	    document.getElementById("transporttag").style.opacity = 0.0
	    setTimeout(function(){document.getElementById("transporttag").style.opacity = 0.7;}, 1000)
	    setTimeout(function(){document.getElementById("transporttag").style.opacity = 0.9;}, 1000)
	    setTimeout(function(){document.getElementById("foodtag").style.opacity = 1;}, 1000)
	}
	function displayentertainmentchart(){
	    document.getElementById("entertainmenttag").style.opacity = 0.0
	    setTimeout(function(){document.getElementById("entertainmenttag").style.opacity = 0.7;}, 1000)
	    setTimeout(function(){document.getElementById("entertainmenttag").style.opacity = 0.9;}, 1000)
	    setTimeout(function(){document.getElementById("entertainmenttag").style.opacity = 1;}, 1000)
	}
	function displaymiscellaneouschart(){
	    document.getElementById("miscellaneoustag").style.opacity = 0.0
	    setTimeout(function(){document.getElementById("miscellaneoustag").style.opacity = 0.7;}, 1000)
	    setTimeout(function(){document.getElementById("miscellaneoustag").style.opacity = 0.9;}, 1000)
	    setTimeout(function(){document.getElementById("miscellaneoustag").style.opacity = 1;}, 1000)
	}
}