
$("#kjop-knapp").on("click", hentBilletter);
$("#slett-alle").on("click", SlettAlleBilletter);

const billetter = [];

function visBilletter() {
  let ut =
    "<table class='table table-striped'>" + // Legger til Bootstrap-klasser for tabellen
    "<thead><tr>" +
    "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
    "</tr></thead><tbody>"; // Bruker thead og tbody for tabellen

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
  ut += "</tbody></table>"; // Avslutter tbody og tabellen

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
    $(".feilmelding1").text("Vennligst velg en film").addClass("alert alert-danger");
    return;
  }
  if ($("#antall").val() === "") {
    $(".feilmelding2").text("Vennligst velg antall billetter").addClass("alert alert-danger");
    return;
  }
  if ($("#fnavn").val() === "") {
    $(".feilmelding3").text("Vennligst skriv inn fornavn").addClass("alert alert-danger");
    return;
  }
  if ($("#enavn").val() === "") {
    $(".feilmelding4").text("Vennligst skriv inn etternavn").addClass("alert alert-danger");
    return;
  }
  if ($("#telefonnr").val() === "") {
    $(".feilmelding5").text("Vennligst skriv inn et telefonnr").addClass("alert alert-danger");
    return;
  }
  if ($("#epost").val() === "") {
    $(".feilmelding6").text("Vennligst skriv inn en epost").addClass("alert alert-danger");
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
    $("#telefonnr-feil").text("Vennligst skriv inn et gyldig telefonnummer.").addClass("alert alert-danger");
    return;
  }

  if (!validerEpost(epost)) {
    $("#epost-feil").text("Vennligst skriv inn en gyldig e-postadresse.").addClass("alert alert-danger");
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

  // Send billett til serveren
  $.ajax({
    url: '/billetter',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(billett),
    success: function() {
      billetter.push(billett);
      visBilletter(); // Oppdaterer tabellen
    },
    error: function(xhr, status, error) {
      console.error("Feil ved lagring av billett:", error);
    }
  });

  // Tøm skjemaet
  $("input").val("");
}

function SlettAlleBilletter() {
  $.ajax({
    url: '/billetter',
    type: 'DELETE',
    success: function() {
      billetter.length = 0; // Tømmer arrayet
      visBilletter(); // Oppdaterer visningen
    },
    error: function(xhr, status, error) {
      console.error("Feil ved sletting av billetter:", error);
    }
  });
}
