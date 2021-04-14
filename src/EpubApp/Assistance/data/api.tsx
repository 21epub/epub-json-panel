import axios from 'axios';
import qs from 'qs';
import type { UserInfo } from '../components/SignUpInfo';
import type {
  AssistanceInitialValueType,
  AssistanceDetailType,
  ObjectiveDetailType,
  UserInfoType,
  ActivityDetailType,
  SupporterDetailType
} from '../type';

// 配置默认请求头
axios.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};
// application/x-www-form-urlencoded
// multipart/form-data
// application/json

// 配置接口Url
// const portal_url = 'http://test.epub360.com/';
// const portal_url = 'http://www.epub360.com/v2/';
// const portal_url = window.location.protocol + "//" + window.location.host;
const portal_url = '/';

// **-------------------------------------------------------------------------------------------助力活动接口'api/assistance/'
// 新建助力，并设置初始值；
export const AddAssistance = (value: AssistanceInitialValueType) => {
  return new Promise<AssistanceDetailType>((resolve, reject) => {
    axios
      .post(portal_url + 'api/assistance/', qs.stringify(value))
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 删除某助力
export const DeleteAssistance = (aslug: string) => {
  return new Promise<null>((resolve, reject) => {
    axios
      .delete(portal_url + 'api/assistance/' + aslug)
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 修改某助力
export const UpdateAssistance = (
  aslug: string,
  value: AssistanceDetailType
) => {
  return new Promise<AssistanceDetailType>((resolve, reject) => {
    axios
      .patch(portal_url + 'api/assistance/' + aslug, qs.stringify(value))
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询助力列表
export const QueryAssistanceList = () => {
  return new Promise<AssistanceDetailType[]>((resolve, reject) => {
    axios
      .get(portal_url + 'api/assistance/')
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询某助力活动详情-------------用于活动图片、活动规则、联系信息等渲染
export const QueryAssistanceDetail = (aslug: string) => {
  return new Promise<AssistanceDetailType>((resolve, reject) => {
    axios
      .get(portal_url + 'api/assistance/' + aslug)
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// **---------------------------------------------------------------------------------------------------------助力目标接口'api/assistance/' + aslug + '/objective/'

// 给某助力新增目标
export const AddObjective = (aslug: string, value: any) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .post(
        portal_url + 'api/assistance/' + aslug + '/objective/',
        qs.stringify({
          title: value.title,
          description: value.title,
          total_num: value.total_num,
          target_score: value.target_score,
          picture: value.picture
        })
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 删除某个目标
export const DeleteObjective = (aslug: string, oslug: string) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .delete(portal_url + 'api/assistance/' + aslug + '/objective/' + oslug)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 修改某个目标
export const UpdateObjective = (
  aslug: string,
  oslug: string,
  value: ObjectiveDetailType
) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .patch(
        portal_url + 'api/assistance/' + aslug + '/objective/' + oslug,
        qs.stringify(value)
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询当前助力活动的目标列表-------------用于ObjectiveList渲染页面
export const QueryObjectiveList = (aslug: string) => {
  return new Promise<ObjectiveDetailType[]>((resolve, reject) => {
    axios
      .get(portal_url + 'api/assistance/' + aslug + '/objective/')
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询某个目标的属性-------------用于查看某目标属性
export const QueryObjectiveDetail = (aslug: string, oslug: string) => {
  return new Promise<ObjectiveDetailType>((resolve, reject) => {
    axios
      .get(portal_url + 'api/assistance/' + aslug + '/objective/' + oslug)
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// **------------------------------------------------------------------------------------------------'api/assistance/' + aslug + '/objective/' + oslug + '/activity/'
// 某人对某目标发起助力
export const AddActivity = (aslug: string, oslug: string) => {
  return new Promise<ActivityDetailType>((resolve, reject) => {
    axios
      .post(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/'
      )
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询当前目标助力情况的排行榜数据
export const QueryActivityList = (aslug: string, oslug: string) => {
  return new Promise<ActivityDetailType[]>((resolve, reject) => {
    axios
      .get(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/'
      )
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询当前目标助力情况的排行榜数据
export const QueryRankingList = (aslug: string, oslug: string) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/rank/'
      )
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询某人发起的某目标助力情况数据---------------用于第三页第四页.显示此用户的被助力情况,被助力进度.
export const QueryActivityDetail = (
  aslug: string,
  oslug: string,
  acslug: string
) => {
  return new Promise<ActivityDetailType>((resolve, reject) => {
    axios
      .get(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/' +
          acslug
      )
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// **--------------------------------------------------------------------'api/assistance/' + aslug + '/objective/' + oslug + '/activity/' + acslug + '/supporter/'
// 某人帮TA助力--------------用于帮TA助力
export const AddSupporter = (aslug: string, oslug: string, acslug: string) => {
  return new Promise<SupporterDetailType>((resolve, reject) => {
    axios
      .post(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/' +
          acslug +
          '/supporter/'
      )
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询助力者列表
export const QuerySupporterList = (
  aslug: string,
  oslug: string,
  acslug: string
) => {
  return new Promise<SupporterDetailType[]>((resolve, reject) => {
    axios
      .get(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/' +
          acslug +
          '/supporter/'
      )
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询某个助力者信息
export const QuerySupporterDetail = (
  aslug: string,
  oslug: string,
  acslug: string,
  sslug: string
) => {
  return new Promise<SupporterDetailType>((resolve, reject) => {
    axios
      .get(
        portal_url +
          'api/assistance/' +
          aslug +
          '/objective/' +
          oslug +
          '/activity/' +
          acslug +
          '/supporter/' +
          sslug
      )
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询当前登录信息
export const QueryUserDetail = () => {
  return new Promise<UserInfoType>((resolve, reject) => {
    axios
      .get(portal_url + 'v2/api/users/')
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 添加当前目标用户登记信息
export const AddUserInfo = (oslug: string, userInfo: UserInfo) => {
  return new Promise<UserInfoType>((resolve, reject) => {
    axios
      .post(
        portal_url + 'api/assistance/objective/' + oslug + '/userinfo/',
        qs.stringify(userInfo)
      )
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 修改当前目标用户登记信息
export const UpdateUserInfo = (
  oslug: string,
  user_info_id: string,
  userInfo: UserInfo
) => {
  return new Promise<UserInfoType>((resolve, reject) => {
    axios
      .patch(
        portal_url +
          'api/assistance/objective/' +
          oslug +
          '/userinfo/' +
          user_info_id,
        qs.stringify(userInfo),
        { headers: { 'Content-type': 'application/json' } }
      )
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询用户登记信息
export const QueryUserInfo = (oslug: string, userId: string) => {
  return new Promise<UserInfoType>((resolve, reject) => {
    axios
      .get(
        portal_url + 'api/assistance/objective/' + oslug + '/userinfo/' + userId
      )
      .then((response) => {
        resolve(response.data.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
