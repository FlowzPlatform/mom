<template>
	<div class="splitter-container">
		<div v-for="n in count" :class="'split split-' + direction" :id="'slot-' + n + '-' + instanceID">
			<slot :name="'slot-' + n">
				Empty Slot <pre>&lt;div slot="slot-{{n}}"&gt;Your Content&lt;/div&gt;</pre>
			</slot>
		</div>
	</div>
</template>
<script>
	export default 
	{
		name: 'splitter',
		props: {
			'direction': { type: String, default: 'horizontal'}, 
			'count': { type: Number, default: 2 },
			'settings': { default: function() { return { }; } }
		},
		data: function() {
			return {
				instanceID: 0,
				instance: null
			}
		},
		created: function() {
			this.instanceID = this.getUniqueID()
		},
		mounted: function () {
			if(this.instance) return console.error("Splitter instance already exists !!");

			let ids = [];
			for(let i=1; i <= this.count; ++i)
				ids.push('#slot-' + i + "-" + this.instanceID);

			if(!this.settings.direction && this.direction) this.settings.direction = this.direction;

			this.instance = Split(ids, this.settings);
		},
		beforeDestroy: function() {
			this.instance.destroy();
			this.instance = null;
		},
		methods: {
			getUniqueID: function() {
				return (new Date().getUTCMilliseconds().toString()) + Math.floor(Math.random() * 1000);
			}
		}
	}
</script>
<style>
	.splitter-container {
		height: 100%;
	}

  .split {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

	.gutter {
		background-color: #eee;

		background-repeat: no-repeat;
		background-position: 50%;
	}

	.gutter.gutter-vertical {
		cursor: ns-resize;		
		background-image:  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')
	}

	.gutter.gutter-horizontal {
		cursor: ew-resize;
		background-image:  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')
	}

	.split.split-horizontal, .gutter.gutter-horizontal {
		height: 100%;
		float: left;
	}		
</style>