import { useCallback, useState } from 'react';
import useValidate from './useValidate';

const useSignForm = () => {
  const [emailIsAbled, emailWarnList, oncheckEmail] = useValidate('email');
  const [passwordIsAbled, passwordWarnList, oncheckPassword] = useValidate('password');
  const [nameIsAbled, nameWarnList, oncheckName] = useValidate('name');
  const [phoneNumberIsAbled, phoneNumberWarnList, oncheckPhoneNumber] = useValidate('phoneNumber');

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  const handleInputValue = useCallback(
    (key) => (e) => {
      setUserInfo({ ...userInfo, [key]: e.target.value });

      if (key === 'email') {
        oncheckEmail(e.target.value);
      }
      if (key === 'password') {
        oncheckPassword(e.target.value);
      }
      if (key === 'name') {
        oncheckName(e.target.value);
      }
      if (key === 'phoneNumber') {
        oncheckPhoneNumber(e.target.value);
      }
    },
    [userInfo],
  );

  return {
    userInfo,
    setUserInfo,
    handleInputValue,
    emailIsAbled,
    emailWarnList,
    passwordIsAbled,
    passwordWarnList,
    nameIsAbled,
    nameWarnList,
    phoneNumberIsAbled,
    phoneNumberWarnList,
  };
};

export default useSignForm;
