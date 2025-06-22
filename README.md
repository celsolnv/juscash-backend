**NODE VERSION** = v22.6.0
**MYSQL VERSION** = 8.0

Vamos criar um guia para documentar a instalação e execução do backend em Node.js com Docker usando o `docker-compose`. Esse projeto usa uma arquitetura de containerização com Node.js para o backend e MySQL para o banco de dados.

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados no seu ambiente:

1. **Docker**: Guia oficial de instalação [aqui](https://docs.docker.com/get-docker/).
2. **Docker Compose**: Em geral, já vem junto com o Docker Desktop, mas você pode verificar a instalação [aqui](https://docs.docker.com/compose/install/).

---

### Passo 1: Estrutura do Projeto

Certifique-se de ter os seguintes arquivos na raiz do seu projeto:

1. **Dockerfile** - Define o ambiente do backend Node.js.
2. **docker-compose.yml** - Orquestra o backend e o banco de dados.
3. **Arquivo de variáveis de ambiente (.env)** - Para configurar as variáveis necessárias para o ambiente e o banco de dados.

### Passo 2: Docker Compose Explicado

No arquivo `docker-compose.yml`, temos dois serviços:

-   **api**:

    -   Define o serviço para o backend Node.js.
    -   Expõe a porta configurada pela variável `${PORT}`, conectando o backend ao banco de dados usando as variáveis de ambiente configuradas.

-   **mysql**:
    -   Define o serviço de banco de dados MySQL com versão `8.0`.
    -   Configura as variáveis de ambiente necessárias para a autenticação e persistência dos dados no volume `mysql_data`.

### Passo 3: Configurando Variáveis de Ambiente

No arquivo `.env`, defina as seguintes variáveis (essas devem ser configuradas com os valores corretos)

Na raiz do projeto existe um arquivo com terminologia igual a: .env.example. Nele terá as variaveis necessárias para execução do projeto. Com base nele será escrito sua `.env`.

Adicione o `.env` ao seu `.dockerignore` para manter essas informações seguras.

### Passo 4: Dockerfile para o Backend

Certifique-se de que o arquivo Dockerfile está presente na raiz do projeto

### Passo 5: Executando o Docker Compose

Com os arquivos configurados, podemos iniciar o ambiente completo:

1. No diretório raiz do projeto, execute o comando:

    ```bash
    docker-compose up -d
    ```

    - A flag `-d` faz com que os serviços sejam executados em segundo plano.

2. Verifique se os containers estão rodando:

    ```bash
    docker-compose ps
    ```

### Passo 6: Executando Migrations

Para rodar as migrations do TypeORM após iniciar os containers, use o seguinte comando:

```bash
docker-compose exec api npm run typeorm migration:run
```

> Esse comando acessa o container `api` e executa as migrations.

### Passo 7: Verificando a Aplicação

A aplicação backend deve estar disponível na porta configurada (por exemplo, `http://localhost:8080/docs`)

Teste a conexão e verifique os logs:

```bash
docker-compose logs -f backend
```

### Comandos Adicionais

-   **Parar os containers**:

    ```bash
    docker-compose down
    ```

-   **Recriar containers**:

    ```bash
    docker-compose up --build
    ```

-   **Remover volumes** (apaga dados persistentes):
    ```bash
    docker-compose down -v
    ```

Esses passos cobrem o setup do backend Node.js e banco de dados com Docker Compose, incluindo o comando para rodar as migrations.

# Documentação - Template Node Init

-   npx typeorm migration:create - Criar migrations
-   npm run typeorm migration:run & migration:revert - Rodar e Reverter migrações
-   npm run test:dev - Rodar testes e2e em modo hot reload.
-   npm run test:debug - disponibiliza uma porta para usar o modo depuração do vscode para o modo debug. Otimiza tempo permitindo realizar ações de troubleshooting. Para rodar pode usar a combinação de `Ctrl + Shift + B` no arquivo de testes e depois apertar f5 para o vscode começar a depurar.

# Documentação API

Link: https://ekki1kg0xi.apidog.io. Access password: 4u39YQZk
