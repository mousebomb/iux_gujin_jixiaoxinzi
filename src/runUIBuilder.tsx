import {bitable, IOpenCellValue, IOpenSingleCellValue, IOpenSingleSelect, UIBuilder} from "@lark-base-open/js-sdk";
import Config from "./config";
import BitableHelper from "./bitableHelper";

export default async function main(uiBuilder: UIBuilder) {
  //先验证表格名称是否都存在
  const huamingceTable = await bitable.base.getTableByName(Config.TAB_NAME_HUAMINGCE);
  const kaoqinTable = await bitable.base.getTableByName(Config.TAB_NAME_KAOQIN);
  const gongziTable = await bitable.base.getTableByName(Config.TAB_NAME_GONGZI);
  if (!huamingceTable) {
    return uiBuilder.markdown(`检测不到\`${Config.TAB_NAME_HUAMINGCE}\`表`);
  }
  if (!kaoqinTable) {
    return uiBuilder.markdown(`检测不到\`${Config.TAB_NAME_KAOQIN}\`表`);
  }
  if (!gongziTable) {
    return uiBuilder.markdown(`检测不到\`${Config.TAB_NAME_GONGZI}\`表`);
  }
  //验证字段
  const hmcFieldMetaList = await huamingceTable.getFieldMetaList();
  const hmcShiFouZaiZhiLastMonth = hmcFieldMetaList.find((li) => li.name == Config.FIELD_HUAMINGCE_ShangYueShiFouZaiZhi);
  if (!hmcShiFouZaiZhiLastMonth) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_HUAMINGCE_ShangYueShiFouZaiZhi}\`字段`); }
  const hmcName = hmcFieldMetaList.find((li) => li.name == Config.FIELD_HUAMINGCE_Name);
  if (!hmcName) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_HUAMINGCE_Name}\`字段`); }
  const hmcGangWei = hmcFieldMetaList.find((li) => li.name == Config.FIELD_HMC_GangWei);
  if (!hmcGangWei) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_HMC_GangWei}\`字段`); }
  const hmcXianZhiXingGongZi = hmcFieldMetaList.find((li) => li.name == Config.FIELD_HMC_XianZhiXingGongZi);
  if (!hmcXianZhiXingGongZi) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_HMC_XianZhiXingGongZi}\`字段`); }
  const hmcDianMian = hmcFieldMetaList.find((li) => li.name == Config.FIELD_HMC_DianMian);
  if (!hmcDianMian) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_HMC_DianMian}\`字段`); }
  //
  const kaoqinFieldMetaList = await kaoqinTable.getFieldMetaList();
  const kaoqinYuanGong = kaoqinFieldMetaList.find((li) => li.name == Config.FIELD_REF_YuanGong);
  if (!kaoqinYuanGong) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_REF_YuanGong}\`字段`); }
  const kaoqinPrdStart = kaoqinFieldMetaList.find((li) => li.name == Config.FIELD_Date_PrdStart);
  if (!kaoqinPrdStart) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_Date_PrdStart}\`字段`); }
  const kaoqinSuoShuDianMian = kaoqinFieldMetaList.find((li) => li.name == Config.FIELD_KQ_SuoShuDianMian);
  if (!kaoqinSuoShuDianMian) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_KQ_SuoShuDianMian}\`字段`); }
  const kaoqinGangWei = kaoqinFieldMetaList.find((li) => li.name == Config.FIELD_KQ_GangWei);
  if (!kaoqinGangWei) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_KQ_GangWei}\`字段`); }
  const kaoqinXianZhiXingGongZi = kaoqinFieldMetaList.find((li) => li.name == Config.FIELD_KQ_XianZhiXingGongZi);
  if (!kaoqinXianZhiXingGongZi) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_KQ_XianZhiXingGongZi}\`字段`); }
//
  const gongziFieldMetaList = await gongziTable.getFieldMetaList();
  const gongziKaoQinZhouQi = gongziFieldMetaList.find((li) => li.name == Config.FIELD_REF_KaoQinZhouQi);
  if (!gongziKaoQinZhouQi) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_REF_KaoQinZhouQi}\`字段`); }
  const gongziXuHao = gongziFieldMetaList.find((li) => li.name == Config.FIELD_TXT_XuHao);
  if (!gongziXuHao) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_TXT_XuHao}\`字段`); }
  //工资类型
  const gongziLeiXing = gongziFieldMetaList.find((li) => li.name == Config.FIELD_GZ_GongZiLeiXing);
  if (!gongziLeiXing) { return uiBuilder.markdown(`检测不到\`${Config.FIELD_GZ_GongZiLeiXing}\`字段`); }
  //存储工资类型选项
  if(!gongziLeiXing.property) return uiBuilder.markdown(`检测不到\`${Config.FIELD_GZ_GongZiLeiXing}\`字段的选项`);
  if ('options' in gongziLeiXing['property']) {
    // 使用 options 属性
  } else {
    // 处理属性不存在的情况
    return uiBuilder.markdown(`检测不到\`${Config.FIELD_GZ_GongZiLeiXing}\`字段的选项`);
  }
  const options = gongziLeiXing['property']['options'];
  const gzTypeYuanGong=options.find((li:any)=> li.name== Config.OPTION_YuanGong);
  const gzTypeDianZhang=options.find((li:any)=> li.name== Config.OPTION_DianZhangMgr);
  const gzTypeQianTingMgr=options.find((li:any)=> li.name== Config.OPTION_QianTingMgr);
  const gzTypeHouChuMgr=options.find((li:any)=> li.name== Config.OPTION_HouChuMgr);

  //输出表单
  // let t = new Date();
  // let tS = t.toString();
  uiBuilder.markdown(`
  **生成考勤表**
  `);


  uiBuilder.form((form) => ({
    formItems: [],
    buttons: ['生成上月'],
  }), async ({key, values}) => {
    if (key == "生成上月") {
      //写入数据
      const flushData = async () => {
        // 计算一个上月1日的日期
        let zhouQiQiDate = new Date();
        zhouQiQiDate.setDate(1);
        zhouQiQiDate.setMonth(zhouQiQiDate.getMonth() - 1);
        zhouQiQiDate.setHours(0);
        zhouQiQiDate.setMinutes(0);
        zhouQiQiDate.setSeconds(0);
        zhouQiQiDate.setMilliseconds(0);

        //显示加载
        uiBuilder.showLoading('插入中，请不要重复点击，以免造成数据错误...');

        // 遍历花名册表，所有本月在职人员全部需要插入任务清单一次
        const sohuamingceRecords = await huamingceTable.getRecordIdList();
        //从中提取需要的record
        let done=0;
        for (let huamingceRecordId of sohuamingceRecords) {
          done++;

          // console.log("default/flushData 写入"+done+"/"+sohuamingceRecords.length);
          //每一条记录插入一次
          if ( !huamingceRecordId )
          {
            console.warn("default/flushData", "sopRecordId is null");
            continue;
          }
          const curHuamingceRecord = await huamingceTable.getRecordById(huamingceRecordId);
          // 筛选（只处理）上月在职的人员
          let nameStr = await huamingceTable.getCellString(hmcName.id, huamingceRecordId);
          let isOnJobStr = await huamingceTable.getCellString(hmcShiFouZaiZhiLastMonth.id, huamingceRecordId);
          // console.log("default/flushData Row=",name,isOnJob,isOnJobStr);
          if (isOnJobStr!="在职")
          {//跳过不在职的人员
            uiBuilder.showLoading('跳过'+nameStr+done+"/"+sohuamingceRecords.length+'，请不要重复点击，以免造成数据错误...');
            console.log('跳过'+nameStr+done+"/"+sohuamingceRecords.length+'，请不要重复点击，以免造成数据错误...');

            continue;
          }

          //todo 目标已存在则去重 (目前没做)

          // // 员工
          // 周期起
          const cellValueZhouQiQi = zhouQiQiDate.valueOf();

          const cellValueYuanGong = BitableHelper.createOpenLink(huamingceRecordId,huamingceTable.id);
          const cellStringGangWei = await huamingceTable.getCellString(hmcGangWei.id, huamingceRecordId);
          const cellValueXianZhiXingGongZi = await huamingceTable.getCellValue(hmcXianZhiXingGongZi.id, huamingceRecordId);
          const cellStringDianMian = await huamingceTable.getCellString(hmcDianMian.id, huamingceRecordId);

          const cellValueGangWei=BitableHelper.createText(cellStringGangWei);
          const cellValueDianMian=BitableHelper.createText(cellStringDianMian);
          //计算工资类型
          let cellValueGongZiLeiXing=gzTypeYuanGong;
          if ( cellStringGangWei.indexOf("店长")>=0 )
          {
            cellValueGongZiLeiXing = gzTypeDianZhang;
          }else if (cellStringGangWei.indexOf("前厅主管")>=0)
          {
            cellValueGongZiLeiXing = gzTypeQianTingMgr;
          }else if (cellStringGangWei.indexOf("大堂经理")>=0)
          {
            cellValueGongZiLeiXing = gzTypeQianTingMgr;
          }else if (cellStringGangWei.indexOf("厨师长")>=0)
          {
            cellValueGongZiLeiXing = gzTypeHouChuMgr;
          }
          if(cellValueGongZiLeiXing==null)
          {
            return uiBuilder.markdown("工资类型错误，无法识别："+cellStringGangWei);
          }
          //
          let cellValueGongZiLeiXing2  = BitableHelper.createOpenSingleSelect(cellValueGongZiLeiXing.id,cellValueGongZiLeiXing.name );
          // //
          uiBuilder.showLoading('插入'+nameStr+done+"/"+sohuamingceRecords.length+'，请不要重复点击，以免造成数据错误...');
          console.log('插入'+nameStr+done+"/"+sohuamingceRecords.length+'，请不要重复点击，以免造成数据错误...');
          // console.log("default/flushData",cellValueFuZeRen);
          //
          const kaoqinId= await kaoqinTable.addRecord({
            fields: {
              [kaoqinYuanGong.id]: cellValueYuanGong,
              [kaoqinPrdStart.id]: cellValueZhouQiQi,
              [kaoqinSuoShuDianMian.id]: [cellValueDianMian],
              [kaoqinXianZhiXingGongZi.id]: cellValueXianZhiXingGongZi,
              [kaoqinGangWei.id]:  [cellValueGangWei],
            }
          });

          // 同时写入工资表
          const cellValueKaoQinZhouQi = BitableHelper.createOpenLink(kaoqinId,kaoqinTable.id);
            await gongziTable.addRecord({
                        fields: {
                            [gongziKaoQinZhouQi.id]: cellValueKaoQinZhouQi,
                            [gongziLeiXing.id]: cellValueGongZiLeiXing2,
                        }
            });
        }

        uiBuilder.hideLoading();
        uiBuilder.message.success(`已经写入完毕`);

        uiBuilder.clear();
        uiBuilder.markdown(`**生成考勤表**
 已执行完毕，请关闭或重新运行`);
      }
      flushData();
    }
  });
}