export enum ArcanoidThemes {
  Graduate = 'graduate',
  Methal = 'methal',
  Silver = 'silver',
  Wood = 'wood',
}
export type GameSettings = {
  speed: number;
  soundVolume: number;
  theme: ArcanoidThemes;
};
