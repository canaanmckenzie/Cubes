import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//scene
const scene = new THREE.Scene()

//camera fields
const fov = 75
const aspect = 1 //window.innerWidth/window.innerHeight
const near = 0.1
const far = 100
const canvasSize = 330
const canvasWidthSize = window.innerWidth/4 //potentiall useful for windowresizing
const canvasHeightSize = window.innerHeight/4

//setup multiple cameras - CHANGE WITH constants!
const camera1 = new THREE.PerspectiveCamera(fov,1,near,far)
const camera2 = new THREE.OrthographicCamera(-aspect,aspect,aspect,-aspect,near,far)
const camera3 = new THREE.OrthographicCamera(-aspect,aspect,aspect,-aspect,near,far)
const camera4 = new THREE.OrthographicCamera(-aspect,aspect,aspect,-aspect,near,far)

camera1.position.z = 2
camera2.position.y = 1
camera2.lookAt(new THREE.Vector3(0,0,0))
camera3.position.z = 1
camera4.position.x = 1
camera4.lookAt(new THREE.Vector3(0,0,0))

const canvas1 = document.getElementById('c1') as HTMLCanvasElement
const canvas2 = document.getElementById('c2') as HTMLCanvasElement
const canvas3 = document.getElementById('c3') as HTMLCanvasElement
const canvas4 = document.getElementById('c4') as HTMLCanvasElement

const renderer1 = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(canvasSize,canvasSize)
const renderer2 = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(canvasSize,canvasSize)
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3})
renderer3.setSize(canvasSize,canvasSize)
const renderer4 = new THREE.WebGLRenderer({canvas: canvas4})
renderer4.setSize(canvasSize,canvasSize)

/*
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
*/

//external controls with mouse
new OrbitControls(camera1,renderer1.domElement) 
new OrbitControls(camera2,renderer2.domElement) 
new OrbitControls(camera3,renderer3.domElement) 
new OrbitControls(camera4,renderer4.domElement) 

//defined geometry
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

//account for screen resizing
/*
window.addEventListener('resize',onWindowResize,false)
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
    render()
}
*/
function animate(){
    requestAnimationFrame(animate)
    cube.rotation.x +=0.01
    cube.rotation.y +=0.01
    render()
}

function render(){
    renderer1.render(scene,camera1)
    renderer2.render(scene,camera2)
    renderer3.render(scene,camera3)
    renderer4.render(scene,camera4)
}
animate()
