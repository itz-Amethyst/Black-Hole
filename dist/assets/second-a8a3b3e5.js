import{G as T,S as R,P as _,O as G,W,B as j,C as P,a as u,b as B,A as O,c as k,d as q}from"./lil-gui.esm-614c9ea8.js";var E=`uniform float uSize;\r
uniform float uTime;

attribute float aScale;\r
attribute vec3 aRandomness;

varying vec3 vColor;

void main(){\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    
    float angle = atan(modelPosition.x , modelPosition.z);\r
    float distanceToCenter = length(modelPosition.xz);\r
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;\r
    angle += angleOffset;

    
    
    

    modelPosition.x = cos(angle) * distanceToCenter;\r
    modelPosition.z = sin(angle) * distanceToCenter;

    
    
    modelPosition.xyz += aRandomness;\r

    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectedPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectedPosition;

    gl_PointSize = uSize; 
    gl_PointSize *= ( 1.0 / - viewPosition.z );

    vColor = color;\r
}`,H=`varying vec3 vColor;

void main(){

    
    
    
    

    
    
    
    

    
    float strength = distance(gl_PointCoord , vec2(0.5));\r
    strength = 1.0 - strength;\r
    strength = pow(strength , 10.0);

    
    vec3 color = mix(vec3(0.0) , vColor , strength);\r
    gl_FragColor = vec4(color, 1.0);\r
}`;const s=new T,f=document.querySelector("canvas.webgl"),C=new R,n={};n.count=2e5;n.size=.005;n.radius=1.5;n.branches=4;n.spin=1;n.randomness=.424;n.randomnessPower=5.229;n.insideColor="#1546c1";n.outsideColor="#804794";let a=null,v=null,g=null;const i=()=>{g!==null&&(a.dispose(),v.dispose(),C.remove(g)),a=new j;const r=new Float32Array(n.count*3),c=new Float32Array(n.count*3),b=new Float32Array(n.count*1),h=new Float32Array(n.count*3),z=new P(n.insideColor),S=new P(n.outsideColor);for(let m=0;m<n.count;m++){const o=m*3,d=Math.random()*n.radius,p=m%n.branches/n.branches*Math.PI*2,A=Math.pow(Math.random(),n.randomnessPower)*(Math.random()<.5?1:-1)*n.randomness*d,F=Math.pow(Math.random(),n.randomnessPower)*(Math.random()<.5?1:-1)*n.randomness*d,y=Math.pow(Math.random(),n.randomnessPower)*(Math.random()<.5?1:-1)*n.randomness*d;r[o]=Math.cos(p)*d,r[o+1]=0,r[o+2]=Math.sin(p)*d,h[o+0]=A,h[o+1]=F,h[o+2]=y;const w=z.clone();w.lerp(S,d/n.radius),c[o]=w.r,c[o+1]=w.g,c[o+2]=w.b,b[m]=Math.random()}a.setAttribute("position",new u(r,3)),a.setAttribute("color",new u(c,3)),a.setAttribute("ascale",new u(c,1)),a.setAttribute("aRandomness",new u(h,3)),v=new B({vertexShader:E,fragmentShader:H,uniforms:{uSize:{value:10*l.getPixelRatio()},uTime:{value:0}},depthWrite:!1,blending:O,vertexColors:!0}),g=new k(a,v),C.add(g)};s.add(n,"count").min(100).max(1e6).step(100).onFinishChange(i);s.add(n,"radius").min(.01).max(20).step(.01).onFinishChange(i);s.add(n,"branches").min(2).max(20).step(1).onFinishChange(i);s.add(n,"randomness").min(0).max(2).step(.001).onFinishChange(i);s.add(n,"randomnessPower").min(1).max(10).step(.001).onFinishChange(i);s.addColor(n,"insideColor").onFinishChange(i);s.addColor(n,"outsideColor").onFinishChange(i);const e={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,t.aspect=e.width/e.height,t.updateProjectionMatrix(),l.setSize(e.width,e.height),l.setPixelRatio(Math.min(window.devicePixelRatio,2))});const t=new _(75,e.width/e.height,.1,100);t.position.x=1;t.position.y=1;t.position.z=.4;C.add(t);const x=new G(t,f);x.enableDamping=!0;const l=new W({canvas:f});l.setSize(e.width,e.height);l.setPixelRatio(Math.min(window.devicePixelRatio,2));i();const I=new q,M=()=>{const r=I.getElapsedTime();v.uniforms.uTime.value=r,x.update(),l.render(C,t),window.requestAnimationFrame(M)};M();
