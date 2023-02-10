import { takeEvery } from 'redux-saga/effects';
import { call, all, put, select, delay, takeLatest } from 'redux-saga/effects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventChannel } from 'redux-saga';
import {
  aboutRefSelector,
  featuresRefSelector,
  gamesRefSelector,
  whatsNewRefSelector,
} from '../selectors';
import { onChangeGameCoords } from '../homeAnimationSlice';
import { INIT_ANIMATION } from '../actionCreators';

gsap.registerPlugin(ScrollTrigger);

function* onScrollChange({ action, self, type, titleType }) {
  if (action === 'update') {
    yield put(onChangeGameCoords({ self, type, titleType }));
  }
}

function* lineSaga(action) {
  const { type, container, titleType } = action;
  const event = eventChannel((emitter) => {
    gsap.to(container, {
      scrollTrigger: {
        scrub: 10,
        start: 'start bottom',
        trigger: container,
        onEnter: (self) => {
          emitter({
            titleType,
            type,
            action: 'enter',
            self,
          });
        },
        onUpdate: (self) => {
          emitter({
            titleType,
            action: 'update',
            self,
            type,
          });
        },
        onLeave: (self) => {
          emitter({
            titleType,
            action: 'leave',
            self,
            type,
          });
        },
      },
      // y: state.gamesRef.getBoundingClientRect().y,
    });
    return () => {};
  });
  yield takeEvery(event, onScrollChange);
}

function* initAnimation() {
  const gamesRef = yield select(gamesRefSelector);
  const features = yield select(featuresRefSelector);
  const whatsNewRef = yield select(whatsNewRefSelector);
  const aboutRef = yield select(aboutRefSelector);
  const isReady = [gamesRef, features, whatsNewRef, aboutRef].every((i) => !!i);
  if (!isReady) {
    yield delay(1000);
    yield call(initAnimation);
    return;
  }
  yield all([
     call(lineSaga, {
      container: gamesRef,
      type: 'progressGameLine',
      titleType: 'gameTitleProgress'
    }),
     call(lineSaga, {
      container: features,
      type: 'progressFeatureLine',
      titleType: 'featuresTitleProgress'
    }),
     call(lineSaga, {
      container: whatsNewRef,
      type: 'progressWhatsNew',
      titleType: 'WhatsNewTitleProgress'
    }),
     call(lineSaga, {
      container: aboutRef,
      type: 'progressAbout',
      titleType: 'aboutTitleProgress'
    }),
  ]);
}

function* homeAnimationSaga() {
  yield takeLatest(INIT_ANIMATION, initAnimation);
}

export { homeAnimationSaga };
