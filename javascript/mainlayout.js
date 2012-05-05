//main screen layout
var mainHeader = Class.create({
	initialize : function(parent){
		this.element = create_element("div", {
			"attributes" : {}
		});
		this.setup();
	},
	setup : function(){
		
	},
});

var nevBar = Class.create({
	initialize : function(parent, select_change){
		this.element = create_element("div", {
				"attributes" : {"class" : "nev_bar_" + screen.width},
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
		var item = create_element("div",{
				"attributes" : {"class" : "nev_item", "id": id},
				"parent" : this.element
				});
		var img = create_element("img",{
				"attributes" : {"src" : "images/" + id + ".png"},
				"parent" : item
				});
		var title = create_element("div",{
				"attributes" : {"class" : "title"},
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