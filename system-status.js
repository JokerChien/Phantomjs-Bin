// console.log("start");
// setTimeout(function(){
	// console.log("delay");
// },11111);
// console.log("over");
// phantom.exit();

var system = require('system');
var page = require('webpage').create();   // 打开页面
var url='https://developer.apple.com/system-status/';
// page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
// page.settings.userAgent='Mozilla/5.0(Macintosh;U;IntelMacOSX10_6_8;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50';
// page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20130101 Firefox/30.0';
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36';
// page.customHeaders = {
    // "Connection" : "keep-alive",
    // "Cache-Control" : "max-age=0",
    // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    // "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
// };

page.onLoadFinished=function(status){
	console.log("onLoadFinished..");
};

page.onLoadStarted =function(status){
	console.log("onLoadStarted..");
};

page.open(url,function(status){
	
	if (status !== 'success') {  
        console.log('Unable to post!');  
    } else {  
		// page.render("system-status.png");  //截图
		
		// var btn=page.evaluate(function(){
			// return document.getElementById("lights-button-available").outerHTML;
		// });
		
		var ua=page.evaluate(function(){
			return document.getElementsByClassName("event");
		});
		console.log(ua.length);
		
		var sys=[];
		for(var i=0;i<ua.length;i++){
			temp=page.evaluate(
				function(ii){
					// return document.getElementsByClassName("event")[ii].getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML;
					return document.getElementsByClassName("event")[ii].innerHTML;
				},i
			);
			temp=temp.replace(" - (Opens in new window)", "").replace("Available","</td><td><font style=\"color:green;fontWeight:bold\">Available</font></td></tr>").replace(" -<!-- /react-text -->","").replace(" - <!-- /react-text -->","").replace("</h3>","</h3></td><td>");
			sys.push(temp);
		}
		
		var dateStr=page.evaluate(
			function(ii){
				// return document.getElementsByClassName("event")[ii].getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML;
				return document.getElementsByClassName("date-copy")[0].outerHTML;
			},i
		);
		
		// lights-button-available
		var doc="<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">";
		doc+=dateStr+"\n<table border=\"1\" cellspacing=\"0\">\n";
		for(var i=0;i<ua.length;i++){
			doc+="<tr><td>"+sys[i]+"\n";
		}
		// console.log(btn);
		doc+="</td></tr></table>";
		
		FileSave(doc);
		phantom.exit();
    }
	// phantom.exit();
});

function FileSave(theContent){
	// var theNewContent=theContent.replace(/.+?<table id="documentsTable">/g,"");
	
	var fs = require('fs');
	var path = 'system-status.html';
	fs.touch(path);
	fs.write(path,theContent,'w');
}

// <table id="documentsTable">