var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = { height:2.5, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	
	// The cube can have shadows cast onto it, and it can cast shadows
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10, 10,10),
		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
		// See threejs.org/examples/ for other material types
	);
	meshFloor.rotation.x -= Math.PI / 2;
	// Floor can have shadows cast onto it
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	//colores
	var blanco = new THREE.MeshBasicMaterial( {color: 0xeeeeee} );	
	var negro = new THREE.MeshBasicMaterial( {color: 0x333333} );
	var plomo = new THREE.MeshBasicMaterial( {color: 0x555555} );
	var naranja = new THREE.MeshBasicMaterial( {color: 0xEE6C4D} );	
	var fondo = new THREE.MeshBasicMaterial( {color: 0x576490} );	

	//pared
	var geometry = new THREE.PlaneGeometry( 10, 10, 20 );
	var plane = new THREE.Mesh( geometry, fondo );
	scene.add( plane );
	plane.position.set( 3, 5, 0);
	plane.rotation.set( 0, -0.5*Math.PI, 0);
	//muñeco
	
    //panza
	var geometry = new THREE.SphereGeometry( 1.3, 32, 32 );	
	var sphere = new THREE.Mesh( geometry, blanco );
	sphere.position.set( 0, 2.5, 0);
	scene.add( sphere );
	//pecho
	geometry = new THREE.SphereGeometry( 1.6, 32, 32 );	
	sphere = new THREE.Mesh( geometry, blanco );
	sphere.position.set( 0, 0.5, 0);
	scene.add( sphere );
	//cabeza
	geometry = new THREE.SphereGeometry( 1, 32, 32 );	
	sphere = new THREE.Mesh( geometry, blanco );
	sphere.position.set( 0, 4.4, 0);
	scene.add( sphere );
	//botones
	geometry = new THREE.SphereGeometry( 0.13, 10, 10 );	
	sphere = new THREE.Mesh( geometry, negro );
	sphere.position.set( -1.25, 3, 0);
	scene.add( sphere );
	geometry = new THREE.SphereGeometry( 0.13, 10, 10 );	
	sphere = new THREE.Mesh( geometry, negro );
	sphere.position.set( -1.25, 2.2, 0);
	scene.add( sphere );
	geometry = new THREE.SphereGeometry( 0.13, 10, 10 );	
	sphere = new THREE.Mesh( geometry, negro );
	sphere.position.set( -1.25, 1.4, 0);
	scene.add( sphere );
	//ojos
	geometry = new THREE.SphereGeometry( 0.13, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 4.4, -0.3);
	scene.add( sphere );
	geometry = new THREE.SphereGeometry( 0.13, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 4.4, 0.3);
	scene.add( sphere );
	//nariz
	geometry = new THREE.ConeGeometry( 0.1, 0.4, 6 );
	cone = new THREE.Mesh( geometry, naranja );
	scene.add( cone );
	cone.position.set( -1.2, 4.2, 0);
	cone.rotation.set( 0, 0, 0.5*Math.PI);
	//gorro
	geometry = new THREE.CylinderGeometry( 0.8, 0.8, 0.8, 20 );
	cylinder = new THREE.Mesh( geometry, negro );
	scene.add( cylinder );
	cylinder.position.set( 0, 5.6, 0);
	geometry = new THREE.CylinderGeometry( 1, 1, 0.01, 20 );
	cylinder = new THREE.Mesh( geometry, negro );
	scene.add( cylinder );
	cylinder.position.set( 0, 5.2, 0);
	//sonriza
	geometry = new THREE.SphereGeometry( 0.06, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 4, 0.3);
	scene.add( sphere );
	geometry = new THREE.SphereGeometry( 0.06, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 4, -0.3);
	scene.add( sphere );
	//
	geometry = new THREE.SphereGeometry( 0.06, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 3.9, 0.2);
	scene.add( sphere );
	geometry = new THREE.SphereGeometry( 0.06, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 3.9, -0.2);
	scene.add( sphere );

	geometry = new THREE.SphereGeometry( 0.06, 10, 10 );	
	sphere = new THREE.Mesh( geometry, plomo );
	sphere.position.set( -0.9, 3.9, 0);
	scene.add( sphere );

	
	// LIGHTS
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	// scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
	
	
	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);
	
	// Enable Shadows in the Renderer
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;