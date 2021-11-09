function multiple(char, it) {
    let toReturn = "";
    for(let i = 0; i < it; i++) {
        toReturn += char;
    }
    return toReturn;
}

function toBrain(ascii) {
    return ascii.split("").map(v => {
        let c = v.charCodeAt(0)
        let r = multiple("+", Math.floor(c / 10));
        r += " [ > ++++++++++ < - ] > ";
        r += multiple("+", c % 10);
        r += " . >";

        return r;
    }).join("\n");
}

function fromBrain(input) {
    let cursor = [];
    let rn = 0;
    let startLoop;
    let s = input.split("");
    for(let i = 0; i < s.length; i++) {
        let e = s[i];

        switch(e) {
            case "+":
                cursor[rn] = cursor[rn] === undefined ? 1 : cursor[rn] + 1;
            break;
            case "-":
                cursor[rn] = cursor[rn] === undefined ? -1 : cursor[rn] - 1;
            break;
            case ".":
                cursor[rn] = String.fromCharCode(cursor[rn]);
            break;
            case ">":
                rn++;
            break;
            case "<":
                rn--;
            break;
            case "[":
                startLoop = i;
            break;
            case "]":
                if(startLoop !== undefined && cursor[rn]) {
                    i = startLoop;
                } else {
                    startLoop = undefined;
                }
            break;
        }
    }

    return cursor.filter(e => typeof e === "string").join("");
}