(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-42971c9c"],{"0536":function(t,e,n){},"1f30":function(t,e,n){},"81e3":function(t,e,n){"use strict";var i=n("0536");n.n(i).a},d376:function(t,e,n){"use strict";var i=n("1f30");n.n(i).a},ed3a:function(t,e,n){"use strict";n.r(e);var i={data:function(){return{activeMenu:"",allMenus:[]}},created:function(){this.init()},methods:{init:function(){this.activeMenu=this.$route.path;var t=this.$router.options.routes[1].children,e=[],n=function(t){for(var n in t)t[n].meta.navDoNot||e.push(t[n]);return e};for(var i in n(t))this.$set(this.allMenus,i,n(t)[i])},handleSelect:function(t,e){},handleOpen:function(t,e){},handleClose:function(t,e){}}},s=(n("d376"),n("81e3"),n("2877")),a=Object(s.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"menu"},[n("div",{staticClass:"title"},[t._v("排名查询后台")]),n("el-menu",{attrs:{router:"","default-active":t.activeMenu},on:{select:t.handleSelect,open:t.handleOpen,close:t.handleClose}},[t._l(t.allMenus,function(e,i){return[e.children?n("el-submenu",{key:i,attrs:{index:e.path,"show-timeout":100}},[n("template",{slot:"title"},[n("i",{class:e.meta.title}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.meta.title))])]),t._l(e.children,function(e,i){return n("el-menu-item",{key:i,attrs:{index:e.path}},[n("i",{class:e.meta.title}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.meta.title))])])})],2):n("el-menu-item",{key:i,attrs:{index:e.path}},[n("i",{class:e.meta.title}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.meta.title))])])]})],2)],1),n("div",{staticClass:"content"},[n("div",{staticClass:"title"},[t._v("\n      "+t._s(t.$route.meta.title)+"\n    ")]),n("div",{staticClass:"innerContent"},[n("router-view")],1)])])},[],!1,null,"513c6953",null);e.default=a.exports}}]);