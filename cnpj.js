document
  .getElementById("cnpjForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let cnpj = document.getElementById("cnpjValue").value;
    console.log("O CNPJ informado é: ", cnpj);

    let url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
    console.log("A url de consulta é: ", url);

    //Realiza consultas http
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const table = document.getElementById("listagem-cnpj");
        const tbody = table.querySelector("tbody");

        tbody.innerHTML = "";

        console.log(
          "Dados da Empresa:",
          data.razao_social,
          data.cnae_fiscal_descricao,
          "Inicio em:",
          data.data_inicio_atividade,
          "CEP:",
          data.cep
        );

        Object.entries(data).forEach(([key, value]) => {
          //Criamos as linhas da tabela
          const row = document.createElement("tr");
          const fieldCell = document.createElement("td");
          const valueCell = document.createElement("td");

          if (
            key != "qsa" &&
            key != "pais" &&
            key != "email" &&
            key != "codigo_pais" &&
            key != "complemento" &&
            key != "codigo_porte" &&
            key != "porte" &&
            key != "nome_fantasia" &&
            key != "situacao_especial" &&
            key != "opcao_pelo_simples" &&
            key != "data_opcao_pelo_mei" &&
            key != "opcao_pelo_mei" &&
            key != "descricao_porte" &&
            key != "data_exclusao_do_mei" &&
            key != "data_situacao_especial" &&
            key != "data_opcao_pelo_simples" &&
            key != "cnaes_secundarios" &&
            key != "nome_cidade_no_exterior" &&
            key != "data_exclusao_do_simples" &&
            key != "ente_federativo_responsavel"
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
