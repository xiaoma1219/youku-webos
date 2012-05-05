var debug = false;
debug = true;
var isApiProxy=true;
function log(p) {
	if(debug) {
		//console.log(p);
		Mojo.Log.info(p);
	}

}
//ob 排序方式

function urlencode(str) {
	str = (str + '').toString();

	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function getApiProxyUrl(api) {
	console.log(api);
	if(isApiProxy) {
		api = static_hp + "?api=" + encodeURIComponent(api);
	}

	return api;

}

/* 
 *	add by xiaoma
 *	http request function
*/
function request(url, callbacks){
	var xmlhttp = new XMLHttpRequest();
	if(!xmlhttp)
		return false;
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			//document.write(xmlhttp.responseText);
			if(callbacks && callbacks.success){
				callbacks.success(xmlhttp.responseText);
			}				
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
			if(callbacks && callbacks.fail){
				callbacks.fail();
			}				
		}
		else if(xmlhttp.readyState < 4){
			if(callbacks && callbacks.load){
				callbacks.load();
			}
		}
	};
	//Mojo.Log.info(url);
	xmlhttp.open("GET", url);
	xmlhttp.send();	
}

var static_host = "go.youku.com";
//static_host = "10.10.116.34:8080";
//static_host="192.168.1.101:8080";
var static_hp = "http://" + static_host + "/hpapi/hp.jsp";

var isCdnProxyUrl = "http://" + static_host + "/hpapi/hpgetmp4.jsp?api=";

var isApiProxy = true;
//isApiProxy=false;

var static_uid = "3F413F4E967ABB4F36E32857EF5F54EC";
var static_pid = "a8f2373285115c07";

var static_index = "优酷精选";

var static_movie = "电影";

var static_tv = "电视剧";

var static_arts = "综艺";

var static_ent = "娱乐";

var static_info = "资讯";

var static_video = "视频";

var static_my = "我的优酷";

var static_no_internet_alert_info = "没有连接到互联网，请检查网络设置！";

var static_movie_type = new Array("剧情", "动作", "喜剧", "爱情", "惊悚", "犯罪", "恐怖", "悬疑", "科幻", "动画");
var static_movie_area = new Array("美国", "香港", "法国", "韩国", "大陆", "德国", "台湾", "英国", "印度", "日本");

var static_api_getshowRecList = "http://api.3g.youku.com/openapi-cms/ipad/getShowRecList?pid=" + static_pid + "&uid=" + static_uid + "&version=2.0.1&client=ipad&rt=2";

var static_api_getshowTopList = "http://api.3g.youku.com/openapi-cms/ipad/getShowTopList?pid=" + static_pid + "&uid=" + static_uid + "&version=2.0.1&client=ipad&rt=2";

var static_api_getShowList = "http://api.3g.youku.com/openapi-wireless/getShowList?client=ipad&pid=" + static_pid + "&uid=" + static_uid + "version=2.0.1&rt=2";

//cid=86 娱乐
//cid=91 资讯
var static_api_getVideoList = "http://api.3g.youku.com/openapi-wireless/getVideoList?client=ipad&cid=86&pid=" + static_pid + "&uid=" + static_uid + "&version=2.0.1&rt=2";

//视频分类过滤
var static_api_getVideoFilter = "http://api.3g.youku.com/openapi-wireless/getVideoFilter?pid=" + static_pid + "&rt=2";

//电视电影综艺 地区，分类 过滤
var static_api_getShowFilter = "http://api.3g.youku.com/openapi-wireless/getShowFilter";

//画中画相关视频
var static_api_getRelated = "http://api.3g.youku.com/openapi-wireless/getRelated";

//评论
var static_api_getComments = "http://api.3g.youku.com/openapi-wireless/videos/<vid>/comments";

//视频详情
var static_api_getVideoDetail = "http://api.3g.youku.com/openapi-wireless/getVideoDetail";

//搜索视频
var static_api_searchVideos = "http://api.3g.youku.com/openapi-wireless/searchVideos";

//版权库搜索
var static_api_searchShows = "http://api.3g.youku.com/openapi-wireless/searchShows";

//检查用户名
var static_api_verifyUser = "http://api.3g.youku.com/openapi-wireless/user/verify";

//注册
var static_api_doRegister = "http://api.3g.youku.com/openapi-wireless/user/register";

//登录
var static_api_login = "http://api.3g.youku.com/openapi-wireless/user/login";

//添加评论
var static_api_addComment = "http://api.3g.youku.com/openapi-wireless/videos/<vid>/comments/add";

//收藏列表
var static_api_getFavorites = "http://api.3g.youku.com/openapi-wireless/user/favorites";

//删除收藏
var static_api_delFav = "http://api.3g.youku.com/openapi-wireless/user/favorites/del";

//添加收藏
var static_api_addFav = "http://api.3g.youku.com/openapi-wireless/user/favorites/add";

//顶踩
var static_api_sendUpDown = "http://api.3g.youku.com/openapi-wireless/videos/<vid>/evaluation/<up|down>";
static_api_sendUpDown = "http://api.3g.youku.com/openapi-wireless/sendUpDown";

//关键字提示
var static_api_suggest = "http://api.3g.youku.com/openapi-wireless/keywords/suggest";
static_api_suggest = "http://api.3g.youku.com/openapi-wireless/getSearchKeys";

//频道筛选
var static_api_filters = "http://api.3g.youku.com/openapi-wireless/filters";

//频道筛选接口
var static_api_channels = "http://api.3g.youku.com/openapi-wireless/channels";

//排行榜接口
var static_api_orders = "http://api.3g.youku.com/openapi-wireless/orders";

function orders() {
	var api = static_api_orders;
	api = api + "?pid=" + static_pid + "&rt=2";
	return getApiProxyUrl(api);
}


function channels() {
	var api = static_api_channels;
	api = api + "?pid=" + static_pid + "&rt=2";
	return getApiProxyUrl(api);
}

function filters(type, cid) {
	var api = static_api_filters;
	api = api + "?pid=" + static_pid + "&rt=2";
	var type = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&type=" + type;
	var cid = arguments[1] ? urlencode(arguments[1]) : "";
	api = api + "&cid=" + cid;

	return getApiProxyUrl(api);
}

function suggest(keywords, pz) {
	var api = static_api_suggest;
	api = api + "?pid=" + static_pid + "&rt=2";
	var keywords = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&k=" + keywords + "&pz=" + ( pz ? pz : 30);
	//api = api + "&keywords=" + keywords + "&pz=" + ( pz ? pz : 30);
	return getApiProxyUrl(api);
}

function sendUpDown(vid, action) {
	var api = static_api_sendUpDown;
	api = api + "?pid=" + static_pid + "&rt=2";
	var vid = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&vid=" + vid;
	var content = arguments[1] ? urlencode(arguments[1]) : "";
	api = api + "&action=" + action;

	return getApiProxyUrl(api);
}

function addFav(vid) {

	var api = static_api_addFav;
	var videoids = arguments[0] ? urlencode(arguments[0]) : "";

	//--网站接口
	/*
	api="http://api.youku.com/api_videoFavDel";
	api=api+"?pid=XMTAxNg=="
	api=api+"&videoids="+videoids;
	*/
	//--

	//--无线接口
	api = api + "?pid=" + static_pid;
	api = api + "&vid=" + vid;
	//--

	return getApiProxyUrl(api);
}

function delFav(videoids) {

	var api = static_api_delFav;
	var videoids = arguments[0] ? urlencode(arguments[0]) : "";

	//--网站接口
	/*
	api="http://api.youku.com/api_videoFavDel";
	api=api+"?pid=XMTAxNg=="
	api=api+"&videoids="+videoids;
	*/
	//--

	//--无线接口
	api = api + "?pid=" + static_pid;
	api = api + "&vid=" + videoids;
	//--

	return getApiProxyUrl(api);
}

function getComments(vid, pg, gz) {
	var api = static_api_getComments;
	api = api + "?pid=" + static_pid + "&rt=2";

	var vid = arguments[0] ? urlencode(arguments[0]) : "";
	api = api.replace(/<vid>/, vid);

	var pg = arguments[1] ? urlencode(arguments[1]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[2] ? urlencode(arguments[2]) : "100";
	api = api + "&pz=" + pz;

	return getApiProxyUrl(api);
}

function addComment(vid, content, reply_cid) {
	var api = static_api_addComment;
	api = api + "?pid=" + static_pid + "&rt=2" + "&uid=" + static_uid;

	var vid = arguments[0] ? urlencode(arguments[0]) : "";
	api = api.replace(/<vid>/, vid);

	var content = arguments[1] ? urlencode(arguments[1]) : "";
	api = api + "&content=" + content;

	var reply_cid = arguments[2] ? urlencode(arguments[2]) : false;
	if(reply_cid) {
		api = api + "&reply_cid =" + reply_cid;
	}

	return getApiProxyUrl(api);
}

function getFavorites(ob, pg, pz, fields) {
	var api = static_api_getFavorites;
	api = api + "?pid=" + static_pid + "&rt=2" + "&uid=" + static_uid;

	var ob = arguments[0] ? urlencode(arguments[0]) : "1";
	api = api + "&ob=" + ob;

	var pg = arguments[1] ? urlencode(arguments[1]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[2] ? urlencode(arguments[2]) : "30";
	api = api + "&pz=" + pz;

	var fields = arguments[3] ? urlencode(arguments[3]) : false;
	if(fields) {
		api = api + "&fields=" + fields;
	}

	return getApiProxyUrl(api);
}

function login(uname, pwd) {
	var api = static_api_login;
	api = api + "?pid=" + static_pid + "&uname=" + urlencode(uname) + "&pwd=" + urlencode(pwd);
	return getApiProxyUrl(api);
}

function doRegister(puid, email, pwd) {
	var api = static_api_doRegister;
	api = api + "?pid=" + static_pid + "&puid=" + urlencode(puid) + "&email=" + urlencode(email) + "&pwd=" + urlencode(pwd);
	return getApiProxyUrl(api);
}

function verifyUser(uname) {
	var api = static_api_verifyUser;
	api = api + "?pid=" + static_pid + "&uname=" + urlencode(uname);
	return getApiProxyUrl(api);
}

function searchShows(keyword, ob, pg, pz) {
	var api = static_api_searchShows;
	api = api + "?pid=" + static_pid + "&rt=2";
	api = api + "&format=1";

	var keyword = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&keyword=" + keyword;

	var ob = arguments[1] ? urlencode(arguments[1]) : "2";
	api = api + "&ob=" + ob;

	var pg = arguments[2] ? urlencode(arguments[2]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[3] ? urlencode(arguments[3]) : "100";
	api = api + "&pz=" + pz;

	return getApiProxyUrl(api);
}

function searchVideos(keyword, ob, cid, pg, pz) {
	var api = static_api_searchVideos;
	api = api + "?pid=" + static_pid + "&rt=2";
	api = api + "&format=1";

	var keyword = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&keyword=" + keyword;

	var ob = arguments[1] ? urlencode(arguments[1]) : "2";
	api = api + "&ob=" + ob;

	var cid = arguments[2] ? urlencode(arguments[2]) : "";
	if(cid != "") {
		api = api + "&cid=" + cid;
	}

	var pg = arguments[3] ? urlencode(arguments[3]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[4] ? urlencode(arguments[4]) : "30";
	api = api + "&pz=" + pz;

	console.log(api);
	return getApiProxyUrl(api);
}

function getVideoDetail(vid, format, rp) {
	var api = static_api_getVideoDetail;
	api = api + "?pid=" + static_pid + "&rt=2";

	var vid = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&vid=" + vid;

	var format = arguments[1] ? urlencode(arguments[1]) : "1";
	api = api + "&format=" + format;

	var rp = arguments[2] ? urlencode(arguments[2]) : "0";
	api = api + "&rp=" + rp;
	console.log(api);

	return getApiProxyUrl(api);
}

function getRelated(id, pg, gz) {
	var api = static_api_getRelated;
	api = api + "?pid=" + static_pid + "&rt=2";
	api = api + "&format=1";

	var id = arguments[0] ? urlencode(arguments[0]) : "";
	api = api + "&id=" + id;

	var pg = arguments[1] ? urlencode(arguments[1]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[2] ? urlencode(arguments[2]) : "100";
	api = api + "&pz=" + pz;

	return getApiProxyUrl(api);
}

function getShowFilter(category, filter) {
	var api = static_api_getShowFilter;
	api = api + "/" + category + "/" + filter;
	api = api + "?pid=" + static_pid + "&rt=2";

	return getApiProxyUrl(api);
}

function getshowRecList(category) {
	var api = static_api_getshowRecList;
	var showcategory = arguments[0] ? urlencode(arguments[0]) : "%E7%94%B5%E5%BD%B1";
	api = api + "&showcategory=" + showcategory;
	return getApiProxyUrl(api);
}

function getshowTopList(category, pg, pz) {
	var api = static_api_getshowTopList;
	var showcategory = arguments[0] ? urlencode(arguments[0]) : "%E7%94%B5%E5%BD%B1";
	api = api + "&showcategory=" + showcategory;
	var pg = arguments[1] ? urlencode(arguments[1]) : "1";
	api = api + "&pg=" + pg;
	var pz = arguments[2] ? urlencode(arguments[2]) : "20";
	api = api + "&pz=" + pz;
	return getApiProxyUrl(api);
}

function getShowList(category, area, genre, genrevalue, ob, pg, pz) {

	var api = static_api_getShowList;

	var showcategory = arguments[0] ? urlencode(arguments[0]) : "%E7%94%B5%E5%BD%B1";
	api = api + "&showcategory=" + showcategory;

	var area = arguments[1] ? urlencode(arguments[1]) : "";
	if(area != "") {
		api = api + "&area=" + area;
	}

	var genre = arguments[2] ? urlencode(arguments[2]) : "";
	var genrevalue = arguments[3] ? urlencode(arguments[3]) : "";

	if(genre == "variety_genre") {
		api = api + "&variety_genre=" + genrevalue;
	}
	if(genre == "tv_genre") {
		api = api + "&tv_genre=" + genrevalue;
	}
	if(genre == "movie_genre") {
		api = api + "&movie_genre=" + genrevalue;
	}

	var ob = arguments[4] ? urlencode(arguments[4]) : "2";
	api = api + "&ob=" + ob;

	var pg = arguments[5] ? urlencode(arguments[5]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[6] ? urlencode(arguments[6]) : "30";
	api = api + "&pz=" + pz;

	console.log(api);

	return getApiProxyUrl(api);
}

function getVideoList(cid, ob, pg, pz) {

	var api = static_api_getVideoList;

	var cid = arguments[0] ? urlencode(arguments[0]) : "86";
	api = api + "&cid=" + cid;

	var ob = arguments[1] ? urlencode(arguments[1]) : "2";
	api = api + "&ob=" + ob;

	var pg = arguments[2] ? urlencode(arguments[2]) : "1";
	api = api + "&pg=" + pg;

	var pz = arguments[3] ? urlencode(arguments[3]) : "30";
	api = api + "&pz=" + pz;

	console.log(api);

	return getApiProxyUrl(api);
}

function getVideoFilter(p) {

	var api = static_api_getVideoFilter;

	var p = arguments[0] ? urlencode(arguments[0]) : "0";
	api = api + "&p=" + p;

	console.log(api);

	return getApiProxyUrl(api);
}

Array.prototype.remove = function(dx) {
	if(isNaN(dx) || dx > this.length) {
		return false;
	}
	for(var i = 0, n = 0; i < this.length; i++) {
		if(this[i] != this[dx]) {
			this[n++] = this[i];
		}
	}
	this.length -= 1;
}
Array.prototype.markNull = function(dx) {
	if(isNaN(dx) || dx > this.length) {
		return false;
	}
	for(var i = 0; i < this.length; i++) {
		if(this[i] != this[dx]) {
			;
		} else {
			this[i] = null;
		}
	}

}
Array.prototype.trimNull = function() {
	var b = new Array();
	for(var i = 0; i < this.length; i++) {
		if(this[i]) {
			b.push(this[i]);
		}
	}
	return b;
}
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
	str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
	str = str.replace(/M/g, this.getMonth());
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str;
}

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