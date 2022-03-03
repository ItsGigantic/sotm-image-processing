import UPNG from "upng-js";

async function resizeAndCrop(buf: ArrayBuffer, srcW: number, srcH: number, cropW: number, cropH: number, resizeW: number, resizeH: number): Promise<ArrayBuffer> {
    // coords of upper left/lower right corner of the crop
    const x1 = Math.floor((srcW - cropW) / 2);
    const y1 = Math.floor((srcH - cropH) / 2);

    const canvas = document.createElement("canvas");
    // Use an image bitmap, so we can more easily crop and resize and control the quality
    const bitmap = await createImageBitmap(
        new ImageData(new Uint8ClampedArray(buf), srcW, srcH),
        x1,
        y1,
        cropW,
        cropH,
        {
            resizeWidth: resizeW,
            resizeHeight: resizeH,
            resizeQuality: "high"
    });

    // It's annoying that we have to do this, but https://github.com/whatwg/html/issues/4785 hasn't been implemented yet
    const renderingContext = canvas.getContext("bitmaprenderer");
    if(!renderingContext) throw new Error("Could not get bitmap renderer context");
    renderingContext.transferFromImageBitmap(bitmap);

    const twoDCanvas = document.createElement("canvas");
    const ctx = twoDCanvas.getContext("2d");
    if(!ctx) throw new Error("Could not get 2d context");
    ctx.drawImage(canvas, 0, 0);
    const resID = ctx.getImageData(0, 0, resizeW, resizeH);
    return resID.data.buffer;
}

// function crop(buf: ArrayBuffer, srcW: number, srcH: number, w: number, h: number): ArrayBuffer {
//     // The buffer is just a flattened array of RGBA values, so it's easy to process manually
//     const res = new Uint32Array(w * h);
//     const view = new Uint32Array(buf);
//
//     // coords of upper left/lower right corner of the crop
//     const x1 = Math.floor((srcW - w) / 2);
//     const y1 = Math.floor((srcH - h) / 2);
//     // const x2 = x1 + w;
//     const y2 = y1 + h;
//
//     for(let
//             i = (y1 - 1) * srcW + x1,
//             res_i = 0
//         ; i <= (y2 - 1) * srcW + x1 + w; i += srcW) {
//         for(let pos = i; pos < i + w; pos++, res_i++) {
//             res[res_i] = view[pos];
//         }
//     }
//
//     return res.buffer;
// }

export default async function process(buffers: ArrayBuffer[], cropW: number, cropH: number, resizeW: number, resizeH: number, delay: number, compression: number = 0) {
    // Read all the images into arraybuffers
    const transformed = await Promise.all(buffers.map(async (image) => {
        const decoded = UPNG.decode(image);
        
        return await resizeAndCrop(
            UPNG.toRGBA8(decoded)[0],
            decoded.width,
            decoded.height,
            cropW,
            cropH,
            resizeW,
            resizeH
        );
    }));

    return UPNG.encode(transformed, resizeW, resizeH, compression, /*delay as any as number[]*/ Array(buffers.length).fill(delay));
}