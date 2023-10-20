export default class Config {
    //表格名
    public static TAB_NAME_HUAMINGCE: string = "A.花名册";
    public static TAB_NAME_KAOQIN: string = "B.考勤表";
    public static TAB_NAME_GONGZI: string = "C.工资表";

    //花名册的字段
    public static FIELD_HUAMINGCE_ShangYueShiFouZaiZhi: string = "上月是否在职";
    public static FIELD_HUAMINGCE_Name: string = "姓名";
    public static FIELD_HUAMINGCE_BENYUESHIFOUZAIZHI: string = "本月是否在职";
  public static FIELD_HMC_GangWei: string = "岗位（级别）";
  public static FIELD_HMC_XianZhiXingGongZi: string = "现执行工资";
  public static FIELD_HMC_DianMian: string = "店面";

    //考勤表的字段：
    public static FIELD_REF_YuanGong: string = "员工";
    public static FIELD_Date_PrdStart: string = "周期起";
    // 考勤表自动写入的字段：
  public static FIELD_KQ_SuoShuDianMian: string = "所属店面";
  public static FIELD_KQ_GangWei: string = "岗位";
  public static FIELD_KQ_XianZhiXingGongZi: string = "现执行工资";


  //工资表的字段：
    public static FIELD_TXT_XuHao: string = "序号";
    public static FIELD_REF_KaoQinZhouQi: string = "考勤周期";
    public static FIELD_GZ_GongZiLeiXing: string = "工资类型";


    //工资类型
    public static OPTION_YuanGong: string = "员工";
    public static OPTION_DianZhangMgr: string = "管理层-前厅-店长";
    public static OPTION_QianTingMgr: string = "管理层-前厅";
    public static OPTION_HouChuMgr: string = "管理层-后厨";

}