function unsure(code, data, string = false) {
    var words = code.toLowerCase().replace(/[^a-z]+/g, " ").trim().split(" ");
    var stacks = [[], []];
    var stack = 0;
    var buts = [];
    var out = [];
    if (string)
        data = data.split("").map(d => d.charCodeAt(0));
    data = data.reverse();
    for (let word, jump, i = 0; i < words.length; i++) {
        word = words[i];
        jump = function() {
            var b = 0;
            for (let w, j = i + 1; j < words.length; j++) {
                w = words[j];
                if (w == "but")
                    b++;
                if (w == "no")
                    if (!b--)
                        return j;
                return words.length;
            }
        };
        if (word.match(/^um+$/))
            stacks[stack].push(word.match(/m+/)[0].length);
        else if (word.match(/^er+$/))
            stacks[stack].push(stacks[stack].splice(-word.match(/r+/)[0].length).reduce((a, b) => a + b, 0));
        else if (word == "heh")
            stacks[stack].length && stacks[1 - stack].push(stacks[stack].pop());
        else if (word == "oops")
            stacks[stack].pop();
        else if (word.match(/^uh+$/))
            stacks[stack].push(...new Array(word.match(/h+/)[0].length + 1).fill(stacks[stack].pop() || 0));
        else if (word == "well")
            stacks[stack].push(stacks[stack].length);
        else if (word == "yeah")
            stacks[stack].push(-(stacks[stack].pop() || 0));
        else if (word.match(/^hm+$/))
            stacks[stack].push(...data.slice(-word.match(/m+/)[0].length).concat(new Array(word.match(/m+/)[0].length - data.splice(-word.match(/m+/)[0].length).length).fill(-1)).reverse());
        else if (word == "okay")
            stacks[stack].length && stacks[stack][stacks[stack].length - 1] >= 0 && out.push(stacks[stack].pop());
        else if (word == "then")
            stack = 1 - stack;
        else if (word == "but")
            stacks[stack][stacks[stack].length - 1] ? buts.push(i) : i = jump();
        else if (word == "wait")
            stacks[stack][stacks[stack].length - 1] && (i = buts[buts.length - 1] || -1);
        else if (word != "no")
            console.warn(word);
    }
    return string ? out.reduce((a, b) => a + String.fromCharCode(b), "") : out;
}
