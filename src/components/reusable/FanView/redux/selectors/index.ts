import { createSelector } from 'reselect';

const fanIdsSelector = (state) => state.fanSlice.fanIds;

const scrollDirectionSelector = (state) => state.fanSlice.scrollDirection;

const scrollPositionSelector = (state) => state.fanSlice.scrollPosition;

const fanDataSelector = (state) => {
  return state.fanSlice.fanData
};

const slickSpeedSelector = (state) => state.fanSlice.scrollSpeed

const scrollContainerHeightSelector = (state) => state.fanSlice.scrollContainerHeight

const scrollContainerRefSelector = (state) => state.fanSlice.scrollRef
const fanById = (_, id) => id;

const fanDataByIdSelector = createSelector(
  [fanDataSelector, fanById],
  (fanData, id) => {
    return fanData[id]
  }
);

const fanControlSelector = (state) => state.fanSlice.fanControl;

export {
  fanIdsSelector,
  fanDataByIdSelector,
  fanControlSelector,
  fanDataSelector,
  slickSpeedSelector,
  scrollContainerHeightSelector,
  scrollDirectionSelector,
  scrollPositionSelector,
  scrollContainerRefSelector
};
