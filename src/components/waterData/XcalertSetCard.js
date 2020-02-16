
import React from 'react';

import '../../style/waterData/alertSet.less'
import { Table} from 'antd';
const nameMapping =  {
    'IMPORT_PRESSURE_SET':'进口压力设定值',
    'EXPORT_PRESSURE_SET':'出口压力设定值',
    'MOTOR_TEMPERATURE_SET':'电机温度设定值',
    'LUBRICATING_OIL_TEMP_SET':'润滑油温度设定值',
    'LUBRICATING_OIL_LEVEL_SET':'润滑油液位设定值',
    'PUMP_CYLINDER1_ALARM_SET':'泵噪声报警缸1设定值',
    'PUMP_CYLINDER2_ALARM_SET':'泵噪声报警缸2设定值',
    'PUMP_CYLINDER3_ALARM_SET':'泵噪声报警缸3设定值',
    'PUMP_CYLINDER4_ALARM_SET':'泵噪声报警缸4设定值',
    'PUMP_CYLINDER5_ALARM_SET':'泵噪声报警缸5设定值',
}

class AlertSetCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       editingKey: '',
       dataList:[]
    }

    this.columns = [
      {
        title: '模拟量名称',
        dataIndex: 'name',
        width: '25%',
        editable: false,
      },
      {
        title: '报警设置',
        dataIndex: 'num',
        width: '15%',
        editable: true,
      },
      {
        title: '单位',
        dataIndex: 'dw',
        width: '20%',
        editable: false,
      },

    ];
  }
  componentDidMount(){
    let alarmSettingList = [];
    let v = this.props.dataList;


        if(v['IMPORT_PRESSURE_SET']){
             alarmSettingList.push({

                name:nameMapping['IMPORT_PRESSURE_SET'],
                num:v['IMPORT_PRESSURE_SET'],
                dw:'MPa',
            })
        }

        //排压过高
        if(v['EXPORT_PRESSURE_SET'] ){
             alarmSettingList.push({

                name:nameMapping['EXPORT_PRESSURE_SET'],
                num:v['EXPORT_PRESSURE_SET'],
                dw:'MPa',
            })
        }
        if(v['LUBRICATING_OIL_LEVEL_SET']){
             alarmSettingList.push({

                name:nameMapping['LUBRICATING_OIL_LEVEL_SET'],
                num:v['LUBRICATING_OIL_LEVEL_SET'],
                dw:'cm',
            })
        }
        //油温
        if(v['LUBRICATING_OIL_TEMP_SET'] ){
             alarmSettingList.push({

                name:nameMapping['LUBRICATING_OIL_TEMP_SET'],
                num:v['LUBRICATING_OIL_TEMP_SET'],
                dw:'℃',
            })
        }
        //
        if(v['MOTOR_TEMPERATURE_SET'] ){
             alarmSettingList.push({

                name:nameMapping['MOTOR_TEMPERATURE_SET'],
                num:v['MOTOR_TEMPERATURE_SET'],
                dw:'℃',
            })
        }
        //
        if(v['PUMP_CYLINDER1_ALARM_SET'] ){
             alarmSettingList.push({

                name:nameMapping['PUMP_CYLINDER1_ALARM_SET'],
                num:v['PUMP_CYLINDER1_ALARM_SET'],
                dw:'dB'
            })
        }
        if(v['PUMP_CYLINDER2_ALARM_SET'] ){
             alarmSettingList.push({

                name:nameMapping['PUMP_CYLINDER2_ALARM_SET'],
                num:v['PUMP_CYLINDER2_ALARM_SET'],
                dw:'dB'
            })
        }
        if(v['PUMP_CYLINDER3_ALARM_SET'] ){
             alarmSettingList.push({

                name:nameMapping['PUMP_CYLINDER3_ALARM_SET'],
                num:v['PUMP_CYLINDER3_ALARM_SET'],
                dw:'dB'
            })
        }
        if(v['PUMP_CYLINDER4_ALARM_SET'] ){
             alarmSettingList.push({

                name:nameMapping['PUMP_CYLINDER4_ALARM_SET'],
                num:v['PUMP_CYLINDER4_ALARM_SET'],
                dw:'dB'
            })
        }
        if(v['PUMP_CYLINDER5_ALARM_SET'] ){
             alarmSettingList.push({

                name:nameMapping['PUMP_CYLINDER5_ALARM_SET'],
                num:v['PUMP_CYLINDER5_ALARM_SET'],
                dw:'dB'
            })
        }


    this.setState({
      dataList:alarmSettingList
    })
  }
  render() {


    const columns = this.columns

    return (
            <div className="box">
              <h2>{this.props.title}</h2>
                  <Table
                  bordered
                  dataSource={this.state.dataList}
                  columns={columns}
                  size="small"
                  pagination={false} //禁用分页
                />
            </div>

    );
  }
}

export default AlertSetCard;
