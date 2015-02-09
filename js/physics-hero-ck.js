Physics(function(e){function o(e){return e*window.innerWidth/600}function v(){var e,r,i,s=n+100,o=t/2,u=o;for(r=0,i=d.length;r<i;r++){e=d[r];if(e.state.pos.y>n){e.state.pos.y-=s;e.state.pos.x=u+o*(2*Math.random()-1);e.state.vel.zero()}}}function m(){u.view.alpha=0;a.view.alpha=0;f.view.alpha=0;(new TWEEN.Tween({alpha:0})).to({alpha:1},1e3).onUpdate(function(){u.view.alpha=this.alpha;a.view.alpha=this.alpha;f.view.alpha=this.alpha}).start()}var t=window.innerWidth,n=window.innerHeight/2,r=Physics.aabb(0,0,t,n);console.log(n);var i=Physics.renderer("pixi",{el:"physics",width:t,height:n,meta:!0});e.add(i);e.on("step",function(){e.render()});e.add(Physics.behavior("interactive",{el:i.container}));var s={darkGrey:"0x212121",white:"0xffffff",green:"0x8BC34A"},u=Physics.body("compound",{x:t/2+ -o(75),y:n/2-o(0),treatment:"static",styles:{fillStyle:s.white,lineWidth:1,strokeStyle:s.darkGrey,alpha:1e-4},children:[Physics.body("rectangle",{x:o(0),y:o(0),width:o(52),height:o(18)}),Physics.body("rectangle",{x:o(0),y:o(40),width:o(52),height:o(18)}),Physics.body("rectangle",{x:o(0),y:o(20),angle:-45*Math.PI/180,width:o(53),height:o(18)})]}),a=Physics.body("compound",{x:t/2+ -o(15),y:n/2-o(-2),treatment:"static",styles:{fillStyle:s.white,lineWidth:1,strokeStyle:s.darkGrey,alpha:1e-4},children:[Physics.body("rectangle",{x:o(0),y:o(2),angle:-67*Math.PI/180,width:o(56),height:o(18)}),Physics.body("rectangle",{x:o(23),y:o(5),angle:-120*Math.PI/180,width:o(48),height:o(18)})]}),f=Physics.body("compound",{x:t/2+o(40),y:n/2-o(0),treatment:"static",styles:{fillStyle:s.white,lineWidth:1,strokeStyle:s.darkGrey,alpha:1e-4},children:[Physics.body("rectangle",{x:o(0),y:o(38),width:o(52),height:o(18)}),Physics.body("rectangle",{x:o(-17),y:o(20),angle:-90*Math.PI/180,width:o(53),height:o(18)}),Physics.body("rectangle",{x:o(0),y:o(0),width:o(52),height:o(18)})]}),l=Physics.body("compound",{x:t/2+o(-30),y:n/2-o(0),treatment:"static",styles:{fillStyle:s.white,lineWidth:1,strokeStyle:s.darkGrey,alpha:1},children:[Physics.body("rectangle",{x:o(-17),y:o(20),angle:-90*Math.PI/180,width:o(53),height:o(18)}),Physics.body("rectangle",{x:o(17),y:o(20),angle:-90*Math.PI/180,width:o(53),height:o(18)}),Physics.body("rectangle",{x:o(0),y:o(20),width:o(52),height:o(18)})]}),c=Physics.body("compound",{x:t/2+o(15),y:n/2-o(0),treatment:"static",styles:{fillStyle:s.white,lineWidth:1,strokeStyle:s.darkGrey,alpha:1},children:[Physics.body("rectangle",{x:o(-17),y:o(-22),width:o(18),height:o(18)}),Physics.body("rectangle",{x:o(-17),y:o(0),width:o(18),height:o(32)})]}),h=Physics.body("compound",{x:t/2+o(45),y:n/2-o(0),treatment:"static",styles:{fillStyle:s.white,lineWidth:1,strokeStyle:s.darkGrey,alpha:1},children:[Physics.body("rectangle",{x:o(-17),y:o(0),width:o(18),height:o(35)}),Physics.body("circle",{x:o(-17),y:o(35),radius:o(9)})]}),p=150,d=[];while(p--)d.push(Physics.body("circle",{x:Math.random()*t,y:Math.random()*n,radius:o(4),mass:1,restitution:.5,styles:{strokeStyle:s.darkGrey,fillStyle:s.green,lineWidth:1}}));e.add(d);e.add([u,a,f]);e.on("step",v);e.one("render",function(){function e(e){e.alpha=1}u.view.children.forEach(e);a.view.children.forEach(e);f.view.children.forEach(e);u.view.alpha=0;a.view.alpha=0;f.view.alpha=0;setTimeout(m,3e3)});setTimeout(function(){var t=Physics.behavior("edge-collision-detection",{aabb:r,restitution:0,cof:.8});e.add(t);u.treatment=a.treatment=f.treatment="dynamic";e.wakeUpAll();e.off("step",v)},7e3);e.add([Physics.behavior("constant-acceleration"),Physics.behavior("body-impulse-response"),Physics.behavior("body-collision-detection"),Physics.behavior("sweep-prune")]);Physics.util.ticker.on(function(t){TWEEN.update();e.step(t)})});