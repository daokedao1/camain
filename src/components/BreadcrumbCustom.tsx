/**
 * Created by hao.cheng on 2017/4/22.
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

type BreadcrumbCustomProps = {
    first?: string;
    second?: string;
};
class BreadcrumbCustom extends React.Component<BreadcrumbCustomProps> {
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb style={{ margin: '12px 23px' }}>
                    <Breadcrumb.Item>
                        <Link to={'/app/dashboard/index'}>首页</Link>
                    </Breadcrumb.Item>
                    {first}
                    {second}
                </Breadcrumb>
            </span>
        );
    }
}

export default BreadcrumbCustom;
