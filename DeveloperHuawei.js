var page = require('webpage').create();   // 打开页面
var url='https://developer.huawei.com/consumer/cn/notice';
console.log("Start to visit: "+url);
console.log('the default user agent is:'+page.settings.userAgent);
console.log("change the user agent...");
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20130101 Firefox/30.0';
phantom.outputEncoding="GBK";	//★★★乱码时请注意调整编码

page.open(url, function(status) {	// 输出状态
	
	console.log("Status: " + status);
	if(status !== "success") {
		// page.render('hfly.jpg');	//如果状态为success,将整个page保存为hfly.jpg（也可以是png,pdf, gif）
		console.log('Unalbe to access network');
	}else{

		var outPut=page.evaluate(
			function(){
				return document.getElementsByClassName("notice-list")[0].outerHTML;
			}
		);
		
		outPut=outPut.replace(/>\s*/g,">").replace(/\s*</g,"<").replace(/href=\".+?\"/g,"");
		console.log(outPut);
	}
	
	FileSave('<html><head><meta charset="utf-8"></head><body>'+outPut+'</body></html>');
	phantom.exit();
});

function FileSave(theContent){
	// var theNewContent=theContent.replace(/.+?<table id="documentsTable">/g,"");
	// phantom.outputEncoding="utf8";	//★★★乱码时请注意调整编码
	var fs		= require('fs');
	var fs_diff	= require('fs');
	
	var path		='C:\\Att_DevelopSeries\\DeveloperHuawei.html';
	var path_diff	='C:\\Att_DevelopSeries\\DeveloperHuawei_diff.txt';
	
	if(fs.exists(path)){	//如果存在则将文件内容进行比较。
		var content_LastTime=fs.read(path);
		fs_diff.touch(path_diff);	//先创建一个空文件。
		
		if(theContent==content_LastTime){
			fs_diff.write(path_diff,'<br>Huawei DeveloperNews：今日无更新。','w');
		}else{
			fs_diff.write(path_diff,'<br>Huawei DeveloperNews：今日有更新注意查看。','w');
		}
	}
	fs.touch(path);
	fs.write(path,theContent,'w');
}