import Phaser from 'phaser';

const MAX_RUN_SPEED = 326;
const GROUND_ACCELERATION = 2500;
const AIR_ACCELERATION = 1600;
const GROUND_DRAG = 3100;
const AIR_DRAG = 160;
const JUMP_VELOCITY = -610;
const JUMP_CUT_VELOCITY = -230;
const COYOTE_TIME_MS = 105;
const JUMP_BUFFER_MS = 120;

export function createPlayer(scene, start) {
  const sprite = scene.physics.add.sprite(start.x, start.y, 'player-idle');
  sprite.setCollideWorldBounds(true);
  sprite.setDepth(10);
  sprite.setDragX(GROUND_DRAG);
  sprite.setMaxVelocity(MAX_RUN_SPEED, 920);
  sprite.body.setSize(28, 44);
  sprite.body.setOffset(7, 8);

  return {
    sprite,
    cursors: scene.input.keyboard.createCursorKeys(),
    keys: scene.input.keyboard.addKeys({
      left: 'A',
      right: 'D',
      up: 'W',
      jump: 'SPACE',
    }),
    coyoteTimer: 0,
    jumpBufferTimer: 0,
    jumpHeldLastFrame: false,
    isGroundedLastFrame: false,
    gravityScale: 1,
    airControlMultiplier: 1,
    presentationTexture: 'player-idle',
  };
}

export function updatePlayerController(scene, controller, delta) {
  const { sprite, cursors, keys } = controller;
  const body = sprite.body;
  const isGrounded = body.blocked.down || body.touching.down;
  const landed = isGrounded && !controller.isGroundedLastFrame && body.velocity.y >= 0;
  const leftDown = cursors.left.isDown || keys.left.isDown;
  const rightDown = cursors.right.isDown || keys.right.isDown;
  const jumpHeld = cursors.up.isDown || cursors.space.isDown || keys.up.isDown || keys.jump.isDown;
  const jumpPressed =
    Phaser.Input.Keyboard.JustDown(cursors.up) ||
    Phaser.Input.Keyboard.JustDown(cursors.space) ||
    Phaser.Input.Keyboard.JustDown(keys.up) ||
    Phaser.Input.Keyboard.JustDown(keys.jump);

  controller.coyoteTimer = isGrounded
    ? COYOTE_TIME_MS
    : Math.max(0, controller.coyoteTimer - delta);
  controller.jumpBufferTimer = jumpPressed
    ? JUMP_BUFFER_MS
    : Math.max(0, controller.jumpBufferTimer - delta);

  if (leftDown === rightDown) {
    sprite.setAccelerationX(0);
    sprite.setDragX(isGrounded ? GROUND_DRAG : AIR_DRAG);
  } else {
    const direction = leftDown ? -1 : 1;
    const acceleration = isGrounded
      ? GROUND_ACCELERATION
      : AIR_ACCELERATION * controller.airControlMultiplier;
    sprite.setAccelerationX(direction * acceleration);
    sprite.setDragX(isGrounded ? GROUND_DRAG : AIR_DRAG);
    sprite.setFlipX(direction < 0);
  }

  let jumped = false;
  if (controller.jumpBufferTimer > 0 && controller.coyoteTimer > 0) {
    sprite.setVelocityY(JUMP_VELOCITY);
    controller.jumpBufferTimer = 0;
    controller.coyoteTimer = 0;
    jumped = true;
  }

  if (!jumpHeld && controller.jumpHeldLastFrame && body.velocity.y < JUMP_CUT_VELOCITY) {
    sprite.setVelocityY(JUMP_CUT_VELOCITY);
  }

  controller.jumpHeldLastFrame = jumpHeld;
  controller.isGroundedLastFrame = isGrounded;
  updatePlayerPresentation(scene, controller, isGrounded);

  return { jumped, landed, isGrounded };
}

export function resetPlayerController(controller) {
  controller.sprite.setAcceleration(0);
  controller.sprite.setVelocity(0, 0);
  controller.coyoteTimer = 0;
  controller.jumpBufferTimer = 0;
  controller.jumpHeldLastFrame = false;
  controller.isGroundedLastFrame = false;
  controller.gravityScale = 1;
  controller.airControlMultiplier = 1;
  controller.presentationTexture = 'player-idle';
  controller.sprite.setTexture('player-idle');
  controller.sprite.setScale(1);
  controller.sprite.body.setGravityY(0);
}

function updatePlayerPresentation(scene, controller, isGrounded) {
  const { sprite } = controller;
  const speed = Math.abs(sprite.body.velocity.x);
  let textureKey = 'player-idle';

  if (!isGrounded) {
    textureKey = sprite.body.velocity.y < 0 ? 'player-jump' : 'player-fall';
  } else if (speed > 24) {
    textureKey = Math.floor(scene.time.now / 115) % 2 === 0 ? 'player-run-1' : 'player-run-2';
  }

  if (controller.presentationTexture !== textureKey) {
    sprite.setTexture(textureKey);
    controller.presentationTexture = textureKey;
  }
}
