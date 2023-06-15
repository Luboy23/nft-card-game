// backgrounds
import saiman from './background/saiman.jpg';
import astral from './background/astral.jpg';
import eoaalien from './background/eoaalien.jpg';
import panight from './background/panight.jpg';
import heroImg from './background/hero-img.jpg';

// cards
import ace from './Ace.png';
import bakezori from './Bakezori.png';
import blackSolus from './Black_Solus.png';
import calligrapher from './Calligrapher.png';
import chakriAvatar from './Chakri_Avatar.png';
import coalfist from './Coalfist.png';
import desolator from './Desolator.png';
import duskRigger from './Dusk_Rigger.png';
import flamewreath from './Flamewreath.png';
import furiosa from './Furiosa.png';
import geomancer from './Geomancer.png';
import goreHorn from './Gore_Horn.png';
import heartseeker from './Heartseeker.png';
import jadeMonk from './Jade_Monk.png';
import kaidoExpert from './Kaido_Expert.png';
import katara from './Katara.png';
import kiBeholder from './Ki_Beholder.png';
import kindling from './Kindling.png';
import lanternFox from './Lantern_Fox.png';
import mizuchi from './Mizuchi.png';
import orizuru from './Orizuru.png';
import scarletViper from './Scarlet_Viper.png';
import stormKage from './Storm_Kage.png';
import suzumebachi from './Suzumebachi.png';
import tuskBoar from './Tusk_Boar.png';
import twilightFox from './Twilight_Fox.png';
import voidTalon from './Void_Talon.png';
import whiplash from './Whiplash.png';
import widowmaker from './Widowmaker.png';
import xho from './Xho.png';

// logo
import logo from './logo.svg';

// icon
import attack from './attack.png';
import defense from './defense.png';
import alertIcon from './alertIcon.svg';
import AlertIcon from './AlertIcon.jsx';

// players
import player01 from './player01.png';
import player02 from './player02.png';

// sounds
import attackSound from './sounds/attack.wav';
import defenseSound from './sounds/defense.mp3';
import explosion from './sounds/explosion.mp3';

export const allCards = [
  ace,
  bakezori,
  blackSolus,
  calligrapher,
  chakriAvatar,
  coalfist,
  desolator,
  duskRigger,
  flamewreath,
  furiosa,
  geomancer,
  goreHorn,
  heartseeker,
  jadeMonk,
  kaidoExpert,
  katara,
  kiBeholder,
  kindling,
  lanternFox,
  mizuchi,
  orizuru,
  scarletViper,
  stormKage,
  suzumebachi,
  tuskBoar,
  twilightFox,
  voidTalon,
  whiplash,
  widowmaker,
  xho,
];

export {
  saiman,
  astral,
  eoaalien,
  panight,
  heroImg,

  ace,
  bakezori,
  blackSolus,
  calligrapher,
  chakriAvatar,
  coalfist,
  desolator,
  duskRigger,
  flamewreath,
  furiosa,
  geomancer,
  goreHorn,
  heartseeker,
  jadeMonk,
  kaidoExpert,
  katara,
  kiBeholder,
  kindling,
  lanternFox,
  mizuchi,
  orizuru,
  scarletViper,
  stormKage,
  suzumebachi,
  tuskBoar,
  twilightFox,
  voidTalon,
  whiplash,
  widowmaker,
  xho,

  logo,

  attack,
  defense,
  alertIcon,
  AlertIcon,

  player01,
  player02,

  attackSound,
  defenseSound,
  explosion,
};

export const battlegrounds = [
  { id: 'bg-saiman', image: saiman, name: '星际' },
  { id: 'bg-astral', image: astral, name: '银河' },
  { id: 'bg-eoaalien', image: eoaalien, name: '沼泽' },
  { id: 'bg-panight', image: panight, name: '沙漠' },
];

export const gameRules = [
  '相同防御和攻击点数，的卡片将相互抵消。',
  '进攻卡片的攻击点数将减去对方玩家的生命值。',
  '如果玩家1不进行防御，他的生命值将被玩家2的攻击扣除。',
  '如果玩家1进行防御，玩家2的攻击等于玩家2的攻击点数减去玩家1的防御点数。',
  '如果玩家进行防御，将回复3点法力值。',
  '如果玩家进行攻击，将消耗3点法力值。',
];