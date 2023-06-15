import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton, PageHOC } from '../components';
import styles from '../styles';

const JoinBattle = () => {
    const { contract, gameData, setShowAlert,  setBattleName, walletAddress } = useGlobalContext();
    const navigate = useNavigate();

    const handleClick = async (battleName) => {
        setBattleName(battleName);

        try {
            await contract.joinBattle(battleName, { gasLimit: 200000 })

            setShowAlert({ status:true, type: 'success', message:`加入 ${battleName}`})
        } catch (error) {
            console.log(error);
        }
    }


  return (
      <>
          <h2 className={styles.joinHeadText}>可参加的对局</h2>
          <div className={styles.joinContainer}>
              {gameData.pendingBattles.length
                  ? gameData.pendingBattles
                      .filter((battle) => !battle.players.includes
                          (walletAddress))
                      .map((battle, index) => (
                          <div key={battle.name + index}
                              className={styles.flexBetween}> 
                              <p className={styles.joinBattleTitle}>
                                  {index + 1}. {battle.name}</p>
                              <CustomButton
                                  title="加入对局"
                                  handleClick={() => handleClick(battle.name)}
                              />
                      </div>
                      ))
                  :<p className={styles.joinLoading}> 刷新页面以查看最新对局</p>
              }
          </div>
      <p className={styles.infoText} onClick={() => navigate('/create-battle')}> 或者创建一场新的对局</p>
      </>
  ) 
}

export default PageHOC(
    JoinBattle,
    <>加入 <br />对局</>,
    <>加入已存在的对局</>
)