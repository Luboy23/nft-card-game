import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import styles from '../styles';
import { CustomButton } from '.';
import { useGlobalContext } from '../context';
import { GetParams, SwitchNetwork } from '../utils/onboard.js';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });

    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              您还没有安装钱包的扩展插件！
            </p>
            <CustomButton
              title="Download Core"
              handleClick={() => window.open('https://metamask.io/', '_blank')}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              您还没有连接到您的钱包账户！
            </p>
            <CustomButton
              title="Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              您的网络连接不对，请切换到fuji测试网
            </p>
            <CustomButton title="Switch" handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              非常抱歉，您的账户中没有足够的AVAX代币以参与游戏
            </p>
            <CustomButton
              title="Grab some test tokens"
              handleClick={() => window.open('https://faucet.avax.network/', '_blank')}
            />
          </>
        );

      default:
        return <p className={styles.modalText}>Good to go!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
