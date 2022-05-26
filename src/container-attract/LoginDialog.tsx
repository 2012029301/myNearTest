import React from 'react'
import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { loginMetamask, loginWalletConnect } from '../actions/app.action'
import { sendClickEvent } from '../actions/app.action'

interface Props {
    onCancel: () => void
}

const LoginDialog: React.FC<Props> = function (this: null, props) {
    const dispatch = useDispatch()

    const connectMetaMask = () => {
        dispatch(sendClickEvent(3, 'LoginDialog_connectMetaMask'))
        if (!window.ethereum) {
            window.open('https://metamask.io/download.html')
        } else {
            dispatch(loginMetamask())
        }
    }

    const walletConnect = () => {
        dispatch(sendClickEvent(4, 'LoginDialog_walletConnect'))
        dispatch(loginWalletConnect())
    }

    return (
        <Modal
            visible={true}
            width={438}
            className="login-dialog"
            closable={false}
            centered
            onCancel={props.onCancel}
            maskClosable
            footer={null}
        >
            <p style={{ color: '#333', fontSize: 18, paddingBottom: 34 }}>
                Login
            </p>
            <div className="wallet">
                <div className="metaMask" onClick={connectMetaMask}>
                    <div className="img_metaMask"></div>
                </div>
                <div className="walletConnet" onClick={walletConnect}>
                    <div className="img_walletConnet"></div>
                </div>
            </div>
        </Modal>
    )
}

export default LoginDialog
