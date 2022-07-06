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

const convertPrediction = (tensor) => {
    return tf.argMax(tensor, 1).dataSync()[0];
}


const MODEL_URL = 'https://raw.githubusercontent.com/Juangr4/easymoney/master/tfjs_model/model.json';

tf.loadGraphModel(MODEL_URL).then(model => {
    // All clickable buttons
    let predictions = []
    let buttons = []
    let imgs = document.querySelectorAll('.antibotlinks')
    if (imgs.length == 0) return;
    for (let img of imgs) {
        let data = img.querySelector('img');
        let imgTensor = rgb2gray(tf.browser.fromPixels(data));
        imgTensor = reshape(imgTensor);
        let prediction = model.predict(imgTensor);
        predictions.push(convertPrediction(prediction));
        buttons.push(img.children[0]);
    }
    console.log('Numbers detected');
    console.log(predictions);

    // The numbers order that must be clicked
    let order = [];
    let form = document.querySelector('form');
    let data = form.querySelector('img');
    let joined_image = tf.browser.fromPixels(data);
    let [h, w, channels] = joined_image.shape;
    let size = Math.floor(w/3);
    for(let i=0; i<3; i++) {
        let start = size*i;
        let cropped = reshape(rgb2gray(tf.slice(joined_image, [0, start], [h, size])));
        let prediction = model.predict(cropped);
        order.push(convertPrediction(prediction));
    }
    console.log('Order detected');
    console.log(order);

    // Logic for pressing the buttons

    let submitButton = form.querySelector('button');
});