const AV = require('leancloud-storage');
const { Query, User } = AV;


const APP_ID = 'QXoD8sE6dqJcoUOjVBfEDrpD-gzGzoHsz';
const APP_KEY = 'fH5zz1ERFW6kjLBtF20lJSS3';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
});

export const Tag = new AV.Query('Tag');

export const ConstantQuery = new AV.Query('Constant');

export const ConstantSave = new AV.Object.extend('Constant');


export const convert = (result) => {
  return {
    id: result.id,
    ...result.attributes
  };
};

export const convertArr = (arr = []) => {
  return arr.map(convert);
};