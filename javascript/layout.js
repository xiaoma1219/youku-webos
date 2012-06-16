
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
		
		layoutOptions.video_item_height = 138;
		layoutOptions.video_item_width = 152;
		
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
			
			layoutOptions.video_item_height = 138;
			layoutOptions.video_item_width = 152;
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
			
			layoutOptions.video_item_height = 143;
			layoutOptions.video_item_width = 152;

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


var SliderBar = Class.create({
	initialize : function (id){
		if(typeof(id) === "string")
			this.slider = document.getElementById(id);
		else
			this.slider = id;
		this.slider.style.width = screen.height - 90 + "px";
		this.size = this.slider.offsetWidth;
		this.inner = document.getElementById(this.slider.id + "_inner");
		this.inner_buffered = document.getElementById(this.slider.id + "_inner_buffered");
		this.handle = document.getElementById(this.slider.id + "_handle");
		this.toggle_handle("hide");
		this.handle_drag_start = this._handle_drag_start.bind(this);
		this.handle_drag = this._handle_drag.bind(this);
		this.handle_drag_stop = this._handle_drag_stop.bind(this);
		this.slider_show =  this.toggle_handle.curry("show").bind(this);
		
		
		Mojo.Event.listen(this.handle, "mousedown", this.handle_drag_start);
		//Mojo.Event.listen(this.slider, Mojo.Event.tap,this.slider_show, false);
	},
	_max_value : function(value){
		this.max_value = value;
	},
	_value : function(value, buffered_value){
		this.value = value;
		this.pos = this.value / this.max_value * this.size;
		this.inner.style.width = this.pos + "px";
		this.handle.style.left = this.pos + "px";
		if(buffered_value){
			this.buffered_value = buffered_value;
			this.buffered_pos = this.buffered_value / this.max_value * this.size;
			this.inner_buffered.style.width = this.buffered_pos + "px";
		}
	},
	_handle_drag_start : function(event){
		this.handle_x_start = event.clientX;
		this.handle_pos_x = parseInt(this.handle.style.left.substr(0,this.handle.style.left.length-2));
		this.toggle_handle("drag");
		Mojo.Event.listen(document, "mousemove", this.handle_drag);
		Mojo.Event.listen(document, "mouseup", this.handle_drag_stop);
		if(this.drag_start){
			this.drag_start();
		}
	},
	_handle_drag : function(event){
		this.pos = this.handle_pos_x + event.clientX - this.handle_x_start;
		if(this.pos > this.size)
			this.pos = this.size;
		else if(this.pos < 0)
			this.pos = 0;
		this.inner.style.width = this.pos + "px";
		this.handle.style.left = this.pos + "px";
		if(this.drag){
			this.drag(this.pos / this.size * this.max_value/1000);
		}
	},
	_handle_drag_stop : function(event){
		this.value = this.pos / this.size * this.max_value;
		//Mojo.Log.info("timeis " + this.max_value);
		Mojo.Event.stopListening(document, "mousemove", this.handle_drag);
		Mojo.Event.stopListening(document, "mouseup", this.handle_drag_stop);
		this.toggle_handle("show");
		if(this.drag_stop){
			this.drag_stop(this.value/1000);
		}
	},
	
	toggle_handle : function(option){
		if(this.hide_handle_timeout){
			window.clearTimeout(this.hide_handle_timeout);
		}
		if(option){
			switch(option){
				case "show" :
					this.handle.style.display = "";
					this.handle.style.backgroundPosition = "left top";
					this.hide_handle_timeout = window.setTimeout(
						this.toggle_handle.curry("hide").bind(this),
							5000);
					break;
				case "drag" :
					this.handle.style.display = "";
					this.handle.style.backgroundPosition = "left bottom";
					break;
				case "hide" :
					this.handle.style.display = "none";
					break;
			}
		}
		else{
			if(this.handle.style.display == "none"){
				this.toggle_handle("show");
			}
			else{
				this.toggle_handle("hide");
			}			
		}
	},	
	
	cleanup : function(event){
		//Mojo.Event.stopListening(this.slider, Mojo.Event.tap, this.slider_show, false);
		Mojo.Event.stopListening(this.handle, "mousedown", this.handle_drag_start);
	}
	
});
