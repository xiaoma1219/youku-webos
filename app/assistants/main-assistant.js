function MainAssistant() {}

MainAssistant.prototype = {
	setup : function(){
		this.controller.enableFullScreenMode(true);
		this.controller.stageController.setWindowOrientation("up");
		
		this.setupWidget();
	},
	setupWidget : function(){
		this.element = this.controller.get("mojo-scene-main");
		this.element.style.background = "white";
		this.tip_scroll = create_element("div", {
			"attributes" : {
				"class" : "scroll", 
				"x-mojo-element" : "Scroller"
			},
			"css" : {
				"maxHeight" : screen.height * 0.5 + "px" 
			}
		});
		this.header_bar = new MainHeader(this.element);
		
		this.nev_bar = new NevBar(this.element);
		this.nev_bar.select_changed = this.nev_changed.bind(this);
		
		this.search_bar = new SearchBar(this.header_bar.element);
		this.search_bar.updating_suggest = this.update_suggest.bind(this);
		this.search_bar.blured = (function(){this.tip_box.hide(); this.tip_list.clear();}).bind(this);
		this.search_bar.search = this.search.bind(this);
		this.history_button = create_element("div",{
			"attributes" : {"class" : "history_button"},
			"css" : {"width" : screen.width - layoutOptions.header_container_width - 
								layoutOptions.search_bar_width - 12 + "px"},
			"parent" : this.element
		});
		/*
		 * init tip box
		 */
		this.tip_box = new TipBox(this.element, {
			"css" : {
				"width" : screen.width - layoutOptions.header_container_width + "px",
				"top" : layoutOptions.header_height - layoutOptions.search_bar_top + "px",
				"right" : "2px"
			}
		});
		this.tip_list = new TipList();
		this.tip_list.click = this.tip_list_item_click.bind(this);
		this.tip_scroll.appendChild(this.tip_list.element);
		this.tip_box.insert(this.tip_scroll);
		
		
		this.video_list = new VideoList();
		this.video_scroll = create_element("div", {
			"attributes" : {
				"class" : "scroll", 
				"x-mojo-element" : "Scroller"
			},
			"css" : {
				"height" : screen.height - layoutOptions.nev_bar_height - layoutOptions.header_height + "px"
			},
			"parent" : this.element
		});
		this.video_scroll.appendChild(this.video_list.element);
		
	},
	nev_changed : function(current_nev){
		Mojo.Log.info(current_nev);
	},
	
	update_suggest : function(data){
		data = Mojo.parseJSON(data);
		this.tip_list.clear();
		if(data["status"] == "success"){
			if(data["total"] == 0){
				this.tip_box.hide();
			}
			else{
				this.tip_box.title("搜索");
				this.tip_box.show();
				for( var i in data["result"]){
					if(typeof(data["result"][i]) === "object")
						this.tip_list.insert(data["result"][i]["keyword"]);
				}
			}
		}
		else{
			this.parent.tip_box.hide();
		}
		
	},
	tip_list_item_click : function(value){
		this.search_bar.value(value);
		this.search_bar.submit();
	},
	search : function(){
		request(searchShows(this.search_bar.value()), {
			success : this.update_show_list.bind(this)
		});
	},
	update_show_list : function(data){
		data = Mojo.parseJSON(data);
		if(data["status"] == "success" && data["total"] > 0){
			for( var i in data["results"]){
				if(typeof(data["results"][i]) === "object")
					this.video_list.insert_show(data["results"][i]);
			}
		}
		if(this.video_list.height() < screen.height - layoutOptions.header_height - layoutOptions.nev_bar_height){
			request(searchVideos(this.search_bar.value()), {
				success : this.update_video_list.bind(this)
			});
		}
	},
	update_video_list : function(data){
		data = Mojo.parseJSON(data);
		if(data["status"] == "success" && data["total"] > 0){
			for( var i in data["results"]){
				if(typeof(data["results"][i]) === "object")
					this.video_list.insert_video(data["results"][i]);
			}
		}
	},
	activate : function(){
	},
	deactivate : function(){
	},
	cleanup : function(){
		this.nev_bar.release();
		this.header_bar.release();
		this.tip_list.clear();
	}
}