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
    "group-list":{
      code:200,
      data:_.times(120, function (n) {
      return {
          id: n,
          description:faker.company.companyName(),
          area:'朝晖',
          max_num:(faker.random.number()%3)+1,
          now_num:(faker.random.number()%3)+1,
          pre_num:(faker.random.number()%20),
          locked:(faker.random.number()%2)
      }
    }),
    }
  }
}
