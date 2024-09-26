document.addEventListener('DOMContentLoaded', function() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    // Função para carregar os estados
    function carregarEstados() {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(estados => {
                estados.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordenar os estados por nome
                estados.forEach(estado => {
                    const option = document.createElement('option');
                    option.value = estado.id; // Usar o ID do estado para a API de cidades
                    option.textContent = estado.nome;
                    estadoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar estados:', error));
    }

    // Função para carregar as cidades com base no estado selecionado
    function carregarCidades(estadoId) {
        cidadeSelect.innerHTML = '<option value="">Selecione a cidade:</option>'; // Limpar o select de cidades
        if (estadoId) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
                .then(response => response.json())
                .then(cidades => {
                    cidades.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordenar as cidades por nome
                    cidades.forEach(cidade => {
                        const option = document.createElement('option');
                        option.value = cidade.nome;
                        option.textContent = cidade.nome;
                        cidadeSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Erro ao carregar cidades:', error));
        }
    }

    // Carregar estados ao carregar a página
    carregarEstados();

    // Carregar cidades ao selecionar um estado
    estadoSelect.addEventListener('change', function() {
        const estadoId = estadoSelect.value;
        carregarCidades(estadoId);
    });
});



