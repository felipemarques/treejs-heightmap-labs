import * as THREE from 'three';

export function createVillageHouse() {
  const root = new THREE.Group();

  const colors = {
    wall: 0xe8d4a0,
    wood: 0x8b5a3c,
    roof: 0xa04000,
    door: 0x5c3317,
    stone: 0x808080,
  };

  // Base de pedra
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(8, 0.8, 8), 
    new THREE.MeshStandardMaterial({ color: colors.stone, flatShading: true, roughness: 1.0 })
  );
  foundation.position.y = 0.4;
  root.add(foundation);

  // Corpo principal
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(8, 5, 8), 
    new THREE.MeshStandardMaterial({ color: colors.wall, flatShading: true, roughness: 0.9 })
  );
  body.position.y = 3.3;
  root.add(body);

  // Telhado em pirâmide
  const roofGeo = new THREE.ConeGeometry(6.5, 4, 4);
  const roofMat = new THREE.MeshStandardMaterial({ color: colors.roof, flatShading: true, roughness: 0.95 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 7.8;
  roof.rotation.y = Math.PI / 4;
  root.add(roof);

  // Vigas de madeira (detalhes)
  const beamMat = new THREE.MeshStandardMaterial({ color: colors.wood, flatShading: true });
  
  // Vigas horizontais
  const hBeam1 = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.3, 0.3), beamMat);
  hBeam1.position.set(0, 2, -4.1);
  const hBeam2 = hBeam1.clone();
  hBeam2.position.z = 4.1;
  const hBeam3 = hBeam1.clone();
  hBeam3.position.set(0, 4.5, -4.1);
  const hBeam4 = hBeam3.clone();
  hBeam4.position.z = 4.1;
  
  root.add(hBeam1, hBeam2, hBeam3, hBeam4);

  // Porta de madeira
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 0.2), 
    new THREE.MeshStandardMaterial({ color: colors.door, flatShading: true })
  );
  door.position.set(0, 2, -4.1);
  root.add(door);

  // Janelas pequenas
  const windowGeo = new THREE.BoxGeometry(1, 1, 0.2);
  const windowMat = new THREE.MeshStandardMaterial({ 
    color: 0xffe4b5, 
    emissive: 0x442200, 
    emissiveIntensity: 0.3, 
    flatShading: true 
  });
  
  const w1 = new THREE.Mesh(windowGeo, windowMat);
  w1.position.set(-2.5, 3.5, -4.1);
  const w2 = w1.clone();
  w2.position.x = 2.5;
  const w3 = w1.clone();
  w3.position.set(0, 3.5, 4.1);
  
  root.add(w1, w2, w3);

  // Pequena chaminé
  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 2.5, 0.8), 
    new THREE.MeshStandardMaterial({ color: colors.stone, flatShading: true })
  );
  chimney.position.set(2, 8.5, -2);
  root.add(chimney);

  root.position.y = 0;
  return root;
}
