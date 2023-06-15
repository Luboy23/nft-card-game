import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { Alert } from '../components';
import { battlegrounds } from '../assets';
import { useGlobalContext } from '../context';



const BattleGround = () => {
  const { setBattleGround,setShowAlert, showAlert } = useGlobalContext();
  const navigate = useNavigate();
  
  const handleBattleGroundChoice = (ground) => {
    setBattleGround(ground.id);

    localStorage.setItem('battleground', ground.id);

    setShowAlert({ status: true, type: 'info', message: `${ground.name}背景 已应用` });

    setTimeout(() => {
      navigate(-1);
    },1000)
  }

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}

      <h1 className={`${styles.headText} text-center`}>
      选择你的
      <span className='text-siteViolet'>对局</span>
        背景
      </h1>
      
      <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
        {battlegrounds.map((ground) => (
          <div
            key={ground.id}
            className={`${styles.flexCenter} ${styles.battleGroundCard}`}
            onClick={() => handleBattleGroundChoice(ground)}
          >
            <img src={ground.image} alt="ground" className={styles.battleGroundCardImg} />

            <div className='info absolute'>
              <p className={styles.battleGroundCardText}>{ground.name}</p>
            </div>
          </div>
        ))}


      </div>
    </div>
  )
}

export default BattleGround