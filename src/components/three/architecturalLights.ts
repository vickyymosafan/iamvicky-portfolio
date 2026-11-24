import * as THREE from "three";

export interface CardPointerState {
  x: number;
  y: number;
  hovered: boolean;
}

/**
 * Crisp, zero-PMREM 3-point architectural PBR lighting rig for Three.js dioramas.
 * Zero synchronous cubemap baking overhead; supports O(1) in-place theme flips.
 */
export function attachArchitecturalLights(scene: THREE.Scene, isDark: boolean) {
  const hemi = new THREE.HemisphereLight(
    isDark ? 0xeef6f9 : 0xffffff,
    isDark ? 0x16202a : 0x5c6872,
    isDark ? 1.55 : 1.85
  );
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffffff, isDark ? 2.25 : 2.55);
  key.position.set(3.2, 4.4, 4.6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(isDark ? 0x56ccf2 : 0x035e8c, isDark ? 1.75 : 1.35);
  rim.position.set(-3.5, 2.0, -2.6);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(isDark ? 0xc8f53c : 0x185c37, isDark ? 0.85 : 0.65);
  fill.position.set(0.6, -2.6, 2.4);
  scene.add(fill);

  return {
    updateTheme(nextDark: boolean) {
      hemi.color.setHex(nextDark ? 0xeef6f9 : 0xffffff);
      hemi.groundColor.setHex(nextDark ? 0x16202a : 0x5c6872);
      hemi.intensity = nextDark ? 1.55 : 1.85;
      key.intensity = nextDark ? 2.25 : 2.55;
      rim.color.setHex(nextDark ? 0x56ccf2 : 0x035e8c);
      rim.intensity = nextDark ? 1.75 : 1.35;
      fill.color.setHex(nextDark ? 0xc8f53c : 0x185c37);
      fill.intensity = nextDark ? 0.85 : 0.65;
    },
  };
}
