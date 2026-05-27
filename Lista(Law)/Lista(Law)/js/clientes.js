const ref = db.ref("clientes");

let idcapturado = null;
$("#cancelar").hide();

$("#salvar").click(function () {

    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();

    if (nome === "" || email === "") {
        alert('Preencha todos os campos');
        return;
    }

        if(idcapturado){//Editar
            ref.child(idcapturado).update({ nome, email });
                idcapturado = null;
                $("#salvar").text("Salvar");
                
                $("#cancelar").hide();
                $("#salvar").removeClass("btn-success").addClass("btn-primary");
                 $("#status").text("");
        } else {//Salvar
             ref.push({ nome, email });
        }

    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>Nome</th>
            <th>Email</th>
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
                <td>${id}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
    });
});
function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#nome").focus();


}

function editar(id, nome, email) {
    $("#nome").val(nome);
    $("#email").val(email);

    idcapturado = id;

    $("#cancelar").show(); 

    $("#salvar")
    .text("Atualizar")
    .removeClass("btn-primary")
    .addClass("btn-success");

    $("#status").text("Editando Registro...");
}
    