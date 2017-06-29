/**
 * Created by louyq on 2017/6/29.
 */
module.exports = function () {
  var faker = require("faker");
  faker.locale = "zh_CN";
  var _ = require("lodash");
  return {
    accountx: {
        code:200,
        data:{
          accountName:faker.name.findName(),
          type:'passport',
          state:'',
          session:faker.random.uuid(),
        }
      }
    ,
    login: {
      code:200,
      data:{
        accountName:faker.name.findName(),
        type:'passport',
        state:'',
        session:faker.random.uuid(),
      }
    },
    group:_.times(100, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar()
      }
    }),
  }
}
