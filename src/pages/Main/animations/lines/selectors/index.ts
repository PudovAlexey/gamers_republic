const progressGameLineSelector = (store) =>
  store.homeAnimationSlice.progressGameLine;

const progressFeatureLineSelector = (store) =>
  store.homeAnimationSlice.progressFeatureLine;

const progressWhatsNewSelector = (store) =>
  store.homeAnimationSlice.progressWhatsNew;

const progressAboutSelector = (store) => store.homeAnimationSlice.progressAbout;

const gamesRefSelector = (store) => store.homeAnimationSlice.gamesRef;

const animationUploadCompleted = (store) =>
  store.homeAnimationSlice.uploadCompleted;

const featuresRefSelector = (store) => store.homeAnimationSlice.featuresRef;

const whatsNewRefSelector = (store) => store.homeAnimationSlice.whatsNewRef;

const aboutRefSelector = (store) => store.homeAnimationSlice.aboutRef;

const gameTitleProgressSelector = (store) =>
  store.homeAnimationSlice.gameTitleProgress;

const featuresTitleProgressSelector = (store) =>
  store.homeAnimationSlice.featuresTitleProgress;

const WhatsNewTitleProgressSelector = (store) =>
  store.homeAnimationSlice.WhatsNewTitleProgress;

const aboutTitleProgressSelector = (store) =>
  store.homeAnimationSlice.aboutTitleProgress;

const gamesStartLineSelector = (store) =>
  store.homeAnimationSlice.gamesStartLine;

const featuresStartLineSelector = (store) =>
  store.homeAnimationSlice.featuresStartLine;

const whatsNewStartLineSelector = (store) =>
  store.homeAnimationSlice.whatsNewStartLine;

const aboutStartLineSelector = (store) =>
  store.homeAnimationSlice.aboutStartLine;
export {
  progressGameLineSelector,
  progressFeatureLineSelector,
  progressWhatsNewSelector,
  progressAboutSelector,
  gamesRefSelector,
  featuresRefSelector,
  whatsNewRefSelector,
  aboutRefSelector,
  animationUploadCompleted,
  gameTitleProgressSelector,
  featuresTitleProgressSelector,
  WhatsNewTitleProgressSelector,
  aboutTitleProgressSelector,
  gamesStartLineSelector,
  featuresStartLineSelector,
  whatsNewStartLineSelector,
  aboutStartLineSelector,
};