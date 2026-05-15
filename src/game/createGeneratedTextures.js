const textureKeys = [
  'cosmic-background',
  'star-dot',
  'player',
  'player-idle',
  'player-run-1',
  'player-run-2',
  'player-jump',
  'player-fall',
  'platform',
  'ingredient',
  'npc',
  'checkpoint',
  'hazard',
  'portal',
  'gravity-field',
  'bounce-pad',
  'market-stall',
  'support-terminal',
  'cosmic-fax-machine',
];

export function createGeneratedTextures(scene) {
  if (textureKeys.every((key) => scene.textures.exists(key))) {
    return;
  }

  createCanvasTexture(scene, 'cosmic-background', 960, 540, drawCosmicBackground);
  createCanvasTexture(scene, 'star-dot', 16, 16, drawStarDot);
  createCanvasTexture(scene, 'player', 42, 54, (context, width, height) =>
    drawPlayer(context, width, height, 'idle'),
  );
  createCanvasTexture(scene, 'player-idle', 42, 54, (context, width, height) =>
    drawPlayer(context, width, height, 'idle'),
  );
  createCanvasTexture(scene, 'player-run-1', 42, 54, (context, width, height) =>
    drawPlayer(context, width, height, 'run-1'),
  );
  createCanvasTexture(scene, 'player-run-2', 42, 54, (context, width, height) =>
    drawPlayer(context, width, height, 'run-2'),
  );
  createCanvasTexture(scene, 'player-jump', 42, 54, (context, width, height) =>
    drawPlayer(context, width, height, 'jump'),
  );
  createCanvasTexture(scene, 'player-fall', 42, 54, (context, width, height) =>
    drawPlayer(context, width, height, 'fall'),
  );
  createCanvasTexture(scene, 'platform', 96, 28, drawPlatform);
  createCanvasTexture(scene, 'ingredient', 36, 36, drawIngredient);
  createCanvasTexture(scene, 'npc', 58, 76, drawNpc);
  createCanvasTexture(scene, 'checkpoint', 48, 70, drawCheckpoint);
  createCanvasTexture(scene, 'hazard', 96, 32, drawHazard);
  createCanvasTexture(scene, 'portal', 74, 106, drawPortal);
  createCanvasTexture(scene, 'gravity-field', 64, 64, drawGravityField);
  createCanvasTexture(scene, 'bounce-pad', 96, 28, drawBouncePad);
  createCanvasTexture(scene, 'market-stall', 92, 76, drawMarketStall);
  createCanvasTexture(scene, 'support-terminal', 84, 78, drawSupportTerminal);
  createCanvasTexture(scene, 'cosmic-fax-machine', 220, 150, drawCosmicFaxMachine);
}

function createCanvasTexture(scene, key, width, height, draw) {
  if (scene.textures.exists(key)) {
    return;
  }

  const texture = scene.textures.createCanvas(key, width, height);
  const canvas = texture.getSourceImage();
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, width, height);
  draw(context, width, height);
  texture.refresh();
}

function drawCosmicBackground(context, width, height) {
  const random = seededRandom(42);
  const base = context.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, '#03030c');
  base.addColorStop(0.45, '#10072b');
  base.addColorStop(1, '#02040f');
  context.fillStyle = base;
  context.fillRect(0, 0, width, height);

  drawNebula(context, 680, 135, 350, 'rgba(202, 65, 255, 0.34)', 'rgba(58, 20, 117, 0)');
  drawNebula(context, 245, 370, 320, 'rgba(24, 226, 216, 0.24)', 'rgba(5, 15, 39, 0)');
  drawNebula(context, 500, 275, 260, 'rgba(255, 220, 92, 0.12)', 'rgba(35, 16, 62, 0)');

  for (let index = 0; index < 190; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const radius = random() * 1.8 + 0.35;
    const alpha = random() * 0.75 + 0.2;

    context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 0.7;
  context.strokeStyle = 'rgba(128, 255, 242, 0.16)';
  context.lineWidth = 1;
  for (let index = 0; index < 9; index += 1) {
    const y = 80 + index * 48 + random() * 18;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(260, y - 90, 530, y + 92, width, y - 18);
    context.stroke();
  }
  context.globalAlpha = 1;
}

function drawNebula(context, x, y, radius, innerColor, outerColor) {
  const gradient = context.createRadialGradient(x, y, 12, x, y, radius);
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(1, outerColor);
  context.fillStyle = gradient;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawStarDot(context, width, height) {
  const glow = context.createRadialGradient(width / 2, height / 2, 1, width / 2, height / 2, 8);
  glow.addColorStop(0, 'rgba(255, 255, 255, 1)');
  glow.addColorStop(0.4, 'rgba(157, 255, 243, 0.85)');
  glow.addColorStop(1, 'rgba(157, 255, 243, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawPlayer(context, width, height, variant = 'idle') {
  const runOffset = variant === 'run-1' ? -2 : variant === 'run-2' ? 2 : 0;
  const headY = variant === 'jump' ? 5 : variant === 'fall' ? 10 : 7;
  const bodyY = variant === 'jump' ? 20 : variant === 'fall' ? 17 : 18;
  const bodyHeight = variant === 'fall' ? 27 : 30;
  const visorColor = variant === 'jump' ? '#ffe66d' : variant === 'fall' ? '#98fff2' : '#fff9a6';

  context.shadowColor = '#24fff0';
  context.shadowBlur = 14;
  roundedRect(context, 10 + runOffset, bodyY, 22, bodyHeight, 10);
  context.fillStyle = '#7a2cff';
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = '#1ef8e6';
  roundedRect(context, 7 + runOffset, headY, 28, 22, 12);
  context.fill();

  const visor = context.createLinearGradient(11, headY + 6, 31, headY + 15);
  visor.addColorStop(0, visorColor);
  visor.addColorStop(1, '#ff4fd8');
  context.fillStyle = visor;
  roundedRect(context, 12 + runOffset, headY + 6, 18, 9, 5);
  context.fill();

  context.fillStyle = '#fef7ff';
  if (variant === 'run-1') {
    context.fillRect(11, 47, 6, 6);
    context.fillRect(27, 45, 5, 8);
  } else if (variant === 'run-2') {
    context.fillRect(13, 45, 5, 8);
    context.fillRect(26, 47, 6, 6);
  } else if (variant === 'jump') {
    context.fillRect(13, 47, 5, 6);
    context.fillRect(26, 47, 5, 6);
    context.strokeStyle = '#ffe66d';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(15, 53);
    context.lineTo(12, height);
    context.moveTo(28, 53);
    context.lineTo(31, height);
    context.stroke();
  } else if (variant === 'fall') {
    context.fillRect(12, 44, 5, 9);
    context.fillRect(27, 44, 5, 9);
    context.strokeStyle = 'rgba(255, 120, 220, 0.85)';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(7, 18);
    context.lineTo(2, 11);
    context.moveTo(35, 18);
    context.lineTo(40, 11);
    context.stroke();
  } else {
    context.fillRect(14, 47, 5, 6);
    context.fillRect(25, 47, 5, 6);
  }

  context.strokeStyle = '#201047';
  context.lineWidth = 2;
  roundedRect(context, 10 + runOffset, bodyY, 22, bodyHeight, 10);
  context.stroke();
}

function drawPlatform(context, width, height) {
  context.shadowColor = '#21f5d7';
  context.shadowBlur = 12;
  context.fillStyle = '#1bdccc';
  roundedRect(context, 4, 2, width - 8, height - 5, 8);
  context.fill();

  context.shadowBlur = 0;
  const body = context.createLinearGradient(0, 0, 0, height);
  body.addColorStop(0, '#5130a4');
  body.addColorStop(1, '#17102e');
  context.fillStyle = body;
  roundedRect(context, 5, 6, width - 10, height - 9, 7);
  context.fill();

  context.strokeStyle = 'rgba(255, 230, 109, 0.7)';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(14, 10);
  context.lineTo(width - 14, 10);
  context.stroke();
}

function drawIngredient(context, width, height) {
  context.shadowColor = '#ffe66d';
  context.shadowBlur = 15;
  context.fillStyle = '#ffe66d';
  context.beginPath();
  context.moveTo(width / 2, 2);
  context.lineTo(width - 4, height / 2);
  context.lineTo(width / 2, height - 3);
  context.lineTo(4, height / 2);
  context.closePath();
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = '#17f5c5';
  context.beginPath();
  context.arc(width / 2, height / 2, 8, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#5b1ca7';
  context.lineWidth = 3;
  context.beginPath();
  context.arc(width / 2, height / 2, 12, 0.4, Math.PI * 1.7);
  context.stroke();
}

function drawNpc(context) {
  context.shadowColor = '#ff4fd8';
  context.shadowBlur = 16;
  context.fillStyle = '#ff4fd8';
  roundedRect(context, 9, 11, 40, 30, 10);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = '#201047';
  roundedRect(context, 14, 17, 30, 16, 8);
  context.fill();

  context.fillStyle = '#ffe66d';
  context.beginPath();
  context.arc(23, 25, 3, 0, Math.PI * 2);
  context.arc(35, 25, 3, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#3be8ff';
  roundedRect(context, 12, 41, 34, 25, 8);
  context.fill();

  context.strokeStyle = '#fff7db';
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(20, 45);
  context.lineTo(29, 58);
  context.lineTo(38, 45);
  context.stroke();

  context.fillStyle = '#fff7db';
  context.fillRect(17, 66, 8, 8);
  context.fillRect(34, 66, 8, 8);
}

function drawCheckpoint(context, width, height) {
  context.shadowColor = '#98fff2';
  context.shadowBlur = 15;
  context.strokeStyle = '#98fff2';
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(width / 2, height - 5);
  context.lineTo(width / 2, 12);
  context.stroke();

  context.fillStyle = '#201047';
  context.beginPath();
  context.arc(width / 2, 13, 9, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#ffe66d';
  context.beginPath();
  context.moveTo(width / 2, 5);
  context.lineTo(width - 8, 21);
  context.lineTo(width / 2, 37);
  context.lineTo(8, 21);
  context.closePath();
  context.fill();

  context.shadowBlur = 0;
  context.strokeStyle = '#ff4fd8';
  context.lineWidth = 3;
  context.beginPath();
  context.arc(width / 2, 21, 17, 0.2, Math.PI * 1.75);
  context.stroke();
}

function drawHazard(context, width, height) {
  const syrup = context.createLinearGradient(0, 0, width, height);
  syrup.addColorStop(0, '#ff4fd8');
  syrup.addColorStop(0.52, '#6f2bff');
  syrup.addColorStop(1, '#13001f');

  context.shadowColor = '#ff4fd8';
  context.shadowBlur = 16;
  context.fillStyle = syrup;
  roundedRect(context, 2, 7, width - 4, height - 10, 10);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = 'rgba(255, 247, 219, 0.8)';
  for (let index = 0; index < 6; index += 1) {
    const x = 11 + index * 15;
    const y = 10 + (index % 2) * 5;
    context.beginPath();
    context.arc(x, y, 2.2, 0, Math.PI * 2);
    context.fill();
  }

  context.strokeStyle = '#98fff2';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(7, 20);
  context.bezierCurveTo(24, 8, 36, 31, 52, 19);
  context.bezierCurveTo(68, 8, 76, 29, 90, 17);
  context.stroke();
}

function drawPortal(context, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const ring = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 44);
  ring.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  ring.addColorStop(0.35, 'rgba(152, 255, 242, 0.74)');
  ring.addColorStop(0.63, 'rgba(255, 79, 216, 0.74)');
  ring.addColorStop(1, 'rgba(42, 12, 82, 0)');

  context.shadowColor = '#98fff2';
  context.shadowBlur = 18;
  context.fillStyle = ring;
  context.fillRect(0, 0, width, height);

  context.shadowBlur = 0;
  context.strokeStyle = '#ffe66d';
  context.lineWidth = 5;
  context.beginPath();
  context.ellipse(centerX, centerY, 23, 39, 0.08, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = '#ff4fd8';
  context.lineWidth = 3;
  context.beginPath();
  context.ellipse(centerX, centerY, 14, 29, -0.18, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = '#201047';
  context.beginPath();
  context.ellipse(centerX, centerY, 10, 24, 0, 0, Math.PI * 2);
  context.fill();
}

function drawGravityField(context, width, height) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'rgba(152, 255, 242, 0.08)';
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(255, 247, 219, 0.34)';
  context.lineWidth = 2;
  for (let index = -1; index < 4; index += 1) {
    const y = index * 18 + 8;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(18, y - 16, 40, y + 16, width, y - 4);
    context.stroke();
  }

  context.fillStyle = 'rgba(255, 120, 220, 0.28)';
  context.beginPath();
  context.arc(17, 16, 4, 0, Math.PI * 2);
  context.arc(47, 43, 3, 0, Math.PI * 2);
  context.fill();
}

function drawBouncePad(context, width, height) {
  context.shadowColor = '#ffe66d';
  context.shadowBlur = 14;
  context.fillStyle = '#ffe66d';
  roundedRect(context, 5, 8, width - 10, height - 10, 10);
  context.fill();

  context.shadowBlur = 0;
  const body = context.createLinearGradient(0, 0, 0, height);
  body.addColorStop(0, '#ff78dc');
  body.addColorStop(1, '#4a1ca2');
  context.fillStyle = body;
  roundedRect(context, 9, 4, width - 18, height - 11, 9);
  context.fill();

  context.strokeStyle = '#98fff2';
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(18, 14);
  context.lineTo(width / 2, 5);
  context.lineTo(width - 18, 14);
  context.stroke();
}

function drawMarketStall(context, width, height) {
  context.shadowColor = '#ff78dc';
  context.shadowBlur = 12;
  context.fillStyle = '#ffe66d';
  roundedRect(context, 8, 18, width - 16, 22, 7);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = '#201047';
  roundedRect(context, 12, 38, width - 24, 28, 5);
  context.fill();

  const awning = context.createLinearGradient(0, 10, width, 30);
  awning.addColorStop(0, '#ff78dc');
  awning.addColorStop(0.5, '#98fff2');
  awning.addColorStop(1, '#ffae35');
  context.fillStyle = awning;
  context.beginPath();
  context.moveTo(8, 22);
  context.lineTo(18, 8);
  context.lineTo(width - 18, 8);
  context.lineTo(width - 8, 22);
  context.closePath();
  context.fill();

  context.strokeStyle = '#fff7db';
  context.lineWidth = 2;
  for (let x = 20; x < width - 10; x += 17) {
    context.beginPath();
    context.moveTo(x, 9);
    context.lineTo(x - 5, 22);
    context.stroke();
  }

  context.fillStyle = '#fff7db';
  context.fillRect(19, 46, 12, 10);
  context.fillRect(39, 44, 13, 12);
  context.fillRect(60, 47, 10, 9);
}

function drawSupportTerminal(context, width, height) {
  context.shadowColor = '#98fff2';
  context.shadowBlur = 13;
  const body = context.createLinearGradient(0, 0, width, height);
  body.addColorStop(0, '#98fff2');
  body.addColorStop(0.46, '#7a2cff');
  body.addColorStop(1, '#201047');
  context.fillStyle = body;
  roundedRect(context, 13, 8, width - 26, height - 16, 9);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = '#120925';
  roundedRect(context, 20, 15, width - 40, 31, 6);
  context.fill();

  context.strokeStyle = '#ffe66d';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(26, 25);
  context.lineTo(width - 26, 25);
  context.moveTo(26, 34);
  context.lineTo(width - 35, 34);
  context.stroke();

  context.fillStyle = '#ff78dc';
  context.beginPath();
  context.arc(width / 2, 58, 5, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#fff7db';
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(width / 2, 8);
  context.lineTo(width / 2, 0);
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2 - 8, 7);
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2 + 8, 7);
  context.stroke();
}

function drawCosmicFaxMachine(context, width, height) {
  context.shadowColor = '#98fff2';
  context.shadowBlur = 18;
  const base = context.createLinearGradient(0, 24, width, height);
  base.addColorStop(0, '#98fff2');
  base.addColorStop(0.38, '#ff78dc');
  base.addColorStop(0.7, '#7a2cff');
  base.addColorStop(1, '#201047');
  context.fillStyle = base;
  roundedRect(context, 35, 50, 150, 72, 12);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = '#120925';
  roundedRect(context, 50, 63, 68, 25, 7);
  context.fill();

  context.fillStyle = '#fff7db';
  roundedRect(context, 128, 58, 43, 52, 6);
  context.fill();

  context.strokeStyle = '#201047';
  context.lineWidth = 2;
  for (let y = 67; y < 103; y += 9) {
    context.beginPath();
    context.moveTo(136, y);
    context.lineTo(164, y);
    context.stroke();
  }

  context.fillStyle = '#ffe66d';
  context.beginPath();
  context.arc(66, 76, 5, 0, Math.PI * 2);
  context.arc(84, 76, 5, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#fff7db';
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(62, 50);
  context.lineTo(38, 18);
  context.moveTo(150, 50);
  context.lineTo(179, 19);
  context.stroke();

  context.fillStyle = '#ff78dc';
  context.beginPath();
  context.arc(38, 18, 8, 0, Math.PI * 2);
  context.arc(179, 19, 8, 0, Math.PI * 2);
  context.fill();

  const moduleColors = ['#aafff5', '#ffe66d', '#2c133f', '#ffae35', '#fff7db'];
  moduleColors.forEach((color, index) => {
    context.fillStyle = color;
    roundedRect(context, 44 + index * 25, 111, 17, 18, 4);
    context.fill();
  });

  context.strokeStyle = '#ffe66d';
  context.lineWidth = 3;
  roundedRect(context, 35, 50, 150, 72, 12);
  context.stroke();

  context.fillStyle = '#98fff2';
  context.font = 'bold 13px Verdana, Arial, sans-serif';
  context.fillText('FAX', 65, 37);
}

function roundedRect(context, x, y, width, height, radius) {
  const size = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + size, y);
  context.lineTo(x + width - size, y);
  context.quadraticCurveTo(x + width, y, x + width, y + size);
  context.lineTo(x + width, y + height - size);
  context.quadraticCurveTo(x + width, y + height, x + width - size, y + height);
  context.lineTo(x + size, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - size);
  context.lineTo(x, y + size);
  context.quadraticCurveTo(x, y, x + size, y);
  context.closePath();
}

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}
