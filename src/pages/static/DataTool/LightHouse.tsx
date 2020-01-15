import React , { Component }  from 'react';
class CHManager extends React.Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <iframe className="Embedded" width="100%" height="100%"  src="/static/page/dataManager/LightHouse/index.html" ></iframe>
            </div>
        );
    }

}

export default CHManager;