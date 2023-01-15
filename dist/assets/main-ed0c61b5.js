import{G as R,S as T,P as _,O,W as G,B as W,C as P,a as u,b as j,A as B,c as k,d as q}from"./lil-gui.esm-614c9ea8.js";var E=`uniform float uSize;\r
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

    
    
    

    modelPosition.x = cos(angle) * angleOffset;\r
    modelPosition.z = sin(angle) * angleOffset;

    
    
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
}`;const a=new R,C=document.querySelector("canvas.webgl"),f=new T,n={};n.count=2e5;n.size=.005;n.radius=6;n.branches=7;n.spin=1;n.randomness=.473;n.randomnessPower=5.34;n.insideColor="#3a691b";n.outsideColor="#7d259d";let i=null,v=null,g=null;const t=()=>{g!==null&&(i.dispose(),v.dispose(),f.remove(g)),i=new W;const s=new Float32Array(n.count*3),c=new Float32Array(n.count*3),b=new Float32Array(n.count*1),M=new Float32Array(n.count*3),z=new P(n.insideColor),S=new P(n.outsideColor);for(let m=0;m<n.count;m++){const r=m*3,d=Math.random()*n.radius,p=m%n.branches/n.branches*Math.PI*2,A=Math.pow(Math.random(),n.randomnessPower)*(Math.random()<.5?1:-1)*n.randomness*d,F=Math.pow(Math.random(),n.randomnessPower)*(Math.random()<.5?1:-1)*n.randomness*d,y=Math.pow(Math.random(),n.randomnessPower)*(Math.random()<.5?1:-1)*n.randomness*d;s[r]=Math.cos(p)*d+A,s[r+1]=F,s[r+2]=Math.sin(p)*d+y;const w=z.clone();w.lerp(S,d/n.radius),c[r]=w.r,c[r+1]=w.g,c[r+2]=w.b,b[m]=Math.random()}i.setAttribute("position",new u(s,3)),i.setAttribute("color",new u(c,3)),i.setAttribute("ascale",new u(c,1)),i.setAttribute("aRandomness",new u(M,3)),v=new j({vertexShader:E,fragmentShader:H,uniforms:{uSize:{value:10*l.getPixelRatio()},uTime:{value:0}},depthWrite:!1,blending:B,vertexColors:!0}),g=new k(i,v),f.add(g)};a.add(n,"count").min(100).max(1e6).step(100).onFinishChange(t);a.add(n,"radius").min(.01).max(20).step(.01).onFinishChange(t);a.add(n,"branches").min(2).max(20).step(1).onFinishChange(t);a.add(n,"randomness").min(0).max(2).step(.001).onFinishChange(t);a.add(n,"randomnessPower").min(1).max(10).step(.001).onFinishChange(t);a.addColor(n,"insideColor").onFinishChange(t);a.addColor(n,"outsideColor").onFinishChange(t);const e={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,o.aspect=e.width/e.height,o.updateProjectionMatrix(),l.setSize(e.width,e.height),l.setPixelRatio(Math.min(window.devicePixelRatio,2))});const o=new _(55,e.width/e.height,.1,100);o.position.x=1;o.position.y=1;o.position.z=.4;f.add(o);const h=new O(o,C);h.enableDamping=!0;h.enablePan=!1;h.enableZoom=!1;h.enableRotate=!1;const l=new G({canvas:C});l.setSize(e.width,e.height);l.setPixelRatio(Math.min(window.devicePixelRatio,2));t();const I=new q,x=()=>{const s=I.getElapsedTime();v.uniforms.uTime.value=s,h.update(),l.render(f,o),window.requestAnimationFrame(x)};x();
