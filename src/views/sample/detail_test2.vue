<template>
	<div>
          <h1>采样点地图</h1>
		<t-map v-if="isMapShow" ref="tencentMap" @nowLocation="nowLocation"></t-map>
	</div>
</template>

<script>
import tMap from "@/components/tencent-map";
export default {
	 components: { tMap },
	data() {
          return {
               isMapShow: false,
               dataForm: {
                    actLng: 0,
                    actLat: 0
               }
          }	
	},
	created() {
		this.init();
  	},
	activated() {
		//alert(2)
		this.init();
	},
	methods: {
		init() {
               //alert(1)
			 this.$nextTick(() => {
				this.isMapShow = true;
			})

			
		},
		//接收坐标位置的方法
		nowLocation(obj) {
      		this.$set(this.dataForm, "actLng", obj.lng);
      		this.$set(this.dataForm, "actLat", obj.lat);
    	},

	}
}
</script>
