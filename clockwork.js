function numberWords(num, words) {
    if (num === 20) {
        return "twenty";
    }
    else if (num === 15) {
        return "quarter";
    }

    return words[num];
}

function highlights(theWords, theBoard) {
    const result = [];
    const remaining = theWords.slice(0);
    let nextWord = remaining.shift();

    theBoard.forEach((row) => {
        const newRow = [];

        row.forEach((word) => {
            if (word === nextWord) {
                newRow.push(`*${word}`);
                nextWord = remaining.shift();
            }
            else {
                newRow.push(word);
            }
        });

        result.push(newRow);
    });

    return result;
}

function isHighlighted(word) {
    return word.slice(0, 1) === '*';
}

function getText(word) {
    if (isHighlighted(word)) {
        return word.slice(1);
    }
    else {
        return word;
    }
}

function formatTime(dateTime) {
    return `${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`;
}

function pad(num) {
    return `0${num}`.slice(-2);
}

function minuteWords(minutes, numberText) {
    if (minutes === "20") {
        return ["twenty", "minutes"];
    }
    else if (minutes === 15) {
        return ["quarter"];
    }
    else if (minutes === 25) {
        return ["twenty", "five", "minutes"];
    }
    else if (minutes === 30) {
        return ["half"];
    }
    else {
        return [numberWords(minutes, numberText), "minutes"];
    }
}

function timeWords(timestring, numberText, prefixes, suffix) {
    const parts = parseTime(timestring);
    let hour = parts[0] % 12;
    let minute = roundMinutes(parts[1]);

    const singular = 0;
    const plural = prefixes.length === 1 ? 0 : 1;

    if (minute === 0) {
        const results = prefixes[plural]
            .concat(numberWords(hour, numberText));

        if (suffix) {
            return results.concat(suffix);
        }
        else {
            return results;
        }
    }
    else {
        let direction = "past";

        if (minute > 30) {
            direction = "to";
            ++hour;
            minute = 60 - minute;
        }

        return prefixes[plural]
            .concat(minuteWords(minute, numberText))
            .concat([direction, numberWords(hour, numberText)]);
    }
}

function parseTime(timestr) {
    return timestr
        .split(':')
        .map((numstr) => {
            return Number(numstr);
        });
}

function roundMinutes(minutes) {
    return minutes - (minutes % 5);
}

function GetClockwork(language) {
    let theBoard = [
        ["it", "is", "half", "ten"],
        ["quarter", "twenty"],
        ["five", "minutes", "to"],
        ["past", "one", "three"],
        ["two", "four", "five"],
        ["six", "seven", "eight"],
        ["nine", "ten", "eleven"],
        ["twelve", "o'clock"]
    ];

    let numberText = [
            "twelve",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven"
    ];

    let prefixes = [
        ["it", "is"]
    ];
    let suffix = ["o'clock"];

    if (language === "es") {
        numberText = [
            "doce",
            "uno",
            "dos",
            "tres",
            "cuatro",
            "cinco",
            "seis",
            "siete",
            "ocho",
            "nueve",
            "diez",
            "once"
        ];

        theBoard = [
            ["es", "son", "la", "las", "uno"],
            ["dos", "tres", "cuatro"],
            ["cinco", "seis", "siete"],
            ["ocho", "nueve", "diez"],
            ["once", "doce", "y", "menos"],
            ["cuarto", "media"],
            ["cinco", "diez", "veinte"],
            ["veinticinco"]
        ];

        prefixes = [
            ["es", "la"],
            ["son", "las"]
        ];
        suffix = null;
    }

    return {
        timeWords: (timestr) => {
            return timeWords(timestr, numberText, prefixes, suffix);
        },
        highlights: (timestr) => {
            return highlights(timestr, theBoard);
        },
        isHighlighted,
        getText,
        formatTime
    };
}

if (typeof exports === 'object') {
    module.exports = {
        GetClockwork
    };
}
