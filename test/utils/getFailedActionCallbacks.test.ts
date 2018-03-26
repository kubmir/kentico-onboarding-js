import {
  cancelFailedAddAction,
  cancelFailedDeleteAction,
  cancelFailedUpdateAction,
  deleteServerNote,
  retryAddNewNote,
  updateServerNote
} from '../../src/actions';
import { getFailedActionCallbacks } from '../../src/utils/getFailedActionCallbacks';
import { FailedAction } from '../../src/enums/failedAction';
import {
  getFailedAddActionTooltipText,
  getFailedDeleteActionTooltipText,
  getFailedUpdateActionTooltipText
} from '../../src/utils/getTooltipText';

describe('getFailedActionCallbacks', () => {

  it('no failure action', () =>
    expect(() => getFailedActionCallbacks(FailedAction.NO_FAILURE)).toThrow()
  );

  it('delete action', () => {
    const expectedCallbacks = {
      cancelFailedAction: cancelFailedDeleteAction,
      retryFailedAction: deleteServerNote,
      getFailedActionTooltipText: getFailedDeleteActionTooltipText,
    };

    const actualCallbacks = getFailedActionCallbacks(FailedAction.DELETE);

    expect(actualCallbacks).toEqual(expectedCallbacks);
  });

  it('add action', () => {
    const expectedCallbacks = {
      cancelFailedAction: cancelFailedAddAction,
      retryFailedAction: retryAddNewNote,
      getFailedActionTooltipText: getFailedAddActionTooltipText,
    };

    const actualCallbacks = getFailedActionCallbacks(FailedAction.ADD);

    expect(actualCallbacks).toEqual(expectedCallbacks);
  });

  it('update action', () => {
    const expectedCallbacks = {
      cancelFailedAction: cancelFailedUpdateAction,
      retryFailedAction: updateServerNote,
      getFailedActionTooltipText: getFailedUpdateActionTooltipText,
    };

    const actualCallbacks = getFailedActionCallbacks(FailedAction.UPDATE);

    expect(actualCallbacks).toEqual(expectedCallbacks);
  });
});
