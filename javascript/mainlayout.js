//main screen layout
var mainHeader = Class.create({
	initialize : function(parent){
		var height = "30px";
		if(screen.width == 480){
			height = "30px";
		}
		this.element = create_element("div", {
			"attributes" : {"class" : "header_bar"},
			"parent" : parent
		});
		this.setup();
	},
	setup : function(){
		
	},
});

var nevBar = Class.create({
	initialize : function(parent, select_change){
		var style = {
			"paddingLeft" : "6px",
			"height" : "32px",
			"fontSize" : "10px"
		}
		if(screen.width == 480){
			 style = {
				"padding-left" : "8px",
				"height" : "40px",
				"fontSize" : "12px"
			}
		}
		else if(screen.width == 768){
			 style = {
				"padding-left" : "9px",
				"height" : "45px",
				"fontSize" : "13px"
			}
		}
		this.element = create_element("div", {
				"attributes" : {"class" : "nev_bar"},
				"css" : style,
				"parent" : parent
				});
		this.tap = this.tap.curry(this);
		this.select_change = select_change;
		this.setup();
	},
	setup : function(){
		this.insert("index","优酷");
		this.insert("movie","电影");
		this.insert("tv","电视剧");
		this.insert("arts","综艺");
		this.insert("entertainment","娱乐");
		this.insert("news","资讯");
		this.insert("video","视频");
		this.insert("about","关于");
	},
	insert : function(id, _title){
		id = id + "_tab";
		var item_margin = "0px 2px";
		var item_padding = "0px 5px";
		var img_height = "24px";
		var title_top = "-6px";
		var title_height = "10px";
		if(screen.width == 480){
			item_margin = "0px 3px";
			item_padding = "0px 6px";
			img_height = "28px";
			title_top = "-6px";
			title_height = "12px";
		}
		if(screen.width == 768){
			item_margin = "0px 4px";
			item_padding = "0px 10px";
			img_height = "30px";
			title_top = "-6px";
			title_height = "13px";
		}
		var item = create_element("div",{
				"attributes" : {"class" : "nev_item", "id": id},
				"css" : {
					"margin" : item_margin ,
					"padding" : item_padding
					},
				"parent" : this.element
				});
		var img = create_element("img",{
				"attributes" : {"src" : "images/" + id + ".png"},
				"css" : {
					"height" : img_height 		
					},
				"parent" : item
				});
		var title = create_element("div",{
				"attributes" : {"class" : "title"},
				"css" : {
					"top" : title_top ,
					"height" : title_height,
					"lineHeight" : title_height
					},
				"parent" : item
				});
		title.innerHTML = _title;
		
		Mojo.Event.listen(item, Mojo.Event.tap, this.tap);
	},
	
	tap : function(_parent){
		var img = this.childNodes[0];
		if(img.tagName == "IMG"){
			if(_parent.last_nev){
				if(_parent.last_nev.id == this.id)
					return ;
				var last_img = _parent.last_nev.childNodes[0];
				if(last_img.tagName == "IMG")
					last_img.src = "images/" + _parent.last_nev.id + ".png";
			}
			img.src = "images/" + this.id + "_focus.png";
		}
		if(this.select_change){
			this.select_change(this.id);
		}
		_parent.last_nev = this;
	},
	
	destory : function(){
		var items = this.element.childNodes;
		for(var i in items){
			if(items.nodeType == 1){
				Mojo.Event.stopListening(items[i], Mojo.Event.tap, this.tap);
			}
		}
	}
});