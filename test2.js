var page = require('webpage').create();   // 打开页面
var url='https://developer.apple.com/library/content/navigation/';
console.log("Start to visit: "+url);
console.log('the default user agent is:'+page.settings.userAgent);
console.log("change the user agent...");
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
page.open(url, function(status) {	// 输出状态
	
	console.log("Status: " + status);
	if(status !== "success") {
		// page.render('hfly.jpg');	//如果状态为success,将整个page保存为hfly.jpg（也可以是png,pdf, gif）
		console.log('Unalbe to access network');
	}else{
		
		page.render('hfly.pdf');	//如果状态为success,将整个page保存为hfly.jpg（也可以是png,pdf, gif）
	}

	
	phantom.exit();
});	

