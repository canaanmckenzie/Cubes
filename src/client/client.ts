import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module' //with allowsyntheticdefaults only used with default import
import {GUI} from 'dat.gui'

//create scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

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

//controls 
const controls = new OrbitControls(camera,renderer.domElement)
//controls.addEventListener('change',render) //line unnecessary if re rendering in animation loop

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

//add stats to animation
const stats = new Stats()
document.body.appendChild(stats.dom)

//gui
const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation,'x',0,Math.PI * 2)
cubeRotationFolder.add(cube.rotation,'y',0,Math.PI * 2)
cubeRotationFolder.add(cube.rotation,'z',0,Math.PI * 2)
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position,'x',-10,10,2)
cubePositionFolder.add(cube.position,'y',-10,10,2)
cubePositionFolder.add(cube.position,'z',-10,10,2)
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale,'x',-5,5)
cubeScaleFolder.add(cube.scale,'z',-5,5)
cubeScaleFolder.add(cube.scale,'y',-5,5)

function animate(){
    requestAnimationFrame(animate)
    //cube.rotation.x +=0.01
    //cube.rotation.y +=0.01
    render()
    stats.update()
}

function render(){
    renderer.render(scene,camera)
}

animate()

