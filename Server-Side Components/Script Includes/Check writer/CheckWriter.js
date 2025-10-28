var CheckWriter = Class.create();
CheckWriter.prototype = {
    initialize: function () {
        this.numberWords = {
            0: "zero",
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
            10: "ten",
            11: "eleven",
            12: "twelve",
            13: "thirteen",
            14: "fourteen",
            15: "fifteen",
            16: "sixteen",
            17: "seventeen",
            18: "eighteen",
            19: "nineteen",
            20: "twenty",
            30: "thirty",
            40: "forty",
            50: "fifty",
            60: "sixty",
            70: "seventy",
            80: "eighty",
            90: "ninety",
            100: "one hundred",
            1000: "one thousand",
            1000000: "one million",
            1000000000: "one billion",
            1000000000000: "one trillion",
            10000000000000: "one quadrillion"
        };
    },

    /**
     * Writes a check in English
     * @param {a number to write as check} number 
     * @returns English representation of the number as English words
     */
    write: function (number) {
        return this._numberToWords(number);
    },

    _numberToWords: function (num) {
        if (num < 0) return "minus " + this._numberToWords(-num);
        if (num < 20) return this.numberWords[num];
        if (num < 100)
            return (
                this.numberWords[Math.floor(num / 10) * 10] + (num % 10 ? "-" + this._numberToWords(num % 10) : "")
            );
        if (num < 1000)
            return (
                this.numberWords[Math.floor(num / 100)] + " hundred" + (num % 100 ? " and " + this._numberToWords(num % 100) : "")
            );
        if (num < 1000000)
            return (
                this._numberToWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 ? ", " + this._numberToWords(num % 1000) : "")
            );
        if (num < 1000000000)
            return (
                this._numberToWords(Math.floor(num / 1000000)) + " million" + (num % 1000000 ? ", " + this._numberToWords(num % 1000000) : "")
            );
        if (num < 1000000000000)
            return (
                this._numberToWords(Math.floor(num / 1000000000)) + " billion" + (num % 1000000000 ? ", " + this._numberToWords(num % 1000000000) : "")
            );
        if (num < 1000000000000000)
            return (
                this._numberToWords(Math.floor(num / 1000000000000)) + " trillion" + (num % 1000000000000 ? ", " + this._numberToWords(num % 1000000000000) : "")
            );
        if (num < 1000000000000000000)
            return (
                this._numberToWords(Math.floor(num / 1000000000000000)) + " quadrillion" + (num % 1000000000000000 ? ", " + this._numberToWords(num % 1000000000000000) : "")
            );
        return "number too large";
    },

    type: 'CheckWriter'
};