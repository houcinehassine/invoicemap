"use strict";(self.webpackChunkinvoice_map=self.webpackChunkinvoice_map||[]).push([[145],{145:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var l=n(43),s=n(932),r=n(75),i=n(579);const d=function(){const[e,t]=(0,l.useState)(s.A),[n,d]=(0,l.useState)({name:"",allAmount:"",notForMe:"",limitUsed:"",rest:"",overUsed:"",punkte:"",pointsInEuro:""}),[o,a]=(0,l.useState)(null),[h,u]=(0,l.useState)("");(0,l.useEffect)((()=>{const n=e.map((e=>({...e,rest:(e.allAmount-e.notForMe).toFixed(2),overUsed:(e.allAmount-e.notForMe-e.limitUsed||0).toFixed(2),pointsInEuro:(e.punkte/100||0).toFixed(2)})));t(n)}),[]);const c=(0,r._I)(e,h,""),x=(0,r.dv)(c),j=(0,r.Gn)(e,"name");return(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{children:"Pocket PAYBACK 24"}),(0,i.jsx)("div",{children:(0,i.jsxs)("label",{children:["Filter by Month:",(0,i.jsxs)("select",{value:h,onChange:e=>(0,r.PX)(e,"name",u,(()=>{})),children:[(0,i.jsx)("option",{value:"",children:"All"}),j.map((e=>(0,i.jsx)("option",{value:e,children:e},e)))]})]})}),(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Month"}),(0,i.jsx)("th",{children:"All Amount"}),(0,i.jsx)("th",{children:"Not For Me"}),(0,i.jsx)("th",{children:"Limit Used"}),(0,i.jsx)("th",{children:"Rest"}),(0,i.jsx)("th",{children:"Over Used"}),(0,i.jsx)("th",{children:"Points"}),(0,i.jsx)("th",{children:"Points in Euro"}),(0,i.jsx)("th",{children:"Edit/Delete"})]})}),(0,i.jsxs)("tbody",{children:[c.map(((n,l)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:n.name}),(0,i.jsxs)("td",{children:[n.allAmount.toFixed(2)," \u20ac"]}),(0,i.jsxs)("td",{children:[n.notForMe.toFixed(2)," \u20ac"]}),(0,i.jsxs)("td",{children:[n.limitUsed.toFixed(2)," \u20ac"]}),(0,i.jsxs)("td",{children:[n.rest," \u20ac"]}),(0,i.jsxs)("td",{children:[n.overUsed," \u20ac"]}),(0,i.jsx)("td",{children:n.punkte}),(0,i.jsxs)("td",{children:[n.pointsInEuro," \u20ac"]}),(0,i.jsxs)("td",{children:[(0,i.jsx)("button",{onClick:()=>(0,r.fm)(l,e,d,a),children:"Edit"}),(0,i.jsx)("button",{onClick:()=>(0,r._Y)(l,e,t,d,a),children:"Delete"})]})]},l))),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("strong",{children:"Total"})}),(0,i.jsx)("td",{children:(0,i.jsxs)("strong",{children:[x," \u20ac"]})}),(0,i.jsx)("td",{colSpan:"7"})]})]})]}),(0,i.jsx)("h2",{children:null!==o?"Edit Payback":"Add New Payback"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("input",{type:"text",placeholder:"Month",value:n.name,onChange:e=>d({...n,name:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"All Amount",value:n.allAmount,onChange:e=>d({...n,allAmount:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"Not For Me",value:n.notForMe,onChange:e=>d({...n,notForMe:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"Limit Used",value:n.limitUsed,onChange:e=>d({...n,limitUsed:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"Rest",value:n.rest,onChange:e=>d({...n,rest:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"Over Used",value:n.overUsed,onChange:e=>d({...n,overUsed:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"Points",value:n.punkte,onChange:e=>d({...n,punkte:e.target.value})}),(0,i.jsx)("input",{type:"number",placeholder:"Points in Euro",value:n.pointsInEuro,onChange:e=>d({...n,pointsInEuro:e.target.value})}),(0,i.jsx)("button",{onClick:()=>(0,r.kw)(n,d,e,t,o,a),children:null!==o?"Update Payback":"Add Payback"})]})]})}}}]);
//# sourceMappingURL=145.66985a05.chunk.js.map