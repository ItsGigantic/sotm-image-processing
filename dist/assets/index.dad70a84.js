var x=Object.defineProperty,C=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var b=(l,e,a)=>e in l?x(l,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[e]=a,g=(l,e)=>{for(var a in e||(e={}))A.call(e,a)&&b(l,a,e[a]);if(h)for(var a of h(e))I.call(e,a)&&b(l,a,e[a]);return l},y=(l,e)=>C(l,P(e));import{U as f,r as N,h as D}from"./vendor.d8a0139f.js";const O=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}};O();async function G(l,e,a,n,t,s,i){const c=Math.floor((e-n)/2),d=Math.floor((a-t)/2),r=document.createElement("canvas"),u=await createImageBitmap(new ImageData(new Uint8ClampedArray(l),e,a),c,d,n,t,{resizeWidth:s,resizeHeight:i,resizeQuality:"high"}),o=r.getContext("bitmaprenderer");if(!o)throw new Error("Could not get bitmap renderer context");o.transferFromImageBitmap(u);const m=document.createElement("canvas").getContext("2d");if(!m)throw new Error("Could not get 2d context");return m.drawImage(r,0,0),m.getImageData(0,0,s,i).data.buffer}async function L(l,e,a,n,t,s,i=0){const c=await Promise.all(l.map(async d=>{const r=f.decode(d);return await G(f.toRGBA8(r)[0],r.width,r.height,e,a,n,t)}));return f.encode(c,n,t,i,Array(l.length).fill(s))}const v={current:null},w=document.querySelector("#app");N(w,D`
    <style>
        @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
        
        input[type="number"] {
            max-width: 10rem;
        }
        
        .help {
            font-size: 1rem;
            max-width: 40rem;
        }
    </style>
    <section class="section">
        <div class="container">
            <h1 class="title is-1">
                Image processor
            </h1>
            <p class="subtitle">
                Create APNG images from a collection of PNG files.
            </p>
            
            <div class="field is-grouped" style="max-width: 25rem; flex-wrap: wrap;">
                <div class="control">
                    <label class="label">Width</label>
                    <input name="w" class="input" type="number" />
                </div>
                <div class="control">
                    <label class="label">Height</label>
                    <input name="h" class="input" type="number" />
                </div>
                <p class="help">Width and height to crop input images to</p>
            </div>

            <div class="field is-grouped" style="max-width: 25rem; flex-wrap: wrap;">
                <div class="control">
                    <label class="label">Output width</label>
                    <input name="ow" class="input" type="number" />
                </div>
                <div class="control">
                    <label class="label">Output height</label>
                    <input name="oh" class="input" type="number" />
                </div>
                <p class="help">Width and height to resize the output to</p>
            </div>
            
            <div class="field">
                <label class="label">Delay</label>
                <input name="d" class="input" type="number" />
                <p class="help">Delay between frames, in milliseconds</p>
            </div>
            
            <div class="field">
                <label class="label">Compression level</label>
                <input name="c" class="input" type="number" placeholder="0" />
                <p class="help">
                    Use 0 for lossless (default) or 256 for lossy, or a value
                    from 1-255 to use a custom compression level (smaller number = smaller
                    file, the number specifies how many colors are allowed in the image)
                </p>
            </div>
            
            <div class="field">
                <div class="control">
                    <button class="button is-link" onclick=${async l=>{l.target.disabled=!0;try{const{w:e,h:a,ow:n,oh:t,d:s,c:i}=Array.from(w.querySelectorAll("input")).reduce((o,p)=>y(g({},o),{[p.name]:p.value!==""?Number(p.value):void 0}),{});if(e===void 0||a===void 0||n===void 0||t===void 0||s===void 0)throw new Error("Missing inputs");const c=await window.showOpenFilePicker({multiple:!0,types:[{description:"PNG images",accept:{"image/png":[".png",".apng"]}}]}),d=await Promise.all(c.map(async o=>await(await o.getFile()).arrayBuffer())),r=await L(d,e,a,n,t,s,i),u=new Blob([r],{type:"image/apng"});v.current.src=URL.createObjectURL(u)}catch(e){console.error(e),alert(e.message)}finally{l.target.disabled=!1}}}>Select files</button>
                </div>
            </div>
            
            <img ref=${v} alt="Generated APNG image" />
        </div>
    </section>
`);
