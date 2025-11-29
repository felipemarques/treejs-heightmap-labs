import * as THREE from 'three';

// Cria um NPC zumbi low-poly simples com animação de caminhada "toy".
export function createZombie(options = {}) {
  const {
    skinColor = 0x6b8f72,
    shirtColor = 0x3d556e,
    pantsColor = 0x1d2433,
    trimColor = 0x94a3b8,
    accessoryColor = 0x7a3f2d,
    scale = 1,
    speedFactor = 1.5,
  } = options;

  const root = new THREE.Group();
  root.name = 'ZombieNPC';

  // Corpo
  const bodyGeo = new THREE.BoxGeometry(1.6, 2.2, 1);
  const bodyMat = new THREE.MeshStandardMaterial({ color: shirtColor, flatShading: true });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 2.1;
  root.add(body);

  // Cabeça
  const headGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
  const headMat = new THREE.MeshStandardMaterial({ color: skinColor, flatShading: true });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 3.5;
  root.add(head);

  // Mandíbula levemente separada
  const jawGeo = new THREE.BoxGeometry(1.2, 0.35, 1.1);
  const jaw = new THREE.Mesh(jawGeo, headMat);
  jaw.position.set(0, 2.95, 0.02);
  root.add(jaw);

  // Cabelo/topo
  const hairGeo = new THREE.BoxGeometry(1.2, 0.25, 1.2);
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x2a2f3d, flatShading: true });
  const hair = new THREE.Mesh(hairGeo, hairMat);
  hair.position.set(0, 4.15, 0);
  root.add(hair);

  // Boca horripilante
  const mouthCavityGeo = new THREE.BoxGeometry(0.9, 0.35, 0.6);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x1a0f12, flatShading: true });
  const mouth = new THREE.Mesh(mouthCavityGeo, mouthMat);
  mouth.position.set(0, 3.05, 0.65);
  root.add(mouth);

  // Dentes simples
  const teeth = new THREE.Group();
  const toothGeo = new THREE.BoxGeometry(0.12, 0.16, 0.2);
  const toothMat = new THREE.MeshStandardMaterial({ color: 0xe3e7eb, flatShading: true });
  for (let i = -2; i <= 2; i++) {
    const t = new THREE.Mesh(toothGeo, toothMat);
    t.position.set(i * 0.18, 0, 0.35);
    teeth.add(t);
  }
  teeth.position.set(0, 3.0, 0.65);
  root.add(teeth);

  // Braços
  const armGeo = new THREE.BoxGeometry(0.45, 1.8, 0.6);
  const armMat = new THREE.MeshStandardMaterial({ color: shirtColor, flatShading: true });
  const armL = new THREE.Mesh(armGeo, armMat);
  armL.position.set(-1.1, 2.1, 0);
  const armR = armL.clone();
  armR.position.x = 1.1;
  root.add(armL, armR);

  // Mãos
  const handGeo = new THREE.BoxGeometry(0.55, 0.45, 0.6);
  const handMat = new THREE.MeshStandardMaterial({ color: skinColor, flatShading: true });
  const handL = new THREE.Mesh(handGeo, handMat);
  handL.position.set(-1.1, 1.25, 0);
  const handR = handL.clone();
  handR.position.x = 1.1;
  root.add(handL, handR);

  // Pernas
  const legGeo = new THREE.BoxGeometry(0.55, 1.8, 0.7);
  const legMat = new THREE.MeshStandardMaterial({ color: pantsColor, flatShading: true });
  const legL = new THREE.Mesh(legGeo, legMat);
  legL.position.set(-0.5, 0.9, 0);
  const legR = legL.clone();
  legR.position.x = 0.5;
  root.add(legL, legR);

  // Pés
  const footGeo = new THREE.BoxGeometry(0.7, 0.35, 1.0);
  const footMat = new THREE.MeshStandardMaterial({ color: trimColor, flatShading: true });
  const footL = new THREE.Mesh(footGeo, footMat);
  footL.position.set(-0.5, 0.15, 0.1);
  const footR = footL.clone();
  footR.position.x = 0.5;
  root.add(footL, footR);

  // Cinto/strap
  const beltGeo = new THREE.BoxGeometry(1.7, 0.18, 1.05);
  const beltMat = new THREE.MeshStandardMaterial({ color: accessoryColor, flatShading: true });
  const belt = new THREE.Mesh(beltGeo, beltMat);
  belt.position.set(0, 1.6, 0);
  root.add(belt);

  // Ombreiras finas para dar volume
  const shoulderGeo = new THREE.BoxGeometry(1.9, 0.25, 1.05);
  const shoulder = new THREE.Mesh(shoulderGeo, bodyMat);
  shoulder.position.set(0, 3.1, 0);
  root.add(shoulder);

  // Olhos "huecos" low-poly
  const eyeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.1);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x101010, flatShading: true });
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  const eyeR = eyeL.clone();
  eyeL.position.set(-0.3, 3.65, 0.65);
  eyeR.position.set(0.3, 3.65, 0.65);
  root.add(eyeL, eyeR);

  root.scale.setScalar(scale);

  // Dados para update
  const state = {
    swaySpeed: 2.0,
    stepSpeed: 2.3 * speedFactor,
    headBob: 0,
    armL,
    armR,
    legL,
    legR,
    handL,
    handR,
    footL,
    footR,
    belt,
    jaw,
    root,
  };

  // Função de atualização por frame
  function update(delta, time) {
    const sway = Math.sin(time * state.swaySpeed) * 0.25;
    const step = Math.sin(time * state.stepSpeed) * 0.35;

    state.armL.rotation.x = step * 1.3;
    state.armR.rotation.x = -step * 1.3;
    state.legL.rotation.x = -step;
    state.legR.rotation.x = step;
    state.handL.rotation.x = step * 1.1;
    state.handR.rotation.x = -step * 1.1;
    state.footL.rotation.x = -step * 0.8;
    state.footR.rotation.x = step * 0.8;

    state.headBob = 0.07 * Math.sin(time * 3.2 * speedFactor);
    head.position.y = 3.5 + state.headBob;
    state.jaw.rotation.x = Math.max(0, Math.sin(time * 3.4 * speedFactor) * 0.16);

    // Leve oscilação do tronco
    body.rotation.y = sway * 0.2;
    root.rotation.y += 0; // placeholder to keep API similar
  }

  return { object: root, update };
}
