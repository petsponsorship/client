import React, { useState } from 'react';
import styles from '../main/DetailMainSection.module.css';
import ProgressBar from '../../ui/progressbar/ProgressBar';
import { dataConverter } from '../../../helpers/functions';
import { copyUrl } from '../../../helpers/functions';
import { getCookie } from '../../../hook/cookies';
import cheer from '/public/cheer.png';
import cheerWhite from '/public/cheerwhite.png';
import heart from '/public/heart.png';
import Image from 'next/image';
import Supportmodal from '../../supportmodal/support/Supportmodal';

function DetailMainSection({ detailData }) {
  const {
    adopt,
    age,
    amount,
    createdAt,
    etcDetail,
    expiredAt,
    like,
    name,
    neutered,
    purpose,
    sex,
    species,
    sponsor,
    targetAmount,
    thumbnail,
    userId,
  } = detailData.data.post;
  const { supportAmountByUser, isLike } = detailData.data;
  const isWriter = Number(getCookie('userId')) === userId;
  console.log('detailData.data', detailData.data);

  //후원모달창
  const [isModal, setIsModal] = useState<boolean>(false);
  const openModal = () => {
    setIsModal(true);
  }

  return (
    <main className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.imgSection}>
          <img alt="대표 이미지" className={styles.thumbnail} src={thumbnail} />
          <span>{`D-${dataConverter.dday(expiredAt)}`}</span>
        </div>
        {isModal ? <Supportmodal /> : null}
        <div className={styles.donationSection}>
          <button onClick={()=>openModal()} >
            <Image src={heart} alt="하트" />
            <span>{supportAmountByUser ? '추가로 후원하기' : '후원하기'}</span>
          </button>
          {supportAmountByUser ? (
            <span>{`현재 ${dataConverter.targetAmount(supportAmountByUser)}원을 후원했어요`}</span>
          ) : null}
        </div>
      </div>
      <section className={styles.rightSection}>
        <div className={styles.flexdiv}>
          <div>
            <div className={styles.flexdiv}>
              <h2>{name}</h2>
            </div>
            <div className={styles.text}>
              <p>
                {dataConverter.age(age)}, {dataConverter.sex(sex)}, {dataConverter.species(species, etcDetail)}
              </p>
              <p>{neutered ? '중성화 완료' : '중성화 필요'}</p>
            </div>
          </div>
          {isWriter ? (
            <div className={styles.editSection}>
              <span>수정</span>
              <span>삭제</span>
            </div>
          ) : (
            <div className={styles.fighting}>
              <Image
                className={`${styles.fightingImg} ${isLike && styles.fightingActive}`}
                src={isLike ? cheerWhite : cheer}
                alt="응원하기"
              />
              {isLike ? <span>응원 완료</span> : <span>응원하기</span>}
              <p>{like}</p>
            </div>
          )}
        </div>
        <span className={styles.period}>
          후원기간 {dataConverter.period(createdAt)} ~ {dataConverter.period(expiredAt)}
        </span>
        <div className={styles.progressSection}>
          <div className={styles.flexdiv}>
            <p>{dataConverter.purpose(purpose)} 후원</p>
            <p>{dataConverter.targetAmount(targetAmount)}원</p>
          </div>
          <ProgressBar value={dataConverter.progress(amount, targetAmount)} />
          <div className={styles.donationText}>
            <span>{sponsor ? `${sponsor}명이 후원했어요!` : '아직 후원한 사람이 없어요.'}</span>
            <p>{dataConverter.progress(amount, targetAmount)}% 달성</p>
          </div>
        </div>
        <section className={styles.btnSection}>
          <div>{adopt && <button>입양문의</button>}</div>
          <div className={styles.rightBtnSection}>
            <div className={styles.btn} onClick={() => copyUrl(window.location.href)}>
              <button className={styles.circleBtn}>URL</button>
              <span>주소복사</span>
            </div>
            <div className={styles.btn}>
              <img src="/kakaologo.png" alt="카카오 로고" />
              <span>공유하기</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default DetailMainSection;
