import React from 'react';
import styles from '../write/WriteMainSection.module.css';

function WriteMainSection() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className={styles.container}>
      <section>
        <img
          className={styles.thumbnail}
          src="https://www.wooripet.co.kr/data/file/come3/thumb-1948775479_b24FmajJ_EF1D7C03-7C6C-4B6C-8C4E-C364005AFA68-74120D00-ED9F-463E-8221-7E53CEBBDE93_1400x933.jpg"
        />
        <div>
          <input type="file" accept="image/*" />
        </div>
      </section>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <p>등록일</p>
          <input type="date" value={today} readOnly />
          <span>❗️ 후원은 등록일로부터 2주간 유지됩니다</span>
        </div>
        <div className={styles.flexdiv}>
          <p>이름</p>
          <input type="text" maxLength={10} />
        </div>
        <div className={styles.flexdiv}>
          <p>나이</p>
          <input type="number" max={30} />
          <span>
            <label>
              <input type="radio" name="age" value="month" />
              개월
            </label>
            <label>
              <input type="radio" name="age" value="year" />
              만, 세
            </label>
            <label>
              <input type="radio" name="age" value={-1} />
              나이 모름
            </label>
          </span>
        </div>
        <div className={styles.flexdiv}>
          <p>종 선택</p>
          <select name="species">
            <option>종을 선택해주세요!</option>
            <option value="dog">강아지</option>
            <option value="cat">고양이</option>
            <option value="etc">직접 입력</option>
          </select>
          <input disabled />
        </div>
        <div className={styles.flexdiv}>
          <p>성별</p>
          <label>
            <input type="radio" name="sex" value="male" />
            남아
          </label>
          <label>
            <input type="radio" name="sex" value="female" />
            여아
          </label>
          <label>
            <input type="checkbox" name="neutering" value="true" /> 중성화 여부
          </label>
        </div>
        <div className={styles.flexdiv}>
          <p>목표 금액</p>
          <input type="number" name="goal" max={500} />
          <span>만 원</span>
        </div>
        <div className={styles.flexdiv}>
          <p>후원 목적</p>
          <select name="purpose">
            <option>후원목적을 선택해주세요!</option>
            <option value="의료비">의료비</option>
            <option value="식비">사료 및 간식</option>
            <option value="기타">용품비</option>
            <option value="기타">장례비</option>
          </select>
          <label>
            <input type="checkbox" name="neutering" value="true" /> 입양문의 받기
          </label>
        </div>
      </section>
    </main>
  );
}

export default WriteMainSection;
