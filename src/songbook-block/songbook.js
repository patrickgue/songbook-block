const CHORD='chord';
const SECTION='section';

 function render(line) {
   if (line.type === CHORD) {
        let chordLine = "";
        let textLine = "";

        for (const part of line.chords) {
            chordLine += "<td><b>" + part.chord + "</b></td>";
            textLine += "<td>" + part.text + "</td>";
        }
        
        return "<div class=\"line\">"
            + "<table><tr>" + chordLine + "</tr><tr>" +  textLine + "</tr></table>"
            + "</div>";
    } else if (line.type === SECTION) {
        return "<h3>" + line.line + "</h3>";
    }
}

function tokenize(chords, text) {
    let index = 0;
    const indecies = [];
    let skip = false;

    if (chords.length == 0 || chords[0] === ' ') {
        indecies.push(0);
    }

    
    for (let i = 0; i < chords.length; i++) {
        if (skip === false && chords[i] !== ' ') {
            indecies.push(i);
            skip = true;
        } else if (skip === true && chords[i] === ' ') {
            skip = false;
        }
    }
    indecies.push(Math.max(chords.length, text.length));

    const outArr = [];
    for (let i = 0; i < indecies.length - 1; i++) {
        outArr.push({
            text  : text.substr(indecies[i], indecies[i + 1] - indecies[i]).replaceAll("|:", "𝄆").replaceAll(":|", "𝄇"),
            chord : chords.substr(indecies[i], indecies[i + 1] - indecies[i])
        });
    }
 
    return {
        type: CHORD,
        chords: outArr
    };
}

export function songbook(content) {
    const lines = content.split('\n');
    const outputLines = [];

    let chordLine = '';
    
    for (const line of lines) {
        if (line.startsWith(">> ")) {
            outputLines.push(tokenize(line.substr(2), ""));
        } else if (line.startsWith("## ")) {
            outputLines.push(tokenize("", line.substr(2)));
        } else if (line.startsWith("# ")) {
            chordLine = line.substr(2);
        } else if (line.startsWith("> ")) {
            outputLines.push(tokenize(chordLine, line.substr(2)));
        } else if (line.startsWith("[") && line.endsWith("]")) {
            outputLines.push({
                type: SECTION,
                line: line.substr(1, line.length - 2)
            });
        }
    }

    return outputLines.map(line => render(line)).join('\n');
}
