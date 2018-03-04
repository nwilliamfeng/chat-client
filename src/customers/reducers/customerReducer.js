import { constants } from '../constants';

 

/**
 * 返回排序后的客户列表
 * @param {*} customers 
 * @param {*} sortDescriptor 
 */
const getSortedCustomerList = (customers, sortDescriptor) => {
  
  const {column,order} =sortDescriptor;
  if (column==null || order==0) {
    return customers;
  }

  customers.sort((a, b) => {

    const result = order == 2 ? a[column] >= b[column] : a[column] <= b[column];
    return result == true ? 1 : -1;
  })

  return customers;

}

const initState={customers:[],staffs:[],sortDescriptor:{column:null,order:0}};

export const customerReducer = (state =initState , action) => {
  switch (action.type) {

    case constants.Get_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customers: action.customers,
      };

    case constants.Get_STAFF_LIST_SUCCESS:
      return {
        ...state,
        staffs: action.staffs,
      };

    case constants.SORT_CUSTOMERS:
    const {customers} =state;
      return {
        customers: getSortedCustomerList(customers, action.sortDescriptor),
        sortDescriptor: action.sortDescriptor,
         
      }

    default:
      return state;
  }

}
