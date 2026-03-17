import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

export function disposeObject(obj: THREE.Object3D): void {
  // Recurse children first
  while (obj.children.length > 0) {
    disposeObject(obj.children[0])
    obj.remove(obj.children[0])
  }

  // Dispose geometry
  if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
    obj.geometry.dispose()
    const mat = obj.material
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose())
    } else {
      mat.dispose()
    }
  }

  // Remove CSS2DObject DOM elements
  if (obj instanceof CSS2DObject) {
    obj.element.remove()
  }
}

export function disposeGroup(group: THREE.Group): void {
  while (group.children.length > 0) {
    disposeObject(group.children[0])
    group.remove(group.children[0])
  }
}
