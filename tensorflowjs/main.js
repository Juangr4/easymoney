
const reshape = (tensor) => {
    return tf.image.resizeBilinear(tensor, [40, 40]).reshape([1, 40, 40, 1]);
}

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

let img = document.getElementById('img');
let canvas = document.getElementById('board');

let joined_image = tf.browser.fromPixels(img);
let [h, w, channels] = joined_image.shape;
let size = Math.floor(w/3);
for(let i=0; i<3; i++) {
    let start = size*i;
    let cropped = rgb2gray(tf.slice(joined_image, [0, start], [h, size]))
}