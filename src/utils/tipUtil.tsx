import {notification} from 'antd'
import React from 'react'

const openNotification = (messageHeader, messageBodyText) => {
  notification.open({
    message: messageHeader,
    duration: null,
    placement: 'topRight',
    onClose: () => {
      // callback?.()
    },
    closeIcon: < img src={require('../assets/images/close2.png')} style={{width: '20px'}} alt=""/>,
    description:
    messageBodyText,
    style: {
      width: 250,
    },
    onClick: () => {
    },
  })
}
const openNotification2 = (messageHeader, messageBodyText) => {
  notification.open({
    message: messageHeader,
    duration: null,
    placement: 'topRight',
    onClose: () => {
      // callback?.()
    },
    closeIcon: < img  src={require('../assets/attract/close.png')} style={{width: '12px',marginTop:'-25px'}} alt=""/>,
    description:
    messageBodyText,
    style: {
      width: 250,
    },
    onClick: () => {
    },
  })
}

export {openNotification,openNotification2}

if (('Notification' in window)) {
  if (Notification.permission != 'granted') {
    Notification.requestPermission((permission) => {
      console.log(permission)
    })
  }
}

export function systemNotification(message) {
  // 检查用户是否已经允许使用通知
  if (Notification.permission === 'granted') {
    // 创建 Notification
    let notification = new Notification(message)
    autoClose(notification)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        let notification = new Notification(message)
        autoClose(notification)
      }
    })
  }
}

function autoClose(notification) {
  if (typeof notification.time === 'undefined' || notification.time <= 0) {
    notification.close()
  } else {
    setTimeout(function () {
      notification.close()
    }, notification.time)
  }

  notification.addEventListener('click', function () {
    notification.close()
  }, false)
}
