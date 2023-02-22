
	AFRAME.registerComponent('target-foundlost', {
		init: function () {	
			let targetentity = this.el;
			 // Wait for model to load.
			targetentity.addEventListener('targetFound', (targetentity) => {
				const targetid = targetentity.srcElement.id;
				console.log(targetid + " target found regcomp");
				document.getElementById('divscanning').classList.add("hidden");	
				
		document.getElementById("imgtrackerguide").style.display = "none";
		videoelem.play();
		videoelem.loop = true;
				
			});
			targetentity.addEventListener('targetLost', (targetentity) => {
				const targetid = targetentity.srcElement.id;
				console.log(targetid + " target lost regcomp");
				document.getElementById('divscanning').classList.remove("hidden");	
		
		document.getElementById("imgtrackerguide").style.display = "block";		
		videoelem.pause();
		
			});
			/*
			targetentity.addEventListener("click", (targetentity) => {
				console.log(targetentity.srcElement.id + " obj clicked");
			});
			*/
		}
	});
	
	
	document.addEventListener("DOMContentLoaded", function() {
		const params = (new URL(location)).searchParams; //get query strings	
		//if(params.has('i')) { i = params.get('i'); }
		const cat = params.get('cat');
		const id = params.get('id');
		const name = params.get('name');		
		
		const mdlpath = "https://www.mdl.miraag.com/models/ts/";
		
		document.title = document.title + " - " + cat + " - " + name;
		document.querySelector('meta[name="description"]').setAttribute("content", document.querySelector('meta[name="description"]').content + " - " + cat + " - " + name);
		
		document.getElementById('imgtrackerguide').src = mdlpath + cat + "/" + id + "/" + name + ".jpg";
		document.getElementById('videoplayback').src = mdlpath + cat + "/" + id + "/" + name + ".mp4";		
		const mgfile = mdlpath + cat + "/" + id + "/" + name + ".mg";
		
		const scenehtml = `
			<a-scene mgar-image="imageTargetSrc: ` + mgfile + `; uiScanning:no;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
			
			<a-assets id="assets-id"></a-assets>
			
			<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
			<a-entity id="target-0" mgar-image-target="targetIndex: 0" target-foundlost>	 
				<a-plane color="black" opacity="1" position="0 0 0" height="1.5" width="1" rotation="0 0 0"></a-plane>			
				<a-video id="videoentity" src="#videoplayback" width="1" height="1.5" position="0 0 0.1"></a-video>
			</a-entity>
		</a-scene>
		`
		_loadHTML(scenehtml);
		videoelem = document.getElementById('videoplayback');
		enableInlineVideo(videoelem);
		videoelem.addEventListener('loadeddata', function() {
		   // Video is loaded and can be played
		   //document.getElementById('loadingtext').innerHTML = "";
			console.log("Video loaded.");
		}, false);
		// Append the new video to the a-assets, where a-assets id="assets-id"
		document.getElementById('assets-id').appendChild(videoelem);
		videoelem.pause();
		videoelem.muted = false;
		document.getElementById('divloading').classList.add("hidden");	

		const sceneEl = document.querySelector('a-scene');
		sceneEl.addEventListener("arError", (event) => {
			if(event.detail.error = "VIDEO_FAIL"){
				console.log("camera failed to load"); //camera permissions were denied
				alert("We need camera access to animate your your Tees.\niOS: iPhone Settings -> Safari -> Camera -> miraag.com -> Ask/Allow\nAndroid: Chrome menu -> Settings -> Site settings -> Camera -> Allowed/Blocked -> miraag.com -> Allow");
			}
		});		
	});


	function PlayPause() {
		el = document.getElementById("btnplaypause");
		if (el.classList.contains("playimg")) {
		  el.classList.remove("playimg");
		  el.classList.add("pauseimg");
		videoelem.muted = true;
		  document.getElementById("imgfingerup").style.display = "none";
		} else {
		  el.classList.remove("pauseimg");
		  el.classList.add("playimg");
		videoelem.muted = false;
		}
	}

	function AutoPlay() {
		document.getElementById('btnautoplay').style.display = 'none';
		document.getElementById('imgfingerup').style.display = 'none';	
		if(document.getElementById("imgtrackerguide").style.display == "none")
			videoelem.play();
	}
		
	function _loadHTML(t) {
		const e = document.createElement("template");
		e.innerHTML = t.trim();
		const s = e.content.firstChild;
		return document.getElementsByTagName("body")[0].appendChild(s),	s
	}