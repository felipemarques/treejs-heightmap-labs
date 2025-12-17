import * as THREE from 'three';

export function createTowerHouse() {
  const root = new THREE.Group();

  const colors = {
    stone: 0x6b6b6b,
    darkStone: 0x4a4a4a,
    roof: 0x8b3a3a,
    window: 0xffffe0,
    wood: 0x654321,
  };

  // Torre base (mais alta)
  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(6, 12, 6), 
    new THREE.MeshStandardMaterial({ color: colors.stone, flatShading: true, roughness: 0.95 })
  );
  tower.position.y = 6;
  root.add(tower);

  // Detalhes de pedra escura (camadas)
  const layerGeo = new THREE.BoxGeometry(6.3, 0.4, 6.3);
  const layerMat = new THREE.MeshStandardMaterial({ color: colors.darkStone, flatShading: true });
  
  [3, 6, 9, 11.5].forEach((y) => {
    const layer = new THREE.Mesh(layerGeo, layerMat);
    layer.position.y = y;
    root.add(layer);
  });

  // Telhado cônico
  const roofGeo = new THREE.ConeGeometry(4.5, 3, 8);
  const roofMat = new THREE.MeshStandardMaterial({ color: colors.roof, flatShading: true, roughness: 0.9 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 13.5;
  root.add(roof);

  // Janelas em espiral (diferentes alturas)
  const windowGeo = new THREE.BoxGeometry(0.8, 1.2, 0.3);
  const windowMat = new THREE.MeshStandardMaterial({ 
    color: colors.window, 
    emissive: 0x555500, 
    emissiveIntensity: 0.4, 
    flatShading: true 
  });

  // Janelas em diferentes posições e alturas
  const positions = [
    { x: 0, y: 4, z: -3.15 },
    { x: 3.15, y: 7, z: 0, rot: Math.PI / 2 },
    { x: 0, y: 10, z: 3.15, rot: Math.PI },
    { x: -3.15, y: 8.5, z: 0, rot: -Math.PI / 2 },
  ];

  positions.forEach((pos) => {
    const win = new THREE.Mesh(windowGeo, windowMat);
    win.position.set(pos.x, pos.y, pos.z);
    if (pos.rot) win.rotation.y = pos.rot;
    root.add(win);
  });

  // Porta de madeira robusta
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 3, 0.3), 
    new THREE.MeshStandardMaterial({ color: colors.wood, flatShading: true })
  );
  door.position.set(0, 1.5, -3.15);
  root.add(door);

  // Merlões no topo (decoração de castelo)
  const merlonGeo = new THREE.BoxGeometry(1, 0.8, 1);
  const merlonMat = new THREE.MeshStandardMaterial({ color: colors.darkStone, flatShading: true });
  
  const merlonPositions = [
    { x: -2.5, z: -2.5 },
    { x: 2.5, z: -2.5 },
    { x: -2.5, z: 2.5 },
    { x: 2.5, z: 2.5 },
  ];

  merlonPositions.forEach((pos) => {
    const merlon = new THREE.Mesh(merlonGeo, merlonMat);
    merlon.position.set(pos.x, 12.4, pos.z);
    root.add(merlon);
  });

  root.position.y = 0;
  return root;
}
