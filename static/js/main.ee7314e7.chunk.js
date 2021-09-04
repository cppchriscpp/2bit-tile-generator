(this["webpackJsonp2bit-tile-generator"]=this["webpackJsonp2bit-tile-generator"]||[]).push([[0],{138:function(e,t,a){},167:function(e,t){},169:function(e,t){},285:function(e,t,a){},286:function(e,t,a){},288:function(e,t,a){},289:function(e,t,a){},290:function(e,t,a){},291:function(e,t,a){"use strict";a.r(t);var r=a(16),i=a.n(r),n=a(129),l=a.n(n),o=(a(138),a(40)),s=a(10),c=a.n(s),h=a(21),u=a(31),p=a(3),d=a(4),m=a(6),f=a(7),b=(a(139),a(68)),j=a(66),g=a(67),x=a(84),v=a(130),y=a.n(v),O=["block","brick","plant","grass","hole","lava","rock","sand","water"],k={grass:3,water:2,lava:3,rock:3,brick:2,hole:0,plant:3,block:3,sand:0},P={grass:"Grass",water:"Water",lava:"Lava",block:"Block / Tile",brick:"Brick Wall",rock:"Rock",hole:"Hole / Gap",plant:"Bush",sand:"Sand"},C={grass:[{name:"Palette",type:"palette",defaultValue:"NES Default Green"},{name:"Short Blades",min:0,max:10,type:"range",defaultValue:1},{name:"Tall Blades",min:0,max:10,type:"range",defaultValue:0},{name:"Triangles",min:0,max:8,type:"range",defaultValue:4}],water:[{name:"Palette",type:"palette",defaultValue:"NES Default Blue"},{name:"Lines",min:2,max:4,type:"range"},{name:"Deeper Areas",min:0,max:3,type:"range",disabled:!0,defaultValue:0}],lava:[{name:"Palette",type:"palette",defaultValue:"NES Default Red"},{name:"Frequency",min:15,max:25,type:"range"},{name:"Offset",min:0,max:15,type:"range"},{name:"Wave Width",min:4,max:8,type:"range"}],rock:[{name:"Palette",type:"palette",defaultValue:"Gameboy"},{name:"Rock Size",min:3,max:7,type:"range"},{name:"Rock Color",type:"color",defaultValue:2},{name:"Rock Highlight Color",type:"color",defaultValue:3}],brick:[{name:"Palette",type:"palette",defaultValue:"NES Default Red"},{name:"Brick Width",min:5,max:12,type:"range"},{name:"Brick Height",min:2,max:12,type:"range"},{name:"Brick Color",type:"color",defaultValue:2}],block:[{name:"Palette",type:"palette",defaultValue:"NES Default Red"},{name:"Height",min:2,max:8,type:"range"}],hole:[{name:"Palette",type:"palette",defaultValue:"Gameboy"},{name:"Hole Size",min:6,max:14,type:"range",step:2},{name:"Fuzz Area",min:1,max:2,type:"range",defaultValue:1}],plant:[{name:"Palette",type:"palette",defaultValue:"NES Default Green"},{name:"Bush Size",min:3,max:6,type:"range"},{name:"Bush Color",type:"color",defaultValue:2},{name:"Freckle Color",type:"color",defaultValue:1},{name:"Freckle Count",min:2,max:8,type:"range"},{name:"Freckle Size",min:1,max:2,type:"range",defaultValue:1}],sand:[{name:"Palette",type:"palette",defaultValue:"NES Default Yellow"},{name:"Frequency",min:15,max:75,type:"range"},{name:"Offset",min:0,max:15,type:"range"},{name:"Wave Width",min:3,max:12,type:"range"}]};function w(e,t){return(e%t+t)%t}function S(e){return{x:Math.floor(Math.random()*e.bitmap.width),y:Math.floor(Math.random()*e.bitmap.height)}}var T=function(){function e(){Object(p.a)(this,e)}return Object(d.a)(e,null,[{key:"generateImage",value:function(t,a,r){return new Promise((function(i,n){new y.a(16,16,r[k[t]],(function(l,o){switch(l&&n(l),t){case"grass":e.drawGrass(o,a,r);break;case"water":e.drawWater(o,a,r);break;case"brick":e.drawBrick(o,a,r);break;case"block":e.drawBlock(o,a,r);break;case"hole":e.drawHole(o,a,r);break;case"plant":e.drawPlant(o,a,r);break;case"rock":e.drawRock(o,a,r);break;case"lava":e.drawLava(o,a,r);break;case"sand":e.drawSand(o,a,r);break;default:console.warn("Unimplemented tile type given!",t,"blank image ahoy")}o.getBase64Async("image/png").then(i,n)}))}))}},{key:"drawGrass",value:function(e,t,a){for(var r=0;r<t["Short Blades"];r++){var i=S(e),n=i.x,l=i.y;e.setPixelColor(a[2],n,l)}for(var o=0;o<t["Tall Blades"];o++){var s=S(e),c=s.x,h=s.y;e.setPixelColor(a[2],c,h),e.setPixelColor(a[2],c,0===h?e.bitmap.height-1:h-1)}for(var u=0;u<t.Triangles;u++){var p=S(e),d=p.x,m=p.y;e.setPixelColor(a[2],d>0?d-1:e.bitmap.width-1,m),e.setPixelColor(a[2],d<e.bitmap.width-1?d+1:0,m),e.setPixelColor(a[2],d,m>0?m-1:e.bitmap.height-1)}}},{key:"drawWater",value:function(e,t,a){for(var r=function(t){var r=S(e),i=r.x,n=r.y,l=Math.floor(4*Math.random())+3;e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(t,r,o){var s=i-t,c=n-r;s*s+c*c<=l*l&&e.setPixelColor(a[1],t,r)}))},i=0;i<t["Deeper Areas"];i++)r();for(var n=0;n<t.Lines;n++){var l=S(e),o=l.x,s=l.y,c=1===Math.floor(2*Math.random())?1:-1,h=1===Math.floor(2*Math.random())?1:-1,u=o,p=s;for(e.setPixelColor(a[3],u,p),u=w(u+c,e.bitmap.width),p=w(p+h,e.bitmap.height);u!==o&&p!==s;)e.setPixelColor(a[3],u,p),Math.random()>.3&&(u=w(u+c,e.bitmap.width)),Math.random()>.3&&(p=w(p+h,e.bitmap.height));e.setPixelColor(a[3],u,p)}}},{key:"drawBrick",value:function(e,t,a){for(var r=[],i=[],n=0;n<e.bitmap.width;n++)0===w(n+1,t["Brick Width"]+1)?r.push(n):0===w(n+1+Math.floor(t["Brick Width"]/2),t["Brick Width"]+1)&&i.push(n);var l=0;e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(n,o,s){e.setPixelColor(a[t["Brick Color"]],n,o),o%(t["Brick Height"]+1)===0&&(e.setPixelColor(a[0],n,o),0===n&&++l),l%2===0?-1!==r.indexOf(n)&&e.setPixelColor(a[0],n,o):-1!==i.indexOf(n)&&e.setPixelColor(a[0],n,o)}))}},{key:"drawBlock",value:function(e,t,a){e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(r,i){var n=2*(10-t.Height);e.setPixelColor(r>e.bitmap.height-i-1?a[1]:a[3],r,i),r===i?e.setPixelColor(a[2],r,i):r===e.bitmap.height-i-1&&e.setPixelColor(a[1],r,i);var l=e.bitmap.height/2-n/2;r>l&&r<l+n-1&&i>l&&i<l+n-1&&e.setPixelColor(a[2],r,i)}))}},{key:"drawHole",value:function(e,t,a){var r=Math.floor(e.bitmap.width/2-t["Hole Size"]/2),i=t["Fuzz Area"];e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(n,l){if(n<r||n>e.bitmap.width-1-r||l<r||l>e.bitmap.height-1-r){if((n>=r-i&&n<r&&l>r&&l<e.bitmap.height-1-r||n>=r+t["Hole Size"]&&n<r+t["Hole Size"]+i&&l>r&&l<e.bitmap.height-1-r||l>=r-i&&l<r&&n>r&&n<e.bitmap.width-1-r||l>=r+t["Hole Size"]&&l<r+t["Hole Size"]+i&&n>r&&n<e.bitmap.width-1-r)&&Math.random()>.35)return;e.setPixelColor(a[2],n,l)}}))}},{key:"drawPlant",value:function(e,t,a){for(var r,i,n,l=t["Bush Size"],o=10-Math.floor(t["Bush Size"]/2),s=0;s<360;s++)r=s,i=l*Math.cos(r*Math.PI/180),n=l*Math.sin(r*Math.PI/180),e.setPixelColor(a[0],Math.round(8+i),Math.round(o+n));for(var c=0;c<e.bitmap.height;c++)for(var h=!1,u=!1,p=!1,d=0,m=0;m<e.bitmap.width;m++)e.getPixelColor(m,c)===a[0]?(d++,h?u&&(p=!0):h=!0):(h&&e.getPixelColor(m,c)===a[3]&&(u=!0),u&&!p&&d<5&&e.setPixelColor(a[t["Bush Color"]],m,c));for(var f=8-Math.floor(l/2)+1;f<8+l+1;f++)e.setPixelColor(a[0],f,o+l+1),f<8+l&&e.setPixelColor(a[0],f,o+l);var b=0;for(s=0;s<100&&!(b>=t["Freckle Count"]);s++){var j=Math.floor(Math.random()*e.bitmap.width),g=Math.floor(Math.random()*e.bitmap.height);e.getPixelColor(j,g)===a[t["Bush Color"]]&&(b++,e.setPixelColor(a[t["Freckle Color"]],j,g),t["Freckle Size"]>1&&[[j-1,g],[j+1,g],[j,g-1],[j,g+1]].forEach((function(r){var i=r[0],n=r[1];e.getPixelColor(i,n)===a[t["Bush Color"]]&&e.setPixelColor(a[t["Freckle Color"]],i,n)})))}}},{key:"drawRock",value:function(e,t,a){for(var r,i,n,l=t["Rock Size"],o=e.bitmap.height-(t["Rock Size"]-2),s=0;s<360;s++)r=s,i=l*Math.cos(r*Math.PI/180),n=l*Math.sin(r*Math.PI/180),e.setPixelColor(a[0],Math.round(8+i),Math.round(o+n));for(var c=0;c<e.bitmap.height;c++)for(var h=!1,u=!1,p=!1,d=0,m=0;m<e.bitmap.width;m++)e.getPixelColor(m,c)===a[0]?(d++,h?u&&(p=!0):h=!0):(h&&e.getPixelColor(m,c)===a[3]&&(u=!0),u&&!p&&d<5&&(m-c<l-Math.floor(l/1.2)?e.setPixelColor(a[t["Rock Color"]],m,c):e.setPixelColor(a[t["Rock Highlight Color"]],m,c)))}},{key:"drawLava",value:function(e,t,a){for(var r=t.Frequency/100,i=t.Offset,n=t["Wave Width"],l=0;l<e.bitmap.width;l++){for(var o=Math.sin(r*(Math.abs(l-i)%e.bitmap.width))*Math.floor(e.bitmap.height/3);o<e.bitmap.width;)e.setPixelColor(4278255615,o,l),o+=n;var s=1;for(o=0;o<e.bitmap.width;o++)4278255615===e.getPixelColor(o,l)&&(s=1+(s+1)%3),e.setPixelColor(a[s],o,l)}}},{key:"drawSand",value:function(e,t,a){for(var r=t.Frequency/100,i=t.Offset,n=t["Wave Width"],l=0;l<e.bitmap.width;l++){for(var o=Math.sin(r*(Math.abs(l-i)%e.bitmap.width))*Math.floor(e.bitmap.height/3);o<e.bitmap.width;)e.setPixelColor(4278255615,o,l),o+=n;var s=2;for(o=0;o<e.bitmap.width;o++)4278255615===e.getPixelColor(o,l)&&(s=2+(s+1)%2),e.setPixelColor(a[s],o,l)}}}]),e}(),M=(a(285),a(131)),A=a(132),B=a(133),I=["Gameboy","NES Default Red","NES Default Blue","NES Default Green","NES Default Yellow"],N={Gameboy:[255,2155905279,3233857791,4294967295],"NES Default Blue":[255,36863,1149829119,2580348927],"NES Default Red":[255,1426063615,2570256639,3714467071],"NES Default Green":[255,288555263,862322943,2008744191],"NES Default Yellow":[255,1717960959,3148480767,4007495935]},z=function(e){return"string"===typeof e?N[e]:N[I[e]]},R=(a(286),a(2)),E=function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(R.jsx)("div",{className:"palette-color-preview",style:{backgroundColor:"#"+this.props.color}})}}]),a}(i.a.Component),F=(a(288),function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(R.jsx)("div",{className:"palette-preview",children:this.props.palette.map((function(e){return Object(R.jsx)(E,{color:e.toString(16).padStart(8,"0")},"prev-"+e)}))})}}]),a}(i.a.Component)),V=function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).setting=null,r.state=null,r.tileTypeId=null,r.updateTileState=function(){},r.state=e.state,r.reloadFromProps(e),r}return Object(d.a)(a,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.reloadFromProps(e),this.setState(e.state)}},{key:"reloadFromProps",value:function(e){this.setting=e.setting,this.tileTypeId=e.tileTypeId,this.updateTileState=function(t,a,r){e.updateTileState(t,a,r)}}},{key:"render",value:function(){var e=this,t=this.setting;if(t.disabled||null===t)return Object(R.jsx)("span",{},"disabled-setting-"+t.type+t.name);switch(t.type){case"range":return Object(R.jsxs)("div",{className:"tile-option",children:[Object(R.jsx)(B.a,{min:t.min,max:t.max,step:t.step||1,label:t.name,value:this.state.tileProps[this.tileTypeId][t.name],onSlChange:function(a){return e.updateTileState(e.tileTypeId,t.name,a.target.value)}},this.tileTypeId+t.name),Object(R.jsxs)("div",{className:"below-range",children:[Object(R.jsx)("small",{className:"left",children:t.min}),Object(R.jsxs)("small",{className:"mid",children:["Current: ",this.state.tileProps[this.tileTypeId][t.name]]}),Object(R.jsx)("small",{className:"right",children:t.max})]})]},"range-"+t.type+t.name);case"color":return Object(R.jsx)("div",{className:"tile-option",children:Object(R.jsx)(A.a,{label:t.name,children:[0,1,2,3].map((function(a){return Object(R.jsxs)(M.a,{value:a,checked:e.state.tileProps[e.tileTypeId][t.name]===a,onSlChange:function(r){return r.target.checked?e.updateTileState(e.tileTypeId,t.name,a):null},children:["Color ",a+1,Object(R.jsx)(E,{color:e.state.palette[a].toString(16).padStart(8,"0")})]},"palette-color"+t.type+t.name+"-"+a)}))})},"palette-"+t.type+t.name);case"palette":return Object(R.jsx)("div",{className:"tile-option",children:Object(R.jsx)(j.a,{label:"Palette Color",value:this.state.tileProps[this.tileTypeId][t.name],onSlChange:function(a){return e.updateTileState(e.tileTypeId,t.name,a.target.value)},children:I.map((function(e){return Object(R.jsxs)(g.a,{value:e,children:[e," ",Object(R.jsx)(F,{palette:z(e)})]},e)}))})},"palette-"+t.type+t.name);default:return console.error('Unknown tile option type "'.concat(t.type,'" found!'),t),Object(R.jsx)("span",{})}}}]),a}(i.a.Component),D=a(17),W=(a(289),function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(R.jsx)("div",{className:"tile-preview-collection",children:Object(D.a)(Array(this.props.size*this.props.size).keys()).map((function(t){return Object(R.jsx)("img",{alt:"tile"+t,src:e.props.src},"preview-"+t)}))})}}]),a}(i.a.Component)),H=(a(290),function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).state={tileType:"block",tileProps:{},palette:z(0),currentTileImg:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},O.forEach((function(e){r.state.tileProps[e]={},C[e].forEach((function(t){if(void 0!==t.defaultValue)r.state.tileProps[e][t.name]=t.defaultValue;else if(void 0!==t.min&&void 0!==t.max){var a=Math.floor(Math.random()*(t.max-t.min+1))+t.min;t.step&&(a-=a%t.step),r.state.tileProps[e][t.name]=a}}))})),r}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.reloadImage()}},{key:"reRandomize",value:function(){var e=this,t={tileProps:Object(u.a)({},this.state.tileProps)};O.forEach((function(a){t.tileProps[a]=Object(u.a)({},e.state.tileProps[a]),C[a].forEach((function(e){if(!e.disabled&&void 0!==e.min&&void 0!==e.max){var r=Math.floor(Math.random()*(e.max-e.min+1))+e.min;e.step&&(r-=r%e.step),t.tileProps[a][e.name]=r}}))})),this.setState(t,this.reloadImage)}},{key:"getCurrentTileImage",value:function(){var e=Object(h.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.palette,this.state.tileProps[this.state.tileType].Palette&&(t=z(this.state.tileProps[this.state.tileType].Palette)),e.next=4,T.generateImage(this.state.tileType,this.state.tileProps[this.state.tileType],t);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"reloadImage",value:function(){var e=Object(h.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.getCurrentTileImage();case 3:e.t1=e.sent,e.t2={currentTileImg:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"updateTileType",value:function(e){this.setState({tileType:e.target.value},this.reloadImage)}},{key:"updateTileState",value:function(e,t,a){this.state.tileProps[e][t]!==a&&this.setState({tileProps:Object(u.a)(Object(u.a)({},this.state.tileProps),{},Object(o.a)({},e,Object(u.a)(Object(u.a)({},this.state.tileProps[e]),{},Object(o.a)({},t,a))))},this.reloadImage)}},{key:"render",value:function(){var e=this;return Object(R.jsxs)("div",{className:"App",children:[Object(R.jsx)("header",{className:"App-header",children:Object(R.jsx)("h1",{children:"2Bit Tile Generator"})}),Object(R.jsxs)("section",{children:[Object(R.jsxs)("div",{className:"control-bar",children:[Object(R.jsx)(x.a,{content:"Randomize the settings for all tiles.",children:Object(R.jsx)(b.a,{onClick:function(){return e.reRandomize()},children:"Randomize Settings"})}),Object(R.jsx)(x.a,{content:"Regenerate tile image with the current settings",children:Object(R.jsx)(b.a,{onClick:function(){return e.reloadImage()},children:"Regenerate"})})]}),Object(R.jsxs)("div",{className:"configurator",children:[Object(R.jsxs)("div",{className:"left",children:[Object(R.jsx)("h3",{children:"Tile Preview"}),Object(R.jsx)("h4",{children:"Single"}),Object(R.jsx)("img",{className:"tile-preview",alt:"Tile Preview",src:this.state.currentTileImg}),Object(R.jsx)("h4",{children:"Tiled"}),Object(R.jsx)(W,{src:this.state.currentTileImg,size:3}),Object(R.jsx)("div",{className:"dl-bar",children:Object(R.jsx)(b.a,{href:this.state.currentTileImg,download:this.state.tileType+".png",children:"Download"})})]}),Object(R.jsxs)("div",{className:"right",children:[Object(R.jsx)("h3",{children:"Tile Configuration"}),Object(R.jsx)("div",{className:"tile-option",children:Object(R.jsx)(j.a,{label:"Tile Type",value:this.state.tileType,onSlChange:function(t){return e.updateTileType(t)},children:O.map((function(e){return Object(R.jsx)(g.a,{value:e,children:P[e]},e)}))})}),C[this.state.tileType].map((function(t){return Object(R.jsx)(V,{setting:t,state:e.state,tileTypeId:e.state.tileType,updateTileState:function(t,a,r){return e.updateTileState(t,a,r)}},e.state.tileType+t.name)}))]})]})]}),Object(R.jsxs)("footer",{children:[Object(R.jsxs)("p",{children:["Heavily inspired by ",Object(R.jsx)("a",{href:"https://0x72.itch.io/2bitcharactergenerator",target:"_blank",children:"0x72's 2BitCharactersGenerator"}),". UI powered by ",Object(R.jsx)("a",{href:"https://shoelace.style/",target:"_blank",children:"Shoelace"}),"."]}),Object(R.jsxs)("p",{children:["All images generated by this tool are free for use. (CC0) Tool available under the MIT license. (",Object(R.jsx)("a",{href:"https://github.com/cppchriscpp/2bit-tile-generator",target:"_blank",children:"Source"})," \u2022 "," ",Object(R.jsx)("a",{href:"https://github.com/cppchriscpp/2bit-tile-generator/issues",target:"_blank",children:"Feature Requests"}),")"]}),Object(R.jsxs)("p",{children:["There is no requirement to credit me, but please consider tweeting me if you find this useful! "," ",Object(R.jsx)("a",{href:"https://twitter.com/cppchriscpp",target:"_blank",children:"@cppchriscpp"})]}),Object(R.jsxs)("p",{children:["Wanna see the other stuff I do? Check out ",Object(R.jsx)("a",{href:"https://cpprograms.net",target:"_blank",children:"cpprograms.net"}),"."]}),Object(R.jsxs)("p",{className:"version",children:["version: ","1.0.2"]})]})]})}}]),a}(i.a.Component)),G=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,292)).then((function(t){var a=t.getCLS,r=t.getFID,i=t.getFCP,n=t.getLCP,l=t.getTTFB;a(e),r(e),i(e),n(e),l(e)}))};l.a.render(Object(R.jsx)(i.a.StrictMode,{children:Object(R.jsx)(H,{})}),document.getElementById("root")),G()}},[[291,1,2]]]);
//# sourceMappingURL=main.ee7314e7.chunk.js.map