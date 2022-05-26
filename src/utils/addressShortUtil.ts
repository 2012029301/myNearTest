import { utils } from 'ethers'

const addressShortUtil = function (add, num1, num2) {
  if (!add) {
    return ''
  }
  try {
    add = utils.getAddress(add)
  } catch (_) {

  }
  return add.substring(0, num1) + '...' + add.substring(add.length - num2)
}

export default addressShortUtil

export function getAddressName(address) {
  let match = Address_List.find(item => item.address == address.toLowerCase())

  return match ? match.name : ''
}

const Address_List = [{ 'address': '0x9d79fbf7bcfe122e46a71809c2bca7a3dd8be681', 'name': '---机器人1---' }, {
  'address': '0xb2c397890fb468b98b89a601b2fc8f031bda8593',
  'name': '---机器人2---'
}, { 'address': '0x5c810967b4b4fcd9de7bd26b4591c187f0460b22', 'name': '---机器人3---' }, {
  'address': '0x424a2e9fc87f403f4292d8edf657c68999d5bd2c',
  'name': '---机器人4---'
}, { 'address': '0x2f1bf1524c184181ba521eda4711fae6ee0d037e', 'name': '---机器人5---' }, {
  'address': '0x008f6134351487b9524505ceb7841df5e2fb4cad',
  'name': '---机器人6---'
}, { 'address': '0x00994be237713cdca3e9d3ffef88949a290ba133', 'name': '--byron--' }, {
  'address': '0xebb594b4e7afc089a061434e21ce3a6e4edbc5d1',
  'name': '--jiangyu--'
}, { 'address': '0x06a53f06673a51976e309a8981a67e77a6567b56', 'name': '--尚鑫--' }, {
  'address': '0xfead5ad80584862961c9a3808717261006b4b0f4',
  'name': '--小宁--'
}, { 'address': '0x4f0cceb71ee58725135e01ebba29dc701bfa7216', 'name': '--嘉璐--' }, {
  'address': '0x81b4268c4e21ec64a7320db6649e4c7c7bb98814',
  'name': '--布哥--'
}, { 'address': '0x23b6d6b076265d6bcbc67bdf761ea8d58fcbbaac', 'name': '--磊哥--' }, {
  'address': '0x62b293cf6170c76ea908689f2eb93eb21e3f5084',
  'name': '--李军--'
}, { 'address': '0x54630f49c7767d65edd26c7327f97c379ba8bd63', 'name': '--李军--' }, {
  'address': '0xb0c5152c5fdc0e0bf5e5ee40aa54f5ec2df5f507',
  'name': '--阿迪--'
}, { 'address': '0x2b3ff9631ef3d3bbeb282602069e98c5d6d91843', 'name': '--Andy--' }, {
  'address': '0xfdb426f8bbd215ecb0e2825de563828bc9c7c6df',
  'name': '链捕手 - KOL'
}, { 'address': '0xfa9af4db3bbf3f60ae74ee871f660bbcb5a5257e', 'name': '蓝狐 - 蓝狐笔记' }, {
  'address': '0xefc2d0de96468c829f688c88e89998cc447388e0',
  'name': '孙小虎 - DODO'
}, { 'address': '0xeb12ea8c2cfe7f002e78e5c7e8b9270e6829f6fd', 'name': '卓皓 - 火币' }, {
  'address': '0xea04414c5a25c2817da897e671aedaa85f7e1b89',
  'name': 'Steve - Near中文区'
}, { 'address': '0xe516a08a8588f26fd2bee405fc75191a3ef367bb', 'name': 'Jay - 路印协议' }, {
  'address': '0xd576b5994865c94a0a6449687c2a08e47fd77bb4',
  'name': '小明同学 - 机器喵defi研究院'
}, { 'address': '0xcc214ab674b53ab90e975a5d99bea4426ae30798', 'name': 'JInying - Imtoken' }, {
  'address': '0xc5dd2bbc5ac7b89240c965e548e45e5a56f70e13',
  'name': '李杰 - 币看'
}, { 'address': '0xbfb43cf26a0622616fd16e7adecf72c4e01be142', 'name': '梦醒 - 比原链' }, {
  'address': '0xbfa43bf6e9fb6d5cc253ff23c31f2b86a739bb98',
  'name': 'Ruby - incuba - alpha'
}, { 'address': '0xbd8fc01d8f6c2d027b601c9cab32e635bdd47179', 'name': 'Melody - T - 平良 - incuba - alpha' }, {
  'address': '0xb6c5f15fd68c9ef5e9e3d0ab39081be32fd3376e',
  'name': '韭精 - 七点钟DEFI'
}, { 'address': '0xb17d9c3e0b20c1af94f5e7b1826fd1b7d3891dbe', 'name': '是了一李 - KOL' }, {
  'address': '0xab78ee2f50d2d5f776a135f735d218dae6476e9f',
  'name': '田邦德 - OKEX'
}, { 'address': '0x9ed08cfff08271f5844d6b9a5424a405ec4df7fa', 'name': '小明 - 了得资本' }, {
  'address': '0x9bcdb8c1eeeb203e95a3aa847079c6edee7ee062',
  'name': '启馨 - NOVA资本'
}, { 'address': '0x9bb9b1fc128ca59a722f8d4fdf8faca7d779adbe', 'name': '萌萌 - 巴比特副总裁' }, {
  'address': '0x954ff275c9fef04a5c75ce6ecafc5591ec75c78f',
  'name': 'W - May - flower资本'
}, { 'address': '0x9445b0cda1bf963707c2a4382dcdd2b0a39105ce', 'name': '维C与C君 - KOL' }, {
  'address': '0x8f144fb4fb2816f0b74d2604b6676249a9819801',
  'name': '苏丽 - newtribe.capital'
}, { 'address': '0x77c65ef6610ffb8da9fff4288bb2ba86b0f91b0d', 'name': 'Steve - Guo - 路印协议' }, {
  'address': '0x757cbbf323974a50f41d3a675c4b6665e19fffb5',
  'name': 'Mr.liu - ZKswap'
}, { 'address': '0x7478742ffb2f1082d4c8f2039af4161f97b3bc2a', 'name': 'Ray - 链向财经' }, {
  'address': '0x6ff56f077766b24749c186a17f2b4dd098a75aae',
  'name': 'coinsummer - 神鱼技术支持公司'
}, { 'address': '0x6f7866c6c730cda276e6acf046952f2f6afd580e', 'name': '沈涵 - 火币科技' }, {
  'address': '0x6e28baa6d9716ecc7731f24f3f1db2e55ee3ef26',
  'name': '白话区块链 - 媒体'
}, { 'address': '0x66666ad6b459f54a68419363385316abb8a857ff', 'name': '路遥远 - 麦子钱包' }, {
  'address': '0x6652eb7fd864d2fc9319de06b7536f1194860816',
  'name': '马天元 - 前火币研究院'
}, { 'address': '0x6432c098bfeda15dd4d0692c46bdb43091a95171', 'name': 'Linda - DDX中文社区负责人' }, {
  'address': '0x5f2b5a5454e04ad2394b2add2f176f7ccc22cce9',
  'name': '旁白君 - KOL'
}, { 'address': '0x5661828ac33f0fc12e183ab39d64e2266a0ea1ee', 'name': '盛超 - iNFT' }, {
  'address': '0x561ada4b0243f1d83df80d1653e9f76e84128b0b',
  'name': '高潮 - 火币去中心化事业部'
}, { 'address': '0x4fa0e24f5adfec47e81d4a76e86742a1bd5de811', 'name': '小鱼 - ZKsync核心开发' }, {
  'address': '0x4e8f1cf9a9ddcadee3340dada2cba5508d340b4e',
  'name': '深潮TechFlow - 媒体'
}, { 'address': '0x4c9f77d23f3d85759240931b6678e54b1616ee84', 'name': 'Masaka - 区块印象' }, {
  'address': '0x4c5374230f1ddefb55c6f8bbdeb237effd4650a9',
  'name': '柏坤 - 币小白'
}, { 'address': '0x4839460f05b2a8fc1b615e0523ebc46efba75420', 'name': '张元杰 - conflux' }, {
  'address': '0x464ee35c9412060c70c2bf5901e13a712ca82796',
  'name': 'TOP - TOP'
}, { 'address': '0x40920f60eeee6bec4845eea73f3e312fff4f9e77', 'name': '杜超 - 字节互链' }, {
  'address': '0x4086e0e1b3351d2168b74e7a61c0844b78f765f2',
  'name': '大橙子 - KOL'
}, { 'address': '0x39218041aadd7161c1662e77e0788fcb31c24ed8', 'name': '董加 - DFG资本' }, {
  'address': '0x3583b1d1c294649326a31db0911ef8ec77843844',
  'name': 'Cindy - 喜悦基金'
}, { 'address': '0x30405fb4fefb6760b29ee783bca94d8e82f03ec8', 'name': '汲蓬勃 - DefiGo' }, {
  'address': '0x2e9910bef4914ae0657b8aad7732580e51e9ad8a',
  'name': '小钢 - KOL'
}, { 'address': '0x260373f2e707fa07a2fb15289663c745cf467e64', 'name': 'nicky - zhang - KOL' }, {
  'address': '0x1e164cc1f054afe06400f4da56edc4e0c70226b7',
  'name': 'Aten - 波卡早期开发者'
}, { 'address': '0x18a7241ffce72d354a9d515538f065bd43c251b9', 'name': '我是口井 - PAnews' }, {
  'address': '0x1496a57169889f697819905027d29349009e6239',
  'name': 'Dorothy - Sythetic'
}, { 'address': '0x141721f4d7fd95541396e74266ff272502ec8899', 'name': '马山水 - MASK' }, {
  'address': '0x134bc52f4af74e48d704df31c2fe6b2a0ceae4e4',
  'name': '东风颂歌 - KOL'
}, { 'address': '0x109d82817ce0b1d86de6bb58b0492d7526bc9d53', 'name': '陈默 - KOL' }, {
  'address': '0x09c2ead8c037aeda17ac653dab2eab46166ef59d',
  'name': '叶少 - KOL'
}, { 'address': '0x082b9b776e5d0b1771594676d12619f479b0a69c', 'name': '尤利 - 公信宝' }, {
  'address': '0x07f8631374798d558e958372d9f4313f09e90a6d',
  'name': 'Yanbin - 火币大客户'
}, { 'address': '0x07ec92ce9cad85f1fe18731cd0fa09347ca06c82', 'name': 'Maybe - 分布式资本' }, {
  'address': '0x0144edf8ddbccd66ddc5cc9075a6e2cfa937b8de',
  'name': 'Linda - 水滴资本投资人'
}, { 'address': '0xafe9e675acfc99ff6b24e07e5f81c8be11d5d18b', 'name': 'NinaRong - Arb中文社区运营' }, {
  'address': '0x28c25c93ec66cc5b332f230aca843a7f3c575c7f',
  'name': 'Gavin - ChinaDeFi'
}, { 'address': '0xabdc5d99ab3f3e89a9d1fbd6d888cf44fce3bd39', 'name': 'WeCoin吴彦祖 - KOL' }, {
  'address': '0xd9c770ab8ac08d9cae3f176b931147fa15c0dd34',
  'name': 'Max - Zhou - 链闻'
}, { 'address': '0x09e11aa20f18cdff80b90a806cc801fedd32f14a', 'name': 'Tia - Silicon' }, {
  'address': '0xc7cb1dd7b1aaade4a75b69e472c3d8314af4ea4c',
  'name': 'Gatling - 比升资本'
}, { 'address': '0xb3f6972ace0cec4a614b5581a6bb715adfc1d7ef', 'name': 'Alan - Coindesk中国区' }, {
  'address': '0x18386181bcd9f939b15c1acf4a5525a82e398c3e',
  'name': 'kol'
}, { 'address': '0x31ff40d157d9cc4dea91fc19b5d7082cbb3cf220', 'name': '打币了' }, {
  'address': '0x8c30d114b6ba0b1eacd516aec4f13341d703e5db',
  'name': '打币了'
}, { 'address': '0xb955db051bf09a645c26730752e28f5e3776088f', 'name': '@CryptoArnon' }, {
  'address': '0x2cae0fd7098316b3179cd013986f39bbc6cae532',
  'name': '@zzq742524'
}, { 'address': '0x7d43237e2cf6bb7ebd94bc6d772ab5bed22d5d5c', 'name': '@zhouqin69666793' }, {
  'address': '0xce2af11371c7d21110ed4a9ac684c88ff58ea3ff',
  'name': '@yyk0312i'
}, { 'address': '0xe35a2b246293886d64798ea6bbb3f1a70ccc4ade', 'name': '@yu25072394' }, {
  'address': '0x064a768bb4e79f22ba0dcb3c5d2421ae32d51003',
  'name': '@youyou57362763'
}, { 'address': '0x996340c05889bf55cadb6294d0aef48344b064d3', 'name': '@xtanqi' }, {
  'address': '0x14727c44fb64f9c20eeab8673f1d8bcdd9e05c84',
  'name': '@xcxdxexf'
}, { 'address': '0xfbdfc376fa2a85a0cc316117e65cc65af10698c3', 'name': '@wksm10' }, {
  'address': '0x1860a619d26f4998c3c5fac85738ecd912bf34b5',
  'name': '@wikitoptop'
}, { 'address': '0x512ace4ebaf5166918934b5c55948d8ca1a54852', 'name': '@weilove17' }, {
  'address': '0xdd28d4909a1ad838e45ba869358dd7661c27307c',
  'name': '@Wayne_defi'
}, { 'address': '0xc89ca6c710ccd6fa3fec590379ed8f9492361b55', 'name': '@virende48217848' }, {
  'address': '0x2d475adc0cef28d295703cc571c7b99b46015ba6',
  'name': '@Vikas_Kumar0909'
}, { 'address': '0xc0c2e1a4ff961ad542c39a0e278afe97b2688cd9', 'name': '@vbnzqypr384108' }, {
  'address': '0x395a2c4738e6e39c324521ace6b134ac0e86469c',
  'name': '@Tysuu'
}, { 'address': '0x04b6ea5a19b8945eddc4a141408ec34c2a55a34e', 'name': '@tyijie_st' }, {
  'address': '0x08c9dd46e5da4e8857d224099c6184186d538bb7',
  'name': '@Trung2490'
}, { 'address': '0x9c3bacade6bbe81a6238110a28628512abf4ec4a', 'name': '@TonyXoac69' }, {
  'address': '0xd3766efbb5f054d8ed176b119163fd16867c9474',
  'name': '@tongwu66283007'
}, { 'address': '0xb186c9880cd56bd50a35c159abfec42c3029aa3f', 'name': '@Toan_Ngo_Sy' }, {
  'address': '0xfa84b39495743817b5899da31d69f734794ebb35',
  'name': '@Thuan31646447?s=09'
}, { 'address': '0xe313c6209dc289d2c85bb0b0585cd9d72d122784', 'name': '@tag_ynsg' }, {
  'address': '0x2e8a66936e802afa0c195dd3146caec958233d3d',
  'name': '@SYEDRAHAMATHU15'
}, { 'address': '0x881886ac09720414892062ad60b547cbe92a693a', 'name': '@StevenN71114104' }, {
  'address': '0xae05a6f64475d15b80b80b2b7ee723b432527d6e',
  'name': '@sothatlove1'
}, { 'address': '0xc6062bd17327af1dc5847eb4ed3326eef41f99c6', 'name': '@sevenhead2' }, {
  'address': '0xf9b1f985247a8cf4f47faced90285f3a721b4408',
  'name': '@praveen04021996?s=08'
}, { 'address': '0x644ec71feea0ad3489acc50f8ff51b8a17f9a102', 'name': '@Phong4395' }, {
  'address': '0x2d5b89608c7cf7461b252d0d68dd141a25da252f',
  'name': '@patientable'
}, { 'address': '0x29f46a92078f6011a47df128af735208782579bf', 'name': '@P44560280' }, {
  'address': '0x6cd3e221e81ae1a78a77a127b6b761664b73f5a2',
  'name': '@outletsbclon'
}, { 'address': '0x072c32660f0f169beb92ce3a8033275efbf4e2a4', 'name': '@onedrea48351637' }, {
  'address': '0x3b35690f4bdb3e99feb9eebbd6df5486550e176f',
  'name': '@Nina44245624'
}, { 'address': '0xe7ca2290165f684ac0847c350f767d75e5048b10', 'name': '@nguyen17071993' }, {
  'address': '0xb17add4e693335ae1a5593ad6b807d7b24999999',
  'name': '@mvc69642859'
}, { 'address': '0x8649552c5c04af0e8004dc855b9c2789a25b8d85', 'name': '@mrphnft1' }, {
  'address': '0xed71046f3f1b5130609df6f5a0468415548c5b2c',
  'name': '@Mrperfe59837233'
}, { 'address': '0x0999033a70b936bd10582437040550eab875ca95', 'name': '@motoki304' }, {
  'address': '0x0797beecc048edb0d30a80552419bf608bdddf6a',
  'name': '@monish81119105'
}, { 'address': '0xf97bfaed84676a853c67f7e394396a6bfa048e65', 'name': '@mergod' }, {
  'address': '0xafb9d7fa614dd77cd9d212bb0596982c850a5085',
  'name': '@Marco20356652'
}, { 'address': '0xa1b5af8eccc097fac2a68f878754aa8202092bab', 'name': '@manhome2021' }, {
  'address': '0x0aa3dceb1e65b8f7d3a58bed68054b1c81585002',
  'name': '@lucket10'
}, { 'address': '0x7a243437d599b5c5c0e5066b802e394a6b6df38d', 'name': '@longrun52001' }, {
  'address': '0xae9449a3c1b2310395026c7276e0a37030dc26ec',
  'name': '@lololol90193937'
}, { 'address': '0xaa8660430bb627d9a490099e77c357b48e545a17', 'name': '@Lionel_crypto' }, {
  'address': '0xac645363f1777a5015edd14034f963f95a217703',
  'name': '@liangyu71714500'
}, { 'address': '0x1f7e6b16726e38a4fdaa4e95a8cbff26ee563c71', 'name': '@LeTheHung15' }, {
  'address': '0x07bf6ec7de006ffd2009f4bbd1b66559dc54ceae',
  'name': '@LanLe78122968'
}, { 'address': '0xe99fbc8ea0435942f8c0642ea4abefaa4a802309', 'name': '@kyoronut' }, {
  'address': '0x5fb1b8b629e8272a8ebf010195f5f1708ff8312f',
  'name': '@kuken1999'
}, { 'address': '0x68f1173ae6d96a11d05f6dbd7d3226855e4c4c5b', 'name': '@knowingoldbird' }, {
  'address': '0xe53ade7d9a62adc6e5ec926272d508ce8729f056',
  'name': '@Kenther52'
}, { 'address': '0x898e7ba5997edf98ac95e19a2d8dc417fbe80621', 'name': '@Jul56502344' }, {
  'address': '0x33231c4171e4d6a864c05b6db61467ec2424efa5',
  'name': '@jrsbxmt'
}, { 'address': '0x2a684920967f63b51f746929449ec03fa2ff3b41', 'name': '@jorgeomasonrjo1' }, {
  'address': '0x425a44fbbee6c02570e3634b51d698c92bcf5a80',
  'name': '@JLink1603'
}, { 'address': '0x171c8be8b92674f7d7b0593aca4619a25a40b6f0', 'name': '@jie79012487' }, {
  'address': '0x013e3debbeaf6c5f40b4a2efe975bb135ba33f55',
  'name': '@IssingCc'
}, { 'address': '0x69e0fa8ba66374a0993b991c410e306eb886fb28', 'name': '@InvisibleB4' }, {
  'address': '0x23c14e77e980e8d90851c72678ec5f4255af7874',
  'name': '@iktxyz'
}, { 'address': '0x41516305ccee7e85bf83aa04db24b29a9ca7cc4a', 'name': '@hungnguyen150' }, {
  'address': '0xa35279d76f3cf52ff05ecb66cf0ce6b9c07c614b',
  'name': '@Herdy0007?s=09'
}, { 'address': '0x8e1700e063d4341930c0d071c168d17e506caca9', 'name': '@hanjiyang1' }, {
  'address': '0x087eae3a20901197f68bab6fad5966254c8dd52e',
  'name': '@Goodzz18'
}, { 'address': '0xda52e560c5a01034987cecd8985cba0001aeab1f', 'name': '@gavinzcorn' }, {
  'address': '0x927d09f7e2a22434547dff19435364bf26c84dcf',
  'name': '@friston131'
}, { 'address': '0x856ea969d9c4f8f58365ee843d4832dff07e4c79', 'name': '@EthanJ15257492' }, {
  'address': '0xcdf91269d4e4bba12f8f3c82be7a13e4a1d4b3bb',
  'name': '@EOS2018'
}, { 'address': '0xcb630c28658d8b4f0509d628d8d947e6f95ea20a', 'name': '@EkkoChan8' }, {
  'address': '0x01190d6e31c2afbec0b83722255af2c8e968327a',
  'name': '@edigius'
}, { 'address': '0x9e8073406ce51835e9a61398bed71640ce6cc258', 'name': '@eddy_ip' }, {
  'address': '0xf82e8bc7e11a22b5ab835ca25a477203a97bdb16',
  'name': '@DuyNguy74171162'
}, { 'address': '0xcb1b609958e6f02314869a67bebd25ffb719e84c', 'name': '@Dolphin64027998' }, {
  'address': '0x2949764c330a13a00b3b49dd36b1943908d04e09',
  'name': '@dmm_timor'
}, { 'address': '0xcfccc7665bf47c72b4f8ff57894c91327d6b1aef', 'name': '@dhidi_plop' }, {
  'address': '0xe103a6e98867f56c35aba038e630700d8a305f1c',
  'name': '@D_DAYsFrank'
}, { 'address': '0x4a6afea61605e584dc0fa9bc700601afdf267c36', 'name': '@crystalwwilson1' }, {
  'address': '0x67c577500f96ada04c0352b3062f403491e91c62',
  'name': '@cryptopenyok'
}, { 'address': '0xf598fda39e2dd32517d83d7195ef174e139ac088', 'name': '@crypto_tonysaf' }, {
  'address': '0x89cbada8c98919e8c44d744a4234c2a8e22dc4d9',
  'name': '@Cris__crypto'
}, { 'address': '0x0f5994afdf8c01351a37e501cd28a961d76da66e', 'name': '@coinkr_joio' }, {
  'address': '0x0d6df8dabc449c58337d03ec3975f947051fb8dc',
  'name': '@chongtingon'
}, { 'address': '0x22ae05d7a3e6e823b6b47fb092e9df87c41f0bc2', 'name': '@chientrancnt' }, {
  'address': '0x22d3f6a37e2e4c3590571053dc98d8cdb449012d',
  'name': '@ch_riego'
}, { 'address': '0xe6c989a11ffe38a038cb46c46b538ec5b7e06523', 'name': '@boduong5463' }, {
  'address': '0x545c83e60bdc60cbc6357c33d817b4ba6ff832a9',
  'name': '@bitcoinislife'
}, { 'address': '0x16bc93428d68b05158c5f80fee4234b6f0a1a336', 'name': '@beimu8' }, {
  'address': '0xc013122ef9df0e92c7654878908c47f63a77c247',
  'name': '@b6857375'
}, { 'address': '0x3ea37a9ead12f5401109cf8ca3b1448be7eb4706', 'name': '@anitaliu0928' }, {
  'address': '0x7eee11505ff2b2e1c9d984760602b5eee76d499f',
  'name': '@Andrei89591879'
}, { 'address': '0x3986fdd604c428dc07935348d6799dd35374e64f', 'name': '@AndreaNayapada' }, {
  'address': '0xa93f416e8452b131a3b5f235be8790af2b3fec57',
  'name': '@ananqh91'
}, { 'address': '0xb2f456886367c8e50566377ec6d9293d4da5bb81', 'name': '@akxakxll' }, {
  'address': '0x29f2eca9034fa5eadd6717df015f6288c1d38e05',
  'name': '@adsakhno'
}, { 'address': '0xfa889bd62fd614d17d9c79fc52c355a2989d100d', 'name': '@adamcyj1' }, {
  'address': '0xe4e076ec8c75afea19a8ae686104d3a819ce8bd5',
  'name': '@5kVWY6Jp21Ndk8I'
}, { 'address': '0xe3c620ebd2dc7199910561b281a4275104c93b46', 'name': '@yangChe77355058' }, { 'address': '0x5be61c4d144771f5895cb2996fd3071b0714a2ef', 'name': '@babysharktank1' }]
