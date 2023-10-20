import {FieldType, IFieldConfig, IOpenSegmentType, IOpenTextSegment} from "@base-open/web-api";

export default  class BitableHelper{
    //创建引用数值
    public static createOpenLink(recordId:string,tableId:string){
        return {
            record_ids: [
                recordId
            ],
            table_id: tableId,
            text: "1",
            type: "text"
        };
    }

    public static createText(text:string):IOpenTextSegment{
        return {
            text: text,
            type: IOpenSegmentType.Text
        };
    }

    //新增字段：复选框
    public static createFieldCheckBox(name:string,description:string ) :( IFieldConfig) {
        return {
            name:name,
            description:{
                content: description,
                disableSyncToFormDesc:false
            },
            type:FieldType.Checkbox
        }
    }
    //新增字段：附件
    public static createFieldAttachments(name:string,description:string ):IFieldConfig  {
        return {
            name:name,
            description:{
                content: description,
                disableSyncToFormDesc:false
            },
            type:FieldType.Attachment,
            property:{
                onlyMobile:false
            }
        }
    }
    //新增字段：文本
    public static createFieldText(name:string,description:string ) :IFieldConfig {
        return {
            name:name,
            description:{
                content: description,
                disableSyncToFormDesc:false
            },
            type: FieldType.Text,
        }
    }
}