import React , { Component }  from 'react';
class MenuManager extends React.Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <iframe className="Embedded" width="100%" height="100%"  src="/static/page/menu/menuManager.html" ></iframe>
            </div>
        );
    }

}

export default MenuManager;