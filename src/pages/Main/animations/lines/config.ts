import {
  EProgressMainLine,
  EProgressStartLine,
  EProgressTitle,
  TLineConfig,
} from './types';

const eventConfig: TLineConfig = {
  progressGameLine: {
    startLine: EProgressStartLine.ProgressGameStartLine,
    title: EProgressTitle.GameTitleProgress,
    mainLine: EProgressMainLine.ProgressGameLine,
  },
  progressFeatureLine: {
    startLine: EProgressStartLine.ProgressFeatureStartLine,
    title: EProgressTitle.FeaturesTitleProgress,
    mainLine: EProgressMainLine.ProgressFeatureLine,
  },
  progressWhatsNew: {
    startLine: EProgressStartLine.ProgressWhatsNewStart,
    title: EProgressTitle.WhatsNewTitleProgress,
    mainLine: EProgressMainLine.ProgressWhatsNew,
  },
  progressAbout: {
    startLine: EProgressStartLine.ProgressStartAbout,
    title: EProgressTitle.AboutTitleProgress,
    mainLine: EProgressMainLine.ProgressAbout,
  },
};

export { eventConfig };
