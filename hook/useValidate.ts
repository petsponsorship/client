import { useState } from "react";

/**
 * validity 체크하는 hook
 * @param {"email" || "password"} type
 * @returns
 */
const useValidate = (type:string):any => {
  const [validity, setValidity] = useState(false);
  const [warnList, setWarnList] = useState([]);

  const oncheckValidity = (text:string) => {
    const warnList = [];
    if (!text) {
      return setValidity(false);
    }
    const regexforValAuth = {
      password: {
        warnText: "비밀번호는 8글자 이상이어야 합니다.",
        fn: new RegExp("(?=.{8,})"),
      },
      email: {
        warnText: "이메일에는 @가 포함되어야 합니다.",
        fn: new RegExp("@"),
      },
      name : {
        warnText: "이름은 2글자 이상 10글자 이하로만 입력 가능합니다.",
        fn : new RegExp("/^[가-힣]{2,10}$/")
      },
      phoneNumber : {
        warnText: "휴대폰번호 형식을 확인해주세요",
        fn : new RegExp("/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/")
      }
    };
    const { warnText, fn } = regexforValAuth[type];
    if (!fn.test(text)) {
      warnList.push(warnText);
    }

    setWarnList(warnList);
    if (warnList.length > 0) {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };
  return [validity, warnList, oncheckValidity];
};

export default useValidate;
