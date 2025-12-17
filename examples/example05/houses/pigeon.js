import * as THREE from 'three';

export function createPigeon() {
  const root = new THREE.Group();

  const colors = {
    body: 0x888888,
    head: 0x555555,
    beak: 0xffaa00,
    leg: 0xff8888,
    wing: 0x777777,
  };

  // Body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.3, 0.6),
    new THREE.MeshStandardMaterial({ color: colors.body, flatShading: true })
  );
  body.position.y = 0.3;
  root.add(body);

  // Head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.3),
    new THREE.MeshStandardMaterial({ color: colors.head, flatShading: true })
  );
  head.position.set(0, 0.5, 0.3);
  root.add(head);

  // Beak
  const beak = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.05, 0.15),
    new THREE.MeshStandardMaterial({ color: colors.beak, flatShading: true })
  );
  beak.position.set(0, 0.5, 0.5);
  root.add(beak);

  // Wings (Group for animation)
  const leftWingGroup = new THREE.Group();
  const leftWing = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.05, 0.5),
    new THREE.MeshStandardMaterial({ color: colors.wing, flatShading: true })
  );
  leftWing.position.set(-0.25, 0, 0);
  leftWingGroup.add(leftWing);
  leftWingGroup.position.set(-0.2, 0.35, 0);
  root.add(leftWingGroup);

  const rightWingGroup = new THREE.Group();
  const rightWing = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.05, 0.5),
    new THREE.MeshStandardMaterial({ color: colors.wing, flatShading: true })
  );
  rightWing.position.set(0.25, 0, 0);
  rightWingGroup.add(rightWing);
  rightWingGroup.position.set(0.2, 0.35, 0);
  root.add(rightWingGroup);

  // Legs
  const legGeo = new THREE.BoxGeometry(0.05, 0.15, 0.05);
  const legMat = new THREE.MeshStandardMaterial({ color: colors.leg, flatShading: true });
  const leg1 = new THREE.Mesh(legGeo, legMat);
  leg1.position.set(-0.1, 0.075, 0);
  const leg2 = new THREE.Mesh(legGeo, legMat);
  leg2.position.set(0.1, 0.075, 0);
  root.add(leg1, leg2);

  // State
  root.userData.state = 'IDLE'; // IDLE, FLYING
  root.userData.velocity = new THREE.Vector3();
  root.userData.flightTime = 0;
  root.userData.startPos = new THREE.Vector3(); // Will be set when added

  // Update function
  root.userData.update = (delta, playerPos) => {
    if (root.userData.state === 'IDLE') {
      // Check distance to player
      if (playerPos) {
        const worldPos = new THREE.Vector3();
        root.getWorldPosition(worldPos);
        const dist = worldPos.distanceTo(playerPos);
        
        if (dist < 15) {
          // Trigger flight!
          // Trigger flight!
          root.userData.state = 'FLYING';
          // More horizontal speed, less vertical (airplane style)
          const angle = Math.random() * Math.PI * 2;
          const speed = 10 + Math.random() * 5;
          root.userData.velocity.set(
            Math.cos(angle) * speed,
            2 + Math.random() * 2, // Low vertical takeoff
            Math.sin(angle) * speed
          );
        }
      }
    } else if (root.userData.state === 'FLYING') {
      root.userData.flightTime += delta;
      
      // Move
      root.position.addScaledVector(root.userData.velocity, delta);
      // Slight gravity/glide effect instead of constant lift
      // root.userData.velocity.y += 2 * delta; // Removed helicopter lift
      
      // Flap wings
      const flapSpeed = 20;
      const angle = Math.sin(root.userData.flightTime * flapSpeed) * 0.5;
      leftWingGroup.rotation.z = angle;
      rightWingGroup.rotation.z = -angle;

      // Orient to velocity
      if (root.userData.velocity.lengthSq() > 0.1) {
        // Look at current position + velocity
        const target = root.position.clone().add(root.userData.velocity);
        root.lookAt(target);
      }

      // Reset/Remove if too far
      if (root.position.length() > 150) {
        root.userData.remove = true;
      }
    }
  };

  return root;
}
