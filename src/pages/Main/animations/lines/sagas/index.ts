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
import { animationTrigger } from '../homeAnimationSlice';
import { INIT_ANIMATION } from '../actionCreators';
import { EEventLine } from '../types';

gsap.registerPlugin(ScrollTrigger);

function* onScrollChange({ self, type, titleType }) {
    yield put(animationTrigger({ self, type, titleType }));
}

function* lineSaga(action) {
  const { type, container } = action;
  const event = eventChannel((emitter) => {
    gsap.to(container, {
      scrollTrigger: {
        scrub: 10,
        start: 'start bottom',
        trigger: container,
        onUpdate: (self) => {
          emitter({
            action: 'update',
            self,
            type,
          });
        },
      },
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
      type: EEventLine.ProgressGame,
    }),
    call(lineSaga, {
      container: features,
      type: EEventLine.ProgressFeature,
    }),
    call(lineSaga, {
      container: whatsNewRef,
      type: EEventLine.ProgressWhatsNew,
    }),
    call(lineSaga, {
      container: aboutRef,
      type: EEventLine.ProgressAbout,
    }),
  ]);
}

function* homeAnimationSaga() {
  yield takeLatest(INIT_ANIMATION, initAnimation);
}

export { homeAnimationSaga };
