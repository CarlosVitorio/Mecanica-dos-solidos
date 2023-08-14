var roseta45 = document.getElementById("45");
var roseta60 = document.getElementById("60");

function VerificarRoseta(id) {
  if (id === "45") {
    valor = roseta45.value;
  } else if (id === "60") {
    valor = roseta60.value;
  }
  return valor;
}

function Calcular() {
  valor = VerificarRoseta();
  var ep_A = parseInt(document.getElementById("ep_A").value);
  var ep_B = parseInt(document.getElementById("ep_B").value);
  var ep_C = parseInt(document.getElementById("ep_C").value);
  var material = parseInt(document.getElementById("material").value);

  // Materias
  if (material == 1) {
    var G = 77.2 * 10 ** 9;
    var E = 200 * 10 ** 9;
    var Poison = (E / (2 * G) - 1).toFixed(2);
  } else if (material == 2) {
    var G = 27 * 10 ** 9;
    var E = 73 * 10 ** 9;
    var Poison = (E / (2 * G) - 1).toFixed(2);
  } else if (material == 0) {
    alert("Escolha o material");
  }
  if (valor == 45) {
    // Etapa 1
    var ep_X = ep_A;
    var ep_Y = ep_C;
    var cisa_YX = 2 * ep_B - (ep_A + ep_C);
    document.getElementById("vazio-x").innerHTML = ep_X + "µ";
    document.getElementById("vazio-y").innerHTML = ep_Y + "µ";
    document.getElementById("vazio-xy").innerHTML = cisa_YX + "µ";

    // Etapa 2
    var ep_MED = (ep_X + ep_Y) / 2;
    var raio = (((ep_X - ep_Y) / 2) ** 2 + (cisa_YX / 2) ** 2) ** (1 / 2);
    var Ang_princ = (Math.atan(cisa_YX / (ep_X - ep_Y)) / 2) * (180 / Math.PI);
    var ep_X_l =
      (ep_X + ep_Y) / 2 +
      ((ep_X - ep_Y) / 2) * Math.cos(Ang_princ * 2 * (Math.PI / 180)) +
      (cisa_YX / 2) * Math.sin(Ang_princ * 2 * (Math.PI / 180));
    var ep_Y_l =
      (ep_X + ep_Y) / 2 -
      ((ep_X - ep_Y) / 2) * Math.cos(Ang_princ * 2 * (Math.PI / 180)) -
      (cisa_YX / 2) * Math.sin(Ang_princ * 2 * (Math.PI / 180));
    document.getElementById("vazio-ep_MED").innerHTML = ep_MED.toFixed(2) + "µ";
    document.getElementById("vazio-raio").innerHTML = raio.toFixed(2) + "µ";
    document.getElementById("vazio-ep_MAX").innerHTML = ep_X_l.toFixed(2) + "µ";
    document.getElementById("vazio-ep_MIN").innerHTML = ep_Y_l.toFixed(2) + "µ";
    document.getElementById("vazio-ang-prin").innerHTML =
      Ang_princ.toFixed(2) + " OU " + (Ang_princ * 2).toFixed(2);

    // Etapa 3
    var Ang_cisa =
      -1 * ((Math.atan((ep_X - ep_Y) / cisa_YX) / 2) * (180 / Math.PI));
    var gama_XY =
      -1 * ((ep_X - ep_Y) * Math.sin(Ang_cisa * 2 * (Math.PI / 180))) +
      cisa_YX * Math.cos(Ang_cisa * 2 * (Math.PI / 180));
    document.getElementById("vazio-raio-XY").innerHTML =
      gama_XY.toFixed(2) + "µ";
    document.getElementById("vazio-ang-cisa").innerHTML =
      Ang_cisa.toFixed(2) + " OU " + Ang_cisa.toFixed(2) * 2;
    document.getElementById("vazio-ep_MED_cisa").innerHTML =
      ep_MED.toFixed(2) + "µ";

    // Etapa 4
    var sig_X =
      (((ep_X * 10 ** -6 + Poison * (ep_Y * 10 ** -6)) / (1 - Poison ** 2)) *
        E) /
      10 ** 6;
    var sig_Y =
      (((Poison * (ep_X * 10 ** -6) + ep_Y * 10 ** -6) / (1 - Poison ** 2)) *
        E) /
      10 ** 6;
    var cisa_tau = (cisa_YX * 10 ** -6 * G) / 10 ** 6;

    document.getElementById("vazio-poison").innerHTML = Poison;
    document.getElementById("vazio-tau").innerHTML =
      cisa_tau.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-x").innerHTML = sig_X.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-y").innerHTML = sig_Y.toFixed(2) + "mPa";

    // Etapa 5
    var sig_med = (sig_X + sig_Y) / 2;
    var sig_raio = (((sig_X - sig_Y) / 2) ** 2 + cisa_tau ** 2) ** (1 / 2);
    var sig_ang = Math.atan((2 * cisa_tau) / (sig_X - sig_Y)) * (180 / Math.PI);
    var sig_X_l =
      (sig_X + sig_Y) / 2 +
      ((sig_X - sig_Y) / 2) * Math.cos(sig_ang * (Math.PI / 180)) +
      cisa_tau * Math.sin(sig_ang * (Math.PI / 180));
    var sig_Y_l =
      (sig_X + sig_Y) / 2 -
      ((sig_X - sig_Y) / 2) * Math.cos(sig_ang * (Math.PI / 180)) -
      cisa_tau * Math.sin(sig_ang * (Math.PI / 180));

    document.getElementById("vazio-sig-med").innerHTML =
      sig_med.toFixed(2) + "mPa";
    document.getElementById("vazio-raio-sig").innerHTML =
      sig_raio.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-x-l").innerHTML =
      sig_X_l.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-y-l").innerHTML =
      sig_Y_l.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-ang").innerHTML =
      (sig_ang / 2).toFixed(2) + " ou " + sig_ang.toFixed(2);

    // Etapa 6
    var Ang_cisa_tau =
      -1 * (Math.atan((sig_X - sig_Y) / (2 * cisa_tau)) / 2) * (180 / Math.PI);
    var tau_l =
      -1 *
        ((sig_X - sig_Y) / 2) *
        Math.sin(Ang_cisa_tau * 2 * (Math.PI / 180)) +
      cisa_tau * Math.cos(Ang_cisa_tau * 2 * (Math.PI / 180));

    document.getElementById("vazio-tau-l").innerHTML = tau_l.toFixed(2) + "mPa";
    document.getElementById("vazio-ang-cisa-tau").innerHTML =
      Ang_cisa_tau.toFixed(2) + " OU " + (Ang_cisa_tau * 2).toFixed(2);
  } else if (valor == 60) {
    // Etapa 1
    var ep_X = ep_A;
    var ep_Y = (2 * ep_B + 2 * ep_C - ep_A) / 3;
    var cisa_YX = ((ep_B - ep_C) * 2) / 3 ** (1 / 2);
    document.getElementById("vazio-x").innerHTML = ep_X.toFixed(2) + "µ";
    document.getElementById("vazio-y").innerHTML = ep_Y.toFixed(2) + "µ";
    document.getElementById("vazio-xy").innerHTML = cisa_YX.toFixed(2) + "µ";

    // Etapa 2
    var ep_MED = (ep_X + ep_Y) / 2;
    var raio = (((ep_X - ep_Y) / 2) ** 2 + (cisa_YX / 2) ** 2) ** (1 / 2);
    var Ang_princ = (Math.atan(cisa_YX / (ep_X - ep_Y)) / 2) * (180 / Math.PI);
    var ep_X_l =
      (ep_X + ep_Y) / 2 +
      ((ep_X - ep_Y) / 2) * Math.cos(Ang_princ * 2 * (Math.PI / 180)) +
      (cisa_YX / 2) * Math.sin(Ang_princ * 2 * (Math.PI / 180));
    var ep_Y_l =
      (ep_X + ep_Y) / 2 -
      ((ep_X - ep_Y) / 2) * Math.cos(Ang_princ * 2 * (Math.PI / 180)) -
      (cisa_YX / 2) * Math.sin(Ang_princ * 2 * (Math.PI / 180));
    document.getElementById("vazio-ep_MED").innerHTML = ep_MED.toFixed(2) + "µ";
    document.getElementById("vazio-raio").innerHTML = raio.toFixed(2) + "µ";
    document.getElementById("vazio-ep_MAX").innerHTML = ep_X_l.toFixed(2) + "µ";
    document.getElementById("vazio-ep_MIN").innerHTML = ep_Y_l.toFixed(2) + "µ";
    document.getElementById("vazio-ang-prin").innerHTML =
      Ang_princ.toFixed(2) + " OU " + (Ang_princ * 2).toFixed(2);

    // Etapa 3
    var Ang_cisa =
      -1 * ((Math.atan((ep_X - ep_Y) / cisa_YX) / 2) * (180 / Math.PI));
    var gama_XY =
      -1 * ((ep_X - ep_Y) * Math.sin(Ang_cisa * 2 * (Math.PI / 180))) +
      cisa_YX * Math.cos(Ang_cisa * 2 * (Math.PI / 180));
    document.getElementById("vazio-raio-XY").innerHTML =
      gama_XY.toFixed(2) + "µ";
    document.getElementById("vazio-ang-cisa").innerHTML =
      Ang_cisa.toFixed(2) + " OU " + Ang_cisa.toFixed(2) * 2;
    document.getElementById("vazio-ep_MED_cisa").innerHTML =
      ep_MED.toFixed(2) + "µ";

    // Etapa 4
    var sig_X =
      (((ep_X * 10 ** -6 + Poison * (ep_Y * 10 ** -6)) / (1 - Poison ** 2)) *
        E) /
      10 ** 6;
    var sig_Y =
      (((Poison * (ep_X * 10 ** -6) + ep_Y * 10 ** -6) / (1 - Poison ** 2)) *
        E) /
      10 ** 6;
    var cisa_tau = (cisa_YX * 10 ** -6 * G) / 10 ** 6;

    document.getElementById("vazio-poison").innerHTML = Poison;
    document.getElementById("vazio-tau").innerHTML =
      cisa_tau.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-x").innerHTML = sig_X.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-y").innerHTML = sig_Y.toFixed(2) + "mPa";

    // Etapa 5
    var sig_med = (sig_X + sig_Y) / 2;
    var sig_raio = (((sig_X - sig_Y) / 2) ** 2 + cisa_tau ** 2) ** (1 / 2);
    var sig_ang =
      (Math.atan((2 * cisa_tau) / (sig_X - sig_Y)) / 2) * (180 / Math.PI);
    var sig_X_l =
      (sig_X + sig_Y) / 2 +
      ((sig_X - sig_Y) / 2) * Math.cos(sig_ang * 2 * (Math.PI / 180)) +
      cisa_tau * Math.sin(sig_ang * 2 * (Math.PI / 180));
    var sig_Y_l =
      (sig_X + sig_Y) / 2 -
      ((sig_X - sig_Y) / 2) * Math.cos(sig_ang * 2 * (Math.PI / 180)) -
      cisa_tau * Math.sin(sig_ang * 2 * (Math.PI / 180));

    document.getElementById("vazio-sig-med").innerHTML =
      sig_med.toFixed(2) + "mPa";
    document.getElementById("vazio-raio-sig").innerHTML =
      sig_raio.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-x-l").innerHTML =
      sig_X_l.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-y-l").innerHTML =
      sig_Y_l.toFixed(2) + "mPa";
    document.getElementById("vazio-sig-ang").innerHTML =
      sig_ang.toFixed(2) + " ou " + (sig_ang * 2).toFixed(2);

    // Etapa 6
    var Ang_cisa_tau =
      -1 * (Math.atan((sig_X - sig_Y) / (2 * cisa_tau)) / 2) * (180 / Math.PI);
    var tau_l =
      -1 *
        ((sig_X - sig_Y) / 2) *
        Math.sin(Ang_cisa_tau * 2 * (Math.PI / 180)) +
      cisa_tau * Math.cos(Ang_cisa_tau * 2 * (Math.PI / 180));

    document.getElementById("vazio-tau-l").innerHTML = tau_l.toFixed(2) + "mPa";
    document.getElementById("vazio-ang-cisa-tau").innerHTML =
      Ang_cisa_tau.toFixed(2) + " OU " + (Ang_cisa_tau * 2).toFixed(2);
  }
}
