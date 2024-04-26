import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    //Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;
    scene.add(camera);

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);

    currentMount.appendChild(renderer.domElement);

    //Cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: .5,
        wireframe: true

      })
    );
    scene.add(cube);
    cube.position.set(0,0,-1)

    //Sphere

    const texttureLoader = new THREE.TextureLoader()
    const texturaMatcap = texttureLoader.load('/matcapPlata.jpg')

    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    const material = new THREE.MeshMatcapMaterial({ matcap: texturaMatcap });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    sphere.position.set(0,1.5,1)
    sphere.scale.set(.8,.8,.8)


    //Torus

    const torus = new THREE.TorusKnotGeometry(0.3, .1, 100, 16);
    const materialTorus = new THREE.MeshNormalMaterial({ 
      flatShading: true
     });
    const torusKnot = new THREE.Mesh(torus, materialTorus);
    scene.add(torusKnot);

    torusKnot.position.set(0, -1.5, 0)
    torusKnot.scale.set(1.5,1.5,1)

    //Orbit Controls

    const controls = new OrbitControls( camera, renderer.domElement );

    controls.enableDamping = true

    
    //Render Scene
    const animate = () => {

      requestAnimationFrame( animate );
    
      renderer.render( scene, camera );

      controls.update()
    
    }
    animate()


    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div
      className="Container3D"
      ref={mountRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default Scene;
