//main screen layout
var MainHeader = Class.create({
	initialize : function(parent){
		
		this.element = create_element("div", {
			"attributes" : {"class" : "main_header"},
			"css" : {"height" : layoutOptions.header_height + "px"},
			"parent" : parent
		});
		this.setup();
	},
	setup : function(){
		this.header_container = create_element("div", {
			"attributes" : {"class" : "header_container"},
			"css" : {"width" : layoutOptions.header_container_width + "px"},
			"parent" : this.element
		});
		/*		
		this.insert(create_element("img", {
			"attributes" :{"src" : "images/header_logo.png"}
		}));
		*/
	},

	clear : function(){
		this.header_container.innerHTML = "";
	},
	insert : function(elm){
		this.header_container.appendChild(elm);
	},
	release : function(){
	
	}
});

var SearchBar = Class.create({
	initialize : function(parent){
		this.parent = parent;
		this.element = create_element("div", {
			"attributes" : {"class" : "search_bar"},
			"css" : {
				"width" : layoutOptions.search_bar_width + "px",
				"height" : layoutOptions.search_bar_height + "px",
				"marginTop" : layoutOptions.search_bar_top + "px",
				"fontSize" : layoutOptions.fontSize
			},
			"parent" : this.parent
		});
		
		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.input = this.input.bind(this);
		this.update_suggest = this.update_suggest.bind(this);
		this.submit = this.submit.bind(this);
		this.setup();
	},
	setup : function(){
		layoutOptions.search_bar_height += 4;
		this.text = create_element("input", {
			"attributes" : {"type" : "text", "value" : "搜库"},
			"css" : {
				"width" : layoutOptions.search_bar_width - 20 + "px", 
				"height" : layoutOptions.search_bar_height + "px", 
				"lineHeight" : layoutOptions.search_bar_height + "px", "fontSize" : "12px"
			},
			"parent" : this.element
		});

		this.submit_button = create_element("img", {
			"attributes" : {
				"type" : "submit" , 
				"class" : "search_img", 
				"src" : "images/search_icon.png"
			},
			"css" : {
				"top" : (layoutOptions.search_bar_height - 16)/2 + "px"
			},
			"parent" : this.element
		});
		
		Mojo.Event.listen(this.text, "focus", this.focus);
		Mojo.Event.listen(this.text, "blur", this.blur);
		Mojo.Event.listen(this.text, "input", this.input);
		Mojo.Event.listen(this.submit_button, "click", this.submit);
	},
	focus : function (){
		if(this.text.value == "搜库")
			this.text.value = "";
		this.text.style.color = "#333333";
		/*
		if(this.text.value != ""){
			this.input();
		}
		*/
	},
	blur : function (){
		if(this.text.value == "")
			this.text.value = "搜库";
		this.text.style.color = "#999999";
		if(this.blured)
			this.blured();
	},
	input : function(event){
		if(this.on_update_suggest != true){
			request(suggest(this.text.value),{
				success : this.update_suggest
				}, true);
			this.on_update_suggest = true;
		}
	},
	update_suggest : function(data){		
		this.on_update_suggest = false;
		if(this.updating_suggest){
			this.updating_suggest(data);
		}
	},
	submit : function(){
		if(this.text.value != "" && this.text.value != "搜库");
			this.search();
		//return false;
	},
	value : function(value){
		if(value)
			this.text.value = value;
		return this.text.value;
	},
	release : function(){
		Mojo.Event.stopListening(this.text, "focus", this.focus);
		Mojo.Event.stopListening(this.text, "blur", this.blur);
		Mojo.Event.stopListening(this.text, "input", this.input);
		Mojo.Event.stopListening(this.submit_button, "click", this.submit);
	}
});

var TipBox = Class.create({
	initialize : function(parent, options){
		this.element = create_element("div" ,{
			"attributes" : {"class" : "box"},
			"parent" : parent
			});
		element_attr(this.element, options);
		this.setup();
	},
	setup : function(){
		this.container = create_element("div", {
			"parent" : this.element,
			"attributes" : {"class" : "container"}
		});
		this.header = create_element("div", {
			"parent" : this.element,
			"attributes" : {"class" : "header"}
		})
	},
	insert : function(item){
		this.container.appendChild(item);
	},
	title : function(title){
		this.header.innerHTML = title;
	},
	insert_head : function(item){
		this.header.appednChild(item);
	},
	clear : function(){
		this.container.innerHTML = "";
	},
	hide : function(){
		this.element.style.display = "none";
	},
	show : function(){
		this.element.style.display = "block";
	},
	release : function(){

	}
});

var TipList = Class.create({
	initialize : function(){
		this.element = create_element("div", {
			"attributes" : {
				"class" : "tip_list"
			}
		});
		
		this.item_down = this.item_down.curry(this);
		this.item_click = this.item_click.curry(this);
	},
	setup : function(){
	},
	insert : function (data){
		var item = create_element("div", {
			"attributes" : {
				"class" : "tip_list_item",
				"value" : data
				}
		});		
		item.innerHTML = data;
		this.element.appendChild(item);
		Mojo.Event.listen(item, "mousedown", this.item_down);
		//Mojo.Event.listen(item, "mouseup", this.tip_item_up);
		Mojo.Event.listen(item, "click", this.item_click);
	},
	item_down : function(parent){
		if(parent.last_tip_item_active){
			parent.last_tip_item_active.className = "tip_list_item";
		}
		this.className = "tip_list_item_active";
		parent.last_tip_item_active = this;
	},
	item_click : function(parent){
		parent.click(this.innerHTML);
	},
	clear : function(){
		var list_items = this.element.chindNodes;
		for(var i in list_items){
			if(list_items[i].nodeType == 1){
				Mojo.Event.stopListening(list_items[i], "mousedown", this.item_down);
				//Mojo.Event.stopListening(list_items[i], "mouseup", this.tip_item_up);
				Mojo.Event.stopListening(list_items[i], "click", this.item_click);
				this.element.removeChild(list_items[i]);
			}
		}
	}
});

var NevBar = Class.create({
	initialize : function(parent){
		this.element = create_element("div", {
			"attributes" : {"class" : "nev_bar"},
			"css" : {
				"height" : layoutOptions.nev_bar_height + "px",
				"paddingLeft" : layoutOptions.nev_bar_paddingLeft + "px",
				"fontSize" : layoutOptions.nev_bar_fontSize,
			},
			"parent" : parent
		});
		this.tap = this.tap.curry(this);
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
		var item = create_element("div",{
			"attributes" : {"class" : "nev_item", "id": id},
			"css" : {
				"margin" : layoutOptions.nev_bar_item_margin ,
				"padding" : layoutOptions.nev_bar_item_padding
			},
			"parent" : this.element
		});
		var img = create_element("img",{
			"attributes" : {"src" : "images/" + id + ".png"},
			"css" : {
				"height" : layoutOptions.nev_bar_img_height + "px"		
			},
			"parent" : item
		});
		var title = create_element("div",{
			"attributes" : {"class" : "title"},
			"css" : {
				"top" : layoutOptions.nev_bar_title_top + "px",
				"height" : layoutOptions.nev_bar_title_height + "px",
				"lineHeight" : layoutOptions.nev_bar_title_height + "px"
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
		if(_parent.select_changed){
			_parent.select_changed(this.id);
		}
		_parent.last_nev = this;
	},
	
	release : function(){
		var items = this.element.childNodes;
		if(items.length == 0)
			return ;
		for(var i in items){
			if(items.nodeType == 1){
				Mojo.Event.stopListening(items[i], Mojo.Event.tap, this.tap);
			}
		}
	}
});

var VideoList = Class.create({
	initialize : function(){
		this.element = create_element("div", {
			"css" : {
			}
		});
		this.click = this.click.curry(this);
	},
	setup : function(){
	
	},
	height : function(){
		return this.element.offsetHeight;
	},
	insert_show : function(data){
		var img_height = layoutOptions.show_item_height - layoutOptions.show_item_margin*2 ;
		this.element.style.height = this.element.offsetHeight + layoutOptions.show_item_height + "px";
		var item = create_element("div", {
			"attributes" : {
				"class" : "show_item",
				"css" : {
					"height" : layoutOptions.show_item_height + "px"
				}
			},
			"parent" : this.element
		});
		create_element("img", {
			"attributes" : {"src" : data["show_thumburl"]},
			"css" : {
				"margin" : layoutOptions.show_item_margin + "px",
				"height" : img_height + "px",
			},
			"parent" : item
		});
		
		var detail = create_element("div", {
			"attributes" : {"class" : "detail"},
			"css" : {
				"width" : screen.width - Math.floor(img_height * (128/95)) - layoutOptions.show_item_margin*3  + "px",
				"margin" : layoutOptions.show_item_margin + "px",
				"marginLeft" : "0px",
				"height" : layoutOptions.show_item_height - layoutOptions.show_item_margin*2 + "px"
			},
			"parent" : item
		});
		var title = create_element("div", {
			"attributes" : {"class" : "title"},
			"parent" : detail
		});
			
		title.innerHTML = data["showname"];
		var rating = create_element("div", {
			"attributes" : {"class" : "rating_empty"},
			"parent" : detail
		});
		create_element("div", {
			"attributes" : {"class" : "rating"},
			"css" : {"width" : data["reputation"] * 5.5 + "px"},
			"parent" : rating
		});
		
		var info_line = create_element("div",{"attributes" : {"class" : "info_line"}, "parent" : detail});
		var tip = create_element("div", {"css" : {"marginRight" : "5px"}, "parent" : info_line});
		
		tip.innerHTML = "播放: ";
		tip = create_element("div", {"css" : {"color" : "", "marginRight" : "10px"}, "parent" : info_line});
		tip.innerHTML = data["showtotal_vv"];
		
		tip = create_element("div", {"css" : {"marginRight" : "5px"}, "parent" : info_line});
		tip.innerHTML = "顶踩: ";
		tip = create_element("div", {"css" : {"color" : "red"}, "parent" : info_line});
		tip.innerHTML = data["showtotal_up"];
		tip = create_element("div", {"css" : {}, "parent" : info_line});
		tip.innerHTML = "/";
		tip = create_element("div", {"css" : {"color" : "blue"}, "parent" : info_line});
		tip.innerHTML = data["showtotal_down"];
		
		info_line = create_element("div",{
			"attributes" : {"class" : "info_line"}, 
			"css" : {
					"height" : img_height - 14 - 12 - 11 + "px",
					"overflow" : "hidden",
					"lineHeight" : "11px",
					"textIndent" : "8px"
					},
			"parent" : detail
		});
		var deschead = data["deschead"];
		if(deschead.length > 65)
			deschead = deschead.substring(0,65) + "...";
		info_line.innerHTML = deschead;
		
		Mojo.Event.listen(item, Mojo.Event.tap, this.click);
	},
	insert_video : function(data){
		if(data instanceof Array){
			for(var i in data){
				this.insert(data[i]);
			}
		}
		else if(typeof(data) === "object"){
			if(!data["videoid"])
				return false;
			
			this.size ++;
			if(this.size > this.row_count ){
				this.size = 1;
				this.element.style.height = this.element.offsetHeight + layoutOptions.video_item_height + "px";
			}
			var listItem = create_element("div" ,{
				"attributes" : {
								"class" : "video_item",
								"videoid" : data["videoid"],
								},
				"css" : {
						"height" : layoutOptions.video_item_height + "px",
						"width" : layoutOptions.video_item_width  + "px"
						},
				"parent" : this.element
			});
			
			var itemImg = create_element("img", {
				"attributes" : {
								"src" : configOptions.use_hd?data["img_hd"]:data["img"]
								},
				"css"		: {
								"height" : 	336/448*layoutOptions.video_item_width + "px"			
								},
				"parent" : listItem
			});
			
			var info = create_element("div" ,{
				"attributes" : {
								"class" : "info"
								},
				"parent" : listItem
			});
			var title = create_element("div" ,{
				"attributes" : {
								"class" : "title"
								},
				"parent" : info
			});			
			title.innerHTML = data["title"];
			
			var total_time = create_element("div" ,{
				"attributes" : {
								"class" : "total_time"
								},
				"parent" : info
			});			
			total_time.innerHTML = data["duration"];
			
			var rating_empty = create_element("div" ,{
				"attributes" : {
								"class" : "rating_empty"
								},
				"parent" : info
			});
			create_element("div" ,{
				"attributes" : {
								"class" : "rating"
								},
				"css" : {
							"width" : data["reputation"] * 5.5 + "px"
						},
				"parent" : rating_empty
			});
			
			var detail_btn = create_element("img" ,{
				"attributes" : {
								"class" : "detail_btn",
								"src" : "images/detail_bar.png"
								},
				"parent" : info
			});
			
			Mojo.Event.listen(listItem,Mojo.Event.tap, this.play);
		}
	},
	click : function(parent){
		if(parent.last_clicked){
			if(parent.last_clicked == this)
				return false;
			parent.last_clicked.style.background = "";
			parent.last_clicked.style.color = "";
		}
		this.style.background = "-webkit-gradient(linear, 0 0, 0 bottom, from(#666666), to(#333333))";
		this.style.color = "white";
		parent.last_clicked = this;
	},
	play : function(){
		Mojo.Controller.stageController.pushScene({'name': 'player', 'sceneTemplate': 'player/player-scene'},this.getAttribute("videoid"));
	},
	clear : function(){
		Mojo.Event.stopListening(item, Mojo.Event.tap, this.click);
	}
});