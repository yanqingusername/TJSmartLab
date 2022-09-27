<template>
	<div id="container"></div>
	
</template>

<script>
import TMap from "TMap";
import axios from "axios";
export default {
	data() {
		return {
			nowLat: 39.867427, // 纬度
			nowLng: 116.377048, // 经度
			map: null, // 地图对象
			//url1:'http://localhost:8070/lislab_war_exploded',
			//url1:'https://scldev.coyotebio-lab.com:8443/lislab',
			//url1:'http://xmr.coyotebio-lab.com:8080/lislab',
			url1:'https://lisalarm.coyotebio-lab.com/lislab',
			//url1:'https://tj.coyotebio-lab.com/lislab',
		}
	},
	created() {
		this.mapInit(this.nowLng, this.nowLat, 12.5)
	},
	methods: {
		
		/**
     	* 根据传入的值渲染地图及传出经纬度和地名
     	* @param lng 经度
     	* @param lat 纬度
     	* @param zoom 地图缩放级别
     	*/
		mapInit(lng, lat, zoom) {
			
			axios({
				method: "get",
				//url: "http://localhost:8070/lislab_war_exploded/warning/getSampleChannelMapDetailInfo.hn",
				url: this.url1+"/warning/getSampleChannelMapDetailInfo.hn",
				params: {
				    
				},
			})
				.then((response) => {
				// response.data.result1.forEach(ref => {
				// 	//alert(ref.channel_name)
					
				// })

				let _this = this;
				_this.map = new TMap.Map(document.getElementById("container"), {
          		// 地图的中心地理坐标。
          		center: new TMap.LatLng(lat, lng),
          		zoom: zoom
        		});

				//创建并初始化MultiMarker
				var markerLayer = new TMap.MultiMarker({
					map: _this.map,  //指定地图容器
					//样式定义
					styles: {
						//创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
						"myStyle": new TMap.MarkerStyle({ 
							"width": 21,  // 点标记样式宽度（像素）
							"height": 21, // 点标记样式高度（像素）
							//"src": 'src/views/sample/image/coyote_logo.png',  //图片路径
							"src": 'coyote_logo.png',  //图片路径
							'offset': { x: 0, y: -20 },
							//焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
							"anchor": { x: 16, y: 32 }  
						}) 
					},
					// //点标记数据数组
					// geometries: [{
					// 	"id": "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
					// 	"styleId": 'myStyle',  //指定样式id
					// 	"position": new TMap.LatLng(39.896407, 116.316989),  //点标记坐标位置
					// 	"properties": {//自定义属性
					// 		"title": "marker1"
					// 	}
					// }, {//第二个点标记
					// 	"id": "2",
					// 	"styleId": 'myStyle',
					// 	"position": new TMap.LatLng(39.994104, 116.287503),
					// 	"properties": {
					// 		"title": "marker2"
					// 	}
					// }
					// ]
				});	
				
				// var mydom;
				// function myInfoWindow(options) {
						
				// 		TMap.DOMOverlay.call(this, options);
				// 		//alert(12);
				// }
				// myInfoWindow.prototype = new TMap.DOMOverlay();
				
				
				for (let index = 0; index < response.data.result1.length; index++) {
					//alert(response.data.result1[index].channel_name)
					// if("" == response.data.result1[index].longitude) {
					// 	response.data.result1[index].longitude = 0;
					// 	alert(response.data.result1[index].longitude)
					// }
					// if("" == response.data.result1[index].latitude) {
					// 	response.data.result1[index].latitude = 0;
					// }
					// 初始化
					markerLayer.add([{
						"id": response.data.result1[index].channel_id,   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
						"styleId": 'myStyle',  //指定样式id
						"position": new TMap.LatLng(response.data.result1[index].latitude,response.data.result1[index].longitude),  //点标记坐标位置
						"content":response.data.result1[index].channel_name,
						"properties": {//自定义属性
							"title": response.data.result1[index].channel_name,
							"sample_sum1":response.data.result1[index].sample_sum1,//总数
							"sample_sum2":response.data.result1[index].sample_sum2,//已收样
							"sample_sum3":response.data.result1[index].sample_sum3,//未收样
							"latitude":response.data.result1[index].latitude,
							"longitude":response.data.result1[index].longitude,
							"site_description":response.data.result1[index].site_description,
							}
						}
					])	

					// myInfoWindow.prototype.onInit = function(options) {
					// 	this.position = options.position;
					// 	this.content = options.content;
					// };
					// // 创建DOM元素，返回一个DOMElement
					// myInfoWindow.prototype.createDOM = function() {
					// 	mydom=document.createElement("div");
					// 	//设置DOM样式
					// 	mydom.style.cssText = 'height:15px;max-width:120px;padding:5px;background:#fff;border:#ccc solid 1px;\
					// 						line-height:15px;font-size:12px;position:absolute;top:0px;left:0px;';
					// 	mydom.innerHTML=this.content;
					// 	return mydom;
					// };
						
					// var myIW = new myInfoWindow({
							
					// 		map:_this.map,
					// 		// position: new TMap.LatLng(response.data.result1[index].latitude, response.data.result1[index].longitude),
					// 		// content: response.data.result1[index].channel_name
					// 		position: new TMap.LatLng(39.896407, 116.316989),
					// 		content:"Hello world!"
					// })
					
				}


				//监听回调函数（非匿名函数）
				var clickHandler = function (evt) {

					var infoWindow = new TMap.InfoWindow({
					map: _this.map,
					position: new TMap.LatLng(evt.geometry.properties.latitude,evt.geometry.properties.longitude),
					offset: { x: 0, y: -32 } //设置信息窗相对position偏移像素，为了使其显示在Marker的上方
					});
					
					// alert(evt.geometry.properties.title)
					// alert(evt.geometry.properties.sample_sum1)
					// alert(evt.geometry.properties.sample_sum2)
					// alert(evt.geometry.properties.sample_sum3)
					infoWindow.close();
					infoWindow.open(); //打开信息窗
					//infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
					infoWindow.setContent(evt.geometry.properties.site_description+"\<br>"+evt.geometry.properties.title+"  "+"采样总数："+evt.geometry.properties.sample_sum1+" 已收样："+evt.geometry.properties.sample_sum2+" 未收样："+evt.geometry.properties.sample_sum3);//设置信息窗内容
				    
				}
				
				//监听marker点击事件
				markerLayer.on("click", clickHandler)
				
				})
				.catch((error) => {
				//请求失败
				console.log(error);
				}); 

			//let _this = this;
			// 在页面渲染完成后进行地图的实例化
			this.$nextTick(() => {
				
					
			})
		},
	}
}
</script>
