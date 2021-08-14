(this["webpackJsonp2bit-tile-generator"]=this["webpackJsonp2bit-tile-generator"]||[]).push([[0],{138:function(e,t,a){},167:function(e,t){},169:function(e,t){},285:function(e,t,a){},287:function(e,t,a){},288:function(e,t,a){"use strict";a.r(t);var i=a(21),r=a.n(i),n=a(127),l=a.n(n),o=(a(138),a(16)),s=a(40),c=a(10),h=a.n(c),m=a(20),p=a(31),d=a(3),u=a(4),b=a(8),f=a(9),g=(a(139),a(66)),x=a(129),j=a(130),v=a(131),k=a(82),y=a(132),O=a(133),C=a(128),w=a.n(C),P=["block","brick","plant","grass","hole","lava","rock","sand","water"],M={grass:3,water:2,lava:3,rock:3,brick:2,hole:0,plant:3,block:3,sand:0},T={grass:"Grass",water:"Water",lava:"Lava",block:"Block / Tile",brick:"Brick Wall",rock:"Rock",hole:"Hole / Gap",plant:"Bush",sand:"Sand"},A={grass:[{name:"Short Blades",min:0,max:10,type:"range"},{name:"Tall Blades",min:0,max:10,type:"range"},{name:"Triangles",min:0,max:8,type:"range"}],water:[{name:"Lines",min:2,max:4,type:"range"},{name:"Deeper Areas",min:0,max:3,type:"range",disabled:!0,defaultValue:0}],lava:[{name:"Frequency",min:15,max:25,type:"range"},{name:"Offset",min:0,max:15,type:"range"},{name:"Wave Width",min:4,max:8,type:"range"}],rock:[{name:"Rock Size",min:3,max:7,type:"range"},{name:"Rock Color",type:"palette",defaultValue:2},{name:"Rock Highlight Color",type:"palette",defaultValue:3}],brick:[{name:"Brick Width",min:5,max:12,type:"range"},{name:"Brick Height",min:2,max:12,type:"range"},{name:"Brick Color",type:"palette",defaultValue:2}],block:[{name:"Height",min:2,max:8,type:"range"}],hole:[{name:"Hole Size",min:6,max:14,type:"range",step:2},{name:"Fuzz Area",min:1,max:2,type:"range",defaultValue:1}],plant:[{name:"Bush Size",min:3,max:6,type:"range"},{name:"Bush Color",type:"palette",defaultValue:2},{name:"Freckle Color",type:"palette",defaultValue:1},{name:"Freckle Count",min:2,max:8,type:"range"},{name:"Freckle Size",min:1,max:2,type:"range",defaultValue:1}],sand:[{name:"Frequency",min:15,max:75,type:"range"},{name:"Offset",min:0,max:15,type:"range"},{name:"Wave Width",min:3,max:12,type:"range"}]};function S(e,t){return(e%t+t)%t}function B(e){return{x:Math.floor(Math.random()*e.bitmap.width),y:Math.floor(Math.random()*e.bitmap.height)}}var I=function(){function e(){Object(d.a)(this,e)}return Object(u.a)(e,null,[{key:"generateImage",value:function(t,a,i){return new Promise((function(r,n){new w.a(16,16,i[M[t]],(function(l,o){switch(l&&n(l),t){case"grass":e.drawGrass(o,a,i);break;case"water":e.drawWater(o,a,i);break;case"brick":e.drawBrick(o,a,i);break;case"block":e.drawBlock(o,a,i);break;case"hole":e.drawHole(o,a,i);break;case"plant":e.drawPlant(o,a,i);break;case"rock":e.drawRock(o,a,i);break;case"lava":e.drawLava(o,a,i);break;case"sand":e.drawSand(o,a,i);break;default:console.warn("Unimplemented tile type given!",t,"blank image ahoy")}o.getBase64Async("image/png").then(r,n)}))}))}},{key:"drawGrass",value:function(e,t,a){for(var i=0;i<t["Short Blades"];i++){var r=B(e),n=r.x,l=r.y;e.setPixelColor(a[2],n,l)}for(var o=0;o<t["Tall Blades"];o++){var s=B(e),c=s.x,h=s.y;e.setPixelColor(a[2],c,h),e.setPixelColor(a[2],c,0===h?e.bitmap.height-1:h-1)}for(var m=0;m<t.Triangles;m++){var p=B(e),d=p.x,u=p.y;e.setPixelColor(a[2],d>0?d-1:e.bitmap.width-1,u),e.setPixelColor(a[2],d<e.bitmap.width-1?d+1:0,u),e.setPixelColor(a[2],d,u>0?u-1:e.bitmap.height-1)}}},{key:"drawWater",value:function(e,t,a){for(var i=function(t){var i=B(e),r=i.x,n=i.y,l=Math.floor(4*Math.random())+3;e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(t,i,o){var s=r-t,c=n-i;s*s+c*c<=l*l&&e.setPixelColor(a[1],t,i)}))},r=0;r<t["Deeper Areas"];r++)i();for(var n=0;n<t.Lines;n++){var l=B(e),o=l.x,s=l.y,c=1===Math.floor(2*Math.random())?1:-1,h=1===Math.floor(2*Math.random())?1:-1,m=o,p=s;for(e.setPixelColor(a[3],m,p),m=S(m+c,e.bitmap.width),p=S(p+h,e.bitmap.height);m!==o&&p!==s;)e.setPixelColor(a[3],m,p),Math.random()>.3&&(m=S(m+c,e.bitmap.width)),Math.random()>.3&&(p=S(p+h,e.bitmap.height));e.setPixelColor(a[3],m,p)}}},{key:"drawBrick",value:function(e,t,a){for(var i=[],r=[],n=0;n<e.bitmap.width;n++)0===S(n+1,t["Brick Width"]+1)?i.push(n):0===S(n+1+Math.floor(t["Brick Width"]/2),t["Brick Width"]+1)&&r.push(n);var l=0;e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(n,o,s){e.setPixelColor(a[t["Brick Color"]],n,o),o%(t["Brick Height"]+1)===0&&(e.setPixelColor(a[0],n,o),0===n&&++l),l%2===0?-1!==i.indexOf(n)&&e.setPixelColor(a[0],n,o):-1!==r.indexOf(n)&&e.setPixelColor(a[0],n,o)}))}},{key:"drawBlock",value:function(e,t,a){e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(i,r){var n=2*(10-t.Height);e.setPixelColor(i>e.bitmap.height-r-1?a[1]:a[3],i,r),i===r?e.setPixelColor(a[2],i,r):i===e.bitmap.height-r-1&&e.setPixelColor(a[1],i,r);var l=e.bitmap.height/2-n/2;i>l&&i<l+n-1&&r>l&&r<l+n-1&&e.setPixelColor(a[2],i,r)}))}},{key:"drawHole",value:function(e,t,a){var i=Math.floor(e.bitmap.width/2-t["Hole Size"]/2),r=t["Fuzz Area"];e.scan(0,0,e.bitmap.width,e.bitmap.height,(function(n,l){if(n<i||n>e.bitmap.width-1-i||l<i||l>e.bitmap.height-1-i){if((n>=i-r&&n<i&&l>i&&l<e.bitmap.height-1-i||n>=i+t["Hole Size"]&&n<i+t["Hole Size"]+r&&l>i&&l<e.bitmap.height-1-i||l>=i-r&&l<i&&n>i&&n<e.bitmap.width-1-i||l>=i+t["Hole Size"]&&l<i+t["Hole Size"]+r&&n>i&&n<e.bitmap.width-1-i)&&Math.random()>.35)return;e.setPixelColor(a[2],n,l)}}))}},{key:"drawPlant",value:function(e,t,a){for(var i,r,n,l=t["Bush Size"],o=10-Math.floor(t["Bush Size"]/2),s=0;s<360;s++)i=s,r=l*Math.cos(i*Math.PI/180),n=l*Math.sin(i*Math.PI/180),e.setPixelColor(a[0],Math.round(8+r),Math.round(o+n));for(var c=0;c<e.bitmap.height;c++)for(var h=!1,m=!1,p=!1,d=0,u=0;u<e.bitmap.width;u++)e.getPixelColor(u,c)===a[0]?(d++,h?m&&(p=!0):h=!0):(h&&e.getPixelColor(u,c)===a[3]&&(m=!0),m&&!p&&d<5&&e.setPixelColor(a[t["Bush Color"]],u,c));for(var b=8-Math.floor(l/2)+1;b<8+l+1;b++)e.setPixelColor(a[0],b,o+l+1),b<8+l&&e.setPixelColor(a[0],b,o+l);var f=0;for(s=0;s<100&&!(f>=t["Freckle Count"]);s++){var g=Math.floor(Math.random()*e.bitmap.width),x=Math.floor(Math.random()*e.bitmap.height);e.getPixelColor(g,x)===a[t["Bush Color"]]&&(f++,e.setPixelColor(a[t["Freckle Color"]],g,x),t["Freckle Size"]>1&&[[g-1,x],[g+1,x],[g,x-1],[g,x+1]].forEach((function(i){var r=i[0],n=i[1];e.getPixelColor(r,n)===a[t["Bush Color"]]&&e.setPixelColor(a[t["Freckle Color"]],r,n)})))}}},{key:"drawRock",value:function(e,t,a){for(var i,r,n,l=t["Rock Size"],o=e.bitmap.height-(t["Rock Size"]-2),s=0;s<360;s++)i=s,r=l*Math.cos(i*Math.PI/180),n=l*Math.sin(i*Math.PI/180),e.setPixelColor(a[0],Math.round(8+r),Math.round(o+n));for(var c=0;c<e.bitmap.height;c++)for(var h=!1,m=!1,p=!1,d=0,u=0;u<e.bitmap.width;u++)e.getPixelColor(u,c)===a[0]?(d++,h?m&&(p=!0):h=!0):(h&&e.getPixelColor(u,c)===a[3]&&(m=!0),m&&!p&&d<5&&(u-c<l-Math.floor(l/1.2)?e.setPixelColor(a[t["Rock Color"]],u,c):e.setPixelColor(a[t["Rock Highlight Color"]],u,c)))}},{key:"drawLava",value:function(e,t,a){for(var i=t.Frequency/100,r=t.Offset,n=t["Wave Width"],l=0;l<e.bitmap.width;l++){for(var o=Math.sin(i*(Math.abs(l-r)%e.bitmap.width))*Math.floor(e.bitmap.height/3);o<e.bitmap.width;)e.setPixelColor(4278255615,o,l),o+=n;var s=1;for(o=0;o<e.bitmap.width;o++)4278255615===e.getPixelColor(o,l)&&(s=1+(s+1)%3),e.setPixelColor(a[s],o,l)}}},{key:"drawSand",value:function(e,t,a){for(var i=t.Frequency/100,r=t.Offset,n=t["Wave Width"],l=0;l<e.bitmap.width;l++){for(var o=Math.sin(i*(Math.abs(l-r)%e.bitmap.width))*Math.floor(e.bitmap.height/3);o<e.bitmap.width;)e.setPixelColor(4278255615,o,l),o+=n;var s=2;for(o=0;o<e.bitmap.width;o++)4278255615===e.getPixelColor(o,l)&&(s=2+(s+1)%2),e.setPixelColor(a[s],o,l)}}}]),e}(),z=(a(285),a(5)),H=function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return Object(z.jsx)("div",{className:"palette-preview",style:{backgroundColor:"#"+this.props.palette}})}}]),a}(r.a.Component),R=(a(287),function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(e){var i;return Object(d.a)(this,a),(i=t.call(this,e)).state={tileType:"block",tileProps:{},palette:[255,1145324799,2863311615,4294967295],imageWidth:16,imageHeight:16,currentTileImg:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},P.forEach((function(e){i.state.tileProps[e]={},A[e].forEach((function(t){if(void 0!==t.defaultValue)i.state.tileProps[e][t.name]=t.defaultValue;else if(void 0!==t.min&&void 0!==t.max){var a=Math.floor(Math.random()*(t.max-t.min+1))+t.min;t.step&&(a-=a%t.step),i.state.tileProps[e][t.name]=a}}))})),i}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.reloadImage()}},{key:"reRandomize",value:function(){var e=this,t={tileProps:Object(p.a)({},this.state.tileProps)};P.forEach((function(a){t.tileProps[a]=Object(p.a)({},e.state.tileProps[a]),A[a].forEach((function(e){if(!e.disabled&&void 0!==e.min&&void 0!==e.max){var i=Math.floor(Math.random()*(e.max-e.min+1))+e.min;e.step&&(i-=i%e.step),t.tileProps[a][e.name]=i}}))})),this.setState(t,this.reloadImage)}},{key:"getTileOptions",value:function(e){var t=this;return A[e].map((function(a){if(a.disabled)return Object(z.jsx)("span",{},"disabled-setting-"+a.type+a.name);switch(a.type){case"range":return Object(z.jsxs)("div",{className:"tile-option",children:[Object(z.jsx)(v.a,{min:a.min,max:a.max,step:a.step||1,label:a.name,value:t.state.tileProps[e][a.name],onSlChange:function(i){return t.updateTileState(e,a.name,i.target.value)}},e+a.name),Object(z.jsxs)("div",{className:"below-range",children:[Object(z.jsx)("small",{className:"left",children:a.min}),Object(z.jsxs)("small",{className:"mid",children:["Current: ",t.state.tileProps[e][a.name]]}),Object(z.jsx)("small",{className:"right",children:a.max})]})]},"range-"+a.type+a.name);case"palette":return Object(z.jsx)("div",{className:"tile-option",children:Object(z.jsx)(O.a,{label:a.name,children:[0,1,2,3].map((function(i){return Object(z.jsxs)(y.a,{value:i,checked:t.state.tileProps[e][a.name]===i,onSlChange:function(r){return r.target.checked?t.updateTileState(e,a.name,i):null},children:["Color ",i+1,Object(z.jsx)(H,{palette:t.state.palette[i].toString(16).padStart(8,"0")})]},"palette-color"+a.type+a.name+"-"+i)}))})},"palette-"+a.type+a.name);default:return console.error('Unknown tile option type "'.concat(a.type,'" found!'),a),Object(z.jsx)("span",{})}}))}},{key:"getCurrentTileImage",value:function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.generateImage(this.state.tileType,this.state.tileProps[this.state.tileType],this.state.palette);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"reloadImage",value:function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.getCurrentTileImage();case 3:e.t1=e.sent,e.t2={currentTileImg:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"updateTileType",value:function(e){this.setState({tileType:e.target.value},this.reloadImage)}},{key:"updateTileState",value:function(e,t,a){this.state.tileProps[e][t]!==a&&this.setState({tileProps:Object(p.a)(Object(p.a)({},this.state.tileProps),{},Object(s.a)({},e,Object(p.a)(Object(p.a)({},this.state.tileProps[e]),{},Object(s.a)({},t,a))))},this.reloadImage)}},{key:"render",value:function(){var e=this;return Object(z.jsxs)("div",{className:"App",children:[Object(z.jsx)("header",{className:"App-header",children:Object(z.jsx)("h1",{children:"2Bit Tile Generator"})}),Object(z.jsxs)("section",{children:[Object(z.jsx)("p",{}),Object(z.jsxs)("div",{className:"control-bar",children:[Object(z.jsx)(k.a,{content:"Randomize the settings for all tiles.",children:Object(z.jsx)(g.a,{onClick:function(){return e.reRandomize()},children:"Randomize Settings"})}),Object(z.jsx)(k.a,{content:"Regenerate tile image with the current settings",children:Object(z.jsx)(g.a,{onClick:function(){return e.reloadImage()},children:"Regenerate"})})]}),Object(z.jsxs)("div",{className:"configurator",children:[Object(z.jsxs)("div",{className:"left",children:[Object(z.jsx)("h3",{children:"Tile Preview"}),Object(z.jsx)("h4",{children:"Single"}),Object(z.jsx)("img",{className:"tile-preview",alt:"Tile Preview",src:this.state.currentTileImg}),Object(z.jsx)("h4",{children:"Tiled"}),Object(z.jsx)("div",{className:"tile-preview-collection",children:Object(o.a)(Array(9).keys()).map((function(t){return Object(z.jsx)("img",{alt:"tile"+t,src:e.state.currentTileImg},"preview-"+t)}))}),Object(z.jsx)("div",{className:"dl-bar",children:Object(z.jsx)(g.a,{href:this.state.currentTileImg,download:this.state.tileType+".png",children:"Download"})})]}),Object(z.jsxs)("div",{className:"right",children:[Object(z.jsx)("h3",{children:"Tile Configuration"}),Object(z.jsx)("div",{className:"tile-option",children:Object(z.jsx)(x.a,{label:"Tile Type",value:this.state.tileType,onSlChange:function(t){return e.updateTileType(t)},children:P.map((function(e){return Object(z.jsx)(j.a,{value:e,children:T[e]},e)}))})}),this.getTileOptions(this.state.tileType)]})]})]}),Object(z.jsxs)("footer",{children:[Object(z.jsxs)("p",{children:["All images generated by this tool are free for use. (CC0) Tool available under the MIT license. (",Object(z.jsx)("a",{href:"https://github.com/cppchriscpp/2bit-tile-generator",target:"_blank",children:"Source"}),")"]}),Object(z.jsxs)("p",{children:["Heavily inspired by ",Object(z.jsx)("a",{href:"https://0x72.itch.io/2bitcharactergenerator",target:"_blank",children:"0x72's 2BitCharactersGenerator"})]}),Object(z.jsxs)("p",{children:["Wanna see the other stuff I do? Check out ",Object(z.jsx)("a",{href:"https://cpprograms.net",target:"_blank",children:"cpprograms.net"}),"."]})]})]})}}]),a}(r.a.Component)),W=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,289)).then((function(t){var a=t.getCLS,i=t.getFID,r=t.getFCP,n=t.getLCP,l=t.getTTFB;a(e),i(e),r(e),n(e),l(e)}))};l.a.render(Object(z.jsx)(r.a.StrictMode,{children:Object(z.jsx)(R,{})}),document.getElementById("root")),W()}},[[288,1,2]]]);
//# sourceMappingURL=main.eec86763.chunk.js.map