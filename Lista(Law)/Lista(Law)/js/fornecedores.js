const ref = db.ref("fornecedores");

let idcapturado = null;
$("#cancelar").hide();

$("#salvar").click(function () {
    let nome = $("#nome").val();
    let email = $("#email").val();
    let cnpj = $("#cnpj").val();
    let estados = $("select[name='opcao']").val();

    if (nome === "" || email === "" || cnpj === "" || estados === "") {
        alert('Preencha todos os campos');
        return;
    }
     if(idcapturado){//Editar
            ref.child(idcapturado).update({ nome, email, cnpj, estados });
                idcapturado = null;
                $("#salvar").text("Salvar");
                
                $("#cancelar").hide();
                $("#salvar").removeClass("btn-success").addClass("btn-primary");
                 $("#status").text("");
        } else {//Salvar
             ref.push({ nome, email, cnpj, estados });
        }
    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CNPJ</th>
            <th>Estados</th>
            <th>ID</th>
            <th colspan="2">opções</th>
        </tr>
    `);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr>
                <td>${reg.nome}</td>
                <td>${reg.email}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.estados}</td>
                <td>${id}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}', '${reg.cnpj}', '${reg.estados}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
    });
});

function limpar() {
    $("select[name='opcao']").val("");
    $("#cnpj").val("");
    $("#email").val("");
    $("#nome").val("");
    $("#nome").focus();
}
function editar(id, nome, email, cnpj, estados) {
    $("#nome").val(nome);
    $("#email").val(email);
    $("#cnpj").val(cnpj);
    $("select[name='opcao']").val(estados);

    idcapturado = id;

    $("#cancelar").show(); 

    $("#salvar")
    .text("Atualizar")
    .removeClass("btn-primary")
    .addClass("btn-success");

    $("#status").text("Editando Registro...");
}
    