import './style.css'
import process from "./lib";
import {html, render} from "uhtml";

const imgRef: {
    current: HTMLImageElement | null;
} = {
    current: null
};

const app = document.querySelector<HTMLDivElement>('#app')!;
render(app, html`
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
                    <button class="button is-link" onclick=${async (e: any) => {
                        e.target.disabled = true;
                        
                        try {
                            // Get inputs
                            const { w, h, ow, oh, d, c } = Array.from(app.querySelectorAll<HTMLInputElement>('input'))
                                    .reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value !== "" ? Number(cur.value) : undefined }), {} as Record<string, number | undefined>);
                            
                            // Check if inputs undefined
                            if (w === undefined || h === undefined || ow === undefined || oh === undefined || d === undefined) {
                                throw new Error('Missing inputs');
                            }

                            const handles = await window.showOpenFilePicker({
                                multiple: true,
                                types: [{
                                    description: "PNG images",
                                    accept: {
                                        "image/png": [".png", ".apng"]
                                    }
                                }]
                            });

                            const buffers = await Promise.all(handles.map(async handle => await (await handle.getFile()).arrayBuffer()));

                            const res = await process(buffers, w, h, ow, oh, d, c);
                            
                            const blob = new Blob([res], { type: 'image/apng' });
                            imgRef.current!.src = URL.createObjectURL(blob);
                        } catch (e) {
                            console.error(e);
                            alert((e as Error).message);
                        } finally {
                            e.target.disabled = false;
                        }
                    }}>Select files</button>
                </div>
            </div>
            
            <img ref=${imgRef} alt="Generated APNG image" />
        </div>
    </section>
`);

// async function run(/*progressCallback: (progress: number, total: number) => void*/) {
//
//     // TODO
//     // const res = await process(buffers);
// }