import Phaser from 'phaser';

const MAX_RUN_SPEED = 300;
const GROUND_ACCELERATION = 2200;
const AIR_ACCELERATION = 1500;
const GROUND_DRAG = 2600;
const AIR_DRAG = 180;
const JUMP_VELOCITY = -590;
const JUMP_CUT_VELOCITY = -210;
const COYOTE_TIME_MS = 105;
const JUMP_BUFFER_MS = 120;

export function createPlayer(scene, start) {
  const sprite = scene.physics.add.sprite(start.x, start.y, 'player');
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
  };
}

export function updatePlayerController(scene, controller, delta) {
  const { sprite, cursors, keys } = controller;
  const body = sprite.body;
  const isGrounded = body.blocked.down || body.touching.down;
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
    sprite.setAccelerationX(direction * (isGrounded ? GROUND_ACCELERATION : AIR_ACCELERATION));
    sprite.setDragX(isGrounded ? GROUND_DRAG : AIR_DRAG);
    sprite.setFlipX(direction < 0);
  }

  if (controller.jumpBufferTimer > 0 && controller.coyoteTimer > 0) {
    sprite.setVelocityY(JUMP_VELOCITY);
    controller.jumpBufferTimer = 0;
    controller.coyoteTimer = 0;
  }

  if (!jumpHeld && controller.jumpHeldLastFrame && body.velocity.y < JUMP_CUT_VELOCITY) {
    sprite.setVelocityY(JUMP_CUT_VELOCITY);
  }

  controller.jumpHeldLastFrame = jumpHeld;
}
