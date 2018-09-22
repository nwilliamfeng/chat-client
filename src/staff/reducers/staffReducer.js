import { constants } from '../constants';


const initState = { staffs: [], expandStates: [] };

export const staffReducer = (state = initState, action) => {
  switch (action.type) {


    case constants.Get_STAFF_LIST_SUCCESS:
      return {
        ...state,
        staffs: action.staffs,
      };

    case constants.STAFF_EXPAND_STATE_CHANGE:
      let {expandStates}=state;
      let exist=expandStates.find(x=>x.panelId===action.panelId);
      if(exist==null){
        expandStates.push({panelId:action.panelId,isExpand:action.isExpand});
      }
      else{
        exist.isExpand=action.isExpand;
      }
      return {
        ...state,
        expandStates,
      };


    default:
      return state;
  }

}
