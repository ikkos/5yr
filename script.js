import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ============================================================
   CONFIGURATION
   ============================================================ */
const FACE_SIZE = 200;
const THICKNESS = 4;
const HALF_SIZE = FACE_SIZE / 2;
const GAP = FACE_SIZE; // faces touch edge-to-edge in the unfolded net
const TEX_SIZE = 1024;

/* ============================================================
   CONTENT DATA
   ============================================================ */
const faceContents = {
  front: {
    outer: {
      title: '',
      text: '',
      accent: '#BDA6CE',
      image: 'images/front-outer.jpg'
    },
    inner: {
      title: 'Loving you',
      text: 'I have never felt this way before. I have never felt so deeply for someone and longed to be with someone as much as I have than being with you. All your little quirks, everything about you that you dont love. I love all of you. I say this a lot but I love how strong you are and how you are able to push through all the hardships you go through. I realise how much I love that trait about you, and it makes me realise how simple my life has been.',
      accent: '#B4D3D9',
      image: ''
    }
  },
  back: {
    outer: {
      title: 'Faited Encounter',
      text: '23rd of January 2021. The day that I joined the server you were in and the day that I met you. All the events prior had led me to joining a server with you in it and meeting you. Everything that had happened the year prior had led me to meeting you',
      accent: '#BDA6CE',
      image: ''
    },
    inner: {
      title: 'My sunshine',
      text: 'You are the reason I enjoy starting my day. You bring so much joy and warmth into my life. Without you I could see myself being a cold person, with little to no empathy. You really have changed my life and I cannot express how grateful I am for that. I love and cherish the time I spend with you, and it means so much to me.',
      accent: '#B4D3D9',
      image: 'images/back-inner.jpg'
    }
  },
  left: {
    outer: {
      title: 'Falling For You',
      text: 'It is crazy how quickly I started falling for you and started developing those little feelings. It was 100% when you first turned on your camera. That was very early Feb, only a short time after I met you. It definately wasnt much, but it was enough to spark something inside of me. After that point we started spending time together and I started to get to know you more and more, and I started to fall harder and harder for you',
      accent: '#BDA6CE',
      image: 'images/left-outer.jpg'
    },
    inner: {
      title: 'Missing you',
      text: 'I loved seeing you again and all those other times, but I hated you leaving and us parting so much. It was so painful having see you leave, after having one of the happiest times I have had together with you. I loeve that time with you so much, and coming back to reality hurts so much. Even those days were we dont really get to spend time because of work or our schedules just not lining up really just bring down my day.',
      accent: '#B4D3D9',
      image: 'images/left-inner.jpg'
    }
  },
  right: {
    outer: {
      title: 'May',
      text: 'It was an eventful May 2021. A lot happened between us this month and it was when I really confirmed by feelings for you. I 100% had feelings for you before but it felt like it was not right or that it would be weird. Also the fact that I was scared of rejection and not wanting to ruin or destroy a friendship that I was fond off and found myself finding comfort in',
      accent: '#BDA6CE',
      image: 'images/right-outer.jpg'
    },
    inner: {
      title: 'Meeting you',
      text: 'It felt like a fever dream when I first saw you and when I was able to hold you for the first time. That first month together was surreal and it gave a glimps on what the future has in store for us. It made me realise how much more I feel about you and how much deeper I can love you. I thought the spark and butterflies of seeing you again would dumb down but that was not the case at all, the other times that I saw you all these feelings resurfaced. Being with you has made me the happiest I think I have ever been aside from when we started dating and I could actually let my feelings flow.',
      accent: '#B4D3D9',
      image: 'images/right-inner.jpg'
    }
  },
  top: {
    outer: {
      title: 'May 22nd',
      text: 'I can vividly recall this day. I was going out in the afternoon/evening to watch a movie. In the morning we got into an arguement/disagreement, basically something that put us both out of the mood. I remember sending you this long message about how I feel about our relationship and that it does mean a lot to me. I was terrified of losing what we had, I did want more from our relationship but honestly, I had no way to know how you felt about me I always felt like you would never date someone like me and being so far away. Kinda crazy right? Thinking that way and thinking so negatively, but honestly, I didnt want to risk anything. I do regret not actually expressing my feelings and asking you back then.',
      accent: '#BDA6CE',
      image: 'images/top-outer.jpg'
    },
    inner: {
      title: 'First impressions',
      text: 'I know Ive told you what my first impressions of you were before, but they really just were me wanting to make a new friend. I wont lie that when you did turn on your camera that day it did spark a little something in me, and that did make me send money over for a webcam LOL. I kinda went from there, from the time we would spend gaming to when we starting spending a lot and I mean a lot of time together. Feelings just started to grow from then on. It went from wanting to be friends with you since you had a cool vibe about you and then to just falling completely for you.',
      accent: '#B4D3D9',
      image: 'images/top-inner.jpg'
    }
  },
  bottom: {
    outer: {
      title: 'The Future',
      text: 'It is crazy to think that it has been 5 years. It is a long time to think about and every day I think about how grateful I am to have met you and the time we have spent together. I dont know where I would be had I not met you. I think about how all the choice I made led me to you and I would not change a single thing in my past if it meant I would have not run into you. I am so excited for what the future holds for us, next year is going to be a very big jump and I cannot wait. I want to be able to hold you again and I want to be able to spend those special days together.',
      accent: '#BDA6CE',
      image: 'images/bottom-outer.jpg'
    },
    inner: {
      title: 'Your Beauty',
      text: 'I really dont tell you enough but you are so absolutely stunning. You do give me butterflies when I see you. There are times when I dont really see you and when I see you again I get all giddy in side. Like when I saw you again in person for the first time I really couldnt hold myself. I just wanted to embrace you. Its not just how you look but you as a person, you have such a precious soul one that is so full of compassion and I love that about you so much. I love that about you.',
      accent: '#B4D3D9',
      image: 'images/bottom-inner.jpg'
    }
  }
};

/* ============================================================
   SCENE SETUP
   ============================================================ */
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1525);
scene.fog = new THREE.FogExp2(0x1a1525, 0.0006);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
camera.position.set(350, 250, 550);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

/* ============================================================
   CONTROLS
   ============================================================ */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 300;
controls.maxDistance = 1500;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;
controls.target.set(0, 0, 0);

/* ============================================================
   LIGHTING
   ============================================================ */
const ambientLight = new THREE.AmbientLight(0xf2eae0, 0.35);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xf2eae0, 1.3);
dirLight.position.set(250, 450, 350);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 1200;
dirLight.shadow.camera.left = -400;
dirLight.shadow.camera.right = 400;
dirLight.shadow.camera.top = 400;
dirLight.shadow.camera.bottom = -400;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xb4d3d9, 0.45);
fillLight.position.set(-250, 150, -250);
scene.add(fillLight);

const rimLight = new THREE.PointLight(0xbda6ce, 0.9, 900);
rimLight.position.set(150, 350, 450);
scene.add(rimLight);

const bottomLight = new THREE.PointLight(0x9b8ec7, 0.4, 600);
bottomLight.position.set(-150, -300, 200);
scene.add(bottomLight);

/* ============================================================
   FLOOR
   ============================================================ */
const floorGeo = new THREE.PlaneGeometry(3000, 3000);
const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -300;
floor.receiveShadow = true;
scene.add(floor);

/* ============================================================
   IMAGE LOADING
   ============================================================ */
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/* ============================================================
   TEXTURE GENERATION
   ============================================================ */
async function createFaceTexture(content, isInner = false) {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, TEX_SIZE, TEX_SIZE);
  if (isInner) {
    bgGrad.addColorStop(0, '#2e2838');
    bgGrad.addColorStop(0.5, '#252030');
    bgGrad.addColorStop(1, '#1e1a28');
  } else {
    bgGrad.addColorStop(0, '#322c38');
    bgGrad.addColorStop(0.5, '#292530');
    bgGrad.addColorStop(1, '#221e28');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  // Subtle vignette
  const vigGrad = ctx.createRadialGradient(
    TEX_SIZE / 2, TEX_SIZE / 2, TEX_SIZE * 0.3,
    TEX_SIZE / 2, TEX_SIZE / 2, TEX_SIZE * 0.75
  );
  vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
  vigGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  // Fine grid texture
  ctx.strokeStyle = 'rgba(242, 234, 224, 0.035)';
  ctx.lineWidth = 1;
  for (let i = 0; i < TEX_SIZE; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, TEX_SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(TEX_SIZE, i);
    ctx.stroke();
  }

  // Border colors
  const borderColor = isInner ? '#B4D3D9' : '#BDA6CE';
  const borderLight = '#F2EAE0';

  // Outer border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 5;
  ctx.strokeRect(28, 28, TEX_SIZE - 56, TEX_SIZE - 56);

  // Inner border
  ctx.strokeStyle = borderLight;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(44, 44, TEX_SIZE - 88, TEX_SIZE - 88);

  // Corner flourishes
  const cs = 22;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;
  const corners = [
    [44, 44],
    [TEX_SIZE - 44, 44],
    [44, TEX_SIZE - 44],
    [TEX_SIZE - 44, TEX_SIZE - 44]
  ];
  corners.forEach(([cx, cy]) => {
    const dx = cx < TEX_SIZE / 2 ? 1 : -1;
    const dy = cy < TEX_SIZE / 2 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + cs * dy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + cs * dx, cy);
    ctx.stroke();
  });

  // Image area
  const imgY = 75;
  const imgH = TEX_SIZE * 0.40;
  const imgPad = 75;
  const imgW = TEX_SIZE - imgPad * 2;
  const midX = TEX_SIZE / 2;

  if (content.image) {
    const img = await loadImage(content.image);
    if (img) {
      // Cover / fill mode — maintain aspect ratio, crop to fit
      const scale = Math.max(imgW / img.width, imgH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = imgPad + (imgW - drawW) / 2;
      const drawY = imgY + (imgH - drawH) / 2;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }

  // Title
  const textY = imgY + imgH + 75;
  ctx.fillStyle = borderColor;
  ctx.font = '700 58px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText(content.title, midX, textY);

  // Title underline with ornament
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(midX - 70, textY + 22);
  ctx.lineTo(midX + 70, textY + 22);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(midX, textY + 22, 3, 0, Math.PI * 2);
  ctx.fill();

  // Body text
  ctx.fillStyle = '#F2EAE0';
  ctx.font = '300 26px "Source Sans 3", sans-serif';
  ctx.textAlign = 'center';

  const maxWidth = TEX_SIZE - imgPad * 2 - 20;
  const lineHeight = 40;
  const words = content.text.split(' ');
  let line = '';
  let y = textY + 85;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, midX, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, midX, y);

  // Footer
  ctx.fillStyle = 'rgba(242, 234, 224, 0.45)';
  ctx.font = '600 13px "Source Sans 3", sans-serif';
  ctx.letterSpacing = '4px';


  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

/* ============================================================
   FACE MATERIALS & MESHES
   ============================================================ */
const frameMaterial = new THREE.MeshStandardMaterial({
  color: 0x2e2835,
  roughness: 0.65,
  metalness: 0.15
});

const faces = [];
const faceGroup = new THREE.Group();
scene.add(faceGroup);

const faceConfigs = [
  { name: 'front',  pos: [0, 0, HALF_SIZE],       rot: [0, 0, 0] },
  { name: 'back',   pos: [0, 0, -HALF_SIZE],      rot: [0, Math.PI, 0] },
  { name: 'left',   pos: [-HALF_SIZE, 0, 0],      rot: [0, -Math.PI / 2, 0] },
  { name: 'right',  pos: [HALF_SIZE, 0, 0],       rot: [0, Math.PI / 2, 0] },
  { name: 'top',    pos: [0, HALF_SIZE, 0],       rot: [-Math.PI / 2, 0, 0] },
  { name: 'bottom', pos: [0, -HALF_SIZE, 0],      rot: [Math.PI / 2, 0, 0] }
];

/* ============================================================
   UNFOLDED STATE TARGETS — HORIZONTAL ROW
   Layout: [front][back][left][right][top][bottom]
   All faces lie in the Z=0 plane with outer textures facing +Z.
   Text remains perfectly upright.
   ============================================================ */
const unfoldedConfigs = {
  front:  { pos: new THREE.Vector3(-GAP * 2.5, 0, 0),  rot: new THREE.Euler(0, 0, 0) },
  back:   { pos: new THREE.Vector3(-GAP * 1.5, 0, 0),  rot: new THREE.Euler(0, 0, 0) },
  left:   { pos: new THREE.Vector3(-GAP * 0.5, 0, 0),  rot: new THREE.Euler(0, 0, 0) },
  right:  { pos: new THREE.Vector3(GAP * 0.5, 0, 0),   rot: new THREE.Euler(0, 0, 0) },
  top:    { pos: new THREE.Vector3(GAP * 1.5, 0, 0),   rot: new THREE.Euler(0, 0, 0) },
  bottom: { pos: new THREE.Vector3(GAP * 2.5, 0, 0),   rot: new THREE.Euler(0, 0, 0) }
};

let bowGroup, goldMat, goldBrightMat, buttonLight;

(async function initScene() {
  await Promise.all(faceConfigs.map(async cfg => {
    const outerTex = await createFaceTexture(faceContents[cfg.name].outer, false);
    const innerTex = await createFaceTexture(faceContents[cfg.name].inner, true);

    const outerMat = new THREE.MeshStandardMaterial({
      map: outerTex,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.FrontSide
    });

    const innerMat = new THREE.MeshStandardMaterial({
      map: innerTex,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.FrontSide
    });

    // Box material indices: 0:+x, 1:-x, 2:+y, 3:-y, 4:+z, 5:-z
    // Each face is oriented so its outward normal aligns with local +z,
    // making material[4] the outer side and material[5] the inner side.
    const materials = [
      frameMaterial,
      frameMaterial,
      frameMaterial,
      frameMaterial,
      outerMat,
      innerMat
    ];

    const geometry = new THREE.BoxGeometry(FACE_SIZE, FACE_SIZE, THICKNESS);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(...cfg.pos);
    mesh.rotation.set(...cfg.rot);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.userData = {
      name: cfg.name,
      closedPos: new THREE.Vector3(...cfg.pos),
      closedRot: new THREE.Euler(...cfg.rot)
    };

    faces.push(mesh);
    faceGroup.add(mesh);
  }));

  faces.forEach(face => {
    const cfg = unfoldedConfigs[face.userData.name];
    face.userData.unfoldedPos = cfg.pos.clone();
    face.userData.unfoldedRot = cfg.rot.clone();
  });

  /* ============================================================
     3D RIBBON BOW BUTTON
     ============================================================ */

  const frontFace = faces.find(f => f.userData.name === 'front');

  // Materials
  goldMat = new THREE.MeshStandardMaterial({
    color: 0xc4a8db,
    metalness: 0.75,
    roughness: 0.25,
    emissive: 0x2a1f35,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide
  });

  goldBrightMat = new THREE.MeshStandardMaterial({
    color: 0xd4bce8,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x3d3050,
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide
  });

  // Helper: create a ribbon mesh from a 3D curve
  function createRibbon(curve, width, segments, mat, taperStart = 1, taperEnd = 1) {
    const points = curve.getPoints(segments);
    const verts = [];
    const indices = [];
    const uvs = [];

    for (let i = 0; i < points.length; i++) {
      const t = i / Math.max(points.length - 1, 1);
      const p = points[i];
      const tangent = curve.getTangentAt(t);

      let up = new THREE.Vector3(0, 0, 1);
      if (Math.abs(tangent.dot(up)) > 0.99) up = new THREE.Vector3(0, 1, 0);
      const side = new THREE.Vector3().crossVectors(tangent, up).normalize();

      const w = width * (taperStart + (taperEnd - taperStart) * t);

      const left = p.clone().add(side.clone().multiplyScalar(w / 2));
      const right = p.clone().add(side.clone().multiplyScalar(-w / 2));

      verts.push(left.x, left.y, left.z);
      verts.push(right.x, right.y, right.z);

      uvs.push(0, t);
      uvs.push(1, t);

      if (i < points.length - 1) {
        const base = i * 2;
        indices.push(base, base + 2, base + 1);
        indices.push(base + 1, base + 2, base + 3);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    return mesh;
  }

  // --- Cross ribbons on the box face ---
  const hRibbon = new THREE.Mesh(
    new THREE.BoxGeometry(FACE_SIZE * 0.92, 4.5, 1),
    goldMat
  );
  hRibbon.position.set(0, 0, THICKNESS / 2 + 0.5);
  hRibbon.castShadow = true;
  frontFace.add(hRibbon);

  const vRibbon = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, FACE_SIZE * 0.92, 1),
    goldMat
  );
  vRibbon.position.set(0, 0, THICKNESS / 2 + 0.5);
  vRibbon.castShadow = true;
  frontFace.add(vRibbon);

  // --- Bow group ---
  bowGroup = new THREE.Group();

  // Central knot
  const knot = new THREE.Mesh(new THREE.SphereGeometry(4, 24, 24), goldBrightMat);
  knot.scale.set(1.4, 0.85, 0.75);
  bowGroup.add(knot);

  // Knot cinch wraps
  const wrapH = new THREE.Mesh(new THREE.BoxGeometry(10, 3.5, 5), goldMat);
  bowGroup.add(wrapH);
  const wrapV = new THREE.Mesh(new THREE.BoxGeometry(3.5, 10, 5), goldMat);
  bowGroup.add(wrapV);

  // --- Loops ---
  const loopLUCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 5, 2),
    new THREE.Vector3(-6, 11, 4),
    new THREE.Vector3(-16, 10, 3),
    new THREE.Vector3(-20, 3, 0),
    new THREE.Vector3(-16, -5, -2),
    new THREE.Vector3(-7, -6, -1),
    new THREE.Vector3(0, 0, 0)
  ]);
  bowGroup.add(createRibbon(loopLUCurve, 3.2, 40, goldBrightMat));

  const loopLLCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, 4, -2),
    new THREE.Vector3(-8, 8, -4),
    new THREE.Vector3(-18, 6, -2),
    new THREE.Vector3(-22, -1, 0),
    new THREE.Vector3(-18, -8, 2),
    new THREE.Vector3(-8, -10, 1),
    new THREE.Vector3(0, 0, 0)
  ]);
  bowGroup.add(createRibbon(loopLLCurve, 3.2, 40, goldMat));

  const loopRUCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-1, 5, 2),
    new THREE.Vector3(6, 11, 4),
    new THREE.Vector3(16, 10, 3),
    new THREE.Vector3(20, 3, 0),
    new THREE.Vector3(16, -5, -2),
    new THREE.Vector3(7, -6, -1),
    new THREE.Vector3(0, 0, 0)
  ]);
  bowGroup.add(createRibbon(loopRUCurve, 3.2, 40, goldBrightMat));

  const loopRLCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-2, 4, -2),
    new THREE.Vector3(8, 8, -4),
    new THREE.Vector3(18, 6, -2),
    new THREE.Vector3(22, -1, 0),
    new THREE.Vector3(18, -8, 2),
    new THREE.Vector3(8, -10, 1),
    new THREE.Vector3(0, 0, 0)
  ]);
  bowGroup.add(createRibbon(loopRLCurve, 3.2, 40, goldMat));

  // --- Tails ---
  const tailLCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-2, -3, 1),
    new THREE.Vector3(-5, -10, 2),
    new THREE.Vector3(-8, -18, 1),
    new THREE.Vector3(-10, -26, -1),
    new THREE.Vector3(-8, -34, -2)
  ]);
  bowGroup.add(createRibbon(tailLCurve, 3.5, 32, goldMat, 1, 0.15));

  const tailRCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, -3, 1),
    new THREE.Vector3(5, -10, 2),
    new THREE.Vector3(8, -18, 1),
    new THREE.Vector3(10, -26, -1),
    new THREE.Vector3(8, -34, -2)
  ]);
  bowGroup.add(createRibbon(tailRCurve, 3.5, 32, goldMat, 1, 0.15));

  // Attach bow to front face so it moves with it
  frontFace.add(bowGroup);
  bowGroup.position.set(0, 0, THICKNESS / 2 + 7);
  bowGroup.userData.isButton = true;

  // Button glow light (attached to bow)
  buttonLight = new THREE.PointLight(0xc4a8db, 0.8, 160);
  buttonLight.position.set(0, 0, 18);
  bowGroup.add(buttonLight);

  // Hide loading screen once everything is ready
  const loading = document.getElementById('loading');
  if (loading) loading.classList.add('hidden');

  // Start the render loop
  animate();
})();

/* ============================================================
   RAYCASTER & INTERACTION
   ============================================================ */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHoveringButton = false;
let isUnfolded = false;
let animationProgress = 0;
let isAnimating = false;
let animationDirection = 0;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (!bowGroup) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(bowGroup.children, true);

  if (intersects.length > 0) {
    if (!isHoveringButton) {
      isHoveringButton = true;
      controls.enabled = false;
      document.body.style.cursor = 'pointer';
      animateButtonScale(1.18);
    }
  } else {
    if (isHoveringButton) {
      isHoveringButton = false;
      controls.enabled = true;
      document.body.style.cursor = 'default';
      animateButtonScale(1.0);
    }
  }
}

function onMouseDown(event) {
  if (isHoveringButton) {
    animateButtonScale(0.88);
  }
}

function onMouseUp(event) {
  if (isHoveringButton) {
    animateButtonScale(1.18);
    toggleUnfold();
  }
}

function animateButtonScale(targetScale) {
  const start = bowGroup.scale.x;
  const diff = targetScale - start;
  const duration = 220;
  const startTime = performance.now();

  function update() {
    const elapsed = performance.now() - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const scale = start + diff * eased;
    bowGroup.scale.set(scale, scale, scale);

    // Pulse emissive on hover
    if (targetScale > 1.1) {
      goldMat.emissiveIntensity = 0.25 + eased * 0.4;
      goldBrightMat.emissiveIntensity = 0.35 + eased * 0.4;
    } else {
      goldMat.emissiveIntensity = 0.25 + (1 - eased) * 0.4;
      goldBrightMat.emissiveIntensity = 0.35 + (1 - eased) * 0.4;
    }

    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function toggleUnfold() {
  if (isAnimating) return;
  isUnfolded = !isUnfolded;
  isAnimating = true;
  animationDirection = isUnfolded ? 1 : -1;
  controls.autoRotate = !isUnfolded;
}

/* ============================================================
   TOUCH SUPPORT
   ============================================================ */
function onTouchStart(event) {
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(bowGroup.children, true);

    if (intersects.length > 0) {
      isHoveringButton = true;
      controls.enabled = false;
      animateButtonScale(0.9);
    }
  }
}

function onTouchEnd(event) {
  if (isHoveringButton) {
    animateButtonScale(1.18);
    toggleUnfold();
    isHoveringButton = false;
    controls.enabled = true;
  }
}

/* ============================================================
   ANIMATION LOOP
   ============================================================ */
const clock = new THREE.Clock();

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // Unfold / fold animation
  if (isAnimating) {
    const speed = delta * 0.9;
    animationProgress += speed * animationDirection;

    if (animationProgress >= 1) {
      animationProgress = 1;
      isAnimating = false;
    } else if (animationProgress <= 0) {
      animationProgress = 0;
      isAnimating = false;
    }

    faces.forEach((face, index) => {
      const stagger = index * 0.045;
      const denom = 1 - faceConfigs.length * 0.045;
      let localProgress = (animationProgress - stagger) / denom;
      localProgress = Math.max(0, Math.min(1, localProgress));
      const localEased = easeInOutCubic(localProgress);

      // Position
      face.position.lerpVectors(
        face.userData.closedPos,
        face.userData.unfoldedPos,
        localEased
      );

      // Rotation via quaternion slerp
      const qClosed = new THREE.Quaternion().setFromEuler(face.userData.closedRot);
      const qUnfolded = new THREE.Quaternion().setFromEuler(face.userData.unfoldedRot);
      const qCurrent = new THREE.Quaternion();
      qCurrent.slerpQuaternions(qClosed, qUnfolded, localEased);
      face.quaternion.copy(qCurrent);
    });

    // Adjust camera target for unfolded view (row is centered on Y=0)
    const targetY = 0;
    controls.target.y += (targetY - controls.target.y) * 0.04;
  }

  // Gentle button float
  bowGroup.position.y = Math.sin(elapsed * 2.2) * 2.5;
  buttonLight.intensity = 0.8 + Math.sin(elapsed * 3) * 0.15;

  controls.update();
  renderer.render(scene, camera);
}

/* ============================================================
   RESIZE HANDLER
   ============================================================ */
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('touchstart', onTouchStart, { passive: false });
window.addEventListener('touchend', onTouchEnd);
window.addEventListener('resize', onResize);

/* ============================================================
   START
   ============================================================ */
// animate() is called inside initScene() once textures are ready
