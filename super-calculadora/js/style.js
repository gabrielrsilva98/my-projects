function start() {
  var a = document.getElementById("a");
  var b = document.getElementById("b");

  a.oninput = function () {
    exibir(a.value, b.value);
  };
  b.oninput = function () {
    exibir(a.value, b.value);
  };
}

function calcularFatorial(n) {
  let fatorial = 1;
  if (n <= 21) {
    for (let i = 1; i <= n; i++) {
      fatorial = fatorial * i;
    }
  } else {
    fatorial = "Número muito grande";
  }
  return fatorial;
}

function calcularDivisores(n) {
  let divisores = [];
  for (let i = 1; i <= n; i++) {
    if (n % i == 0) {
      divisores.push(i);
    }
  }
  return divisores.join(", ") + " (" + divisores.length + ")";
}

function validateNumber(n) {
  var total = n;
  if (!Number.isInteger(n)) {
    total = total.toFixed(1);
  }
  return total;
}

function exibir(a, b) {
  if (a && b) {
    var somaAB = validateNumber(a * 1 + b * 1);
    var subAB = validateNumber(a - b);
    var subBA = validateNumber(b - a);
    var multAB = validateNumber(a * b);
    var divAB = validateNumber(a / b);
    var divBA = validateNumber(b / a);
    var quadradoA = validateNumber(a * a);
    var quadradoB = validateNumber(b * b);
    var fatorialA = calcularFatorial(a);
    var fatorialB = calcularFatorial(b);
    var divIntA = calcularDivisores(a);
    var divIntB = calcularDivisores(b);

    document.getElementById("somaAB").value = somaAB;
    document.getElementById("subAB").value = subAB;
    document.getElementById("subBA").value = subBA;
    document.getElementById("multAB").value = multAB;
    document.getElementById("divAB").value = divAB;
    document.getElementById("divBA").value = divBA;
    document.getElementById("quadradoA").value = quadradoA;
    document.getElementById("quadradoB").value = quadradoB;
    document.getElementById("fatorialA").value = fatorialA;
    document.getElementById("fatorialB").value = fatorialB;
    document.getElementById("divIntA").value = divIntA;
    document.getElementById("divIntB").value = divIntB;
  }
}

start();
