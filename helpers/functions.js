export const dataConverter = {
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
  targetAmount: (target) => (target * 10000).toLocaleString(),
  progress: (amount, target) => (amount / target) * 100,
  period: (date) => date.substring(0, 10),
  unit: (unit, age) => {
    if (unit === '-1') return -1;
    else if (unit === 'month') return Number(age) * 0.01;
    else return Number(age);
  },
};
