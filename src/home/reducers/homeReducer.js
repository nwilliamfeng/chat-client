import { constants, pageType, detailPaneType } from '../constants';
import { constants as chatConstants, chatOpenMode } from '../../chat/constants';
import { constants as messageConstants } from '../../message/constants'



export const homeReducer = (state = {}, action) => {
  switch (action.type) {

    case chatConstants.OPEN_CHAT:
      if (action.openMode === chatOpenMode.ByStaff) {
        return {
          ...state,
          page: pageType.CHAT,
        };
      }

    case constants.PAGE_SELECT:
      return {
        ...state,
        page: action.page,
      }

    case constants.CLOSE_DETAIL_PANE:
      return {
        ...state,
        detailPane:null,
      }

    case messageConstants.SHOW_DETAIL_HISTORY_MESSAGE:
      return {
        ...state,
        detailPane: detailPaneType.HISTORY_MESSAGE,
      }


    default:
      return state;
  }

}
