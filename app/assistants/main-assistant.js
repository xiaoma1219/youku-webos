function MainAssistant() {}

MainAssistant.prototype = {
	setup : function(){
		this.setupWidget();
	},
	setupWidget : function(){
		this.layout = this.controller.get("mojo-scene-main");
		this.header_bar = new mainHeader(this.layout);
		this.nev_bar = new nevBar(this.layout, this.nev_changed.bind(this));
	},
	nev_changed : function(current_nev){
		Mojo.Log.info(current_nev);
	},	
	activate : function(){
	},
	deactivate : function(){
	},
	cleanup : function(){
	}
}