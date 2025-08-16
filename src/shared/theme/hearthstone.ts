import { keyframes } from '@emotion/react';

export const hearthstoneTheme = {
  textures: {
    stone:
      'linear-gradient(135deg, #8B7355 0%, #A0826D 25%, #8B7355 50%, #6B5637 75%, #8B7355 100%)',
    wood: 'linear-gradient(180deg, #8B4513 0%, #A0522D 20%, #8B4513 40%, #654321 60%, #8B4513 80%, #A0522D 100%)',
    metal:
      'linear-gradient(135deg, #C0C0C0 0%, #E5E5E5 25%, #C0C0C0 50%, #999999 75%, #C0C0C0 100%)',
    leather:
      'linear-gradient(135deg, #5C4033 0%, #6B4E3D 25%, #5C4033 50%, #4A332A 75%, #5C4033 100%)',
    parchment:
      'linear-gradient(135deg, #F4E8D0 0%, #E8D7B9 25%, #F4E8D0 50%, #D4C4A8 75%, #F4E8D0 100%)',
    gemstone: {
      ruby: 'radial-gradient(ellipse at center, #FF6B6B 0%, #DC143C 40%, #8B0000 100%)',
      sapphire: 'radial-gradient(ellipse at center, #87CEEB 0%, #4169E1 40%, #000080 100%)',
      emerald: 'radial-gradient(ellipse at center, #90EE90 0%, #50C878 40%, #006400 100%)',
      diamond: 'radial-gradient(ellipse at center, #FFFFFF 0%, #F0F0F0 40%, #C0C0C0 100%)',
      amethyst: 'radial-gradient(ellipse at center, #DDA0DD 0%, #9966CC 40%, #4B0082 100%)',
    },
    magical: {
      arcane:
        'radial-gradient(circle at 30% 30%, rgba(138, 43, 226, 0.8) 0%, rgba(75, 0, 130, 0.6) 50%, rgba(25, 25, 112, 0.4) 100%)',
      fire: 'radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.9) 0%, rgba(255, 140, 0, 0.7) 30%, rgba(255, 215, 0, 0.5) 60%, rgba(255, 255, 224, 0.3) 100%)',
      frost:
        'radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.9) 0%, rgba(135, 206, 235, 0.7) 30%, rgba(70, 130, 180, 0.5) 60%, rgba(25, 25, 112, 0.3) 100%)',
      nature:
        'radial-gradient(circle at 50% 50%, rgba(144, 238, 144, 0.9) 0%, rgba(34, 139, 34, 0.7) 30%, rgba(0, 100, 0, 0.5) 60%, rgba(0, 50, 0, 0.3) 100%)',
      shadow:
        'radial-gradient(circle at 50% 50%, rgba(75, 0, 130, 0.9) 0%, rgba(48, 25, 52, 0.7) 30%, rgba(25, 25, 25, 0.5) 60%, rgba(0, 0, 0, 0.3) 100%)',
    },
  },

  patterns: {
    hexagon: `
      background-image: 
        linear-gradient(30deg, #444 12%, transparent 12.5%, transparent 87%, #444 87.5%, #444),
        linear-gradient(150deg, #444 12%, transparent 12.5%, transparent 87%, #444 87.5%, #444),
        linear-gradient(30deg, #444 12%, transparent 12.5%, transparent 87%, #444 87.5%, #444),
        linear-gradient(150deg, #444 12%, transparent 12.5%, transparent 87%, #444 87.5%, #444),
        linear-gradient(60deg, #777 25%, transparent 25.5%, transparent 75%, #777 75%, #777),
        linear-gradient(60deg, #777 25%, transparent 25.5%, transparent 75%, #777 75%, #777);
      background-size: 80px 140px;
      background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
    `,

    celtic: `
      background-image: 
        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 215, 0, 0.1) 10px, rgba(255, 215, 0, 0.1) 20px),
        repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255, 215, 0, 0.1) 10px, rgba(255, 215, 0, 0.1) 20px);
    `,

    runes: `
      background-image: 
        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(138, 43, 226, 0.1) 20px, rgba(138, 43, 226, 0.1) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(138, 43, 226, 0.1) 20px, rgba(138, 43, 226, 0.1) 40px);
    `,
  },

  borders: {
    ornate: {
      gold: 'inset 0 0 0 2px #FFD700, inset 0 0 0 4px #B8860B, inset 0 0 0 6px #FFD700',
      silver: 'inset 0 0 0 2px #C0C0C0, inset 0 0 0 4px #808080, inset 0 0 0 6px #C0C0C0',
      bronze: 'inset 0 0 0 2px #CD7F32, inset 0 0 0 4px #8B5A2B, inset 0 0 0 6px #CD7F32',
    },

    frame: {
      simple: '2px solid #8B7355',
      double: '4px double #8B7355',
      ridge: '4px ridge #8B7355',
      groove: '4px groove #8B7355',
      inset: '4px inset #8B7355',
      outset: '4px outset #8B7355',
    },
  },

  effects: {
    glow: {
      gold: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))',
      magical:
        'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8)) drop-shadow(0 0 20px rgba(138, 43, 226, 0.6)) drop-shadow(0 0 30px rgba(138, 43, 226, 0.4))',
      fire: 'drop-shadow(0 0 10px rgba(255, 69, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 140, 0, 0.6)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))',
      frost:
        'drop-shadow(0 0 10px rgba(173, 216, 230, 0.8)) drop-shadow(0 0 20px rgba(135, 206, 235, 0.6)) drop-shadow(0 0 30px rgba(70, 130, 180, 0.4))',
    },

    emboss: {
      light: 'inset 1px 1px 2px rgba(255, 255, 255, 0.6), inset -1px -1px 2px rgba(0, 0, 0, 0.3)',
      strong: 'inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.5)',
    },

    bevel: {
      soft: 'inset 1px 1px 3px rgba(255, 255, 255, 0.5), inset -1px -1px 3px rgba(0, 0, 0, 0.5)',
      hard: 'inset 2px 2px 0px rgba(255, 255, 255, 0.7), inset -2px -2px 0px rgba(0, 0, 0, 0.7)',
    },
  },

  polygons: {
    card: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
    banner: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    shield: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    frame:
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 5% 5%, 5% 95%, 95% 95%, 95% 5%, 5% 5%)',
  },

  layers: {
    background: -1,
    base: 0,
    content: 10,
    overlay: 20,
    highlight: 30,
    effects: 40,
    ui: 50,
    modal: 100,
    tooltip: 200,
    notification: 300,
  },
};

export const animations = {
  shimmer: keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  `,

  pulse: keyframes`
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  `,

  float: keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  `,

  rotate: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,

  glow: keyframes`
    0%, 100% { filter: brightness(1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
    50% { filter: brightness(1.2) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)); }
  `,

  shake: keyframes`
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  `,

  slideInLeft: keyframes`
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  `,

  slideInRight: keyframes`
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  `,

  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,

  scaleIn: keyframes`
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  `,

  bounceIn: keyframes`
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  `,
};

export const cardRarityStyles = {
  common: {
    background: hearthstoneTheme.textures.stone,
    border: hearthstoneTheme.borders.frame.simple,
    glow: 'none',
  },
  rare: {
    background: hearthstoneTheme.textures.metal,
    border: hearthstoneTheme.borders.ornate.silver,
    glow: hearthstoneTheme.effects.glow.magical,
  },
  epic: {
    background: hearthstoneTheme.textures.gemstone.amethyst,
    border: hearthstoneTheme.borders.ornate.silver,
    glow: hearthstoneTheme.effects.glow.magical,
  },
  legendary: {
    background: hearthstoneTheme.textures.gemstone.diamond,
    border: hearthstoneTheme.borders.ornate.gold,
    glow: hearthstoneTheme.effects.glow.gold,
  },
};

export type HearthstoneTheme = typeof hearthstoneTheme;
