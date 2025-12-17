import * as THREE from 'three';

export function createModernHouse() {
  const root = new THREE.Group();

  const colors = {
    wall: 0xf0f0f0,
    accent: 0x2c3e50,
    roof: 0x34495e,
    window: 0x3498db,
  };

  // Corpo principal (cubo grande)
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(12, 7, 10), 
    new THREE.MeshStandardMaterial({ color: colors.wall, flatShading: true, roughness: 0.3, metalness: 0.1 })
  );
  body.position.y = 3.5;
  root.add(body);

  // Telhado plano
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(12.5, 0.6, 10.5), 
    new THREE.MeshStandardMaterial({ color: colors.roof, flatShading: true, roughness: 0.7 })
  );
  roof.position.y = 7.3;
  root.add(roof);

  // Faixa decorativa vertical
  const accentBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 7.2, 10.2), 
    new THREE.MeshStandardMaterial({ color: colors.accent, flatShading: true })
  );
  accentBar.position.set(-3, 3.5, 0);
  root.add(accentBar);

  // Janelas grandes (vidro)
  const windowGeo = new THREE.BoxGeometry(2.5, 4, 0.3);
  const windowMat = new THREE.MeshStandardMaterial({ 
    color: colors.window, 
    emissive: 0x1a5c8a, 
    emissiveIntensity: 0.3, 
    flatShading: true,
    transparent: true,
    opacity: 0.7
  });
  
  const w1 = new THREE.Mesh(windowGeo, windowMat);
  w1.position.set(1.5, 4, -5.15);
  const w2 = w1.clone();
  w2.position.set(4.5, 4, -5.15);
  const w3 = w1.clone();
  w3.position.set(0, 4, 5.15);
  
  root.add(w1, w2, w3);

  // Porta de entrada minimalista
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 3, 0.2), 
    new THREE.MeshStandardMaterial({ color: colors.accent, flatShading: true })
  );
  door.position.set(-1, 2, -5.1);
  root.add(door);

  // Pequena varanda
  const balcony = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.3, 1.5), 
    new THREE.MeshStandardMaterial({ color: colors.accent, flatShading: true })
  );
  balcony.position.set(-1, 0.5, -6);
  root.add(balcony);

  root.position.y = 0;
  return root;
}
