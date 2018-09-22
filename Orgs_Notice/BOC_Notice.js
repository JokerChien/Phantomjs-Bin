// console.log("start");
// setTimeout(function(){
	// console.log("delay");
// },11111);
// console.log("over");
// phantom.exit();
var system = require('system');
var page = require('webpage').create();   // 打开页面
var url='http://www.boc.cn/ebanking/bi2/';
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
phantom.outputEncoding="gb2312";	//★★★乱码时请注意调整编码！！
console.log(page.settings.userAgent);

page.onLoadFinished=function(status){
	console.log("onLoadFinished");
};

page.onLoadStarted =function(status){
	console.log("onLoadStarted");
};

page.open(url,function(status){
	if (status !== 'success') {  
        console.log('Unable to post!');  
    } else {  
		window.setTimeout(function () {
			// page.render("system-status.png");  //截图
			// console.log(page.content);
			// var saveToXls=page.content;
			// saveToXls=saveToXls.replace(/.+?<table id="documentsTable">/g,"");
			var outPut=page.evaluate(
				function(){
					return document.getElementsByClassName("news")[0].getElementsByClassName("list");
				}
			)
			
			// console.log(page.content);
			var str_txt='';
			for(i=0;i<outPut.length;i++){
				str_txt+=outPut[i].innerHTML.replace(/>\s*</g, "><").replace(/href=\".+?\"/g,"").replace(/onclick=\".+?\"/g,"");
				//str_txt+=outPut[i].innerHTML.replace(/>\s*</g, "><").replace(/href=\".+?\"/g,"").replace(/onclick=\".+?\"/g,"").replace(/• /g,"");
				console.log(str_txt);	//去掉首位的空格
			}
			
			// document.getElementById("lights-button-available").onclick;
			// page.includeJs("http://code.jquery.com/jquery-2.2.4.min.js",function(){
			//	// evaluate执行JS
				// page.evaluate(function(){
					// $("button").click();
				// })
			// }

			console.log("Finished");
			// console.log(page.content);
			FileSave('<h2>中国银行</h2>'+str_txt.replace(/^\s*|\s*$/g,"")+'<hr>');
			phantom.exit();
		}, 3333);
    }
	// phantom.exit();
});

function FileSave(theContent){
	// var theNewContent=theContent.replace(/.+?<table id="documentsTable">/g,"");
	// phantom.outputEncoding="utf8";	//★★★乱码时请注意调整编码！！
	var fs		= require('fs');
	var fs_diff	= require('fs');
	
	var path		='C:\\Bank_Notieces\\BOC_Notice.txt';
	var path_diff	='C:\\Bank_Notieces\\BOC_Notice_diff.txt';
	
	if(fs.exists(path)){	//如果存在则将文件内容进行比较。
		var content_LastTime=fs.read(path);
		fs_diff.touch(path_diff);	//先创建一个空文件。
		// fs_diff.write(path_diff,theContent==content_LastTime?'今日建行无更新':'今日建行有更新注意查看','w');
		
		if(theContent==content_LastTime){
			fs_diff.write(path_diff,'中国银行：今日无更新','w');
		}else{
			fs_diff.write(path_diff,'中国银行：今日有更新注意查看','w');
		}
	}
	
	fs.touch(path);
	fs.write(path,theContent,'w');
}

// <table id="documentsTable">