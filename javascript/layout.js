
var libraries = MojoLoader.require(
	{name: "mediaextension", version: "1.0"}
);
var mediaextension = libraries["mediaextension"];


var screen = {
	height : Mojo.Environment.DeviceInfo.screenHeight,
	width : Mojo.Environment.DeviceInfo.screenWidth
}

var layoutOptions = {};
var configOptions = {};

(function (){
		layoutOptions.header_height = 30;
		layoutOptions.header_container_width = 160;
		layoutOptions.search_bar_width = 124;
		layoutOptions.search_bar_height = 12;
		layoutOptions.search_bar_fontSize = "12px";
		layoutOptions.search_bar_top = 3;
		
		layoutOptions.nev_bar_height = 32;
		layoutOptions.nev_bar_paddingLeft = 6;
		layoutOptions.nev_bar_fontSize = "10px";
		layoutOptions.nev_bar_item_margin = "0px 2px";
		layoutOptions.nev_bar_item_padding = "0px 5px";
		layoutOptions.nev_bar_img_height = 24;
		layoutOptions.nev_bar_title_top = -6;
		layoutOptions.nev_bar_title_height = 10;
		
		layoutOptions.show_item_height = 95;
		layoutOptions.show_item_margin = 3;
		
		layoutOptions.video_item_height = 120;
		if(screen.width == 480){
			layoutOptions.header_height = 34;
			layoutOptions.header_container_width = 220;
			layoutOptions.search_bar_width = 198;
			layoutOptions.search_bar_height = 16;
			layoutOptions.search_bar_fontSize = "14px";
			layoutOptions.search_bar_top = 5;
			
			layoutOptions.nev_bar_height = 40;
			layoutOptions.nev_bar_paddingLeft = 8;
			layoutOptions.nev_bar_height_fontSize = "12px";			
			layoutOptions.nev_bar_item_margin = "0px 3px";
			layoutOptions.nev_bar_item_padding = "0px 6px";
			layoutOptions.nev_bar_img_height = 28;
			layoutOptions.nev_bar_title_top = -6;
			layoutOptions.nev_bar_title_height = 12;
			
			layoutOptions.show_item_height = 100;
			layoutOptions.show_item_margin = 4;
			layoutOptions.video_item_height = 120;
		}
		if(screen.width == 768){
			layoutOptions.header_height = 40;
			layoutOptions.header_container_width = 480;
			layoutOptions.search_bar_width = 255;
			layoutOptions.search_bar_height = 18;
			layoutOptions.search_bar_fontSize = "14px";
			layoutOptions.search_bar_top = 7;
			
			layoutOptions.nev_bar_height = 45;
			layoutOptions.nev_bar_paddingLeft = 9;
			layoutOptions.nev_bar_fontSize = "13px";
			layoutOptions.nev_bar_item_margin = "0px 4px";
			layoutOptions.nev_bar_item_padding = "0px 10px";
			layoutOptions.nev_bar_img_height = 30;
			layoutOptions.nev_bar_title_top = -6;
			layoutOptions.nev_bar_title_height = 13;
			
			layoutOptions.show_item_height = 105;
			layoutOptions.show_item_margin = 5;
			layoutOptions.video_item_height = 120;

		}
})();

(function(){
	configOptions.use_hd = false;
})();

function create_element(tag_name, options){
	var element = document.createElement(tag_name);
	if(options)
		return element_attr(element, options);
	return element;
}

function element_attr(element, options){
	if(typeof(element) === "string")
		element = document.getElementById(element);
	if(typeof(options.attributes) === "string"){
		options.attributes = options.attributes.split(" ");
	}
	var number_test = /^\d+$/;
	if(typeof(options.attributes) === "object"){
		for(var i in options.attributes){
			if(!options.attributes[i] || typeof(options.attributes[i])=="function" || options.attributes[i].length == 0)
				continue;
			if(number_test.test(i) == true){
				var index = options.attributes[i].indexOf("=");
				element.setAttribute(options.attributes[i].substring(0,index), 
					options.attributes[i].substring(index + 1,options.attributes[i].length));
			}
			else
				element.setAttribute(i, options.attributes[i]);
		}
	}
	
	if(typeof(options.css) === "string"){
		options.css = options.css.split(";");
	}
	if(typeof(options.css) === "object"){
		for(var i in options.css){
			if(!options.css[i] || typeof(options.css[i])=="function" || options.css[i].length == 0)
				continue;
			if(number_test.test(i) == true){
				eval("element.style." + options.css[i].replace(/\s+/g,"").replace(":","='") + "'");
			}
			else
				eval("element.style." + i + "='" + options.css[i] + "'");
		}
	}
	
	if(options.parent){
		if(typeof(options.parent) === "string"){
			options.parent = document.getElementById(options.parent);
		}
		if(typeof(options.parent) === "object"){
			options.parent.appendChild(element);
		}
	}
	return element;
}





