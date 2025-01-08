<template>
  <div class="card-div-css" :focusable="false" :showDefaultBg="showDefaultBg"
    :clipChildren="false" ref="cardDiv" >
    <text-view :focusable="false" :duplicateParentState="true" :fontSize="42"  :lines="1" 
    class="qlist_title" text="经典排行榜" style="color: #fff;"/>
    <qt-list-view class="hrv_r_list" ref="hrv_r_list" name='hrv_r_list' padding="0,30,30,10" :enablePlaceholder="true"
      :clipChildren="false" :clipPadding="false"  @item-click="onItemClick"  :autofocus="true" horizontal>
      <qt-view type="10001" name="hrvrl_item" ref="hrvrl_item" class="hrvrl_item" :focusable="true" eventFocus eventClick :enableFocusBorder="true" >
        <div :duplicateParentState="true" class="hrvrl_item_icon" :focusable="false">
          <img src="${icon}" :focusable="false" :postDelay="300"/>
        </div>
        <!-- <text-view :ellipsizeMode="4" :focusable="false" :duplicateParentState="true" :fontSize="30" :paddingRect="[0,0,0,0]"
          gravity="center" :lines="1" class="hrvrl_item_text" text="${text}" style="color: #fff;"/> -->
      </qt-view>
    </qt-list-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useESNativeRouter } from '@extscreen/es3-router'
import { useESLog, ESData, useESLocalStorage } from '@extscreen/es3-core'
import {QTIListView,QTListViewItem,QTIGridView} from "@quicktvui/quicktvui3";

  const nativeRouter = useESNativeRouter()
  const cardDiv = ref();
  let showDefaultBg = ref<boolean>(true);
  const hrv_r_list = ref<QTIListView>()
  const listData:Array<QTListViewItem> = [
    {type: 10001,pkg_name: 'es.com.livewallpaper.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/8c2e709d89d40f103eb9cce4da0bf89b.png',text:'氛围壁纸', navIndex: 0, decoration:{bottom: 30,left:60}},
    {type: 10001,pkg_name: 'es.com.meituanwaimai.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/7d11d59421e1bb690051da4990490fb2.png',text:'外卖', navIndex: 0, decoration:{bottom: 30,left:60}},
    {type: 10001,pkg_name: 'es.com.maoyan.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/084e7cbc94c4677acc8a9046919ce821.png',text:'猫眼电影', navIndex: 0, decoration:{bottom: 30,left:60}},
    {type: 10001,pkg_name: 'es.com.maoyanpiaowu.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/6ea0861cde417eca84d23e6070465859.png',text:'猫眼演出', navIndex: 0, decoration:{bottom: 30,left:60}},
    {type: 10001,pkg_name: 'es.com.ottauto.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/9509276bad1ef9f5c22bd22a1d707131.png',text:'车主服务', navIndex: 0, decoration:{bottom: 30,left:60}},
    {type: 10001,pkg_name: 'es.com.lishijintian.tv',icon: 'http://qcloudcdn.a311.ottcn.com/exscreen/icon/551869e6560d623c1bd1712e50432d74.png',text:'历史上的今天', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wannianli.tv',icon: 'http://qcloudcdn.a311.ottcn.com/exscreen/icon/d69106265ea21ae49654cbb28cb1d5ca.png',text:'万年历', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.shencaijsq.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/b2ade1535010cf1de40f5990521088e0.png',text:'身材计算器', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.interestredpacket.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/9382e8c8318fb6b0800677759e0118d3.png',text:'趣味抢红包', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.skill.weather.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/b95cfbc614de52ffbd286ea7b41f9ac0.png',text:'今日天气', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.skill.cleaning.tv',icon: 'http://qcloudimg.a311.ottcn.com/data_center/files/2024/07/02/2106d3f5-03e9-4642-8ee5-f5f3047b78b2.png',text:'屏幕清洁助手', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.ceshili.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/96a15e9e9b5257b6042ab068a90811f1.png',text:'测视力', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jiazhaotiku.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/33f50ac9d20d3b5192c8aa04b252f7a8.png',text:'驾照题库', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.renminribao.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/602b5e72795a520dc9c61bbd79bcd9a1.png',text:'人民日报电子阅报栏', navIndex: 0, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.extscreen.baiduyun', icon: 'https://extcdn.hsrc.tv/exscreen/icon/3eee41867714c7aaf2dd3e7018010de5.png', text:'百度网盘',navIndex: 1, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.aliyunpan.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/d3f4ecbb8a0ed64d37a798fbc000d953.png', text:'阿里云盘',navIndex: 1, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'com.ucmobile.yun.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/cd77c96c3da9abad88a37a8bdead2f6d.png', text:'uc网盘',navIndex: 1, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'com.quark.yun.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/c7eab6d5767d6a28e8a72673e626efc4.png', text:'夸克网盘',navIndex: 1, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.photo.baidu.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/4f390a0b5e00124e8dfefffd943e212b.png', text:'百度网盘相册',navIndex: 1, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.fandeng.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/d0336e06bf7f7570247128a9296cf878.png',text:'帆书（原樊登读书）',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.dongchedi.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/8c10ea686d4ec1fc286acd80210a350d.png',text:'懂车帝',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mdbk.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/07/20/37f50c88-b73f-4df0-81a4-bd41a58da6a9.jpg',text:'秒懂百科',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.autohome.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/d8dca7bee2b564cd5085b9f2941eccfb.png',text:'汽车之家',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.yiche.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/be60dd319b032a9f44c5e8f537bf91dd.png',text:'易车',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.kunlunjue.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/4788fe34cf0ccad3f87326e4fc371201.png',text:'昆仑决',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.fishing.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/9d1b1bf31fac41a9f319c4637e307830.png',text:'四海钓鱼',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jjddzss.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/b8cc7316ddb229512e1730e653913ae0.png',text:'JJ斗地主赛事',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.xiangsheng.tv',icon: 'http://qcloudimg.a311.ottcn.com/data_center/files/2024/07/09/7e111d2b-165f-4905-949f-72ee805d7853.png',text:'传统相声评书荟',navIndex: 2, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.baduanjin.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/41e985366371052e8ee6d2cbcc3a1a55.jpg', text:'八段锦',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.yangshenggong.com', icon: 'https://extcdn.hsrc.tv/exscreen/icon/8d884c054ac4c7c82c4a8fc65581a826.png', text:'传统养生功',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.shoushijin.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/c33df885f1908a1fe3d97b0b7819e977.png', text:'瘦十斤',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mitao.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/18fe5996f0f7988ed469fdbbedba6e2d.png', text:'蜜桃塑形',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.yijia.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/d4387c393a2c65e39b78bfd39d8e0f18.png', text:'颈背腰部疼痛',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.kkjianshen.tv', icon: 'http://qcloudimg.a311.ottcn.com/data_center/files/2024/07/09/9f26b324-a578-4236-ac37-05e014478710.jpg', text:'快快健身',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mingmu.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/7711947f1d622dd33d1818744f00430f.png', text:'视力防护:明目功',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wudangtj.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/70d0b236932424adbcd714805f5c46ff.png', text:'武当太极拳',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.guangchangwu.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/67c5592eb88e09f2e43b788bbc08c1bb.png', text:'流行广场舞',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wmbdj.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/95b053c3288f3444c3cd6b41ad54ffe3.png', text:'吴蔓八段锦',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wmwqx.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/ceb5c2bbfbdb144fc2ad673fba2d8b7e.png', text:'吴蔓五禽戏',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.fuji.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/03/29/58cc251b-4b6a-4bec-814c-35662951bc1e.jpg', text:'腹肌撕裂者',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.hsport.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/04/24/3d582ce5-909d-42c2-b166-546644536ecf.jpg', text:'在家运动',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.ktjs.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/04/14/2db59a44-e992-4125-9287-98ae23393923.jpg', text:'客厅健身',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.syjkbdj.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/06/446d8f59-4971-429c-a9cc-2e7a9107fbc8.jpg', text:'尚医健康八段锦',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.yunma.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/07/21/8c11e1b2-3502-4a4e-9d87-8665e105ed16.jpg', text:'孕妈锻炼',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.zyxetn.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/08/04/e6bf7bc1-40d6-469d-91c0-460484a0b43d.jpg', text:'中医小儿推拿',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.forsport.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/49adda7312231e71e32f1b3ca0826e35.png', text:'好运动',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.byyebk.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/08/04/5214452a-da31-4b36-a875-153d6f44bab7.jpg', text:'备孕育儿百科',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jdjs.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/09/22/bff47b1c-0e03-4705-baa0-fff27023624f.jpg', text:'酒店健身',navIndex: 3, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.runtortoise.game', icon: 'https://extcdn.hsrc.tv/exscreen/icon/9ff99ce4a3e73a45be9d16d4d32ca90d.png', text:'跑跑龟',navIndex: 4, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.littlemudpig.game', icon: 'https://extcdn.hsrc.tv/exscreen/icon/9e29c9a7dcae04315ade4864e32a9ebf.png', text:'小泥猪',navIndex: 4, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.extscreen.runtime.webview.qballad', icon: 'https://extcdn.hsrc.tv/exscreen/icon/821982467ff2f96f7e52e428fa59b225.png', text:'Q弹球',navIndex: 4, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.hibobo.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/42cb189639f7e617d9b28e8925c441a9.png', text:'Hibobo',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.bobo.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/07/26/b9841b89-7232-4cca-90ef-e8342d341ef8.jpg', text:'BOBO学字母',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mxhshizi.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/a303a1e871a2ab877cdcbe4b00b0cc77.png', text:'萌想虎识字',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mxhabc.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/c13f0347631f209980c85f52e2c5374e.png', text:'萌想虎ABC',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.xingainian.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/620ca3d2f8e2d5b272a166aabadee745.png', text:'新概念英语',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mingzhu.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/a0cc33e1c6e75b99ced263fe6a25a6a4.png', text:'少儿版四大名著',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.hhsw.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/8b288a910897148f428fb8b7b9035be5.png', text:'火花思维',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.huohuotu.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/b18eed00ee4ea7d81578d7ce50c0b712.png', text:'火火兔启蒙',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.zoo.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/e55aa8e407f3abe5d284dd019d533fba.png', text:'百科动物园',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wentichongkp.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/f998d351203f883ea9bad1a4d95e3403.png', text:'问题虫科普',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.kada.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/6def23734f2636f883dd3072bd8e1e26.png', text:'KaDa阅读',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.hanzidegushi.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/872291dd7848ba716c11235b5334b483.png', text:'汉字的故事',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.yaliketang.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/57dded3ca310bd53a60850271112fba5.png', text:'鸭梨课堂',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.xiaoguwen.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/62bd2a8ba03ff14a9da48964c5a3e5e7.png', text:'必背小古文',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.qwkxqm.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/06/05/7ae09ed7-e117-4356-94e1-32d233ffa310.jpg', text:'趣味科学启蒙',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.gscy.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/b9d48976fb52a1bc29b8949d86540598.png', text:'学古诗学成语',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.mtshaoer.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/09/1619a6e6-dee1-4894-93d1-29c7488832ec.jpg', text:'麦田少儿启蒙',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.youngexplorer.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/19/1d119aa4-21b5-458c-a465-cd6edba20142.jpg', text:'小小探险家',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.maiqisww.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/88bec120286cb9f480c0078e26713d72.png', text:'麦奇十万问',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.zdzj.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/08/22/373ad01c-33fb-4697-83ff-9d8ba95eaec4.jpg', text:'竹兜早教', navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.hhteg.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/10/17/66aec736-9bc6-4bee-b3cd-48c62c28833a.jpg', text:'火火兔儿歌',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.klhbgs.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/9774bdcd664c1786599b2411b69ed375.png', text:'快乐绘本故事',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.qinbao.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/3d0f5bc880e1b94a7c4a08e78edb358d.png', text:'亲宝启蒙乐园',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.cosmic.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/04/06/518c1e0f-0983-419a-9b8d-77d2ad61a1ac.jpg', text:'宇宙小百科',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.snjw.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/08/02/6535dc0e-9e81-43dc-a146-0935cfdc7333.jpg', text:'少年街舞',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.car.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/08/11/8765632c-7da4-4cb1-bc96-033717487427.jpg', text:'工程车学颜色',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.xionghaizierge.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/1330d18ce2315cfe64f66059c74f0681.png', text:'熊孩子儿歌',navIndex: 5, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.haoqidongwu.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/b318eebcf42eb350fa9715f6d9734594.png',text:'好奇动物',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.konglongxingqiu.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/bf056389f82397cb3d5898c2286e1964.png',text:'恐龙星球',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.kunchong.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/76d53a39396ea16db534a57a098091fd.png',text:'昆虫王国',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.dongwuzhengbasai.tv',icon: 'http://qcloudimg.a311.ottcn.com/data_center/files/2024/07/09/627e2cba-d46e-40e1-86aa-6acd874ae664.png',text:'动物世界争霸赛',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.zljtx.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/09/11/b6ffee9b-cd4d-433c-bce6-adba75965d87.jpg',text:'侏罗纪探险',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.haiyang.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/cfe3947547c6c851fe4436b3edc741a7.png',text:'海洋总动员',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.konglongpaihang.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/10/821faac7-ad64-477b-b882-c161c13fb048.jpg',text:'恐龙排行榜',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.kunchongmaoxian.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/19/551c2746-751b-4aed-b784-4d397785f268.jpg',text:'昆虫王国大冒险',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wzdwsj.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/04/13/f03ecbc4-55de-43ae-a39a-ee0f7409f5e0.jpg',text:'玩转动物王国',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jiachong.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/04/20/662184cc-140d-4851-b9a6-3b8b13fb494b.jpg',text:'小甲虫大地球',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.haidimaoxian.tv',icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/05/9e39ed27-4201-4264-afc4-3c6373f68b77.jpg',text:'海底冒险小剧场',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.dongwuleyuan.tv',icon: 'https://extcdn.hsrc.tv/exscreen/icon/7880d10bda60e7d6ce3f9b98ad1d24a1.png',text:'动物乐园',navIndex: 6, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.qhlessons.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/92b2c9ef8ce9f92147d4f853c03352c7.png',text:'小学强化训练',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.guoxuegushi.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/16/a7bdae73-c840-4cab-b876-add8f36f98dc.jpg',text:'学国学学古诗',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.xxtbkt.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/a1a53a629d4a732f2ee864344390de45.png',text:'小学辅导课堂',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.baike.tv', icon: 'https://extcdn.hsrc.tv/exscreen/icon/59d38cbe39087f99f340f812d3a37acd.png',text:'小百科大奥秘',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jqeyingyu.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/04/12/e14b245d-c892-4bee-a9f6-1753ddca1508.jpg',text:'小学剑桥英语',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.wordclass.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/06/dcdc0ae4-e30f-4471-bf87-338788b3f95d.jpg',text:'单词大讲堂',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.bdgxjd.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/05/25/146f2e7d-fe45-4bf6-a10a-98a3a7104a56.jpg',text:'少儿必读国学经典',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.shuqijixun.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/06/12/b01b60d2-f024-4633-8775-c766f9d9ed5c.jpg',text:'小学暑期集训',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.panda.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/06/08/0ddd2247-5a1f-4d09-9e37-a5fe3505a789.jpg',text:'熊猫AI故事',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.dnxcz.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/11/03/ce967119-41cd-4620-b585-bd96a6b48f3c.jpg',text:'名师带你学初中',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.dmzxgs.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/11/09/1f52c8a3-adde-4564-80f9-2947f1659eb8.jpg',text:'读名著学古诗',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.dnxgz.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/11/08/88ce9c73-28eb-48c4-842d-ae4cc3f1a9b1.jpg',text:'名师带你学高中',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jxwsx.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/11/16/b5ec578a-b282-4c4b-bb45-f407b6e3102a.jpg',text:'小学数学同步课堂',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jxwyw.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/11/17/a22d33df-71f4-4570-a02e-7f5aad8ff2d8.jpg',text:'小学语文同步课堂',navIndex: 7, decoration:{bottom: 30,left:60}},
    // {type: 10001,pkg_name: 'es.com.jxwyy.tv', icon: 'https://extcdn.hsrc.tv/data_center/files/2023/11/20/2efe64ae-fd26-4887-8fad-cf4abae531f6.jpg',text:'小学英语同步课堂',navIndex: 7, decoration:{bottom: 30,left:60}},
  ]
  function onESCreate(e) {
    hrv_r_list.value!.init(listData)
  }
  function onItemClick(e){
    const {position, item} = e
    nativeRouter.push({pkg: item.pkg_name})
  }

  function onESBind(data: ESData) {
    
  }

defineExpose({ onESCreate, onESBind, })
</script>

<style scoped>
.card-div-css {
  width: 850px;
  height: 400px;
  position: absolute;
  /* background-color: #000; */
  background-color: rgba(255,255,255,0.2);
}
.qlist_title{
  width: 820px;
  height: 60px;
  margin-left: 60px;
  margin-top: 40px;
}
.hrv_r_list{
  width: 850px;
  height: 400px;
  background-color: transparent;
}
.hrvrl_item{
  width: 210px;
  height: 210px;
  display: flex;
  flex-direction: column;
  border-radius: 40px;
  focus-border-radius: 40px;
  background-color: transparent;
}
.hrvrl_item_icon{
  width: 210px;
  height: 210px;
  background-color: transparent;
}
.hrvrl_item_icon img{
  width: 210px;
  height: 210px;
  /* border-radius: 40px; */
  /* background-color: rgba(255,255,255,0.1); */
}
.hrvrl_item_text{
  position: absolute;
  top: 168px;
  left: 0;
  width: 160px;
  height: 45px;
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  /* focus-color:#fff;
  select-color:#fff; */
}
</style>
