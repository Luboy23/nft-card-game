import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { PageHOC, CustomInput, CustomButton } from '../components';


const Home = () => {
  const { contract, walletAddress,setShowAlert,gameData,setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1)
      navigate(`/battle/${gameData.activeBattle.name}`);


  },[gameData])


  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: 'info',
          message:`${playerName} 注册成功！`
        })
      }
    } catch (error) {
      setErrorMessage(error)
    }
  }

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);


      if(playerExists && playerTokenExists) navigate('/create-battle')
    }
    if (contract) checkForPlayerToken();
  },[contract])

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`battle/${gameData.activeBattle.name}`)
    }
  },[gameData])


  return (
    <div className='flex flex-col'>
      <CustomInput
        label="名称"
        placeholder='输入你的名称'
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title="立即注册"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  )
};

export default PageHOC(
  Home,
  <>欢迎来到@lllu_23制作的 <br />Web3.0 NFT卡牌游戏 </>,
  <>连接你的钱包<br/>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 然后开始游戏 </>
); 