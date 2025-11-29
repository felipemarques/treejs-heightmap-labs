import * as THREE from 'three';

export function createTudorHouse() {
  const root = new THREE.Group();

  // Base de pedra
  const baseGeo = new THREE.BoxGeometry(10, 6, 10);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x7a7a7a, roughness: 0.9, flatShading: true });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 3;
  root.add(base);

  // Corpo em madeira
  const bodyGeo = new THREE.BoxGeometry(10, 8, 10);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xc5a168, roughness: 0.7, flatShading: true });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 3 + 4 + 0.5;
  root.add(body);

  // Estrutura de vigas
  const beamMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1a, roughness: 0.8, flatShading: true });
  const beams = new THREE.Group();
  const beamGeoH = new THREE.BoxGeometry(10.2, 0.4, 0.4);
  const beamGeoV = new THREE.BoxGeometry(0.4, 8.4, 0.4);
  // horizontais
  [4.5, 0, -4.5].forEach((z) => {
    const b = new THREE.Mesh(beamGeoH, beamMat);
    b.position.set(0, 7, z);
    beams.add(b);
  });
  // verticais
  [-4.8, 4.8].forEach((x) => {
    const b1 = new THREE.Mesh(beamGeoV, beamMat);
    b1.position.set(x, 7, -4.8);
    beams.add(b1);
    const b2 = b1.clone();
    b2.position.z = 4.8;
    beams.add(b2);
  });
  beams.position.y = 0.5;
  root.add(beams);

  // Telhado inclinado
  const roofGeo = new THREE.BoxGeometry(12, 1.2, 12);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x8a3b1f, roughness: 0.8, flatShading: true });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 3 + 8 + 1.2;
  roof.scale.y = 1.4;
  roof.rotation.x = 0.08;
  root.add(roof);

  // Chaminé simples
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshStandardMaterial({ color: 0x5a5a5a, flatShading: true }));
  chimney.position.set(-3, roof.position.y + 1.5, 2);
  root.add(chimney);

  // Pequenas janelas
  const windowGeo = new THREE.BoxGeometry(1.2, 1.2, 0.2);
  const windowMat = new THREE.MeshStandardMaterial({ color: 0xf1e9c9, emissive: 0x332200, emissiveIntensity: 0.4, flatShading: true });
  const w1 = new THREE.Mesh(windowGeo, windowMat);
  w1.position.set(0, 7, -5.1);
  const w2 = w1.clone(); w2.position.set(0, 7, 5.1);
  root.add(w1, w2);

  root.position.y = 0;
  return root;
}
