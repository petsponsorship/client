import React from 'react';
import styles from '../write/WriteMainSection.module.css';

function WriteMainSection() {
  return (
    <main className={styles.container}>
      <div>
        <img
          alt="대표 이미지"
          className={styles.thumbnail}
          src="https://www.wooripet.co.kr/data/file/come3/thumb-1948775479_b24FmajJ_EF1D7C03-7C6C-4B6C-8C4E-C364005AFA68-74120D00-ED9F-463E-8221-7E53CEBBDE93_1400x933.jpg"
        />
        <div>
          <input type="file" />
        </div>
      </div>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <p>등록일</p>
          <p>2023. 2. 15</p>
          <span>❗️ 후원은 등록일로부터 2주간 유지됩니다</span>
        </div>
        <div className={styles.flexdiv}>
          <p>이름</p>
          <input type="text" />
        </div>
        <div className={styles.flexdiv}>
          <p>나이</p>
          <input type="number" />
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
              <input type="radio" name="age" value="unknown" />
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
            <option value="etc">기타</option>
          </select>
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
          <input type="number" name="goal" />
        </div>
        <div className={styles.flexdiv}>
          <p>후원 목적</p>
          <select name="purpose">
            <option>후원목적을 선택해주세요!</option>
            <option value="의료비">의료비</option>
            <option value="식비">식비</option>
            <option value="기타">기타</option>
          </select>
          <label>
            <input type="checkbox" name="neutering" value="true" /> 입양문의 받기
          </label>
        </div>
        <section className={styles.btnSection}>
          <button>작성 완료</button>
        </section>
      </section>
    </main>
  );
}

export default WriteMainSection;
