"use client";
import {useEffect,useRef,useState} from "react";
export default function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}) {
 const ref=useRef<HTMLDivElement>(null); const [visible,setVisible]=useState(false);
 useEffect(()=>{const n=ref.current;if(!n)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);o.disconnect()}},{threshold:.12});o.observe(n);return()=>o.disconnect()},[]);
 return <div ref={ref} style={{transitionDelay:`${delay}ms`}} className={`reveal ${visible?"reveal-visible":""} ${className}`}>{children}</div>
}
