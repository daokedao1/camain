import React, { Component } from 'react';
import { Spin } from 'antd';
export default class index extends Component {
    render() {
        return (
            <div style={{lineHeight:'500px',textAlign:'center'}}>
                <Spin tip="开发中..." spinning>

                </Spin>
            </div>
        );
    }
}
