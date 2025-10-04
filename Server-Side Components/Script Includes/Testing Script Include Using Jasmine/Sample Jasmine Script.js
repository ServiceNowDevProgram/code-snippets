(function (outputs, steps, stepResult, assertEqual) {

    describe("Test Sample Calculator", function () {

        it("Expect valid numbers returns a result", function () {

            var calc = new VF_Calculator();
            var result = calc.divide(4, 2);

            expect(result).toEqual(2);
        });


        // e.g. throw new Error("Both numbers should be valid.");
        it("Expect error if any of the number is null", function () {

            var calc = new VF_Calculator();

            expect(function () {
                calc.divide(1, null);
            }).toThrowError("Both numbers should be valid.");

        });

        it("Expect error if both of the number are null", function () {

            var calc = new VF_Calculator();

            expect(function () {
                calc.divide(null, null);
            }).toThrowError("Both numbers should be valid.");

        });

        it("Divide by zero should throw exception", function () {

            var calc = new VF_Calculator();

            expect(function () {
                calc.divide(5, 0);
            }).toThrowError("Divide by zero is not permitted.");

        });

    });

})(outputs, steps, stepResult, assertEqual);
// uncomment the next line to execute this script as a jasmine test

jasmine.getEnv().execute();