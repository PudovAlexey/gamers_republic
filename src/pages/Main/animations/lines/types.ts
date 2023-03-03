enum EEventLine {
  ProgressGame = 'progressGameLine',
  ProgressFeature = 'progressFeatureLine',
  ProgressWhatsNew = 'progressWhatsNew',
  ProgressAbout = 'progressAbout',
}

enum EProgressStartLine {
  ProgressGameStartLine = 'progressGameStartLine',
  ProgressFeatureStartLine = 'progressFeatureStartLine',
  ProgressWhatsNewStart = 'progressWhatsNewStart',
  ProgressStartAbout = 'progressStartAbout',
}

enum EProgressTitle {
  GameTitleProgress = 'gameTitleProgress',
  FeaturesTitleProgress = 'featuresTitleProgress',
  WhatsNewTitleProgress = 'WhatsNewTitleProgress',
  AboutTitleProgress = 'AboutTitleProgress',
}

enum EProgressMainLine {
  ProgressGameLine = 'progressGameLine',
  ProgressFeatureLine = 'progressFeatureLine',
  ProgressWhatsNew = 'progressWhatsNew',
  ProgressAbout = 'progressAbout',
}

enum ELinesRef {
  GamesStartLineRef = 'gamesStartLine',
  GamesRef = 'gamesRef',
  FeaturesRef = 'featuresRef',
  FeaturesStartLine = 'featuresStartLine',
  WhatsNewRef = 'whatsNewRef',
  WhatsNewStartLine = 'whatsNewStartLine',
  AboutRef = 'aboutRef',
  AboutStartLine = 'aboutStartLine',
}

type TProgressProps = {
  startLine: EProgressStartLine;
  title: EProgressTitle;
  mainLine: EProgressMainLine;
};

type TLineConfig = Record<EEventLine, TProgressProps>;

export {
  EEventLine,
  EProgressStartLine,
  EProgressTitle,
  EProgressMainLine,
  ELinesRef,
};

export type { TLineConfig };
