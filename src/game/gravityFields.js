import Phaser from 'phaser';

const DEFAULT_GRAVITY_SCALE = 0.45;
const DEFAULT_AIR_CONTROL_MULTIPLIER = 1.3;
const DEFAULT_HINT = 'Gravity is on parole. Please do not make it weird.';

export function createGravityFields(scene, fieldData = []) {
  return fieldData.map((data) => {
    const visual = scene.add
      .tileSprite(data.x, data.y, data.width, data.height, 'gravity-field')
      .setAlpha(0.34)
      .setTint(data.tint ?? 0x98fff2)
      .setDepth(1);

    const outline = scene.add
      .rectangle(data.x, data.y, data.width, data.height)
      .setStrokeStyle(2, data.tint ?? 0x98fff2, 0.72)
      .setAlpha(0.72)
      .setDepth(2);

    const label = scene.add
      .text(data.x, data.y - data.height / 2 - 18, data.name, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '13px',
        color: '#fff7db',
        stroke: '#201047',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(8);

    scene.tweens.add({
      targets: outline,
      alpha: 0.28,
      duration: 900,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    return {
      data,
      visual,
      outline,
      label,
      bounds: new Phaser.Geom.Rectangle(
        data.x - data.width / 2,
        data.y - data.height / 2,
        data.width,
        data.height,
      ),
      hasShownHint: false,
    };
  });
}

export function updateGravityFields(scene, controller, fields) {
  fields.forEach((field) => {
    field.visual.tilePositionX += 0.22;
    field.visual.tilePositionY -= 0.34;
  });

  const activeField = fields.find((field) =>
    Phaser.Geom.Rectangle.Contains(field.bounds, controller.sprite.x, controller.sprite.y),
  );

  if (!activeField) {
    clearGravityFieldEffect(controller);
    return null;
  }

  const gravityScale = activeField.data.gravityScale ?? DEFAULT_GRAVITY_SCALE;
  controller.gravityScale = gravityScale;
  controller.airControlMultiplier =
    activeField.data.airControlMultiplier ?? DEFAULT_AIR_CONTROL_MULTIPLIER;
  controller.sprite.body.setGravityY(scene.physics.world.gravity.y * (gravityScale - 1));

  if (!activeField.hasShownHint) {
    scene.ui.showMessage(activeField.data.hint ?? DEFAULT_HINT, 2600);
    activeField.hasShownHint = true;
  }

  return activeField;
}

export function clearGravityFieldEffect(controller) {
  controller.gravityScale = 1;
  controller.airControlMultiplier = 1;
  controller.sprite.body.setGravityY(0);
}
