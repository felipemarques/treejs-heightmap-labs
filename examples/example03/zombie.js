import * as THREE from 'three';

// Cria um NPC zumbi low-poly simples com animação de caminhada "toy".
export function createZombie(options = {}) {
  const {
    skinColor = 0x6b8f72,
    shirtColor = 0x3d556e,
    pantsColor = 0x1d2433,
    scale = 1,
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

  // Braços
  const armGeo = new THREE.BoxGeometry(0.45, 1.8, 0.6);
  const armMat = new THREE.MeshStandardMaterial({ color: shirtColor, flatShading: true });
  const armL = new THREE.Mesh(armGeo, armMat);
  armL.position.set(-1.1, 2.1, 0);
  const armR = armL.clone();
  armR.position.x = 1.1;
  root.add(armL, armR);

  // Pernas
  const legGeo = new THREE.BoxGeometry(0.55, 1.8, 0.7);
  const legMat = new THREE.MeshStandardMaterial({ color: pantsColor, flatShading: true });
  const legL = new THREE.Mesh(legGeo, legMat);
  legL.position.set(-0.5, 0.9, 0);
  const legR = legL.clone();
  legR.position.x = 0.5;
  root.add(legL, legR);

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
    stepSpeed: 1.5,
    headBob: 0,
    armL,
    armR,
    legL,
    legR,
    root,
  };

  // Função de atualização por frame
  function update(delta, time) {
    const sway = Math.sin(time * state.swaySpeed) * 0.25;
    const step = Math.sin(time * state.stepSpeed) * 0.35;

    state.armL.rotation.x = step;
    state.armR.rotation.x = -step;
    state.legL.rotation.x = -step;
    state.legR.rotation.x = step;

    state.headBob = 0.05 * Math.sin(time * 3.2);
    head.position.y = 3.5 + state.headBob;

    // Leve oscilação do tronco
    body.rotation.y = sway * 0.2;
    root.rotation.y += 0; // placeholder to keep API similar
  }

  return { object: root, update };
}
