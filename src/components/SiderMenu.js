import React, { useState } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const renderMenuItem = (
    item // item.route 菜单单独跳转的路由
) => (
    <Menu.Item key={item.key}>
        <Link to={(item.route || item.key) + (item.query || '')}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => (
    <Menu.SubMenu
        key={item.key}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text">{item.title}</span>
            </span>
        }
    >
        {item.subs.map(item => renderMenuItem(item))}
    </Menu.SubMenu>
);

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

class SiderMenu extends React.Component {
    constructor(props) {
        super(props);
        const {menus} = this.props;
        this.state = {
            dragItems: menus,
            mode: 'inline',
            openKey: '',
            selectedKey: '',
            firstHide: true // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        }
    }
   
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.menus !== this.props.menus) {
            let dragItems = this.props.menus || [];
            this.setState({dragItems});
        }
    }

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const _items = reorder(dragItems, result.source.index, result.destination.index);
        this.setState({dragItems: _items});
    };

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };

    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false
        });
    };
    render() {
        const {dragItems, restProps, selectedKey, firstHide, openKey} = this.state;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {dragItems.map((item, index) => (
                                <Draggable key={item.key} draggableId={item.key} index={index}>
                                    {(provided, snapshot) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <Menu 
                                                    mode="inline"  
                                                    onClick={this.menuClick}
                                                    selectedKeys={[selectedKey]}
                                                    openKeys={firstHide ? null : [openKey]}
                                                    onOpenChange={this.openMenu}>
                                                    {item.subs
                                                        ? renderSubMenu(item)
                                                        : renderMenuItem(item)}
                                                </Menu>
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
};

export default SiderMenu;
