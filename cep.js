document.getElementById("cepForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let cep = document.getElementById("cepValue").value;
  console.log("O cep informado é: ", cep);

  let url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log("A url de consulta é: ", url);

  //Realiza consultas http
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById("listagem-cep");
      const tbody = table.querySelector("tbody");

      tbody.innerHTML = "";

      console.log(
        "Endereço:",
        data.logradouro,
        data.bairro,
        "-",
        data.localidade,
        "(",
        data.uf,
        ")"
      );

      Object.entries(data).forEach(([key, value]) => {
        //Criamos as linhas da tabela
        const row = document.createElement("tr");
        const fieldCell = document.createElement("td");
        const valueCell = document.createElement("td");

        if (
          key != "ibge" &&
          key != "gia" &&
          key != "siafi" &&
          key != "complemento"
        ) {
          //Populamos com o valor recebido no json
          fieldCell.textContent = key;
          valueCell.textContent = value;
        }
        row.appendChild(fieldCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
      });
    });
});
