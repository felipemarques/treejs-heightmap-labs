import * as THREE from 'three';
import { createPigeon } from './pigeon.js';

export function createWindmill() {
  const root = new THREE.Group();

  const colors = {
    stone: 0xb0a090,
    darkStone: 0x8a7a6a,
    roof: 0x654321,
    blade: 0xf5f5dc,
    bladeEdge: 0x8b7355,
    wood: 0x8b4513,
    window: 0xffe4b5,
  };

  // Base de pedra (mais larga)
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4.5, 3, 8),
    new THREE.MeshStandardMaterial({ color: colors.darkStone, flatShading: true, roughness: 0.95 })
  );
  base.position.y = 1.5;
  root.add(base);

  // Torre principal (cilindro alto)
  const tower = new THREE.Mesh(
    new THREE.CylinderGeometry(3.8, 4, 14, 8),
    new THREE.MeshStandardMaterial({ color: colors.stone, flatShading: true, roughness: 0.9 })
  );
  tower.position.y = 10;
  root.add(tower);

  // Faixas decorativas de pedra escura
  const bandGeo = new THREE.CylinderGeometry(4.1, 4.1, 0.4, 8);
  const bandMat = new THREE.MeshStandardMaterial({ color: colors.darkStone, flatShading: true });
  
  [5, 10, 15].forEach((y) => {
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = y;
    root.add(band);
  });

  // Telhado cônico
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.2, 3, 8),
    new THREE.MeshStandardMaterial({ color: colors.roof, flatShading: true, roughness: 0.9 })
  );
  roof.position.y = 18.5;
  root.add(roof);

  // Janelas pequenas em diferentes alturas
  const windowGeo = new THREE.BoxGeometry(0.8, 1.2, 0.3);
  const windowMat = new THREE.MeshStandardMaterial({
    color: colors.window,
    emissive: 0x443300,
    emissiveIntensity: 0.3,
    flatShading: true
  });

  const windowPositions = [
    { y: 6, angle: 0 },
    { y: 9, angle: Math.PI / 2 },
    { y: 12, angle: Math.PI },
    { y: 14.5, angle: -Math.PI / 2 },
  ];

  windowPositions.forEach((pos) => {
    const win = new THREE.Mesh(windowGeo, windowMat);
    const radius = 4;
    win.position.set(
      Math.sin(pos.angle) * radius,
      pos.y,
      Math.cos(pos.angle) * radius
    );
    win.rotation.y = -pos.angle;
    root.add(win);
  });

  // Porta de madeira
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 3, 0.3),
    new THREE.MeshStandardMaterial({ color: colors.wood, flatShading: true })
  );
  door.position.set(0, 1.8, 4.3);
  root.add(door);

  // === PÁS DO MOINHO ===
  const bladesGroup = new THREE.Group();
  
  // Eixo central das pás
  const axle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 1.5, 8),
    new THREE.MeshStandardMaterial({ color: colors.wood, flatShading: true })
  );
  axle.rotation.z = Math.PI / 2;
  bladesGroup.add(axle);

  // Criar 4 pás
  const bladeLength = 7;
  const bladeWidth = 1.8;
  const bladeThickness = 0.15;

  for (let i = 0; i < 4; i++) {
    const bladeGroup = new THREE.Group();
    
    // Estrutura principal da pá (bege claro)
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(bladeWidth, bladeLength, bladeThickness),
      new THREE.MeshStandardMaterial({ color: colors.blade, flatShading: true, roughness: 0.8 })
    );
    blade.position.y = bladeLength / 2 + 0.3;
    bladeGroup.add(blade);

    // Moldura de madeira da pá
    const frameMat = new THREE.MeshStandardMaterial({ color: colors.bladeEdge, flatShading: true });
    
    // Frame vertical central
    const frameV = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, bladeLength + 0.6, 0.2),
      frameMat
    );
    frameV.position.set(0, bladeLength / 2 + 0.3, 0.05);
    bladeGroup.add(frameV);

    // Frames horizontais
    [0.3, bladeLength / 2 + 0.3, bladeLength + 0.3].forEach((y) => {
      const frameH = new THREE.Mesh(
        new THREE.BoxGeometry(bladeWidth + 0.1, 0.25, 0.2),
        frameMat
      );
      frameH.position.set(0, y, 0.05);
      bladeGroup.add(frameH);
    });

    // Frames laterais
    [-bladeWidth / 2, bladeWidth / 2].forEach((x) => {
      const frameS = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, bladeLength + 0.6, 0.2),
        frameMat
      );
      frameS.position.set(x, bladeLength / 2 + 0.3, 0.05);
      bladeGroup.add(frameS);
    });

    // Rotacionar cada pá em 90 graus
    bladeGroup.rotation.z = (Math.PI / 2) * i;
    bladesGroup.add(bladeGroup);
  }

  // Posicionar o conjunto de pás na frente do moinho
  bladesGroup.position.set(0, 13, 4.2);
  bladesGroup.rotation.x = - Math.PI / 90; // Inclinação para trás (topo perto, base longe)
  
  // Adicionar animação de rotação às pás
  bladesGroup.userData.rotate = true;
  bladesGroup.userData.rotationSpeed = 0.5; // velocidade de rotação
  
  root.add(bladesGroup);

  // Pequena plataforma de observação
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(2.5, 2.5, 0.3, 8),
    new THREE.MeshStandardMaterial({ color: colors.wood, flatShading: true })
  );
  platform.position.y = 16;
  root.add(platform);

  root.position.y = 0;
  
  // Pombos
  const pigeons = [];
  const numPigeons = 5 + Math.floor(Math.random() * 4); // 5 to 8 pigeons
  
  for (let i = 0; i < numPigeons; i++) {
    const pigeon = createPigeon();
    // Random position on the platform or roof
    const angle = Math.random() * Math.PI * 2;
    const radius = 2 + Math.random() * 2;
    const height = 16 + Math.random() * 0.5; // On platform
    
    pigeon.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    pigeon.rotation.y = Math.random() * Math.PI * 2;
    
    root.add(pigeon);
    pigeons.push(pigeon);
  }

  // Função de update para rotação das pás e pombos
  root.userData.update = (delta, playerPos) => {
    if (bladesGroup.userData.rotate) {
      bladesGroup.rotation.z += bladesGroup.userData.rotationSpeed * delta;
    }
    
    // Update pigeons
    for (let i = pigeons.length - 1; i >= 0; i--) {
      const p = pigeons[i];
      if (p.userData.update) {
        p.userData.update(delta, playerPos);
      }
      
      if (p.userData.remove) {
        root.remove(p);
        pigeons.splice(i, 1);
        
        // Cleanup resources
        p.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    }
  };

  return root;
}
