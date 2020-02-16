import React from 'react';
import ReactQMap from 'react-qmap';
import {Link,withRouter} from "react-router-dom";
import $ from  'jquery'
import './index.less'
const getContianer = dom => {
    console.log(dom.childNodes)

    const middleControl = document.createElement('div');
    // csssprite.innerHTML = `<Link to="/login"><img  id="lx"   src="${require('../../style/imgs/spot_location.png')}" style="width: 22px;height: 100%"/><p style="color:red">华北油田采油三厂楚一联合注水站</p></Link>`;
    middleControl.style.cssText =
        'width: 130px;height: 30px;position: absolute;left: 50%;top: 50%;z-index: 999;margin-left: -23px;margin-top: -23px;';
    middleControl.innerHTML = `<Link to="/login"></Link>`;
    dom.appendChild(middleControl);
    // let csssprite=dom.childNodes('.csssprite')
        // console.log(csssprite)


};
let height = document.body.clientHeight-150;
let classMap, windowMap;

class Tencent extends React.Component {
    render(){
      return (
        <ReactQMap
            getMap={(map, wMap) => this._getMap(map, wMap)}
            center={{ latitude: 38.234857, longitude: 115.722256 }}
            initialOptions={{ zoomControl: true, mapTypeControl: true,maxZoom:9,minZoom:0,zoom:4 }}
            apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            style={{ height: height,cursor: "pointer" }}
            getContainer={getContianer}
            id="container"
        />
      )
    }
    componentDidMount(){

    }
    init(wMap){
        var center = wMap.LatLng(38.234857,115.722256);
        var anchor =new wMap.Point(6, 6),
        scaleSize=new wMap.Size(22,30),
        origin =new wMap.Point(0, 0),
        size =new wMap.Size(350, 50);
        var icon =new wMap.MarkerImage(require('../../style/imgs/spot_location.png'),size, origin, anchor,scaleSize);
        //文字描述
        var content = "<div class='mapct'><span style='color:red;width:100px;'>华北油田采油三厂楚一联合注水站</span></div>";
        var decoration = new wMap.MarkerDecoration(content, new wMap.Point(0, 30));
        var marker = new wMap.Marker({
            map: classMap,
            icon: icon,
            position: new windowMap.LatLng(38.234857,115.722256),
            animation: windowMap.MarkerAnimation.DROP,
            decoration: decoration
                }
            );
            wMap.event.addListener(marker, 'click', function() {
                        window.document.location.href="#/app/waterData/allData"

            });
    }
    _getMap = (map, wMap) => {
        classMap = map;
        windowMap = wMap;
        this.init(wMap);

      }

}

export default withRouter(Tencent)
