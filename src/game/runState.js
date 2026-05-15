export const ARTIFACT_NAME = 'The Cosmic Fax Machine That Sends God a Bug Report';

const RUN_STATE_KEY = 'cosmicFetchQuestRunState';

export function getRunState(scene) {
  let state = scene.registry.get(RUN_STATE_KEY);

  if (!state) {
    state = createInitialRunState();
    scene.registry.set(RUN_STATE_KEY, state);
  }

  return state;
}

export function resetRunState(scene) {
  const state = createInitialRunState();
  scene.registry.set(RUN_STATE_KEY, state);
  return state;
}

export function recordIngredient(scene, level, ingredientData) {
  const state = getRunState(scene);

  state.ingredients[ingredientData.id] = {
    id: ingredientData.id,
    name: ingredientData.name,
    levelId: level.id,
    levelName: level.name,
  };

  scene.registry.set(RUN_STATE_KEY, state);
  return state;
}

export function recordQuestContribution(scene, level) {
  const state = getRunState(scene);

  if (!level.quest?.component) {
    return state;
  }

  state.components[level.quest.component.id] = {
    id: level.quest.component.id,
    name: level.quest.component.name,
    description: level.quest.component.description,
    questId: level.quest.id,
    levelId: level.id,
    levelName: level.name,
  };

  scene.registry.set(RUN_STATE_KEY, state);
  return state;
}

export function hasIngredient(scene, ingredientId) {
  return Boolean(getRunState(scene).ingredients[ingredientId]);
}

export function hasQuestContribution(scene, componentId) {
  return Boolean(getRunState(scene).components[componentId]);
}

export function formatInventoryText(state, level, allLevels) {
  const ingredients = Object.values(state.ingredients);
  const components = Object.values(state.components);
  const requiredNames = (level.quest?.requiredIngredientIds ?? []).map((ingredientId) => {
    const levelIngredient = (level.ingredients ?? []).find((ingredient) => ingredient.id === ingredientId);
    return levelIngredient?.name ?? state.ingredients[ingredientId]?.name ?? ingredientId;
  });

  const lines = [
    'Inventory / Fax Crafting',
    ARTIFACT_NAME,
    '',
    `Current Quest: ${level.quest?.title ?? level.objective}`,
    `Needs: ${requiredNames.length ? requiredNames.join(', ') : 'cosmic paperwork'}`,
    '',
    'Collected Ingredients:',
    ...formatList(ingredients.map((ingredient) => ingredient.name)),
    '',
    `Fax Components: ${components.length}/${allLevels.length}`,
    ...formatList(components.map((component) => component.name)),
  ];

  return lines.join('\n');
}

function createInitialRunState() {
  return {
    ingredients: {},
    components: {},
  };
}

function formatList(items) {
  if (items.length === 0) {
    return ['- none yet, the universe remains smug'];
  }

  return items.map((item) => `- ${item}`);
}
