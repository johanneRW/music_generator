const tf = require('@tensorflow/tfjs-node');

function apply_temperature(prediction, temperature) {
    // Apply temperature
    prediction = prediction.log().div(temperature);
    let exp_preds = prediction.exp();
    prediction = exp_preds.div(exp_preds.sum());
    return prediction
}

async function prediction_to_notes(prediction, int_to_note) {
    let probs = await prediction.array();
    let index = tf.multinomial(probs, 1).dataSync()[0];
    let notes = int_to_note[index];
    return {notes: notes, index: index}
}

async function predict_melody(model, n_vocab, int_to_note, pattern, temperature, output_length) {
    let prediction_output = [];

    for (let note_index = 0; note_index < output_length; note_index++) {
        let prediction_input = tf.tensor(pattern, [1, pattern.length, 1]);
        prediction_input = prediction_input.div(n_vocab);

        let prediction = model.predict(prediction_input);
        prediction = await apply_temperature(prediction, temperature)
        let result = await prediction_to_notes(prediction, int_to_note)

        prediction_output.push(result.notes);
        pattern.push(result.index);
        pattern = pattern.slice(1);
    }

    return prediction_output;
}

async function generate_random_melody(model, network_input, pitchnames, n_vocab, temperature=1.0, sequence_length=50, output_length=50) {
    let start = Math.floor(Math.random() * (network_input.length - 1));
    let int_to_note = {};
    pitchnames.forEach((note, number) => int_to_note[number] = note);
    let pattern = network_input[start];
    let prediction_output = predict_melody(model, n_vocab, int_to_note, pattern, temperature, output_length)
    return prediction_output
}

async function generate_melody_from_input(model, user_input, pitchnames, n_vocab, temperature=1.0, output_length=50) {
    let int_to_note = {};
    pitchnames.forEach((note, number) => int_to_note[number] = note);
    let pattern = Array.from(user_input);
    let prediction_output = predict_melody(model, n_vocab, int_to_note, pattern, temperature, output_length)
    return prediction_output
}

