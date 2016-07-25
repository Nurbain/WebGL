var scene , renderer , camera, dae
	
function init(name,fond) {

	//Création de la scène 
      scene = new THREE.Scene();
      var WIDTH = 825;
      var HEIGHT = 450;

      renderer = new THREE.WebGLRenderer({antialias:true});
	  renderer.setClearColor(fond);
      renderer.setSize(WIDTH, HEIGHT);
	  renderer.localClippingEnabled;
      document.getElementById("module").appendChild(renderer.domElement);
	  
	//Création de la caméra 
      camera = new THREE.PerspectiveCamera(5, WIDTH / HEIGHT, 0.1, 10000);
      camera.position.set(40,50,80);
      scene.add(camera);
	 
	//viewport
      window.addEventListener('resize', function() {
       var WIDTH = 831;
       var HEIGHT = 450;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });
	
	//Controle , zoom ect
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	//Lumière 

      var light2 = new THREE.PointLight(0xd7f0ff, 0.2);
      light2.position.set(200,200,100);
      scene.add(light2);

	var sphereSize = 1; 
	var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize ); 
	scene.add( pointLightHelper2 );

	var light3 = new THREE.PointLight(0xFFFFFF, 0.5);
		  light3.position.set(-150,0,0);
		  scene.add(light3);

	var sphereSize = 1; 
	var pointLightHelper3 = new THREE.PointLightHelper( light3, sphereSize ); 
	scene.add( pointLightHelper3 );

	var light4 = new THREE.PointLight(0xFFFFFF, 0.5);
		  light4.position.set(150,0,0);
		  scene.add(light4);

	var sphereSize = 1; 
	var pointLightHelper4 = new THREE.PointLightHelper( light4, sphereSize ); 
	scene.add( pointLightHelper4 );
	
	
	//exportation de l'objet
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/'+name , function ( collada ) {
		dae = collada.scene;
		var skin = collada.skins[ 0 ];
		dae.position.set(0,0,0);
		dae.scale.set(1.5,1.5,1.5);
		scene.add(dae);
	});
}

//Animation 
function animated() {
    requestAnimationFrame(animated);
    renderer.render(scene, camera);
    controls.update();
}


var rotationSpeed = 1.2;

function drawScene() 
{
	rotation[1] += rotationSpeed / 60.0;
	requestAnimationFrame(drawScene);
}


init("Scatol.dae",0xBDBDBD)
animated()
drawScene()