function resultado() {
  var p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, nota;

  // 1a pregunta
  if (document.getElementById('p11').checked == true) {
    p1 = 1;
  } else {
    p1 = 0;
  }
  // 2a pregunta
  if (document.getElementById('p24').checked == true) {
    p2 = 1;
  } else {
    p2 = 0;
  }
  // 3a pregunta
  if (document.getElementById('p33').checked == true) {
    p3 = 1;
  } else {
    p3 = 0;
  }
  // 4a pregunta
  if (document.getElementById('p41').checked == true) {
    p4 = 1;
  } else {
    p4 = 0;
  }
  // 5a pregunta
  if (document.getElementById('p52').checked == true) {
    p5 = 1;
  } else {
    p5 = 0;
  }

  nota = p1 + p2 + p3 + p4 + p5;
  alert(' Aciertos: ' + nota);

  if (nota != 5) {
    alert(
      'Vuelve a intentarlo tu puedes NOTA: Puedes volver a repasar los temas una vez mas.'
    );
    window.location = '/cuestionario';
  } else {
    alert(
      'Muy bien has logrado acertar a todas las respuestas, puedes avanzar a la siguiente lección'
    );
    window.location = '/temario';
  }
}
