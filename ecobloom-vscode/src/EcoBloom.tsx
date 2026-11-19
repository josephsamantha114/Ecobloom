
import * as React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface Props {style?:React.CSSProperties;title?:string;bottle?:string;planter?:string;materials?:string;forest?:string}
const clamp=(v:number)=>Math.max(0,Math.min(1,v))
const ramp=(p:number,a:number,b:number)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t)}
const windowAt=(p:number,a:number,b:number,c:number,d:number)=>ramp(p,a,b)*(1-ramp(p,c,d))
const blend=(a:number[],b:number[],t:number)=>"rgb("+a.map((n,i)=>Math.round(n+(b[i]-n)*t)).join(",")+")"
/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function EcoBloom(props:Props){
 const root=React.useRef<HTMLDivElement>(null)
 const stage=React.useRef<HTMLDivElement>(null)
 const [progress,setP]=React.useState(.065)
 const p=progress
 const [reduced,setReduced]=React.useState(false)
 const [choice,setChoice]=React.useState(0)
 const [ideas,setIdeas]=React.useState(false)
 const canvas=false
 React.useEffect(()=>{
  if(canvas)return
  const mq=window.matchMedia("(prefers-reduced-motion: reduce)")
  let frame=0
  const update=()=>{frame=0;const el=root.current;if(!el||mq.matches)return;const r=el.getBoundingClientRect();setP(clamp(-r.top/Math.max(1,r.height-window.innerHeight)))}
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
  const preference=()=>{setReduced(mq.matches);if(mq.matches)setP(.09);else update()}
  preference();mq.addEventListener("change",preference)
  window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll)
  return()=>{cancelAnimationFrame(frame);mq.removeEventListener("change",preference);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll)}
 },[canvas])
 const go=(v:number)=>{
  if(reduced||canvas){setP(v);return}
  const el=root.current;if(!el)return
  window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+v*(el.offsetHeight-window.innerHeight),behavior:"auto"})
 }
  const tips=[
 ["Plastic bottle","A little room to grow.","Rinse a bottle, cut the lower third, and smooth the edge. Add drainage holes, a layer of pebbles, soil, and a small plant. Keep away from heat."],
 ["Tin can","From pantry to windowsill.","Wash the can and cover any sharp edges. Make drainage holes in the base, add soil, and plant basil. Set it on a saucer in a sunny spot."],
 ["Fabric scraps","Carry a different story.","Join clean fabric scraps into two panels. Stitch the sides and bottom, hem the opening, and add sturdy handles. Reinforce every handle seam."],
 ["Glass jar","Keep the good things.","Wash and thoroughly dry an intact jar. Use it to store dry grains, buttons, or pencils. Label it and keep it somewhere you’ll see and reuse it."]
 ]

 const move=ramp(p,.12,.32),grow=ramp(p,.29,.51),leave=ramp(p,.52,.64)
 const possibility=windowAt(p,.51,.61,.67,.75)
 const circle=windowAt(p,.65,.72,.77,.84)
 const role=windowAt(p,.77,.82,.88,.94)
 const ending=ramp(p,.87,.96)
 const bg=blend([13,31,24],[8,127,91],ramp(p,.12,.34)*(1-ramp(p,.76,.96)))
 const image=(src:string|undefined,alt:string,style:React.CSSProperties={})=><img src={src} alt={alt} draggable={false} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",...style}}/>
 const words=(text:string,a:number,b:number)=>text.split(" ").map((word,i,all)=><span key={i} style={{display:"inline-block",marginRight:".2em",opacity:reduced?1:ramp(p,a+(b-a)*i/all.length,a+(b-a)*(i+1)/all.length),transform:reduced?"none":"translateY("+(1-ramp(p,a+(b-a)*i/all.length,a+(b-a)*(i+1)/all.length))*18+"px)"}}>{word}</span>)
 const panel=(opacity:number,children:React.ReactNode,extra:React.CSSProperties={})=><div aria-hidden={opacity<.1} style={{position:"absolute",inset:0,opacity,pointerEvents:opacity>.5?"auto":"none",visibility:opacity===0?"hidden":"visible",...extra}}>{children}</div>
 return <div ref={root} className={"bloom-master "+(reduced?"quiet":"")} style={{...props.style,width:"100%",height:canvas||reduced?"100vh":"1400vh",position:"relative",background:"#183D2D",color:"#FFF9ED",fontFamily:"Arial,sans-serif"}}>
 <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
 .bloom-master *{box-sizing:border-box}.bloom-master h1,.bloom-master h2,.bloom-master h3,.bloom-master p{margin:0}
 .bloom-master h1,.bloom-master h2,.bloom-master h3,.bloom-master .serif{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;letter-spacing:-.045em;line-height:.94}
 .bloom-master button{font:inherit;cursor:pointer;color:inherit}.bloom-master button:focus-visible{outline:2px solid #FFC857;outline-offset:5px}
 .bloom-master .masthead{position:absolute;inset:30px 5% auto;display:flex;justify-content:space-between;align-items:center;z-index:20}
 .bloom-master .brand{font-size:34px}.bloom-master .eyebrow{font-size:9px;letter-spacing:.2em;text-transform:uppercase;line-height:1.7}
 .bloom-master .copy{position:absolute;left:7%;top:30%;width:58%;font-size:clamp(66px,8.5vw,145px)}
 .bloom-master .copy em{color:#C5F277;font-weight:400}
 .bloom-master .sub{position:absolute;left:7%;bottom:19%;font-size:12px;line-height:1.8;max-width:260px}
 .bloom-master .photo-frame{position:absolute;overflow:hidden;will-change:transform,clip-path,opacity}
 .bloom-master .credit{position:absolute;bottom:34px;left:5%;right:5%;display:flex;justify-content:space-between;gap:25px;align-items:end;z-index:20}
 .bloom-master .credit button{border:0;background:transparent;padding:10px 0;border-bottom:1px solid #C5F277;font-size:10px}
 .bloom-master .nav{display:flex;gap:7px}.bloom-master .nav button{width:24px;height:32px;padding:8px 0;border:0;background:none}.bloom-master .nav i{display:block;height:2px;background:currentColor}
 .bloom-master .chooser{position:absolute;left:7%;right:7%;bottom:19%;display:grid;grid-template-columns:1fr 1fr;gap:8%}
 .bloom-master .choices{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
 .bloom-master .choices button{padding:11px 17px;border:1px solid #C5F277;border-radius:30px;background:transparent;font-size:11px}
 .bloom-master .tip{border-top:1px solid #C5F277;padding-top:18px}.bloom-master .tip h3{font-size:38px;margin-bottom:12px}.bloom-master .tip p{font-size:12px;line-height:1.7}
 .bloom-master .textbutton{border:0;border-bottom:1px solid currentColor;background:none;padding:8px 0;font-size:11px}
 .bloom-master .ring{position:absolute;width:360px;height:360px;right:15%;top:28%}
 .bloom-master .ring-label{position:absolute;font-family:'Cormorant Garamond',Georgia,serif;font-size:27px;transform:translate(-50%,-50%)}
 .bloom-master .final{position:absolute;left:7%;right:7%;top:29%;text-align:center;font-size:clamp(65px,9vw,145px)}
 .bloom-master .pill{border:0;border-radius:40px;padding:17px 27px;color:#183D2D;background:#C5F277;font-size:11px}
 .bloom-master.quiet{min-height:900px}.bloom-master.quiet .pinned-stage{height:100%!important;min-height:900px;position:relative!important}
 @media(max-width:700px){
 .bloom-master .masthead{inset:24px 6% auto}.bloom-master .brand{font-size:29px}.bloom-master .masthead .eyebrow{font-size:7px;max-width:120px;text-align:right}
 .bloom-master .copy{left:7%;top:23%;width:87%;font-size:clamp(52px,14vw,82px)}
 .bloom-master .sub{bottom:17%;font-size:11px;max-width:220px}
 .bloom-master .credit{bottom:25px;left:6%;right:6%;display:grid;grid-template-columns:1fr 1fr;gap:10px}.bloom-master .credit .eyebrow{font-size:7px}.bloom-master .credit .nav{justify-content:flex-end}
 .bloom-master .chooser{bottom:18%;grid-template-columns:1fr;gap:12px}.bloom-master .choices{gap:6px;margin:10px 0}.bloom-master .choices button{font-size:9px;padding:9px 11px}
 .bloom-master .tip{padding-top:10px}.bloom-master .tip h3{font-size:28px;margin-bottom:8px}.bloom-master .tip p{font-size:10px}
 .bloom-master .role-copy{top:18%!important;font-size:49px!important}
 .bloom-master .transformation-title{top:19%!important;width:90%!important;font-size:49px!important;z-index:2}
 .bloom-master .evolving-object{top:44%!important;height:39%!important;left:28%!important;width:65%!important}
 .bloom-master .transformation-title+ .sub{bottom:14%;max-width:180px}
 .bloom-master .ring{width:250px;height:250px;right:calc(50% - 125px);top:43%}
 .bloom-master .final{top:28%;font-size:65px}.bloom-master .ring-label{font-size:23px}
 .bloom-master .material-label{font-size:9px!important}
 }
 `}</style>
 <div ref={stage} className="pinned-stage" style={{position:"sticky",top:0,height:"100vh",overflow:"hidden",background:bg,isolation:"isolate"}}>
 <div style={{position:"absolute",inset:0,opacity:1-ramp(p,.18,.4)}}>{image(props.bottle,"A discarded bottle in a dark forest",{objectPosition:"65% center",opacity:.18+.65*ramp(p,0,.09),transform:"translateX("+(-move*12)+"%) scale("+(1+move*.1)+")"})}</div>
 <div style={{position:"absolute",inset:0,background:"#087F5B",opacity:ramp(p,.13,.35)*.48*(1-ending)}}/>
 <div className="photo-frame evolving-object" style={{left:(60-20*move+32*leave)+"%",top:(25-9*move+10*leave)+"%",width:(36+12*move)+"%",height:(65+12*move)+"%",opacity:ramp(p,.16,.29)*(1-leave),transform:"rotate("+(-8+8*move-8*leave)+"deg)",borderRadius:(180*grow)+"px "+(180*grow)+"px 4px 4px",clipPath:"inset(0 0 0 0)"}}>
 {image(props.bottle,"The original bottle",{position:"absolute",inset:0,objectPosition:"75% center",opacity:1-ramp(p,.4,.52)})}
 <div style={{position:"absolute",inset:0,opacity:ramp(p,.3,.49),clipPath:"inset("+(100*(1-grow))+"% 0 0 0)",transform:"translateY("+(1-grow)*35+"px)"}}>{image(props.planter,"The bottle gradually becomes a living planter",{objectPosition:"50% center"})}</div>
 </div>
 <div style={{position:"absolute",inset:0,opacity:ending*.75}}>{image(props.forest,"A thriving forest",{transform:"translateY("+((1-ending)*30)+"px)",filter:"brightness(.43)"})}</div>
 <header className="masthead"><span className="brand serif">{props.title||"EcoBloom"}</span><span className="eyebrow">The second life of things<br/>An unfolding story</span></header>
 
 {panel(1-ramp(p,.14,.23),<><h1 className="copy">{words("Every object",.005,.045)}<br/>{words("has a",.035,.075)}<em>{words("story.",.065,.095)}</em></h1><p className="sub">Nothing ends.<br/>Everything becomes.</p></>)}
 {panel(windowAt(p,.14,.21,.29,.37),<><h2 className="copy" style={{transform:"translateX("+(-ramp(p,.2,.36)*4)+"%)"}}>{words("What if this",.15,.21)}<br/><em>{words("wasn’t the end?",.2,.27)}</em></h2><p className="sub">Not worthless.<br/>Just waiting to be seen differently.</p></>)}
 {panel(windowAt(p,.29,.35,.52,.59),<><h2 className="copy transformation-title" style={{width:"34%",top:"25%",fontSize:"clamp(45px,5.5vw,88px)"}}><span style={{opacity:1-ramp(p,.39,.44)}}>One object.</span><br/><span style={{opacity:windowAt(p,.35,.41,.46,.53)}}>Another purpose.</span><br/><em style={{opacity:ramp(p,.41,.5)}}>A second life.</em></h2><p className="sub" style={{color:"#C5F277"}}>Same material. A different future.<br/>Keep scrolling to watch it grow.</p></>)}
 {panel(possibility,<><div className="photo-frame" style={{left:(22-10*ramp(p,.54,.7))+"%",top:"24%",width:"80%",height:"60%",transform:"translateY("+((1-ramp(p,.52,.66))*90)+"px) rotate("+(-3+5*ramp(p,.55,.7))+"deg)",clipPath:"inset(0 "+(35*(1-ramp(p,.52,.65)))+"% 0 0)"}}>{image(props.materials,"A tin can, fabric scraps, and a glass jar given new purposes",{objectFit:"contain",objectPosition:"center"})}</div><h2 className="copy" style={{top:"18%",fontSize:"clamp(48px,6.6vw,100px)",width:"85%"}}>Waste is not<br/><em>the end of the story.</em></h2><div className="material-label" style={{position:"absolute",bottom:"16%",left:"10%",right:"10%",display:"flex",justifyContent:"space-between",gap:20,fontSize:11,color:"#C5F277"}}>{["Tin can → Herb garden","Scraps → Daily companion","Jar → Keeper of things"].map((t,i)=><span key={t} style={{opacity:ramp(p,.55+i*.035,.6+i*.035)}}>{t}</span>)}</div></>)}
 {panel(circle,<><h2 className="copy" style={{fontSize:"clamp(48px,6vw,90px)",width:"60%",top:"22%"}}>Less of a line.<br/><em>More of a circle.</em></h2><div className="ring"><svg viewBox="0 0 360 360" style={{width:"100%",height:"100%"}}><circle cx="180" cy="180" r="145" fill="none" stroke="#C5F277" strokeWidth="1" strokeDasharray="912" strokeDashoffset={912*(1-ramp(p,.65,.79))} transform="rotate(-90 180 180)"/></svg>{["Use","Reuse","Repair","Recycle"].map((t,i)=><span className="ring-label" key={t} style={{left:["50%","91%","50%","9%"][i],top:["9%","50%","91%","50%"][i],color:i===2?"#FF725E":"#C5F277",opacity:ramp(p,.66+i*.028,.7+i*.028)}}>{t}</span>)}</div><p className="sub">Use thoughtfully. Reuse creatively.<br/>Repair with care. Recycle responsibly.</p></>)}
 {panel(role,<><h2 className="copy role-copy" style={{top:"17%",fontSize:"clamp(48px,6.2vw,92px)",width:"90%"}}>The next chapter<br/><em>belongs to you.</em></h2><div className="chooser"><div><p style={{fontSize:12,lineHeight:1.6}}>Start with what’s already in your hands.</p><div className="choices">{tips.map((t,i)=><button key={t[0]} aria-pressed={choice===i} onClick={()=>setChoice(i)} style={{background:choice===i?"#C5F277":"transparent",color:choice===i?"#183D2D":"#FFF9ED"}}>{t[0]}</button>)}</div><button className="textbutton" aria-expanded={ideas} onClick={()=>setIdeas(!ideas)}>{ideas?"Close field notes":"Explore upcycling ideas"}</button>{ideas&&<p style={{fontSize:11,lineHeight:1.6,marginTop:8}}>Gather your materials. Work carefully. Start small, and share the idea with someone nearby.</p>}</div><div className="tip" aria-live="polite"><h3>{tips[choice][1]}</h3><p>{tips[choice][2]}</p></div></div></>)}
 {panel(ramp(p,.88,.96),<><h2 className="final">{words("Small Actions.",.88,.94)}<br/><em style={{color:"#C5F277"}}>{words("Big Impact.",.93,.985)}</em></h2><div style={{position:"absolute",bottom:"22%",left:0,right:0,textAlign:"center"}}><button className="pill" onClick={()=>go(.845)}>Begin Your Journey</button></div></>)}
 <footer className="credit"><span className="eyebrow">{p<.88?"Scroll to unfold the story":"For a world that wastes less"}<br/><span style={{color:"#C5F277"}}>SDG 12 · Responsible consumption</span></span><nav className="nav" aria-label="Story timeline">{[.09,.24,.46,.62,.75,.845,.995].map((v,i)=><button key={v} aria-label={["The object","The question","The transformation","The possibilities","The circular journey","Your role","Final message"][i]} onClick={()=>go(v)} style={{color:p>=v-.06&&p<=v+.06?"#C5F277":"#FFF9ED",opacity:p>=v-.06&&p<=v+.06?1:.4}}><i/></button>)}</nav><button onClick={()=>go(0)}>Back to the beginning</button></footer>
 <div style={{position:"absolute",bottom:0,left:0,height:2,width:(p*100)+"%",background:"#FFC857"}} aria-hidden="true"/>
 </div>
 </div>
}

EcoBloom.defaultProps = {
 title: "EcoBloom",
 bottle: "https://framerusercontent.com/assets/wsFQiVgL13zn11S7C0Fnxukrc.png",
 planter: "https://framerusercontent.com/assets/y748SFtmZQEVn2BKGHhhE4FEUU.png",
 materials: "https://framerusercontent.com/assets/bdkgz0WVLQme0aImE0FjUkwHn44.png",
 forest: "https://framerusercontent.com/assets/XWtce8EF7vko2btBGUhCkxHn7k.png",
}
