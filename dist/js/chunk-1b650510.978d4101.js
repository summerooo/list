(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1b650510"],{"0a49":function(e,t,n){var a=n("9b43"),r=n("626a"),i=n("4bf8"),o=n("9def"),l=n("cd1c");e.exports=function(e,t){var n=1==e,c=2==e,s=3==e,d=4==e,u=6==e,p=5==e||u,f=t||l;return function(t,l,h){for(var b,g,m=i(t),y=r(m),v=a(l,h,3),w=o(y.length),D=0,x=n?f(t,w):c?f(t,0):void 0;w>D;D++)if((p||D in y)&&(g=v(b=y[D],D,m),e))if(n)x[D]=g;else if(g)switch(e){case 3:return!0;case 5:return b;case 6:return D;case 2:x.push(b)}else if(d)return!1;return u?-1:s||d?d:x}}},"38f2":function(e,t,n){"use strict";var a={props:{loading:{type:Boolean,default:function(){return!1}},tableData:{type:Array,default:function(){return[]}},hasSelection:{type:Boolean,default:function(){return!1}},hasIndex:{type:Boolean,default:function(){return!1}},tableStructure:{type:Array,default:function(){return[]}},filterBtn:{type:Function,default:function(){return!0}},formatter:{type:Function,default:function(e,t,n,a){return e[t.property]?e[t.property]:""}}},data:function(){return{}},methods:{handleSelectionChange:function(e){this.$emit("handleSelectionChange",e)},operateClick:function(e,t,n){this.$emit("operateClick",e,t,n)},cellClick:function(e,t,n,a){this.$emit("cellClick",e,t,n,a)}}},r=n("2877"),i=Object(r.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{height:"100%",data:e.tableData},on:{"selection-change":e.handleSelectionChange,"cell-click":e.cellClick}},[e.hasSelection?n("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),e.hasIndex?n("el-table-column",{attrs:{type:"index",label:"序号"}}):e._e(),e._l(e.tableStructure,function(t,a){return n("el-table-column",{key:a,attrs:{prop:t.prop,label:t.label,align:t.align||"center",sortable:t.sortable,fixed:t.fixed,width:t.width,"filter-placement":"bottom-end","show-overflow-tooltip":!t.popover},scopedSlots:e._u([{key:"default",fn:function(a){return[t.contain?n("div",{staticStyle:{display:"flex","justify-content":"space-between"}},e._l(t.contain,function(r,i){return n("div",{key:i},[e.filterBtn(a.row,r,a.column,a.row[t.prop],a.$index)?n("el-button",{style:r.style,attrs:{type:r.type||"text",size:r.size||"mini"},on:{click:function(t){return e.operateClick(a.row,a.$index,r)}}},[e._v(e._s(r.label))]):e._e()],1)}),0):e._e(),t.contain||t.other||t.popover?e._e():n("div",[e._v("\n        "+e._s(e.formatter(a.row,a.column,a.row[t.prop],a.$index))+"\n      ")]),t.other?n("div",{staticStyle:{"font-size":"20px"}},[Boolean(a.row.vary)?n("i",{staticClass:"list-icon-arrow-up",staticStyle:{color:"#67C23A"}}):n("i",{staticClass:"list-icon-arrow-down",staticStyle:{color:"#F56C6C"}})]):e._e(),t.popover?n("el-popover",{attrs:{trigger:"hover",placement:"top",width:"500"}},[n("div",[e._v("\n          "+e._s(e.formatter(a.row,a.column,a.row[t.prop],a.$index))+"\n        ")]),n("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","-o-text-overflow":"ellipsis","white-space":"nowrap"},attrs:{slot:"reference"},slot:"reference"},[e._v("\n          "+e._s(e.formatter(a.row,a.column,a.row[t.prop],a.$index))+"\n        ")])]):e._e()]}}],null,!0)})})],2)},[],!1,null,null,null);t.a=i.exports},"554c":function(e,t,n){},"6d48":function(e,t,n){"use strict";var a=n("554c");n.n(a).a},7514:function(e,t,n){"use strict";var a=n("5ca1"),r=n("0a49")(5),i="find",o=!0;i in[]&&Array(1)[i](function(){o=!1}),a(a.P+a.F*o,"Array",{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(i)},7813:function(e,t,n){"use strict";n.r(t);var a=(n("a481"),n("96cf"),n("3b8d")),r=(n("7514"),n("0dbc")),i=n("38f2"),o=n("365c"),l=n("0f06").api,c={headers:{"Content-Type":"multipart/form-data"}},s=function(e){return o.a.get("".concat(l,"/company/get"),{params:e})},d=function(e){var t=new FormData;for(var n in e)t.append(n,e[n]);return o.a.post("".concat(l,"/company/insert"),t,c)},u=function(e){var t=new FormData;for(var n in e)t.append(n,e[n]);return o.a.post("".concat(l,"/company/update"),t,c)},p=function(e){var t=new FormData;for(var n in e)t.append("id",e[n].id);return o.a.post("".concat(l,"/company/delete"),t,c)},f=function(e,t,n){!function(e){var t=document.createElement("a");return t.href=e,void 0===[/^(http|https):$/.test(t.protocol),t.host,t.pathname!==e,t.pathname!=="/".concat(e)].find(function(e){return!e})}(t)?n(new Error("请输入正确网址, 网址格式如 (http|https)://...")):n()},h={components:{sxDynamicInlineForm:r.a,sxMinTable:i.a},data:function(){return{tableStructure:[{prop:"name",label:"网站名称"},{prop:"p_url",label:"打开链接"},{prop:"p_web",label:"官网地址"},{prop:"p_phone",label:"公司电话"},{prop:"p_address",label:"公司地址"},{prop:"jingying",label:"经营风险"},{prop:"sifa",label:"司法风险"},{prop:"Classify",label:"数据来源"},{prop:"CreateTime",label:"发布时间",width:"160",sortable:!0},{label:"操作",width:"100",contain:[{label:"编辑",style:"color: #E6A23C"},{label:"删除",style:"color: #F56C6C"}]}],tableData:[],tableLoading:!1,addAndEditStructure:{data:[{type:"input",model:"name",label:"网站名称:",placeholder:"请输入名称",rules:[{required:!0,message:"请输入网站名称",trigger:"change"}]},{type:"input",model:"address",label:"公司地址:",placeholder:"请输入公司地址",rules:[]},{type:"input",model:"c_url",label:"网址:",placeholder:"请输入网址",rules:[]},{type:"input",model:"phone",label:"电话:",placeholder:"请输入电话",rules:[]},{type:"input",model:"p_url",label:"所在平台网址:",placeholder:"请输入所在平台网址",rules:[{validator:f,trigger:"blur"}]},{type:"radio",model:"Classify",label:"平台分类:",options:[{label:"天眼查",value:"1"},{label:"企查查",value:"2"}]}]},addAndEditData:{},addAndDelFlag:!0,addAndDelDialog:!1,selectionData:[],currentPage:1,pageSize:10,total:0}},created:function(){this.show()},methods:{show:function(){var e=Object(a.a)(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.tableLoading=!0,e.next=3,s(Object.assign({},{page:this.currentPage}));case 3:if(t=e.sent,this.tableLoading=!1,t){e.next=7;break}return e.abrupt("return");case 7:this.tableData=t.data.data,this.total=t.data.count;case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),formatter:function(e,t){if(e[t.property]){if("CreateTime"===t.property)return new Date(1e3*parseInt(e[t.property])).toLocaleString().replace(/:\d{1,2}$/," ");if("Classify"===t.property){if(1===parseInt(e[t.property]))return"天眼查";if(2===parseInt(e[t.property]))return"企查查"}return e[t.property]}return""},handleSelectionChange:function(e){this.selectionData=e},operateClick:function(e,t,n){switch(n.label){case"编辑":this.editHandle(e,t,n);break;case"删除":this.delHandle(e)}},cellClick:function(e,t){"p_url"===t.property&&window.open(e.p_url)},addHandle:function(){this.addAndEditData={},this.addAndDelDialog=!0,this.addAndDelFlag=!0},editHandle:function(e,t,n){this.addAndEditData=Object.assign({},e),this.addAndDelDialog=!0,this.addAndDelFlag=!1},delHandle:function(e){var t=this;if(e&&this.selectionData.push(e),!this.selectionData.length)return this.$message({type:"info",message:"未选择"});this.$confirm("此操作将删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a.a)(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p(t.selectionData);case 2:e.sent&&t.show();case 4:case"end":return e.stop()}},e)})))},handleCurrentChange:function(e){this.show()},dialogVisibleHandle:function(){var e=Object(a.a)(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null,t=Object.assign({},this.addAndEditData,this.$refs.addAndEditForm.getData()),!this.addAndDelFlag){e.next=8;break}return e.next=5,d(t);case 5:e.t0=e.sent,e.next=11;break;case 8:return e.next=10,u(t);case 10:e.t0=e.sent;case 11:e.t0&&(this.show(),this.addAndDelFlag={},this.addAndDelDialog=!1);case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},b=(n("6d48"),n("2877")),g=Object(b.a)(h,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"websiteListContainer"},[n("div",{staticClass:"websiteListContent"},[n("div",{staticClass:"otherOperate"},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addHandle}},[e._v("添加")]),n("el-button",{attrs:{size:"small"},on:{click:function(t){return e.delHandle(!1)}}},[e._v("批量删除")])],1),n("sx-min-table",{attrs:{loading:e.tableLoading,hasSelection:"","table-structure":e.tableStructure,"table-data":e.tableData,formatter:e.formatter},on:{cellClick:e.cellClick,handleSelectionChange:e.handleSelectionChange,operateClick:e.operateClick}})],1),n("div",{staticStyle:{"margin-top":"40px","text-align":"center"}},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e.addAndDelDialog?n("el-dialog",{attrs:{center:"","close-on-click-modal":!1,width:"500px",visible:e.addAndDelDialog},on:{"update:visible":function(t){e.addAndDelDialog=t}}},[n("sx-dynamic-inline-form",{ref:"addAndEditForm",attrs:{wrap:"",size:"small",structure:e.addAndEditStructure},model:{value:e.addAndEditData,callback:function(t){e.addAndEditData=t},expression:"addAndEditData"}}),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:e.dialogVisibleHandle}},[e._v("确 定")]),n("el-button",{staticStyle:{"margin-left":"30px"},on:{click:function(t){e.addAndDelDialog=!1}}},[e._v("取 消")])],1)],1):e._e()],1)},[],!1,null,"c32479fa",null);t.default=g.exports},cd1c:function(e,t,n){var a=n("e853");e.exports=function(e,t){return new(a(e))(t)}},e853:function(e,t,n){var a=n("d3f4"),r=n("1169"),i=n("2b4c")("species");e.exports=function(e){var t;return r(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!r(t.prototype)||(t=void 0),a(t)&&(null===(t=t[i])&&(t=void 0))),void 0===t?Array:t}}}]);