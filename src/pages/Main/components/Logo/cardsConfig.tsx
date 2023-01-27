import { Shield } from '../../../../assets/main/common/Shield';
import { Heart } from '../../../../assets/main/common/Heart';
import { Stamp } from '../../../../assets/main/common/Stamp';
import { TCard } from '../../../../components/reusable/LabelCard/LabelCard';
const cardsConfig: TCard[] = [
  {
    title: 'Play',
    link: {
      text: 'Try now',
      navTo: '/games',
    },
    description:
      'Cast out a radianite orb that breaks' +
      'into a slowing field upon impact with the ground.',
      icon: <Stamp size={'100%'}/>
  },
  {
    title: 'Chat',
    link: {
      text: 'Send invite to your friend',
      navTo: '/registration',
    },
    description:
      'Target a friendly corpse. After a short delay,' +
      'revive them with full health.',
    icon: <Heart size={'100%'}/>
  },
  {
    title: 'Share your results',
    link: {
      text: 'check destinations',
      navTo: '/records',
    },
    description:
      'Heal an ally or yourself to full' + 
      'health over a few seconds.',
      icon: <Shield size={'100%'}/>
  },
];

export { cardsConfig };
