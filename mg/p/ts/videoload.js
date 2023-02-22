
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
		
		const sceneEl = document.querySelector('a-scene');
		sceneEl.addEventListener("arError", (event) => {
			if(event.detail.error = "VIDEO_FAIL"){
				console.log("camera failed to load"); //camera permissions were denied
				//alert("We need camera access to animate your your Tees.\niOS: iPhone Settings -> Safari -> Camera -> miraag.com -> Ask/Allow\nAndroid: Chrome menu -> Settings -> Site settings -> Camera -> Allowed/Blocked -> miraag.com -> Allow");
			}
		});
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
		videoelem.play();
	}