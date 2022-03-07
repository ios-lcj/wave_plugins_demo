import React, { useEffect } from 'react';
import styles from './index.less';

const IndexPage = () => {
  /**
   * 获取用户配置信息
   */
  const getUserConfig = () => {
    // @ts-ignore
    pluginSDK.userConfig.getUserConfig(function ({ errorCode, data }: { errorCode: number; data: any }) {
      // @ts-ignore
      pluginSDK.log.log(errorCode, data);
      if (errorCode === 0 && data) {
        // @ts-ignore
        pluginSDK.log.log('Get user config success');
      }
    });
  };

  /**
   * 添加用户配置信息
   * 注意：会覆盖之前的配置信息
   */
  const setUserConfig = () => {
    const userConfig = {
      name: 'name',
      age: 'age',
      address: 'address',
    };
    // @ts-ignore
    pluginSDK.userConfig.addUserConfig(
      { userConfig: JSON.stringify(userConfig) },
      function ({ errorCode }: { errorCode: number }) {
        if (errorCode === 0) {
          // @ts-ignore
          pluginSDK.log.log('Add user config success');
        }
      },
    );
  };

  /**
   * 发起语音通话
   */
  const makeP2PAudioCall = () => {
    // @ts-ignore
    pluginSDK.call.makeP2PAudioCall({ callNumber: '1111' }, function ({ errorCode }: { errorCode: number }) {
      if (errorCode === 0) {
        // @ts-ignore
        pluginSDK.log.log('MakeP2PAudioCall success');
      }
    });
  };

  /**
   * 发起视频通话
   */
  const makeP2PVideoCall = () => {
    // @ts-ignore
    pluginSDK.call.makeP2PVideoCall({ callNumber: '1111' }, function ({ errorCode }: { errorCode: number }) {
      if (errorCode === 0) {
        // @ts-ignore
        pluginSDK.log.log('MakeP2PAudioCall success');
      }
    });
  };

  const closeWindow = () => {
    // @ts-ignore
    pluginSDK.hideWindow();
  };

  useEffect(() => {
    /**
     * 监听收到语音/视频来电
     * 回调函数参数：callType,callNum
     */
    // @ts-ignore
    pluginSDK.eventEmitter.on(
      'onRecvP2PIncomingCall',
      function ({ callType, callNum }: { callType: string; callNum: string }) {
        // 打印log日志
        // @ts-ignore
        pluginSDK.log.log('onRecvP2PIncomingCall', callType, callNum);

        // 打开通知
        // @ts-ignore
        pluginSDK.displayNotification({
          notificationBody: 'onRecvP2PIncomingCall',
        });
      },
    );

    /**
     * 监听wave发起语音/视频
     * 回调函数参数：callType,callNum
     */
    // @ts-ignore
    pluginSDK.eventEmitter.on('onInitP2PCall', function ({ callType, callNum }: { callType: string; callNum: string }) {
      // 打印info日志
      // @ts-ignore
      pluginSDK.log.info('onInitP2PCall', callType, callNum);

      // 打开通知
      // @ts-ignore
      pluginSDK.displayNotification({ notificationBody: 'onInitP2PCall' });
    });

    /**
     * 监听拒绝语音/视频
     * 回调函数参数：callType,callNum
     */
    // @ts-ignore
    pluginSDK.eventEmitter.on(
      'onRejectP2PCall',
      function ({ callType, callNum }: { callType: string; callNum: string }) {
        // 打印warn日志
        // @ts-ignore
        pluginSDK.log.warn('onRejectP2PCall', callType, callNum);

        // 关闭通知窗口
        // @ts-ignore
        pluginSDK.hideNotification();
      },
    );

    /**
     * 监听挂断语音/视频
     * 回调函数参数：callType, callNum, callStartTimeStamp, callEndTimeStamp, callDirection
     */
    // @ts-ignore
    pluginSDK.eventEmitter.on('onHangupP2PCall', function (data: any) {
      const { callType, callNum, callStartTimeStamp, callEndTimeStamp, callDirection } = data;
      // 打印warn日志
      // @ts-ignore
      pluginSDK.log.warn('onHangupP2PCall', callType, callNum, callStartTimeStamp, callEndTimeStamp, callDirection);

      // 关闭通知窗口
      // @ts-ignore
      pluginSDK.hideNotification();
    });

    /**
     * 监听取消去电
     * 回调函数参数：callType, callNum
     */
    // @ts-ignore
    pluginSDK.eventEmitter.on(
      'p2PCallCanceled',
      function ({ callType, callNum }: { callType: string; callNum: string }) {
        // error
        // @ts-ignore
        pluginSDK.log.error('p2PCallCanceled', callType, callNum);

        // 关闭通知窗口
        // @ts-ignore
        pluginSDK.hideNotification();
      },
    );

    return function cleanup() {
      // @ts-ignore
      pluginSDK.eventEmitter.off('onRecvP2PIncomingCall');

      // @ts-ignore
      pluginSDK.eventEmitter.off('onInitP2PCall');

      // @ts-ignore
      pluginSDK.eventEmitter.off('onRejectP2PCall');

      // @ts-ignore
      pluginSDK.eventEmitter.off('onHangupP2PCall');

      // @ts-ignore
      pluginSDK.eventEmitter.off('p2PCallCanceled');
    };
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={getUserConfig}>Get user Config</button>
      <button onClick={setUserConfig}>Ser user Config</button>
      <button onClick={makeP2PAudioCall}>MakeP2PAudioCall</button>
      <button onClick={makeP2PVideoCall}>MakeP2PVideoCall</button>
      <button onClick={closeWindow}>Close Window</button>
    </div>
  );
};

export default IndexPage;
