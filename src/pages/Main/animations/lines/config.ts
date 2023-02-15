const eventConfig = {
  progressGameLine: {
    startLine: 'progressGameStartLine',
    title: 'gameTitleProgress',
    mainLine: 'progressGameLine',
    previousBlock: null
  },
  progressFeatureLine: {
    startLine: 'progressFeatureStartLine',
    title: 'featuresTitleProgress',
    mainLine: 'progressFeatureLine',
    previousBlock: 'progressGameLine'
  },
  progressWhatsNew: {
    startLine: 'progressWhatsNewStart',
    title: 'WhatsNewTitleProgress',
    mainLine: 'progressWhatsNew',
    previousBlock: 'progressFeatureLine'
  },
  progressAbout: {
    startLine: 'progressStartAbout',
    title: 'aboutTitleProgress',
    mainLine: 'progressAbout',
    previousBlock: 'progressWhatsNew'
  },
};

export { eventConfig };
