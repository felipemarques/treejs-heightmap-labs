import * as THREE from 'three';

export function createCottageHouse() {
  const root = new THREE.Group();

  // Corpo
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xbfa172, roughness: 0.9, flatShading: true });
  const body = new THREE.Mesh(new THREE.BoxGeometry(9, 6, 9), bodyMat);
  body.position.y = 3;
  root.add(body);

  // Estrutura madeira
  const beamMat = new THREE.MeshStandardMaterial({ color: 0x7b5130, roughness: 0.85, flatShading: true });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.35, 9.2), beamMat);
  beam.position.y = 6.4;
  root.add(beam);

  // Telhado
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x5b442f, roughness: 0.95, flatShading: true });
  const roof = new THREE.Mesh(new THREE.BoxGeometry(11, 2, 11), roofMat);
  roof.position.y = 7.6;
  roof.scale.y = 1.5;
  roof.rotation.x = 0.08;
  root.add(roof);

  // Porta
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x5a3a24, flatShading: true }));
  door.position.set(0, 2, -4.6);
  root.add(door);

  // Janela
  const win = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.2), new THREE.MeshStandardMaterial({ color: 0xf1e7d0, emissive: 0x332200, emissiveIntensity: 0.25, flatShading: true }));
  win.position.set(2, 3.5, 4.6);
  root.add(win);

  root.position.y = 0;
  return root;
}
