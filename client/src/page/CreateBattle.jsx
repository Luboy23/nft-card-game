import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';

import {CustomButton, PageHOC, CustomInput,GameLoad, } from '../components';
 
const CreateBattle = () => {
  const { contract, battleName, setBattleName,gameData,setErrorMessage } = useGlobalContext();

  const [waitBattle, setWaitBattle] = useState(false);
 
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`)
    }  else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  },[gameData])

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName)

    } catch (error) {
      setErrorMessage(error)
    }
  }

  return (
    <>
      {waitBattle && <GameLoad/>}

      <div className='flex flex-col m5-5'>
        <CustomInput
          label="对战"
          placeholder='请输入昵称'
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title='创建对局'
          handleClick={handleClick}
          restStyles='mt-6'
        />
      </div>

      <p className={`${styles.infoText} mt-5`} onClick={() => navigate('/join-battle')}>或者加入已存在的对局</p>
    </>
  )
};

export default PageHOC(
    CreateBattle,
  <>创建一局 <br />新的对局 </>,
  <>创建你自己的对局，等待其他玩家的加入... </>
); 