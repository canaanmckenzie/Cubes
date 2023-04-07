import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//scene
const scene = new THREE.Scene()

//camera fields
const fov = 75
const aspect = window.innerWidth/window.innerHeight
const near = 0.1
const far = 100

const camera = new THREE.PerspectiveCamera(
   fov,
   aspect,
   near,
   far
)
camera.position.z = 2

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)

//external controls with mouse
new OrbitControls(camera,renderer.domElement)

//defined geometry
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

//account for screen resizing
window.addEventListener('resize',onWindowResize,false)
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
    render()
}

function animate(){
    requestAnimationFrame(animate)
    cube.rotation.x +=0.01
    cube.rotation.y +=0.01
    render()
}

function render(){
    renderer.render(scene,camera)
}
animate()
