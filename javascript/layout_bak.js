var libraries = MojoLoader.require(
	{name: "mediaextension", version: "1.0"}
);
var mediaextension = libraries["mediaextension"];


function formatTime(time){
	time = parseInt(time);
	var tmp_var = time%60;
	if(tmp_var <=0)
		return "00:00:00";
	if(tmp_var <10)
		var ret_str = ":0" + tmp_var;
	else
		var ret_str = ":" + tmp_var;
	
	time = parseInt(time / 60);
	tmp_var = time%60;
	if(tmp_var <=0)
		return "00:00" + ret_str;
	if(tmp_var <10)
		var ret_str = ":0" + tmp_var + ret_str;
	else
		var ret_str = ":" + tmp_var + ret_str;
	
	time = parseInt(time / 60);
	tmp_var = time%60;
	if(tmp_var <= 0)
		return "00" + ret_str;
	if(tmp_var < 10)
		var ret_str = "0" + tmp_var + ret_str;
	else
		var ret_str = tmp_var + ret_str;
	return ret_str;
}

var VideoListView = Class.create({
	initialize : function( id){
		if(typeof(id) === "string")
			this.list = document.getElementById(id);
		else
			this.list = id;
		this.size = 0;
		this.list.style.height = 139 + "px";
		var self = this;
		this.tap = this.tap;
	},
	insert : function(_obj){
		if(_obj instanceof Array){
			for(var i in _obj){
				this.insert(_obj[i]);
			}
		}
		else if(typeof(_obj) === "object"){
			if(!_obj["itemid"])
				return false;
			
			this.size ++;
			if(this.size > 3){
				this.size = 1;
				this.list.style.height = this.list.offsetHeight + 139 + "px";
			}
			var listItem = document.createElement("div");
			listItem.className = "list_item";
			listItem.setAttribute("itemid", _obj["itemid"]);
			listItem.setAttribute("origin", _obj["origin"]);
			listItem.setAttribute("columnid", _obj["columnid"]);
			listItem.setAttribute("ishd", _obj["ishd"]);
			
			var itemImg = document.createElement("img");
			itemImg.setAttribute("src",_obj["picurl"]);
			
			var info = document.createElement("div");
			info.className = "info"
			
			var title = document.createElement("div");
			title.className = "title";
			title.appendChild(document.createTextNode(_obj["title"]));
			
			var times = document.createElement("div");
			times.className = "paly_times";
			times.appendChild(document.createTextNode(_obj["playtimes"]));
			
			var totaltime = document.createElement("div");
			
			totaltime.className = "total_time";
			totaltime.appendChild(document.createTextNode(formatTime(_obj["totaltime"]/1000)));
			
			listItem.appendChild(itemImg);
			
			info.appendChild(title);
			info.appendChild(times);
			info.appendChild(totaltime);
			
			listItem.appendChild(info);
			Mojo.Event.listen(listItem,Mojo.Event.tap, this.tap);
			this.list.appendChild(listItem);
		}
	},
	
	
	clear : function(){
		var list_item = this.list.childNodes;
		if(!list_item)
			return true;
		var length = list_item.length;
		var offset = 0;
		for(var i=0; i < length; i++){
			if(list_item.item(offset).nodeType == 1){
				Mojo.Event.stopListening(list_item.item(offset), Mojo.Event.tap, this.tap);
				this.list.removeChild(list_item.item(offset));
			}
			else{
				offset ++;
			}
		}
		this.list.style.height = "0px";
	},
	tap : function(){
		_obj = {
			"itemid" : this.getAttribute("itemid"),
			"columnid" : this.getAttribute("columnid"),
			"origin" : this.getAttribute("origin"),
			"ishd" : this.getAttribute("ishd")
			};
		Mojo.Controller.stageController.pushScene({'name': 'player', 'sceneTemplate': 'player/player-scene'},_obj);
	},
	_height : function(){
		return this.list.offsetHeight;
	}
});

var ChannelListView = Class.create({
	initialize : function(id, video_list_id){
		if(typeof(id) === "string")
			this.list = document.getElementById(id);
		else
			this.list = id;
		this.last_tap = null;
		this.video_list_view = new VideoListView(video_list_id);
		var _self = this;
		this.tap = this.tap.curry(_self);
		this.clear_insert_video_list = this._clear_insert_video_list.bind(this);
	},
	insert : function(_obj){
		if(_obj instanceof Array){
			for(var i in _obj){
				this.insert(_obj[i]);
				//Mojo.Log.info(i);
			}
		}
		else if(typeof(_obj) === "object"){
			var listItem = document.createElement("div");
			listItem.className = "list_item";
			listItem.setAttribute("title", _obj["title"]);
			listItem.setAttribute("columnid", _obj["columnid"]);
			
			var itemImg = document.createElement("img");
			itemImg.setAttribute("src",_obj["iconurl"]);

			listItem.appendChild(itemImg);
			Mojo.Event.listen(listItem, Mojo.Event.tap, this.tap);
			this.list.appendChild(listItem);
		}		
	},
	tap : function(_parent){
		if(!_parent)
			return false;
		var item = this;
		if(_parent.last_tap){
			if(item.getAttribute("columnid") == _parent.last_tap.getAttribute("columnid"))
				return true;
			_parent.last_tap.style.background="none";
			//Mojo.Log.info(this.last_tap.getAttribute("title"));
		}
		item.style.background="url(images/channelbg.png) no-repeat bottom right";
		API.channel_api(item.getAttribute("columnid"), {
			success : _parent.clear_insert_video_list
		});
		_parent.last_tap = item;
	},
	
	_clear_insert_video_list : function(data){
		this.video_list_view.clear();
		this._inert_video_list(data);
	},
	
	_inert_video_list : function(data){
		if(typeof(data) === "string")
			data = Mojo.parseJSON(data);
		if(data["items"])
			this.video_list_view.insert(data["items"]);
		else
			this.video_list_view.insert(data);
	},
	update : function(){
		if(this.last_tap){
			var channel = this.last_tap.getAttribute("columnid");
		}
		else{
			var channel = 1;
		}
		API.channel_api(channel, {
			success : this._inert_video_list.bind(this)
		});
	},
	destory : function(){
		var list_items = this.list.childNodes;
		for(var i in list_items){
			if(list_items.item(i).nodeType == 1)
			Mojo.Event.stopListening(list_items.item(i),Mojo.Event.tap, this.tap);
		}
	}
});


var SliderBar = Class.create({
	initialize : function (id){
		if(typeof(id) === "string")
			this.slider = document.getElementById(id);
		else
			this.slider = id;
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
		this.inner.style.width = this.pos + "px";
		this.handle.style.left = this.pos + "px";
		if(this.drag){
			this.drag();
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
