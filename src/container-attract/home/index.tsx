import React, { useState, useEffect, useMemo } from 'react'
import { Layout, Button, Modal } from 'antd';
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
interface Props {

}
const Home: React.FC<Props> = function () {
    const LinkWallet = () => {
        console.log(1111);
    }
    return (
        <Layout className="squid">
            <Button onClick={() => LinkWallet()}
            >链接钱包</Button>
        </Layout>
    )
}
export default Home
