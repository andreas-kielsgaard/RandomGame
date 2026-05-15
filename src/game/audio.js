const AUDIO_STATE_KEY = 'cosmicFetchQuestAudio';
const AUDIO_EVENT = 'cosmic-fetch-audio-status';

const SFX_PRESETS = {
  jump: [
    { frequency: 220, endFrequency: 430, type: 'triangle', duration: 0.13, gain: 0.07 },
    { frequency: 660, type: 'sine', delay: 0.04, duration: 0.08, gain: 0.03 },
  ],
  land: [
    { frequency: 94, endFrequency: 70, type: 'sine', duration: 0.1, gain: 0.075 },
    { noise: true, duration: 0.07, gain: 0.035, filter: 520 },
  ],
  collect: [
    { frequency: 520, type: 'sine', duration: 0.11, gain: 0.055 },
    { frequency: 780, type: 'triangle', delay: 0.08, duration: 0.12, gain: 0.052 },
    { frequency: 1170, type: 'sine', delay: 0.17, duration: 0.16, gain: 0.04 },
  ],
  checkpoint: [
    { frequency: 330, type: 'triangle', duration: 0.16, gain: 0.055 },
    { frequency: 495, type: 'sine', delay: 0.09, duration: 0.18, gain: 0.048 },
    { frequency: 742, type: 'sine', delay: 0.19, duration: 0.24, gain: 0.035 },
  ],
  hazard: [
    { frequency: 190, endFrequency: 58, type: 'sawtooth', duration: 0.32, gain: 0.06 },
    { noise: true, delay: 0.03, duration: 0.2, gain: 0.055, filter: 900 },
  ],
  respawn: [
    { frequency: 170, endFrequency: 270, type: 'triangle', duration: 0.16, gain: 0.045 },
    { frequency: 360, type: 'sine', delay: 0.12, duration: 0.16, gain: 0.04 },
  ],
  bounce: [
    { frequency: 185, endFrequency: 720, type: 'sine', duration: 0.2, gain: 0.075 },
    { frequency: 960, type: 'triangle', delay: 0.12, duration: 0.09, gain: 0.03 },
  ],
  portalLocked: [
    { frequency: 146, endFrequency: 112, type: 'square', duration: 0.18, gain: 0.045 },
    { frequency: 92, type: 'sine', delay: 0.1, duration: 0.18, gain: 0.035 },
  ],
  portalActive: [
    { frequency: 392, type: 'triangle', duration: 0.18, gain: 0.055 },
    { frequency: 588, type: 'sine', delay: 0.11, duration: 0.22, gain: 0.052 },
    { frequency: 882, type: 'sine', delay: 0.24, duration: 0.26, gain: 0.045 },
  ],
  levelComplete: [
    { frequency: 262, type: 'triangle', duration: 0.22, gain: 0.055 },
    { frequency: 392, type: 'triangle', delay: 0.14, duration: 0.25, gain: 0.052 },
    { frequency: 523, type: 'sine', delay: 0.28, duration: 0.3, gain: 0.05 },
    { frequency: 784, type: 'sine', delay: 0.48, duration: 0.32, gain: 0.04 },
  ],
  inventory: [
    { frequency: 660, type: 'triangle', duration: 0.06, gain: 0.035 },
    { frequency: 990, type: 'sine', delay: 0.05, duration: 0.06, gain: 0.025 },
  ],
  muteToggle: [{ frequency: 440, type: 'sine', duration: 0.09, gain: 0.035 }],
  endingFax: [
    { frequency: 92, type: 'sawtooth', duration: 0.28, gain: 0.052 },
    { noise: true, delay: 0.07, duration: 0.16, gain: 0.04, filter: 1600 },
    { frequency: 620, type: 'square', delay: 0.22, duration: 0.05, gain: 0.025 },
    { frequency: 740, type: 'square', delay: 0.31, duration: 0.05, gain: 0.025 },
    { frequency: 880, type: 'square', delay: 0.4, duration: 0.05, gain: 0.025 },
    { noise: true, delay: 0.5, duration: 0.32, gain: 0.03, filter: 4200 },
    { frequency: 523, type: 'triangle', delay: 0.72, duration: 0.28, gain: 0.048 },
  ],
};

const VOICE_PROFILES = {
  'chef-zynth': { base: 160, type: 'sawtooth', count: 6, spread: 0.42, gain: 0.032 },
  'madame-griddle-voss': { base: 520, type: 'triangle', count: 7, spread: 0.34, gain: 0.028 },
  mossbyte: { base: 130, type: 'square', count: 5, spread: 0.28, gain: 0.025 },
  'dj-saffron-dad': { base: 96, type: 'sawtooth', count: 6, spread: 0.55, gain: 0.03 },
  'the-hold-music-seraph': { base: 740, type: 'sine', count: 5, spread: 0.18, gain: 0.025 },
  default: { base: 300, type: 'triangle', count: 5, spread: 0.3, gain: 0.026 },
};

export function initAudio(scene) {
  const state = getAudioState(scene);

  if (!state.supported || state.unlocked) {
    emitAudioStatus(scene, state);
    return state;
  }

  const unlock = () => {
    unlockAudio(scene);
  };

  scene.input.keyboard?.once('keydown', unlock);
  scene.input.once('pointerdown', unlock);
  scene.events.once('shutdown', () => {
    scene.input.keyboard?.off('keydown', unlock);
    scene.input.off('pointerdown', unlock);
  });

  emitAudioStatus(scene, state);
  return state;
}

export function getAudioStatus(scene) {
  const state = getAudioState(scene);

  if (!state.supported) {
    return {
      label: 'Audio: unavailable',
      color: '#ff78dc',
    };
  }

  if (state.muted) {
    return {
      label: 'Audio: muted',
      color: '#e7dcff',
    };
  }

  if (!state.unlocked) {
    return {
      label: 'Audio: press any key',
      color: '#ffe66d',
    };
  }

  return {
    label: 'Audio: ready',
    color: '#98fff2',
  };
}

export function onAudioStatusChange(scene, callback) {
  scene.events.on(AUDIO_EVENT, callback);
  scene.events.once('shutdown', () => scene.events.off(AUDIO_EVENT, callback));
}

export function playSfx(scene, key) {
  const state = getAudioState(scene);
  const preset = SFX_PRESETS[key];

  if (!preset || !canPlay(state)) {
    return;
  }

  preset.forEach((event) => {
    if (event.noise) {
      playNoise(state, event);
      return;
    }

    playTone(state, event);
  });
}

export function playDialogueVoice(scene, npcId) {
  const state = getAudioState(scene);
  if (!canPlay(state)) {
    return;
  }

  const profile = VOICE_PROFILES[npcId] ?? VOICE_PROFILES.default;
  const now = state.context.currentTime;

  for (let index = 0; index < profile.count; index += 1) {
    const bend = 1 + (Math.random() - 0.5) * profile.spread;
    const chirp = index % 2 === 0 ? 1 : 1.22;
    playTone(state, {
      frequency: profile.base * bend * chirp,
      endFrequency: profile.base * bend * (chirp + 0.1),
      type: profile.type,
      duration: 0.045,
      gain: profile.gain,
      at: now + index * 0.052,
      attack: 0.006,
      release: 0.038,
    });
  }
}

export function startMusic(scene, level) {
  const state = getAudioState(scene);
  state.pendingMusicLevel = level;

  if (!state.supported || !state.unlocked) {
    return;
  }

  ensureContext(state);
  if (!state.context || state.music?.key === getMusicKey(level)) {
    return;
  }

  stopMusic(scene);

  const key = getMusicKey(level);
  const levelId = Number(level?.id ?? 6);
  const root = 82 + levelId * 13;
  const scale = [0, 3, 5, 7, 10, 12, 15].map((step) => root * 2 ** (step / 12));
  const droneGain = state.context.createGain();
  const shimmerGain = state.context.createGain();
  const drone = state.context.createOscillator();
  const fifth = state.context.createOscillator();
  const shimmer = state.context.createOscillator();

  drone.type = 'sine';
  fifth.type = 'triangle';
  shimmer.type = levelId === 5 ? 'sine' : 'triangle';
  drone.frequency.value = root;
  fifth.frequency.value = root * 1.5;
  shimmer.frequency.value = scale[4] * 2;
  droneGain.gain.value = 0.018;
  shimmerGain.gain.value = 0.006;

  drone.connect(droneGain);
  fifth.connect(droneGain);
  shimmer.connect(shimmerGain);
  droneGain.connect(state.masterGain);
  shimmerGain.connect(state.masterGain);
  drone.start();
  fifth.start();
  shimmer.start();

  let step = 0;
  const pulseMs = 610 + levelId * 18;
  const intervalId = window.setInterval(() => {
    if (!canPlay(state)) {
      return;
    }

    const note = scale[step % scale.length] * (step % 3 === 0 ? 2 : 1);
    playTone(state, {
      frequency: note,
      type: step % 4 === 0 ? 'triangle' : 'sine',
      duration: 0.22,
      gain: 0.014,
      attack: 0.02,
      release: 0.18,
    });

    if (step % 7 === 0) {
      playTone(state, {
        frequency: note * 2.5,
        type: 'sine',
        delay: 0.12,
        duration: 0.18,
        gain: 0.01,
      });
    }

    step += 1;
  }, pulseMs);

  state.music = {
    key,
    nodes: [drone, fifth, shimmer, droneGain, shimmerGain],
    intervalId,
  };
}

export function stopMusic(scene) {
  const state = getAudioState(scene);
  if (!state.music) {
    return;
  }

  window.clearInterval(state.music.intervalId);
  state.music.nodes.forEach((node) => {
    try {
      if (typeof node.stop === 'function') {
        node.stop();
      }
      node.disconnect();
    } catch {
      // Already stopped or disconnected.
    }
  });
  state.music = null;
}

export function toggleMute(scene) {
  const state = getAudioState(scene);
  state.muted = !state.muted;
  applyMuteState(state);

  if (!state.muted && state.pendingMusicLevel) {
    startMusic(scene, state.pendingMusicLevel);
    playSfx(scene, 'muteToggle');
  }

  emitAudioStatus(scene, state);
  return getAudioStatus(scene);
}

function getAudioState(scene) {
  let state = scene.registry.get(AUDIO_STATE_KEY);

  if (!state) {
    state = {
      supported: hasAudioSupport(),
      context: null,
      masterGain: null,
      unlocked: false,
      muted: false,
      music: null,
      pendingMusicLevel: null,
    };
    scene.registry.set(AUDIO_STATE_KEY, state);
  }

  return state;
}

function unlockAudio(scene) {
  const state = getAudioState(scene);
  if (!state.supported) {
    emitAudioStatus(scene, state);
    return;
  }

  ensureContext(state);
  if (!state.context) {
    emitAudioStatus(scene, state);
    return;
  }

  state.unlocked = true;
  const resumePromise = state.context.resume?.();
  resumePromise?.catch?.(() => {});
  applyMuteState(state);
  emitAudioStatus(scene, state);

  if (state.pendingMusicLevel) {
    startMusic(scene, state.pendingMusicLevel);
  }

  if (!state.muted) {
    playTone(state, { frequency: 880, type: 'sine', duration: 0.06, gain: 0.028 });
    playTone(state, { frequency: 1320, type: 'triangle', delay: 0.06, duration: 0.08, gain: 0.022 });
  }
}

function ensureContext(state) {
  if (state.context || !state.supported) {
    return;
  }

  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  try {
    state.context = new AudioContextClass();
  } catch {
    state.supported = false;
    state.context = null;
    state.masterGain = null;
    return;
  }

  state.masterGain = state.context.createGain();
  state.masterGain.gain.value = state.muted ? 0 : 0.82;
  state.masterGain.connect(state.context.destination);
}

function applyMuteState(state) {
  if (!state.masterGain || !state.context) {
    return;
  }

  const now = state.context.currentTime;
  state.masterGain.gain.cancelScheduledValues(now);
  state.masterGain.gain.setTargetAtTime(state.muted ? 0 : 0.82, now, 0.03);
}

function canPlay(state) {
  return Boolean(state.supported && state.unlocked && state.context && state.masterGain && !state.muted);
}

function playTone(state, event) {
  const context = state.context;
  const now = event.at ?? context.currentTime + (event.delay ?? 0);
  const duration = event.duration ?? 0.12;
  const attack = event.attack ?? 0.01;
  const release = event.release ?? Math.max(0.035, duration - attack);
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = event.type ?? 'sine';
  oscillator.frequency.setValueAtTime(event.frequency, now);
  if (event.endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, event.endFrequency), now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, event.gain ?? 0.04), now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);

  oscillator.connect(gain);
  gain.connect(state.masterGain);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.04);
}

function playNoise(state, event) {
  const context = state.context;
  const now = event.at ?? context.currentTime + (event.delay ?? 0);
  const duration = event.duration ?? 0.1;
  const buffer = context.createBuffer(1, Math.max(1, Math.floor(context.sampleRate * duration)), context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = buffer;
  filter.type = 'lowpass';
  filter.frequency.value = event.filter ?? 1200;
  gain.gain.setValueAtTime(event.gain ?? 0.035, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(state.masterGain);
  source.start(now);
  source.stop(now + duration + 0.02);
}

function emitAudioStatus(scene, state) {
  scene.events.emit(AUDIO_EVENT, getAudioStatusFromState(state));
}

function getAudioStatusFromState(state) {
  if (!state.supported) {
    return { label: 'Audio: unavailable', color: '#ff78dc' };
  }

  if (state.muted) {
    return { label: 'Audio: muted', color: '#e7dcff' };
  }

  if (!state.unlocked) {
    return { label: 'Audio: press any key', color: '#ffe66d' };
  }

  return { label: 'Audio: ready', color: '#98fff2' };
}

function getMusicKey(level) {
  return `${level?.id ?? 'ending'}:${level?.name ?? 'ambient'}`;
}

function hasAudioSupport() {
  return typeof window !== 'undefined' && Boolean(window.AudioContext || window.webkitAudioContext);
}
