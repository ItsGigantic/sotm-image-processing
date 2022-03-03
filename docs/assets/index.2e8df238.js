var x=Object.defineProperty,C=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var g=(s,e,l)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):s[e]=l,b=(s,e)=>{for(var l in e||(e={}))A.call(e,l)&&g(s,l,e[l]);if(h)for(var l of h(e))I.call(e,l)&&g(s,l,e[l]);return s},y=(s,e)=>C(s,P(e));import{U as f,r as N,h as O}from"./vendor.d8a0139f.js";const D=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=l(t);fetch(t.href,a)}};D();async function G(s,e,l,n,t,a,i){const d=Math.floor((e-n)/2),p=Math.floor((l-t)/2),o=document.createElement("canvas");o.width=a,o.height=i;const u=await createImageBitmap(new ImageData(new Uint8ClampedArray(s),e,l),d,p,n,t,{resizeWidth:a,resizeHeight:i,resizeQuality:"high"}),c=o.getContext("bitmaprenderer");if(!c)throw new Error("Could not get bitmap renderer context");c.transferFromImageBitmap(u);const r=document.createElement("canvas");r.width=a,r.height=i;const m=r.getContext("2d");if(!m)throw new Error("Could not get 2d context");return m.drawImage(o,0,0),m.getImageData(0,0,a,i).data.buffer}async function L(s,e,l,n,t,a,i=0){const d=await Promise.all(s.map(async p=>{const o=f.decode(p);return await G(f.toRGBA8(o)[0],o.width,o.height,e,l,n,t)}));return f.encode(d,n,t,i,Array(s.length).fill(a))}const w={current:null},v=document.querySelector("#app");N(v,O`
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
                    <button class="button is-link" onclick=${async s=>{s.target.disabled=!0;try{const{w:e,h:l,ow:n,oh:t,d:a,c:i}=Array.from(v.querySelectorAll("input")).reduce((c,r)=>y(b({},c),{[r.name]:r.value!==""?Number(r.value):void 0}),{});if(e===void 0||l===void 0||n===void 0||t===void 0||a===void 0)throw new Error("Missing inputs");const d=await window.showOpenFilePicker({multiple:!0,types:[{description:"PNG images",accept:{"image/png":[".png",".apng"]}}]}),p=await Promise.all(d.map(async c=>await(await c.getFile()).arrayBuffer())),o=await L(p,e,l,n,t,a,i),u=new Blob([o],{type:"image/apng"});w.current.src=URL.createObjectURL(u)}catch(e){console.error(e),alert(e.message)}finally{s.target.disabled=!1}}}>Select files</button>
                </div>
            </div>
            
            <img ref=${w} alt="Generated APNG image" />
        </div>
    </section>
`);
