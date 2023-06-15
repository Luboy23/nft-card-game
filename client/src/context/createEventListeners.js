import { ethers } from 'ethers';

import { ABI } from '../contract';
import { playAudio, sparcle } from '../utils/animation';
import { defenseSound } from '../assets';

const emptyAccount = '0x0000000000000000000000000000000000000000';


const AddNewEvent = (eventFilter, provider, cb) => {
    provider.removeListener(eventFilter); 

    provider.on(eventFilter, (logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(logs);

        cb(parsedLog);
    })
}

const getCoords = (cardRef) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    return {
        pageX: left + width / 2,
        pageY: top + height / 2.25,
    }
}

export const createEventListeners = ({ navigate, contract, provider, walletAddress,setShowAlert,setUpdateGameData,player1Ref,player2Ref}) => {
    const NewPlayerEventFilter = contract.filters.NewPlayer();

    AddNewEvent(NewPlayerEventFilter, provider, ({args}) => {
        console.log('new player created!', args);

        if (walletAddress === args.owner) {
            setShowAlert({
                status: true,
                type: 'success',
                message:'注册成功'
            })
        }
    })

    const NewGameTokenEventFilter = contract.filters.NewGameToken();
    AddNewEvent(NewGameTokenEventFilter, provider, ({args}) => {
        console.log('新的游戏代币已铸造！', args);
        
        if (walletAddress.toLowerCase() === args.owner.toLowerCase()) {
            setShowAlert({
                status: true,
                type: 'success',
                message:'玩家的游戏代币已成功铸造！'
            }
            )
            navigate('/create-battle')
        }
    })


    const NewBattleEventFilter = contract.filters.NewBattle();

    AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
        console.log('新对局开始了！', args, walletAddress);

        if (walletAddress === args.player1.toLowerCase() || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
            navigate(`/battle/${args.battleName}`)
        }
        setUpdateGameData((prevUpdateGameData)=> prevUpdateGameData + 1) ;
    });

    const BattleMoveEventFilter = contract.filters.BattleMove();
    AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
console.log('已进行操作!', args);

    });
    
    const RoundEndedEventFilter = contract.filters.RoundEnded()
    AddNewEvent(RoundEndedEventFilter, provider, ({ args }) => {
        console.log('回合结束!', args, walletAddress);
        
        for (let i = 0; i < args.damagedPlayers.length; i += 1) {
            if (args.damagedPlayers[i] !== emptyAccount) {
                if (args.damagedPlayers[i] === walletAddress) {
                    sparcle(getCoords(player1Ref));
                } else if (args.damagedPlayers[i] !== walletAddress)
                    sparcle(getCoords(player2Ref));
            } else {
                playAudio(defenseSound)
            }
        }
        setUpdateGameData((prevUpdateGameData)=> prevUpdateGameData + 1) ;
    });

    const BattleEndedEventFilter = contract.filters.BattleEnded();

    AddNewEvent(BattleEndedEventFilter, provider, ({ args }) => {
        console.log('对局结束！', args, walletAddress);

        if (walletAddress.toLowerCase() === args.winner.toLowerCase()) {
            setShowAlert({status: true, type: 'success', message:'恭喜你赢了！'})
        } else if(walletAddress.toLowerCase() === args.loser.toLowerCase()) {
            setShowAlert({status: true, type: 'failure', message:'很遗憾你输了...'})
        }
        navigate('/create-battle')
    });

    
} 



