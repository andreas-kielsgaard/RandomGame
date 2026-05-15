import { getLevelNpcs, levels } from '../src/data/levels.js';

const errors = [];
const playableLevels = levels.filter((level) => level.status === 'playable');

if (playableLevels.length !== 5) {
  errors.push(`Expected 5 playable levels, found ${playableLevels.length}.`);
}

for (const level of playableLevels) {
  const prefix = `Level ${level.id ?? 'unknown'} (${level.name ?? 'unnamed'})`;

  requireNumber(level.id, `${prefix}: id`);
  requireText(level.name, `${prefix}: name`);
  requireEqual(level.status, 'playable', `${prefix}: status`);
  requireDimensions(level.world, `${prefix}: world`);
  requirePoint(level.playerStart, `${prefix}: playerStart`);
  requireArray(level.platforms, `${prefix}: platforms`);
  requireArray(level.ingredients, `${prefix}: ingredients`);
  requireArray(level.checkpoints, `${prefix}: checkpoints`);
  requireArray(level.hazards, `${prefix}: hazards`);
  requireObject(level.exit, `${prefix}: exit`);
  requireObject(level.quest, `${prefix}: quest`);
  requireArray(level.quest?.requiredIngredientIds, `${prefix}: quest.requiredIngredientIds`);
  requireObject(level.quest?.component, `${prefix}: quest.component`);
  requireText(level.quest?.component?.id, `${prefix}: quest.component.id`);
  requireText(level.quest?.component?.name, `${prefix}: quest.component.name`);

  validatePlatforms(level, prefix);
  validateIngredients(level, prefix);
  validateQuestIngredients(level, prefix);
  validateCheckpoints(level, prefix);
  validateHazards(level, prefix);
  validateExit(level, prefix);
  validateNpcs(level, prefix);
  validatePositionsInsideWorld(level, prefix);
}

if (errors.length > 0) {
  console.error(['Prototype validation failed:', ...errors.map((error) => `- ${error}`)].join('\n'));
  process.exit(1);
}

console.log(`Prototype validation passed: ${playableLevels.length} playable levels are ready.`);

function validatePlatforms(level, prefix) {
  level.platforms?.forEach((platform, index) => {
    requirePoint(platform, `${prefix}: platforms[${index}]`);
    requirePositiveNumber(platform.width, `${prefix}: platforms[${index}].width`);
    requirePositiveNumber(platform.height, `${prefix}: platforms[${index}].height`);
  });
}

function validateIngredients(level, prefix) {
  level.ingredients?.forEach((ingredient, index) => {
    requireText(ingredient.id, `${prefix}: ingredients[${index}].id`);
    requireText(ingredient.name, `${prefix}: ingredients[${index}].name`);
    requireNumber(ingredient.x, `${prefix}: ingredients[${index}].x`);
    requireNumber(ingredient.y, `${prefix}: ingredients[${index}].y`);
  });
}

function validateQuestIngredients(level, prefix) {
  const ingredientIds = new Set((level.ingredients ?? []).map((ingredient) => ingredient.id));
  (level.quest?.requiredIngredientIds ?? []).forEach((ingredientId) => {
    requireText(ingredientId, `${prefix}: quest.requiredIngredientIds item`);
    if (!ingredientIds.has(ingredientId)) {
      errors.push(`${prefix}: quest requires missing ingredient id "${ingredientId}".`);
    }
  });
}

function validateCheckpoints(level, prefix) {
  level.checkpoints?.forEach((checkpoint, index) => {
    requireText(checkpoint.id, `${prefix}: checkpoints[${index}].id`);
    requireNumber(checkpoint.x, `${prefix}: checkpoints[${index}].x`);
    requireNumber(checkpoint.y, `${prefix}: checkpoints[${index}].y`);
    requirePoint(checkpoint.respawn, `${prefix}: checkpoints[${index}].respawn`);
  });
}

function validateHazards(level, prefix) {
  level.hazards?.forEach((hazard, index) => {
    requireText(hazard.id, `${prefix}: hazards[${index}].id`);
    requireText(hazard.name, `${prefix}: hazards[${index}].name`);
    requirePoint(hazard, `${prefix}: hazards[${index}]`);
    requirePositiveNumber(hazard.width, `${prefix}: hazards[${index}].width`);
    requirePositiveNumber(hazard.height, `${prefix}: hazards[${index}].height`);
  });
}

function validateExit(level, prefix) {
  requireText(level.exit?.id, `${prefix}: exit.id`);
  requireNumber(level.exit?.x, `${prefix}: exit.x`);
  requireNumber(level.exit?.y, `${prefix}: exit.y`);
}

function validateNpcs(level, prefix) {
  const npcs = getLevelNpcs(level);
  requireArray(npcs, `${prefix}: npcs`);

  npcs.forEach((npc, index) => {
    requireText(npc.id, `${prefix}: npcs[${index}].id`);
    requireText(npc.name, `${prefix}: npcs[${index}].name`);
    requireNumber(npc.x, `${prefix}: npcs[${index}].x`);
    requireNumber(npc.y, `${prefix}: npcs[${index}].y`);
    requireArray(npc.dialogue?.intro, `${prefix}: npcs[${index}].dialogue.intro`);

    if (npc.id === level.quest?.giverId) {
      requireArray(npc.dialogue?.ready, `${prefix}: quest giver dialogue.ready`);
    }
  });
}

function validatePositionsInsideWorld(level, prefix) {
  const { width, height } = level.world ?? {};
  if (!isNumber(width) || !isNumber(height)) {
    return;
  }

  const points = [
    ['playerStart', level.playerStart],
    ['exit', level.exit],
    ...(level.ingredients ?? []).map((item) => [`ingredient ${item.id}`, item]),
    ...(level.checkpoints ?? []).map((item) => [`checkpoint ${item.id}`, item]),
    ...(level.npcs ?? []).map((item) => [`npc ${item.id}`, item]),
  ];

  points.forEach(([label, point]) => {
    if (!point || !isNumber(point.x) || !isNumber(point.y)) {
      return;
    }

    if (point.x < 0 || point.x > width || point.y < 0 || point.y > height) {
      errors.push(`${prefix}: ${label} is outside world bounds.`);
    }
  });
}

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    errors.push(`${label} must be an object.`);
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${label} must be a non-empty array.`);
  }
}

function requirePoint(value, label) {
  requireObject(value, label);
  requireNumber(value?.x, `${label}.x`);
  requireNumber(value?.y, `${label}.y`);
}

function requireDimensions(value, label) {
  requireObject(value, label);
  requirePositiveNumber(value?.width, `${label}.width`);
  requirePositiveNumber(value?.height, `${label}.height`);
}

function requireText(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    errors.push(`${label} must be non-empty text.`);
  }
}

function requireEqual(value, expected, label) {
  if (value !== expected) {
    errors.push(`${label} must be "${expected}".`);
  }
}

function requireNumber(value, label) {
  if (!isNumber(value)) {
    errors.push(`${label} must be a number.`);
  }
}

function requirePositiveNumber(value, label) {
  if (!isNumber(value) || value <= 0) {
    errors.push(`${label} must be a positive number.`);
  }
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}
