function calculate() {
    var option = document.getElementById("option").value;
    var inputFields = document.getElementById("input-fields");
    var resultDiv = document.getElementById("result");
    inputFields.innerHTML = "";
    resultDiv.innerHTML = "";

    if (option == "1") {
        inputFields.innerHTML = `
            <label for="B">Digite o valor de B:</label>
            <input type="number" id="B" step="0.01"><br>
            <label for="A">Digite o valor de A:</label>
            <input type="number" id="A" step="0.01"><br>
            <button onclick="calculateN()">Calcular N</button>
        `;
    } else if (option == "2") {
        inputFields.innerHTML = `
            <label for="B">Digite o valor de B:</label>
            <input type="number" id="B" step="0.01"><br>
            <label for="N">Digite o valor de N:</label>
            <input type="number" id="N"><br>
            <button onclick="calculateA()">Calcular A</button>
        `;
    } else if (option == "3") {
        inputFields.innerHTML = `
            <label for="A">Digite o valor de A:</label>
            <input type="number" id="A" step="0.01"><br>
            <label for="N">Digite o valor de N:</label>
            <input type="number" id="N"><br>
            <button onclick="calculateB()">Calcular B</button>
        `;
    }
}

function calculateN() {
    var B = parseFloat(document.getElementById("B").value);
    var A = parseFloat(document.getElementById("A").value);
    var lower_bound = 1;
    var upper_bound = 1000;
    var N = bissection_method(function(x) { return erlang_b(A, x); }, B, lower_bound, upper_bound);
    document.getElementById("result").innerHTML = "O valor de N é: " + N;
}

function calculateA() {
    var B = parseFloat(document.getElementById("B").value);
    var N = parseInt(document.getElementById("N").value);
    var lower_bound = 0;
    var upper_bound = 1000;
    var A = bissection_method(function(x) { return erlang_b(x, N); }, B, lower_bound, upper_bound);
    document.getElementById("result").innerHTML = "O valor de A é: " + A;
}

function calculateB() {
    var A = parseFloat(document.getElementById("A").value);
    var N = parseInt(document.getElementById("N").value);
    var B = erlang_b(A, N);
    document.getElementById("result").innerHTML = "O valor de B é: " + B;
}

function erlang_b(A, N) {
    var numerator = Math.pow(A, N) / factorial(N);
    var denominator = 0;
    for (var k = 0; k <= N; k++) {
        denominator += Math.pow(A, k) / factorial(k);
    }
    return numerator / denominator;
}

function factorial(n) {
    if (n == 0) return 1;
    var result = 1;
    for (var i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function bissection_method(equation, target, lower_bound, upper_bound, max_iterations=1000, tolerance=1e-6) {
    for (var i = 0; i < max_iterations; i++) {
        var midpoint = (lower_bound + upper_bound) / 2;
        if (Math.abs(equation(midpoint) - target) < tolerance) {
            return midpoint;
        }
        if (equation(midpoint) < target) {
            lower_bound = midpoint;
        } else {
            upper_bound = midpoint;
        }
    }
    return null;
}
