var page = require('webpage').create();   // 打开页面
var url='http://bbs.360.cn/forum.php?mod=forumdisplay&fid=1700&filter=typeid&typeid=11836';
console.log("Start to visit: "+url);
console.log('the default user agent is:'+page.settings.userAgent);
console.log("change the user agent...");
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20130101 Firefox/30.0';
phantom.outputEncoding="GBK";	//★★★乱码时请注意调整编码


page.open(url, function(status) {	// 输出状态
	
	console.log("Status: " + status);
	if(status !== "success") {
		//page.render('hfly.jpg');	//如果状态为success,将整个page保存为hfly.jpg（也可以是png,pdf, gif）
		console.log('Unalbe to access network');
	}else{

		var outPut=page.evaluate(
			function(){
				return document.getElementById("threadlisttableid").outerHTML;
			}
		);
		
		
		console.log(outPut.replace(/>\s*/g,">").replace(/\s*</g,"<").replace(/href=\".+?\"/g,"").replace(/<!--.*?-->/g,""));
		// for(var i=0;i<outPut.length;i++){
			// // outPut=outPut.replace(/>\s*/g,">").replace(/\s*</g,"<").replace(/href=\".+?\"/g,"").replace(/<!--.*?-->/g,"");
			// console.log(outPut[i].innerHTML.replace(/>\s*/g,">").replace(/\s*</g,"<").replace(/href=\".+?\"/g,"").replace(/<!--.*?-->/g,""));	
		// }
		
		
	}
	
	// var fs = require('fs');
	// var path = 'category-list-item-elements.xls';
	// fs.touch(path);
	// fs.write(path,theContent,'w')
	// var fs = require('fs');
	// var path = 'DeveloperNews.doc';
	// fs.touch(path);
	// fs.write(path,theContent,'w');
	
	// outPut='<head><meta charset="utf-8"><title>ECharts</title></head><body>'+outPut;
	// outPut=outPut+'</body>';
	
	FileSave('<html><head><meta charset="utf-8"></head><body>'+outPut+'</body></html>');
	// FileSave(outPut);
	phantom.exit();
});

function FileSave(theContent){
	// var theNewContent=theContent.replace(/.+?<table id="documentsTable">/g,"");
	// phantom.outputEncoding="utf8";	//★★★乱码时请注意调整编码
	var fs		= require('fs');
	var fs_diff	= require('fs');
	
	var path		='C:\\Att_DevelopSeries\\Developer360.html';
	var path_diff	='C:\\Att_DevelopSeries\\Developer360_diff.txt';
	
	if(fs.exists(path)){	//如果存在则将文件内容进行比较。
		var content_LastTime=fs.read(path);
		fs_diff.touch(path_diff);	//先创建一个空文件。
		
		if(theContent==content_LastTime){
			fs_diff.write(path_diff,'<br>360 DeveloperNews：今日无更新。','w');
		}else{
			fs_diff.write(path_diff,'<br>360 DeveloperNews：今日有更新注意查看。','w');
		}
	}
	fs.touch(path);
	fs.write(path,theContent,'w');
}