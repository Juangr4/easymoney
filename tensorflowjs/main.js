const MODEL_URL = 'https://tmpfiles.org/338722/model.json';

const model = tf.loadGraphModelSync(MODEL_URL);

const rgb2gray = (tensor) => {

    let [w, h, c] = tensor.shape;

    let rFactor = tf.scalar(0.2989);
    let gFactor = tf.scalar(0.5870);
    let bFactor = tf.scalar(0.1140);

    let r = tensor.slice([0, 0, 0], [w, h, 1])
    let g = tensor.slice([0, 0, 1], [w, h, 1])
    let b = tensor.slice([0, 0, 2], [w, h, 1])

    let gray = r.mul(rFactor).add(g.mul(gFactor)).add(b.mul(bFactor)).mul(1.0/255.0)

    return gray;

}

let imgs = document.querySelectorAll('.antibotlinks')
for (let img of imgs) {
    let data = img.querySelector('img');
    let imgTensor = rgb2gray(tf.browser.fromPixels(data));
    imgTensor = tf.image.resizeBilinear(imgTensor, [40, 40]);
    tf.browser.toPixels(imgTensor).then(res => {
        console.log(atob(res));
    });
}