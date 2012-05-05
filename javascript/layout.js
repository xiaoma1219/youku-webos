
var libraries = MojoLoader.require(
	{name: "mediaextension", version: "1.0"}
);
var mediaextension = libraries["mediaextension"];


var screen = {
	height : Mojo.Environment.DeviceInfo.screenHeight,
	width : Mojo.Environment.DeviceInfo.screenWidth
}

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
			if(typeof(options.attributes[i])=="function" || options.attributes[i].length == 0)
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
			if(typeof(options.css[i])=="function" || options.css[i].length == 0)
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

var VideoList = Class.create({
	initialize : function(){
		this.element = create_element("div");
		
	},
	setup : function(){
	
	},
	insert : function(item){
	},
	clear : function(){
	},	
});
