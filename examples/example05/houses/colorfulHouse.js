import * as THREE from 'three';

export function createColorfulHouse() {
  const root = new THREE.Group();

  const colors = {
    wall1: 0xffc93c,
    wall2: 0x6dd3ff,
    wall3: 0xf98bdc,
    trim: 0xffffff,
    roof: 0xb06c3b,
    detail: 0xff3b3b,
  };

  // Corpo
  const body = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 10), new THREE.MeshStandardMaterial({ color: colors.wall1, flatShading: true, roughness: 0.9 }));
  body.position.y = 4;
  root.add(body);

  // Apliques coloridos
  const stripeGeo = new THREE.BoxGeometry(10.1, 0.4, 10.1);
  const stripe = new THREE.Mesh(stripeGeo, new THREE.MeshStandardMaterial({ color: colors.trim, flatShading: true }));
  stripe.position.y = 7.5;
  root.add(stripe);

  // Telhado em duas águas
  const roof = new THREE.Mesh(new THREE.BoxGeometry(12, 1.4, 12), new THREE.MeshStandardMaterial({ color: colors.roof, flatShading: true }));
  roof.position.y = 8.7;
  roof.rotation.x = 0.05;
  root.add(roof);

  // Chaminé vermelha
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3, 1.2), new THREE.MeshStandardMaterial({ color: colors.detail, flatShading: true }));
  chimney.position.set(2.5, 10, -1.5);
  root.add(chimney);

  // Janelas coloridas
  const windowGeo = new THREE.BoxGeometry(1.2, 1.2, 0.3);
  const windowMat = new THREE.MeshStandardMaterial({ color: colors.wall3, emissive: 0x552244, emissiveIntensity: 0.4, flatShading: true });
  const w1 = new THREE.Mesh(windowGeo, windowMat);
  w1.position.set(-2, 6, -5.1);
  const w2 = w1.clone(); w2.position.x = 2;
  const w3 = w1.clone(); w3.position.set(0, 6, 5.1);
  root.add(w1, w2, w3);

  // Pórtico simples
  const porch = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 0.6), new THREE.MeshStandardMaterial({ color: colors.trim, flatShading: true }));
  porch.position.set(0, 1, -5.3);
  root.add(porch);

  root.position.y = 0;
  return root;
}
