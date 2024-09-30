
$("#kjop-knapp").on("click", hentBilletter);
$("#slett-alle").on("click", SlettAlleBilletter);

const billetter = [];

function visBilletter() {
  let ut =
    "<table><tr>" +
    "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
    "</tr>";

  console.log("Billetter:", billetter);

  for (let b of billetter) {
    ut += "<tr>";
    ut += "<td>" + b.film + "</td>";
    ut += "<td>" + b.antall + "</td>";
    ut += "<td>" + b.fornavn + "</td>";
    ut += "<td>" + b.etternavn + "</td>";
    ut += "<td>" + b.telefonnr + "</td>";
    ut += "<td>" + b.epost + "</td>";
    ut += "</tr>";
  }
  ut += "</table>";

  console.log("Tabellinnhold:", ut);

  $("#billetter").html(ut);
}



function validerTelefonnr(telefonnr) {
  const telefonRegex = /^\d{8}$/; // Tilpass denne regex-en til ønsket format
  return telefonRegex.test(telefonnr);
}

// Validerer e-postadresse
function validerEpost(epost) {
  const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // En enkel regex for e-postvalidering
  return epostRegex.test(epost);
}

function hentBilletter() {
  // Tøm tidligere feilmeldinger
  $(".feilmelding").text("");

  if ($("#velg-film").val() === null) {
    $(".feilmelding1").text("Vennligst velg en film");
    return;
  }
  if ($("#antall").val() === "") {
    $(".feilmelding2").text("Vennligst velg antall billetter");
    return;
  }
  if ($("#fnavn").val() === "") {
    $(".feilmelding3").text("Vennligst skriv inn fornavn");
    return;
  }
  if ($("#enavn").val() === "") {
    $(".feilmelding4").text("Vennligst skriv inn etternavn");
    return;
  }
  if ($("#telefonnr").val() === "") {
    $(".feilmelding5").text("Vennligst skriv inn et telefonnr");
    return;
  }
  if ($("#epost").val() === "") {
    $(".feilmelding6").text("Vennligst skriv inn en epost");
    return;
  }


  const film = $("#velg-film").val();
  const antall = $("#antall").val();
  const fornavn = $("#fnavn").val();
  const etternavn = $("#enavn").val();
  const telefonnr = $("#telefonnr").val();
  const epost = $("#epost").val();

  

  // Spesifikke valideringer
  if (!validerTelefonnr(telefonnr)) {
    $("#telefonnr-feil").text("Vennligst skriv inn et gyldig telefonnummer.");
    return;
  }

  if (!validerEpost(epost)) {
    $("#epost-feil").text("Vennligst skriv inn en gyldig e-postadresse.");
    return;
  }

  const billett = {
    film: film,
    antall: antall,
    fornavn: fornavn,
    etternavn: etternavn,
    telefonnr: telefonnr,
    epost: epost,
  };
  billetter.push(billett);

  console.log("Ny billett lagt til:", billett);

  // Clear the form fields
  $("input").val("");

 
  visBilletter(); //Oppdaterer tabellen
}

function SlettAlleBilletter() {
  billetter.length = 0; // Clear the array
  visBilletter(); // Refresh the display
}
