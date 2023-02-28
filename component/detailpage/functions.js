export const dataConverter = {
  age: (age) => {
    if (age === -1) return '나이 모름';
    return Number.isInteger(age) ? `${age}살` : `${age * 100}개월`;
  },
  sex: (sex) => (sex ? '여아' : '남아'),
  species: (species, etcDetail) => (etcDetail ? etcDetail : species),
  purpose: (purpose) => {
    const purposeObj = { food: '사료 및 간식비', medical: '의료비', care: '용품비', funeral: '장례비' };
    return purposeObj[purpose];
  },
  targetAmount: (target) => (target * 10000).toLocaleString(),
  progress: (amount, target) => (amount / target) * 100,
};
