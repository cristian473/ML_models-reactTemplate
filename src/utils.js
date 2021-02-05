import Resizer from 'react-image-file-resizer'

export const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
            resolve(uri);
        },
        'base64'
    );
});

export const drawThings = (detections, ctx) => {
    detections.forEach((prediction) => {
        const [x, y, height, width] = prediction.bbox
        const text = prediction.class === 'person' ? 'un crack' : prediction.class

        const color = 'green'
        ctx.strokeStyle = color
        ctx.font = '18px Arial'
        ctx.fillStyle = color


        ctx.beginPath();
        ctx.fillText(text, x, y)
        ctx.rect(x, y, width, height)
        ctx.stroke()
    })
}