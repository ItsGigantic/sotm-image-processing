var A=Object.defineProperty,N=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var y=(l,e,n)=>e in l?A(l,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[e]=n,x=(l,e)=>{for(var n in e||(e={}))O.call(e,n)&&y(l,n,e[n]);if(w)for(var n of w(e))D.call(e,n)&&y(l,n,e[n]);return l},C=(l,e)=>N(l,L(e));import{U as g,r as I,h as b}from"./vendor.d8a0139f.js";const E=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}};E();async function G(l,e,n,i,t,a,s){const r=Math.floor((e-i)/2),c=Math.floor((n-t)/2),o=document.createElement("canvas");o.width=a,o.height=s;const m=await createImageBitmap(new ImageData(new Uint8ClampedArray(l),e,n),r,c,i,t,{resizeWidth:a,resizeHeight:s,resizeQuality:"high"}),p=o.getContext("bitmaprenderer");if(!p)throw new Error("Could not get bitmap renderer context");p.transferFromImageBitmap(m);const d=document.createElement("canvas");d.width=a,d.height=s;const u=d.getContext("2d");if(!u)throw new Error("Could not get 2d context");return u.drawImage(o,0,0),u.getImageData(0,0,a,s).data.buffer}async function $(l,e,n,i,t,a,s=0){const r=await Promise.all(l.map(async c=>{const o=g.decode(c);return await G(g.toRGBA8(o)[0],o.width,o.height,e,n,i,t)}));return g.encode(r,i,t,s,Array(l.length).fill(a))}const S=U(),P=document.querySelector("#app");I(P,b`
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
                <p class="help">Delay between frames, in milliseconds (minimum 11)</p>
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
            
            ${S()}
        </div>
    </section>
`);function U(){let l=!1,e;const n=document.createElement("div"),i=async()=>{l=!0,e=void 0,t();try{const{w:a,h:s,ow:r,oh:c,d:o,c:m}=Array.from(P.querySelectorAll("input")).reduce((f,h)=>C(x({},f),{[h.name]:h.value!==""?Number(h.value):void 0}),{});if(a===void 0||s===void 0||r===void 0||c===void 0||o===void 0)throw new Error("Missing inputs");const p=await window.showOpenFilePicker({multiple:!0,types:[{description:"PNG images",accept:{"image/png":[".png",".apng"]}}]}),d=await Promise.all(p.map(async f=>await(await f.getFile()).arrayBuffer())),u=await $(d,a,s,r,c,o,m),v=new Blob([u],{type:"image/apng"});e=URL.createObjectURL(v),t()}catch(a){console.error(a),alert(a.message)}finally{l=!1,t()}};function t(){return I(n,b`
            <div class="field">
                <div class="control">
                    <button class="button is-link" onclick=${i} ?disabled=${l}>${l?"Loading...":"Select files"}</button>
                </div>
            </div>
            ${e!==void 0?b`
                <img src=${e} alt="Generated APNG image" />
                <a class="button" href=${e} download="output.apng">Save</a>
            `:null}
        `)}return t}
