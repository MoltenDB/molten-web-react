export const MDB_VIEW_NAVIGATE = 'MDB_VIEW_NAVIGATE';
export const MDB_VIEW_NAVIGATE_CANCEL = 'MDB_VIEW_NAVIGATE_CANCEL';
export const MDB_VIEW_REPLACE = 'MDB_VIEW_REPLACE';
export const MDB_VIEW_UPDATE = 'MDB_VIEW_UPDATE';
export const MDB_VIEW_DO_UPDATE = 'MDB_VIEW_DO_UPDATE';
export const MDB_VIEW_DATA_UPDATE = 'MDB_VIEW_DATA_UPDATE';
export const MDB_VIEW_DATA_DO_UPDATE = 'MDB_VIEW_DATA_DO_UPDATE';

import * as MDBWeb from 'molten-web';
import * as MDB from 'molten-core';

/*TODO should the error be being passed to the action to store in the state.
 * Maybe be passed as an update to the status, though if it is an error will
 * want to cancel the navigation and display the error
export const updateView = (error: MDBWeb.Error, view: MDBWeb.View) => {
  return {
    type: MDB_VIEW_UPDATE
  };
};*/

export const cancelNavigation = () => {
  return {
    type: MDB_VIEW_NAVIGATE_CANCEL
  };
};

export const navigate = (path?: string, view?: MDB.Id) => {
  return {
    type: MDB_VIEW_NAVIGATE,
    path,
    view
  };
};

interface ViewUpdateData {
  view: MDBWeb.View,
  path?: string,
  id?: MDB.Id
}

export const updateView = (data: ViewUpdateData) => {
  return {
    ...data,
    type: MDB_VIEW_UPDATE
  };
};


export const updateData = (path: Array<string>, data: { [key: string]: any },
    subscriptionId?: number) => {
  return {
    type: MDB_VIEW_DATA_UPDATE,
    path,
    subscriptionId,
    data
  };
};
