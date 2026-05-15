const STALL_READ_DISTANCE = 132;

export function createMarketStalls(scene, stallData = []) {
  const stalls = stallData.map((data) => {
    const sprite = scene.add
      .image(data.x, data.y, 'market-stall')
      .setTint(data.tint ?? 0xffe66d)
      .setDepth(5);

    const label = scene.add
      .text(data.x, data.y - 48, data.name, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        color: '#fff7db',
        stroke: '#201047',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(8);

    return {
      data,
      sprite,
      label,
    };
  });

  const lineText = scene.add
    .text(0, 0, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '13px',
      color: '#fff7db',
      backgroundColor: 'rgba(12, 6, 28, 0.86)',
      padding: { x: 9, y: 7 },
      wordWrap: { width: 310 },
    })
    .setOrigin(0.5, 1)
    .setDepth(76)
    .setVisible(false);

  return {
    stalls,
    lineText,
  };
}

export function updateMarketStalls(playerSprite, marketStalls) {
  if (!marketStalls || marketStalls.stalls.length === 0) {
    return;
  }

  let nearest = null;
  let nearestDistance = STALL_READ_DISTANCE;

  marketStalls.stalls.forEach((stall) => {
    const distance = Math.hypot(playerSprite.x - stall.data.x, playerSprite.y - stall.data.y);
    if (distance < nearestDistance) {
      nearest = stall;
      nearestDistance = distance;
    }
  });

  if (!nearest) {
    marketStalls.lineText.setVisible(false);
    return;
  }

  marketStalls.lineText
    .setText(nearest.data.line)
    .setPosition(nearest.data.x, nearest.data.y - 74)
    .setVisible(true);
}
