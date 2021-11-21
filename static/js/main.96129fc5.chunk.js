(this["webpackJsonprare-town"]=this["webpackJsonprare-town"]||[]).push([[0],{102:function(e){e.exports=JSON.parse('{"version":"0.0.0","name":"collection","instructions":[{"name":"create","accounts":[{"name":"collection","isMut":true,"isSigner":false},{"name":"mint","isMut":true,"isSigner":false},{"name":"mintAuthority","isMut":false,"isSigner":false},{"name":"user","isMut":true,"isSigner":true},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"bumps","type":{"defined":"Bumps"}},{"name":"collectionSize","type":"u64"},{"name":"authority","type":"publicKey"}]},{"name":"setMint","accounts":[{"name":"collection","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[{"name":"index","type":"u64"},{"name":"mint","type":"publicKey"}]},{"name":"preventUpgrades","accounts":[{"name":"collection","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[]},{"name":"claim","accounts":[{"name":"collection","isMut":true,"isSigner":false},{"name":"claimedToken","isMut":false,"isSigner":false},{"name":"claimedTokenAccount","isMut":false,"isSigner":false},{"name":"owner","isMut":false,"isSigner":true},{"name":"tokenAccount","isMut":true,"isSigner":false},{"name":"mint","isMut":true,"isSigner":false},{"name":"mintAuthority","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"index","type":"u64"}]},{"name":"spend","accounts":[{"name":"collection","isMut":true,"isSigner":false},{"name":"targetToken","isMut":false,"isSigner":false},{"name":"spender","isMut":false,"isSigner":true},{"name":"tokenAccount","isMut":true,"isSigner":false},{"name":"mint","isMut":true,"isSigner":false},{"name":"mintAuthority","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"index","type":"u64"},{"name":"amount","type":"u64"}]}],"accounts":[{"name":"Collection","type":{"kind":"struct","fields":[{"name":"authority","type":"publicKey"},{"name":"upgradable","type":"bool"},{"name":"size","type":"u64"},{"name":"token","type":"publicKey"},{"name":"tokenAuthority","type":"publicKey"},{"name":"bumps","type":{"defined":"Bumps"}},{"name":"mints","type":{"array":[{"defined":"CollectionMint"},2472]}}]}}],"types":[{"name":"CollectionMint","type":{"kind":"struct","fields":[{"name":"mint","type":"publicKey"},{"name":"received","type":"u64"},{"name":"claimed","type":"i64"}]}},{"name":"Bumps","type":{"kind":"struct","fields":[{"name":"token","type":"u8"},{"name":"authority","type":"u8"}]}}],"errors":[{"code":300,"name":"ClaimingEarly","msg":"Last claim is less than 24h old"}],"metadata":{"address":"E2NETGR9NzqpgUFo1QYdm7BcFMwhydNnQBtUH1Cf8jxV"}}')},395:function(e,t,n){},396:function(e,t){},398:function(e,t){},420:function(e,t){},421:function(e,t){},489:function(e,t){},491:function(e,t){},501:function(e,t){},503:function(e,t){},530:function(e,t){},532:function(e,t){},537:function(e,t){},539:function(e,t){},546:function(e,t){},558:function(e,t){},561:function(e,t){},565:function(e,t){},567:function(e,t){},576:function(e,t){},578:function(e,t){},587:function(e,t){},588:function(e,t){},619:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(64),i=n.n(a),s=(n(395),n(360)),o=n(26),l=n(341),u=n(46),b=n(351),d=n(636),j=n(637),f=n(361),m=n(638),h=n(639),x=n(640),p=n(641),O=n(642),g=n(634),y=n(635),v=n(4),w=n(30),k=n(251),S=n(78),C=n(254),M=n(91),P=n(18),T=n(96),A=n(21),K=n(253),z=n(8),W=function(e){var t=e.label,n=e.href,c=e.subLabel,r=e.newTab;return Object(z.jsx)(k.d,{href:n,role:"group",display:"block",p:2,rounded:"md",_hover:{bg:Object(S.d)("pink.50","gray.900")},target:r?"_blank":void 0,children:Object(z.jsxs)(k.f,{direction:"row",align:"center",children:[Object(z.jsxs)(k.a,{children:[Object(z.jsx)(k.g,{transition:"all .3s ease",_groupHover:{color:"pink.400"},fontWeight:500,children:t}),Object(z.jsx)(k.g,{fontSize:"sm",children:c})]}),Object(z.jsx)(k.c,{transition:"all .3s ease",transform:"translateX(-10px)",opacity:0,_groupHover:{opacity:"100%",transform:"translateX(0)"},justify:"flex-end",align:"center",flex:1,children:Object(z.jsx)(P.a,{color:"pink.400",w:5,h:5,as:T.b})})]})})},N=[{label:"Leaderboard",href:"#/"},{label:"My Steads",href:"#/mysteads"},{label:"Ressources",children:[{label:"RareTown programs on GitHub",subLabel:"Solana program repo",href:"https://github.com/Dodecahedr0x/rare-town",newTab:!0},{label:"RareTown front-end on GitHub",subLabel:"Front-end repo",href:"https://github.com/Dodecahedr0x/rare-town-frontend",newTab:!0},{label:"SolSteads",subLabel:"SolSteads official website",href:"https://solsteads.com/",newTab:!0},{label:"SolSteads Discord",subLabel:"SolSteads official Discord server",href:"https://discord.gg/tbZe5jyx",newTab:!0}]}],L=function(){var e=Object(S.d)("gray.600","gray.200"),t=Object(S.d)("gray.800","white"),n=Object(S.d)("white","gray.800");return Object(z.jsx)(k.f,{direction:"row",spacing:4,children:N.map((function(c){return Object(z.jsx)(k.a,{children:Object(z.jsxs)(K.a,{trigger:"hover",placement:"bottom-start",children:[Object(z.jsx)(K.c,{children:Object(z.jsx)(k.d,{p:2,href:c.href,fontSize:"sm",fontWeight:500,color:e,_hover:{textDecoration:"none",color:t},target:c.newTab?"_blank":void 0,children:c.label})}),c.children&&Object(z.jsx)(K.b,{border:0,boxShadow:"xl",bg:n,p:4,rounded:"xl",minW:"sm",children:Object(z.jsx)(k.f,{children:c.children.map((function(e){return Object(z.jsx)(W,Object(A.a)({},e),e.label)}))})})]})},c.label)}))})},F=function(e){var t=e.label,n=e.children,c=e.href,r=Object(w.c)(),a=r.isOpen,i=r.onToggle;return Object(z.jsxs)(k.f,{spacing:4,onClick:n&&i,children:[Object(z.jsxs)(k.c,{py:2,as:k.d,href:null!==c&&void 0!==c?c:"#",justify:"space-between",align:"center",_hover:{textDecoration:"none"},children:[Object(z.jsx)(k.g,{fontWeight:600,color:Object(S.d)("gray.600","gray.200"),children:t}),n&&Object(z.jsx)(P.a,{as:T.a,transition:"all .25s ease-in-out",transform:a?"rotate(180deg)":"",w:6,h:6})]}),Object(z.jsx)(M.a,{in:a,animateOpacity:!0,style:{marginTop:"0!important"},children:Object(z.jsx)(k.f,{mt:2,pl:4,borderLeft:1,borderStyle:"solid",borderColor:Object(S.d)("gray.200","gray.700"),align:"start",children:n&&n.map((function(e){return Object(z.jsx)(k.d,{py:2,href:e.href,children:e.label},e.label)}))})})]})},B=function(){return Object(z.jsx)(k.f,{bg:Object(S.d)("white","gray.800"),p:4,display:{md:"none"},children:N.map((function(e){return Object(z.jsx)(F,Object(A.a)({},e),e.label)}))})},D=n(275),H=n(342),V=n(1),I=n.n(V),U=n(11),E=n(340),_=n(255),G=function(e){var t=e.isOpen,n=e.onClose,r=Object(H.b)(),a=Object(c.useCallback)(function(){var e=Object(U.a)(I.a.mark((function e(t){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.select(t),r.connect();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[r]);return Object(z.jsxs)(E.a,{isOpen:t,onClose:n,children:[Object(z.jsx)(E.f,{}),Object(z.jsxs)(E.d,{children:[Object(z.jsx)(E.e,{children:"Connect a wallet"}),Object(z.jsx)(E.c,{}),Object(z.jsx)(E.b,{children:Object(z.jsx)(k.h,{spacing:"8px",my:2,children:r.wallets.map((function(e){return Object(z.jsx)(C.a,{width:"100%",py:2,leftIcon:Object(z.jsx)(_.a,{src:e.icon,alt:e.name,width:8}),onClick:function(){return a(e.name)},children:e.name},e.name)}))})})]})]})},R=(n(20),n(27)),J=n(17),Y=n(102),$=new R.a(86400),q=(new R.e.PublicKey("So11111111111111111111111111111111111111112"),new R.e.PublicKey("HNWbFSocM1NpG9nfMjCGy5oup2HJDT2BhyR1MdUPxdLu")),Q=(new R.e.PublicKey(Y.metadata.address),new Map,function(){var e=Object(U.a)(I.a.mark((function e(t,n){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.e.PublicKey.findProgramAddress([t.toBuffer(),J.e.toBuffer(),n.toBuffer()],J.e);case 2:return e.abrupt("return",e.sent[0]);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),X=function(){var e=Object(U.a)(I.a.mark((function e(t,n){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.e.PublicKey.findProgramAddress([t.toBuffer(),J.e.toBuffer(),n.toBuffer()],J.a);case 2:return e.abrupt("return",e.sent[0]);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Z=Object(c.createContext)({mints:[],createAccount:function(){return new Promise((function(){}))},claimToken:function(){return new Promise((function(){}))},spendTokens:function(){return new Promise((function(){}))}}),ee=n(16),te=n(350),ne=n(176),ce=n(348),re=n.n(ce),ae=n(159),ie=function(e){var t,n=e.isOpen,c=e.onClose,r=(e.transaction,Object(H.b)());return Object(z.jsxs)(E.a,{isOpen:n,onClose:c,children:[Object(z.jsx)(E.f,{}),Object(z.jsxs)(E.d,{maxW:"350px",children:[Object(z.jsx)(E.e,{children:"Confirming transaction..."}),Object(z.jsx)(E.c,{}),Object(z.jsx)(E.b,{children:Object(z.jsxs)(k.h,{spacing:"8px",my:2,children:[Object(z.jsx)(_.a,{src:null===(t=r.wallet)||void 0===t?void 0:t.icon,w:"100%",h:"100%"}),Object(z.jsx)(ae.a,{size:"xl"})]})})]})]})},se=new v.PublicKey(Y.metadata.address),oe=function(e){var t=e.children,n=Object(l.a)(),r=Object(te.b)().connection,a=Object(H.b)(),i=Object(w.c)(),s=i.isOpen,o=i.onOpen,u=i.onClose,b=Object(c.useState)(""),d=Object(ee.a)(b,2),j=d[0],f=d[1],m=Object(c.useState)([]),h=Object(ee.a)(m,2),x=h[0],p=h[1],O=Object(c.useState)(),g=Object(ee.a)(O,2),y=g[0],k=g[1],S=Object(c.useState)(),C=Object(ee.a)(S,2),M=C[0],P=C[1],T=Object(c.useState)([]),A=Object(ee.a)(T,2),K=A[0],W=A[1],N=Object(c.useCallback)(Object(U.a)(I.a.mark((function e(){var t,n,c,i;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=2;break}return e.abrupt("return");case 2:return t=new R.c(r,a,{preflightCommitment:"processed"}),n=new R.b(Y,se,t),e.next=6,n.account.collection.fetch(q);case 6:c=e.sent,i=new R.e.PublicKey(0),c.mints=c.mints.filter((function(e){return!e.mint.equals(i)})),P(c);case 10:case"end":return e.stop()}}),e)}))),[r,a]);Object(c.useEffect)((function(){N()}),[N]);var L=Object(c.useCallback)(Object(U.a)(I.a.mark((function e(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a&&M&&a.publicKey){e.next=4;break}p([]),e.next=9;break;case 4:return e.t0=p,e.next=7,ne.a.metadata.Metadata.findByOwnerV2(r,a.publicKey);case 7:e.t1=e.sent.map((function(e){return e.pubkey.toString()})),(0,e.t0)(e.t1);case 9:case"end":return e.stop()}}),e)}))),[r,M,a]);Object(c.useEffect)((function(){L()}),[L]);var F=Object(c.useCallback)(Object(U.a)(I.a.mark((function e(){var t,n,c;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(M&&r){e.next=2;break}return e.abrupt("return");case 2:t=new Array(M.mints.length).fill(0).map((function(e,t){return t})).sort((function(e,t){return M.mints[t].received.sub(M.mints[e].received).toNumber()})),n=I.a.mark((function e(n){var c,a,i;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne.a.metadata.Metadata.getPDA(M.mints[t[n]].mint);case 2:return c=e.sent,e.next=5,ne.a.metadata.Metadata.load(r,c);case 5:return a=e.sent,e.next=8,re.a.get(a.data.data.uri);case 8:i=e.sent,W((function(e){var c=null===e||void 0===e?void 0:e.slice();return c[n]={mint:M.mints[t[n]],rank:Number(n),imageUri:i.data.image,solsteadsUrl:i.data.external_url,metadata:a,owned:x.includes(a.pubkey.toString())},c}));case 10:case"end":return e.stop()}}),e)})),e.t0=I.a.keys(t);case 5:if((e.t1=e.t0()).done){e.next=10;break}return c=e.t1.value,e.delegateYield(n(c),"t2",8);case 8:e.next=5;break;case 10:case"end":return e.stop()}}),e)}))),[r,M,x]);Object(c.useEffect)((function(){F()}),[F]);var B=Object(c.useCallback)(Object(U.a)(I.a.mark((function e(){var t,n,c;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(M&&r&&a.publicKey){e.next=2;break}return e.abrupt("return");case 2:return t=new R.e.PublicKey(M.token),e.prev=3,e.next=6,J.f.getAssociatedTokenAddress(J.a,J.e,t,a.publicKey);case 6:return n=e.sent,c=new J.f(r,t,J.e,a),e.t0=k,e.next=11,c.getAccountInfo(n);case 11:e.t1=e.sent,(0,e.t0)(e.t1),e.next=18;break;case 15:e.prev=15,e.t2=e.catch(3),console.log("User has no account yet");case 18:case"end":return e.stop()}}),e,null,[[3,15]])}))),[r,M,a]);Object(c.useEffect)((function(){B()}),[B]);var D=Object(c.useCallback)(Object(U.a)(I.a.mark((function e(){var t,n,c,i,s,l;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.publicKey&&a.signTransaction&&M){e.next=2;break}return e.abrupt("return");case 2:return o(),t=new R.e.PublicKey(M.token),e.next=6,J.f.getAssociatedTokenAddress(J.a,J.e,t,a.publicKey);case 6:return n=e.sent,e.next=9,Q(a.publicKey,t);case 9:return c=e.sent,i=[J.f.createAssociatedTokenAccountInstruction(J.a,J.e,t,n,a.publicKey,a.publicKey),J.f.createInitAccountInstruction(J.e,t,c,a.publicKey)],e.prev=11,e.next=14,a.sendTransaction((s=new R.e.Transaction).add.apply(s,i),r);case 14:l=e.sent,f(l),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(11),console.log(e.t0);case 21:return e.prev=21,u(),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[11,18,21,24]])}))),[M,r,a,u,o]),V=Object(c.useCallback)(function(){var e=Object(U.a)(I.a.mark((function e(t){var c,i,s,l;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(y,M),a&&M&&y&&a.publicKey){e.next=3;break}return e.abrupt("return");case 3:return o(),c=new R.c(r,a,{preflightCommitment:"processed"}),i=new R.b(Y,se,c),s=new R.a(M.mints.map((function(e){return e.mint.toString()})).indexOf(t.mint.mint.toString())),e.next=9,X(a.publicKey,t.mint.mint);case 9:return l=e.sent,e.prev=10,e.next=13,i.rpc.claim(s,{accounts:{collection:q,claimedToken:t.mint.mint,claimedTokenAccount:l,owner:a.publicKey,tokenAccount:y.address,mint:M.token,mintAuthority:M.tokenAuthority,tokenProgram:J.e,systemProgram:v.SystemProgram.programId}});case 13:return n({title:"Claim successful",description:'Successfully claimed $TOWN for "'.concat(t.metadata.data.data.name,'"'),status:"success",duration:5e3,isClosable:!0}),e.next=16,N();case 16:e.next=22;break;case 18:e.prev=18,e.t0=e.catch(10),console.log("Failed claiming tokens",e.t0),n({title:"Claiming failed",description:"".concat(e.t0),status:"error",duration:5e3,isClosable:!0});case 22:u();case 23:case"end":return e.stop()}}),e,null,[[10,18]])})));return function(t){return e.apply(this,arguments)}}(),[r,M,n,y,a,u,o,N]),E=Object(c.useCallback)(function(){var e=Object(U.a)(I.a.mark((function e(t,c){var i,s,l;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a&&M&&y&&a.publicKey){e.next=2;break}return e.abrupt("return");case 2:return o(),i=new R.c(r,a,{preflightCommitment:"processed"}),s=new R.b(Y,se,i),l=new R.a(M.mints.map((function(e){return e.mint.toString()})).indexOf(t.mint.mint.toString())),e.prev=6,e.next=9,s.rpc.spend(l,c,{accounts:{collection:q,targetToken:t.mint.mint,spender:a.publicKey,tokenAccount:y.address,mint:M.token,mintAuthority:M.tokenAuthority,tokenProgram:J.e}});case 9:return n({title:"Spending successful",description:"Successfully gave ".concat(c.toNumber()/Math.pow(10,9),' $TOWN for "').concat(t.metadata.data.data.name,'"'),status:"success",duration:5e3,isClosable:!0}),e.next=12,N();case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(6),console.log("Failed claiming tokens",e.t0,Object.keys(e.t0)),n({title:"Spending failed",description:"".concat(e.t0),status:"error",duration:5e3,isClosable:!0});case 18:u();case 19:case"end":return e.stop()}}),e,null,[[6,14]])})));return function(t,n){return e.apply(this,arguments)}}(),[r,M,n,y,a,u,o,N]);return Object(z.jsxs)(Z.Provider,{value:{collection:M,mints:K,userAccount:y,createAccount:D,claimToken:V,spendTokens:E},children:[t,Object(z.jsx)(ie,{isOpen:s,onClose:u,transaction:j})]})},le=function(){return Object(A.a)({},Object(c.useContext)(Z))},ue=function(){var e,t,n=Object(w.c)(),r=n.isOpen,a=n.onClose,i=n.onOpen,s=Object(H.b)(),o=le().userAccount;return Object(c.useEffect)((function(){s.connected&&a()}),[s,a]),Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(G,{isOpen:r,onClose:a}),s.connected?Object(z.jsxs)(z.Fragment,{children:[o&&Object(z.jsx)(D.a,{size:"lg",variant:"subtle",colorScheme:"cyan",children:Object(z.jsxs)(D.b,{children:[o.amount.toNumber()/Math.pow(10,9)," $TOWN"]})}),Object(z.jsx)(C.a,{onClick:s.disconnect,children:(t=null===(e=s.publicKey)||void 0===e?void 0:e.toString(),t?t.substr(0,4)+"..."+t.substr(t.length-4,4):"???")})]}):Object(z.jsx)(C.a,{onClick:i,children:"Connect"})]})},be=Object(P.b)({displayName:"Logo",viewBox:"0 0 538.27 742.48",path:Object(z.jsx)("path",{fill:"currentColor",d:"M741.65,815.19H711.52v-206H704V549.3h10.3V529.38h-2.76L680.24,397.64V360.25l20-.87v4.4l32.15-1.41s-10.35-2.64-8-4.46c5.4-4.25,12-3.54,4.92-3.86-2-.09-11.41-.37-19-.59a6.4,6.4,0,0,0-1.89-2.89c-2.25-1.58-23.64-1-28.16-.91v-4h-1.77v52L647.21,529.38h-2.76V549.3h10.28v41.59h-6.9v18.34h-6.42V590.89h-7.25v18.34h-8.49V590.89H618.4v18.34h-1.23v-72h7.09V523.46h-1.9l-21.57-90.87v-25.8l13.79-.61v3l22.18-1s-7.14-1.81-5.55-3.08c3.73-2.92,8.28-2.44,3.4-2.66-1.39-.06-7.88-.25-13.1-.41a4.29,4.29,0,0,0-1.29-2c-1.57-1.09-16.3-.72-19.43-.63v-2.75h-1.23v35.86l-13.93,58.76-58.09-145-20.77,51.86L464.89,221.63V164.2l30.69-1.35v6.77l49.4-2.17s-15.91-4-12.35-6.85c8.29-6.52,18.43-5.44,7.57-5.92-3.09-.14-17.51-.57-29.14-.91a9.43,9.43,0,0,0-2.93-4.44c-3.45-2.42-36.17-1.61-43.24-1.41v-6.13h-2.72v79.84L419.6,401,397.68,346.3,346,475.44,335.8,432.59v-25.8l13.78-.61v3l22.18-1s-7.14-1.81-5.54-3.08c3.72-2.92,8.28-2.44,3.4-2.66-1.39-.06-7.88-.25-13.1-.41a4.21,4.21,0,0,0-1.29-2c-1.56-1.09-16.31-.72-19.43-.63v-2.75h-1.23v35.86L313,523.46H311.1V537.2h6.82v19.47h.29v52.56h-3.16V590.89H307.8v18.34h-6.41V590.89h-7.26v18.34h-8.5V549.3h10.29V529.38h-2.76L261.9,397.64V360.25l20-.87v4.4L314,362.37s-10.35-2.64-8-4.46c5.39-4.25,12-3.54,4.91-3.86-2-.09-11.4-.37-19-.59a6.23,6.23,0,0,0-1.88-2.89c-2.26-1.58-23.64-1-28.15-.91v-4h-1.78v52L228.87,529.38h-2.78V549.3h10.3v59.93h-10.3v206H203.38v69.08H741.65Z",transform:"translate(-203.38 -141.79)"})});function de(){var e=Object(w.c)(),t=e.isOpen,n=e.onToggle;return Object(z.jsxs)(k.a,{children:[Object(z.jsxs)(k.c,{bg:Object(S.d)("white","gray.800"),color:Object(S.d)("gray.600","white"),minH:"60px",py:{base:2},px:{base:4},borderBottom:1,borderStyle:"solid",borderColor:Object(S.d)("gray.200","gray.900"),align:"center",children:[Object(z.jsx)(k.c,{flex:{base:1,md:"auto"},ml:{base:-2},display:{base:"flex",md:"none"},children:Object(z.jsx)(C.c,{onClick:n,icon:t?Object(z.jsx)(T.c,{w:3,h:3}):Object(z.jsx)(T.d,{w:5,h:5}),variant:"ghost","aria-label":"Toggle Navigation"})}),Object(z.jsxs)(k.c,{flex:{base:1},justify:{base:"center",md:"start"},children:[Object(z.jsx)(be,{boxSize:8,color:Object(S.d)("gray.600","white")}),Object(z.jsx)(k.c,{display:{base:"none",md:"flex"},ml:10,children:Object(z.jsx)(L,{})})]}),Object(z.jsx)(k.f,{flex:{base:1,md:0},justify:"flex-end",direction:"row",spacing:6,children:Object(z.jsx)(ue,{})})]}),Object(z.jsx)(M.a,{in:t,animateOpacity:!0,children:Object(z.jsx)(B,{})})]})}var je=n(277),fe=n(276),me=function(e){var t=e.token,n=Object(H.b)(),r=le(),a=r.userAccount,i=r.claimToken,s=r.spendTokens,o=r.createAccount,l=Object(c.useState)(0),u=Object(ee.a)(l,2),b=u[0],d=u[1],j=Object(c.useState)(""),f=Object(ee.a)(j,2),m=f[0],h=f[1],x=Object(c.useCallback)((function(){var e=86400-new R.a(Date.now()/1e3).sub(t.mint.claimed).toNumber(),n=Math.floor(e/3600%24),c=Math.floor(e/60%60),r=Math.floor(e%60);return"".concat(n<10?"0"+n:n,":").concat(c<10?"0"+c:c,":").concat(r<10?"0"+r:r)}),[t]);return Object(c.useEffect)((function(){var e=setTimeout((function(){h(x())}),1e3);return function(){return clearTimeout(e)}})),Object(z.jsxs)(k.c,{maxW:"350px",direction:"column",alignItems:"center",justifyContent:"center",borderWidth:"2px",rounded:"lg",shadow:"lg",children:[Object(z.jsx)(_.a,{src:t.imageUri,rounded:"lg",maxW:"280px",maxH:"400px"}),Object(z.jsx)(k.g,{fontSize:"2xl",fontWeight:"bold",maxW:"280px",children:t.metadata.data.data.name}),Object(z.jsx)(k.b,{}),Object(z.jsxs)(k.h,{spacing:"8px",w:"100%",p:"15px",children:[Object(z.jsxs)(k.g,{fontSize:"lg",fontWeight:"bold",children:["Rank ",t.rank+1]}),Object(z.jsxs)(k.c,{direction:"row",w:"100%",children:[Object(z.jsx)(k.a,{children:Object(z.jsx)(k.g,{fontSize:"lg",fontWeight:"bold",children:"Points"})}),Object(z.jsx)(k.e,{}),Object(z.jsx)(k.a,{children:Object(z.jsx)(k.g,{fontSize:"md",fontWeight:"bold",children:t.mint.received.toNumber()/Math.pow(10,9)})})]}),Object(z.jsx)(k.a,{children:Object(z.jsx)(k.d,{href:t.solsteadsUrl,target:"_blank",children:"Check on Solsteads"})}),n.connected&&Object(z.jsx)(z.Fragment,{children:a?Object(z.jsxs)(z.Fragment,{children:[Object(z.jsxs)(k.c,{gap:"2px",children:[Object(z.jsx)(fe.a,{onChange:function(e){return d(Number(e.target.value))}}),Object(z.jsx)(C.a,{ml:"5px",colorScheme:"blue",disabled:"0"===a.amount.toString()||0===b,onClick:function(){return s(t,new R.a(b*Math.pow(10,9)))},children:"Give"})]}),t.owned&&Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(C.a,{colorScheme:"green",onClick:function(){return i(t)},disabled:new R.a(Date.now()/1e3).sub(t.mint.claimed).lt($),isFullWidth:!0,children:new R.a(Date.now()/1e3).sub(t.mint.claimed).lt($)?"Claimable in ".concat(m):"Claim"})})]}):Object(z.jsx)(k.c,{children:Object(z.jsx)(C.a,{colorScheme:"teal",onClick:o,isFullWidth:!0,children:"Initialize"})})})]})]})};function he(){var e=le().mints,t=Object(c.useState)(0),n=Object(ee.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)(50),s=Object(ee.a)(i,2),o=s[0],l=s[1],u=Object(c.useMemo)((function(){return e.sort((function(e,t){return t.mint.received.toNumber()-e.mint.received.toNumber()}))}),[e]),b=Object(c.useMemo)((function(){return u.slice(o*r,o*(r+1))}),[u,r,o]),d=Object(c.useMemo)((function(){return o*(r+1)>e.length}),[o,r,e]),j=Object(c.useCallback)((function(){d||a((function(e){return e+1}))}),[d]),f=Object(c.useCallback)((function(){0!==r&&a((function(e){return e-1}))}),[r]);return{mints:b,pageSize:o,currentPage:r,isLastPage:d,setPageSize:l,nextPage:j,previousPage:f}}var xe=function(){var e=le().collection,t=he(),n=t.mints,c=t.currentPage,r=t.isLastPage,a=t.previousPage,i=t.nextPage,s=t.setPageSize;return Object(z.jsx)(k.c,{direction:"column",w:"100%",align:"center",p:"10px",children:e?Object(z.jsxs)(k.a,{justify:"center",align:"center",w:"full",children:[Object(z.jsx)(k.i,{align:"center",justify:"center",w:"80%",direction:"row",margin:"auto",children:n.map((function(e,t){return Object(z.jsx)(me,{token:e},e.imageUri+e.rank)}))}),Object(z.jsxs)(C.b,{variant:"outline",isAttached:!0,spacing:"6",m:"10px",children:[Object(z.jsx)(C.a,{w:"100px",colorScheme:"blue",onClick:a,disabled:0===c,children:"Previous"}),Object(z.jsx)(C.a,{disabled:!0,children:c+1}),Object(z.jsx)(C.a,{w:"100px",colorScheme:"blue",onClick:i,disabled:r,children:"Next"})]}),Object(z.jsxs)(k.a,{w:"100px",children:[Object(z.jsx)(k.g,{children:"Page Size"}),Object(z.jsxs)(je.a,{onChange:function(e){return s(Number(e.target.value))},children:[Object(z.jsx)("option",{value:"25",children:"25"}),Object(z.jsx)("option",{value:"50",children:"50"}),Object(z.jsx)("option",{value:"100",children:"100"})]})]})]}):Object(z.jsxs)(k.a,{justify:"center",align:"center",width:"100%",my:"40px",children:[Object(z.jsx)(k.g,{fontSize:"xl",align:"center",children:Object(z.jsx)("b",{children:"Loading adventurers..."})}),Object(z.jsx)(ae.a,{size:"xl",color:"pink.400",thickness:"8px"})]})})},pe=function(e){var t=e.token,n=Object(H.b)(),r=le(),a=r.userAccount,i=r.claimToken,s=r.spendTokens,o=r.createAccount,l=Object(c.useState)(0),u=Object(ee.a)(l,2),b=u[0],d=u[1],j=Object(c.useState)(""),f=Object(ee.a)(j,2),m=f[0],h=f[1],x=Object(c.useCallback)((function(){var e=86400-new R.a(Date.now()/1e3).sub(t.mint.claimed).toNumber(),n=Math.floor(e/3600%24),c=Math.floor(e/60%60),r=Math.floor(e%60);return"".concat(n<10?"0"+n:n,":").concat(c<10?"0"+c:c,":").concat(r<10?"0"+r:r)}),[t]);return Object(c.useEffect)((function(){var e=setTimeout((function(){h(x())}),1e3);return function(){return clearTimeout(e)}})),Object(z.jsxs)(k.c,{maxW:"350px",direction:"column",alignItems:"center",justifyContent:"center",borderWidth:"2px",rounded:"lg",shadow:"lg",children:[Object(z.jsx)(_.a,{src:t.imageUri,rounded:"lg",maxW:"280px",maxH:"400px"}),Object(z.jsx)(k.g,{fontSize:"2xl",fontWeight:"bold",maxW:"280px",children:t.metadata.data.data.name}),Object(z.jsx)(k.b,{}),Object(z.jsxs)(k.h,{spacing:"8px",w:"100%",p:"15px",children:[Object(z.jsxs)(k.g,{fontSize:"lg",fontWeight:"bold",children:["Rank ",t.rank+1]}),Object(z.jsxs)(k.c,{direction:"row",w:"100%",children:[Object(z.jsx)(k.a,{children:Object(z.jsx)(k.g,{fontSize:"lg",fontWeight:"bold",children:"Points"})}),Object(z.jsx)(k.e,{}),Object(z.jsx)(k.a,{children:Object(z.jsx)(k.g,{fontSize:"md",fontWeight:"bold",children:t.mint.received.toNumber()/Math.pow(10,9)})})]}),Object(z.jsx)(k.a,{children:Object(z.jsx)(k.d,{href:t.solsteadsUrl,target:"_blank",children:"Check on Solsteads"})}),n.connected&&Object(z.jsx)(z.Fragment,{children:a?Object(z.jsxs)(z.Fragment,{children:[Object(z.jsxs)(k.c,{gap:"2px",children:[Object(z.jsx)(fe.a,{onChange:function(e){return d(Number(e.target.value))}}),Object(z.jsx)(C.a,{ml:"5px",colorScheme:"blue",disabled:"0"===a.amount.toString()||0===b,onClick:function(){return s(t,new R.a(b*Math.pow(10,9)))},children:"Give"})]}),t.owned&&Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(C.a,{colorScheme:"green",onClick:function(){return i(t)},disabled:new R.a(Date.now()/1e3).sub(t.mint.claimed).lt($),isFullWidth:!0,children:new R.a(Date.now()/1e3).sub(t.mint.claimed).lt($)?"Claimable in ".concat(m):"Claim"})})]}):Object(z.jsx)(k.c,{children:Object(z.jsx)(C.a,{colorScheme:"teal",onClick:o,isFullWidth:!0,children:"Initialize"})})})]})]})},Oe=function(){var e=le().collection,t=he(),n=t.mints,r=t.currentPage,a=t.isLastPage,i=t.previousPage,s=t.nextPage,o=t.setPageSize,l=Object(c.useMemo)((function(){return n.filter((function(e){return e.owned}))}),[n]);return console.log(n,l),Object(z.jsx)(k.c,{direction:"column",w:"100%",align:"center",p:"10px",children:e?Object(z.jsx)(k.a,{justify:"center",align:"center",w:"full",children:0===l.length?Object(z.jsxs)(k.a,{my:"20px",children:[Object(z.jsx)(k.g,{fontSize:"4xl",children:"You don't own any Solstead..."}),Object(z.jsx)(k.d,{fontSize:"2xl",href:"https://solsteads.com/marketplaces",target:"_blank",children:"Find one here"})]}):Object(z.jsxs)(k.a,{children:[Object(z.jsx)(k.i,{align:"center",justify:"center",w:"100%",direction:"row",margin:"auto",children:l.map((function(e,t){return Object(z.jsx)(pe,{token:e},e.imageUri+e.rank)}))}),Object(z.jsxs)(C.b,{variant:"outline",isAttached:!0,spacing:"6",m:"10px",children:[Object(z.jsx)(C.a,{w:"100px",colorScheme:"blue",onClick:i,disabled:0===r,children:"Previous"}),Object(z.jsx)(C.a,{disabled:!0,children:r+1}),Object(z.jsx)(C.a,{w:"100px",colorScheme:"blue",onClick:s,disabled:a,children:"Next"})]}),Object(z.jsxs)(k.a,{w:"100px",children:[Object(z.jsx)(k.g,{children:"Page Size"}),Object(z.jsxs)(je.a,{onChange:function(e){return o(Number(e.target.value))},children:[Object(z.jsx)("option",{value:"25",children:"25"}),Object(z.jsx)("option",{value:"50",children:"50"}),Object(z.jsx)("option",{value:"100",children:"100"})]})]})]})}):Object(z.jsxs)(k.a,{justify:"center",align:"center",width:"100%",my:"40px",children:[Object(z.jsx)(k.g,{fontSize:"xl",align:"center",children:Object(z.jsx)("b",{children:"Loading adventurers..."})}),Object(z.jsx)(ae.a,{size:"xl",color:"pink.400",thickness:"8px"})]})})},ge=function(e){var t=e.children,n=b.b.Devnet,r=Object(c.useMemo)((function(){return Object(v.clusterApiUrl)(n)}),[n]),a=Object(l.a)(),i=Object(c.useMemo)((function(){return[Object(m.a)(),Object(h.a)(),Object(x.a)(),Object(p.a)({options:{clientId:"Get a client ID @ https://developer.tor.us"}}),Object(O.a)(),Object(g.a)({network:n}),Object(y.a)({network:n})]}),[n]),s=Object(c.useCallback)((function(e){return a({title:"Error",description:e.message?"".concat(e.name,": ").concat(e.message):e.name,status:"error",duration:5e3,isClosable:!0})}),[a]);return Object(z.jsx)(u.a,{children:Object(z.jsx)(d.a,{endpoint:r,children:Object(z.jsx)(j.a,{wallets:i,onError:s,children:Object(z.jsx)(f.a,{children:Object(z.jsx)(oe,{children:t})})})})})};var ye=function(){return Object(z.jsx)(ge,{children:Object(z.jsxs)(s.a,{children:[Object(z.jsx)(de,{}),Object(z.jsxs)(o.c,{children:[Object(z.jsx)(o.a,{path:"/",element:Object(z.jsx)(xe,{})}),Object(z.jsx)(o.a,{path:"/mysteads",element:Object(z.jsx)(Oe,{})})]})]})})},ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,643)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};i.a.render(Object(z.jsx)(r.a.StrictMode,{children:Object(z.jsx)(ye,{})}),document.getElementById("root")),ve()}},[[619,1,2]]]);
//# sourceMappingURL=main.96129fc5.chunk.js.map