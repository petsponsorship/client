export const dataConverter = {
  dday: (date) => {
    let today = new Date();
    let dday = new Date(date.substring(0, 10));
    let gap = dday.getTime() - today.getTime();
    return Math.ceil(gap / (1000 * 60 * 60 * 24));
  },
  age: (age) => {
    if (age === -1) return '나이 모름';
    return Number.isInteger(age) ? `${age}살` : `${age * 100}개월`;
  },
  sex: (sex) => {
    if (typeof sex === 'string') {
      return sex === '0' ? false : true;
    } else {
      return sex ? '여아' : '남아';
    }
  },
  species: (species, etcDetail) => (etcDetail ? etcDetail : species),
  purpose: (purpose) => {
    const purposeObj = { food: '사료 및 간식비', medical: '의료비', care: '용품비', funeral: '장례비' };
    return purposeObj[purpose];
  },
  targetAmount: (target) => target.toLocaleString(),
  progress: (amount, target) => Number(((amount / target) * 100).toFixed(1)),
  period: (date) => date.substring(0, 10),
  unit: (unit, age) => {
    if (unit === '-1') return -1;
    else if (unit === 'month') return Number(age) * 0.01;
    else return Number(age);
  },
};

export const copyUrl = async (url) => {
  await navigator.clipboard.writeText(url);
  alert('주소가 클립보드에 복사되었습니다.');
};
