import React , { Component }  from 'react';
class TagMapping extends React.Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <iframe className="Embedded" width="100%" height="100%"  src="/static/page/clickhouse/CHManager.html" ></iframe>
            </div>
        );
    }

}

export default TagMapping;