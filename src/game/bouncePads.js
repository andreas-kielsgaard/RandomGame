export function createBouncePads(scene, bouncePadData = []) {
  const group = scene.physics.add.staticGroup();

  bouncePadData.forEach((data) => {
    const pad = group.create(data.x, data.y, 'bounce-pad');
    pad.setData('id', data.id);
    pad.setData('name', data.name);
    pad.setData('velocityY', data.velocityY ?? -720);
    pad.setDisplaySize(data.width, data.height);
    pad.setDepth(6);
    pad.refreshBody();

    scene.add
      .text(data.x, data.y - data.height / 2 - 18, data.name, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        color: '#ffe66d',
        stroke: '#201047',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(8);
  });

  return group;
}

export function applyBouncePad(scene, playerSprite, pad) {
  if (scene.time.now < (pad.getData('cooldownUntil') ?? 0)) {
    return false;
  }

  const isAbovePad = playerSprite.y < pad.y - pad.displayHeight * 0.3;
  if (!isAbovePad || playerSprite.body.velocity.y < -260) {
    return false;
  }

  pad.setData('cooldownUntil', scene.time.now + 280);
  playerSprite.setVelocityY(pad.getData('velocityY'));
  scene.cameras.main.shake(70, 0.0035);

  scene.tweens.add({
    targets: pad,
    scaleY: 0.62,
    duration: 70,
    yoyo: true,
    ease: 'Sine.easeOut',
  });

  return true;
}
