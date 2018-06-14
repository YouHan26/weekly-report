import {ConstantQuery, ConstantSave, convertArr, Tag} from '../helpers/storage';

const prefix = 'tag_';

const tagActions = {
  load: `${prefix}load`,
};

const prefix2 = 'constant_';

const constantActions = {
  load: `${prefix2}load`,
  save: `${prefix2}save`,
};


/**
 * action
 */

export const loadTags = () => {
  return (dispatch) => {
    Tag.find()
      .then((datas) => {
        dispatch({
          type: tagActions.load,
          data: convertArr(datas)
        })
      });
  };
};

export const loadConstants = () => {
  return (dispatch) => {
    ConstantQuery.find()
      .then((datas) => {
        dispatch({
          type: constantActions.load,
          data: convertArr(datas)
        })
      });
  };
};

export const saveConstant = (data, after) => {
  return () => {
    const Constant = new ConstantSave();
    Constant.set('title', data.title);
    Constant.set('data', data.data);
    Constant.set('tags', data.tags);
    
    Constant.save()
      .then(() => {
        after(true);
      }, (error) => {
        console.log(error);
        after(false)
      });
  }
};


/**
 * reducer
 * @type {{}}
 */
const initState = {
  tags: [],
  constants: []
};

const state = (state = initState, action) => {
  switch (action.type) {
    case tagActions.load: {
      return {
        ...state,
        tags: action.data
      };
    }
    case constantActions.load:{
      return {
        ...state,
        constants: action.data
      }
    }
    default: {
      return state;
    }
  }
};


export default state;