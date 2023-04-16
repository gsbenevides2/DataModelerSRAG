<h1 align="center"> 🏥Banco de Dados de SRAG🤧 </h1>

Projeto de criação de um banco de dados de casos de Síndrome Respiratória Aguda Grave do Sistema Único de Saúde Brasileiro do ano de 2021 a 2023 para a disciplina de Laboratório de Banco de Dados do curso superior de Análise e Desenvolvimento de Sistemas da <a href="https://www.fatecmogidascruzes.com.br/">Faculdade de Tecnologia Fatec de Mogi das Cruzes</a>.

## 📂Estrutura de Pastas

- DataModeler: Contém a modelagem realizada com Oracle Data Modeler.
- ScriptsSQL: Uma série de scripts SQL.
- NodeScripts: Programa em Typescript/NodeJS reponsável por auxiliar na administração e execução de tarefas no banco.

### 📐Pasta: DataModeler

Contém a modelagem do banco de dados usando o Oracle Data Modeler. A modelagem contempla o modelo relacional, com dicionários de dados nas tabelas e colunas, trigramação nas colunas e restrições de chave primária e estrangeira.

### 📝Pasta: ScriptsSQL

Contém uma série de scripts SQL que são utilizados pelo programa auxiliar de adminstração de banco de dados a criar a DDL e DML, parte desses scripts são gerados pelo DataModeler e outra parte é realizada na mão. Dependendo da alteração realizada na modelagem, deve alterar os scripts para manter a consistência. A DDL contempla: CREATE TABLES, COMMENTS, SEQUENCES, TRIGGERS E CONSTRAINTS. A DML contempla INSERTS para as tabelas de metadados.

### 🤖Pasta: NodeScripts

Contém um programa escrito em linguagem TypeSript que roda no ambiente NodeJS. Esse programa possui a seguintes funcionalidades:

- Criar usuário de Aplicação e subir a DDL e DML para metadados.
- Subir a DML para os casos em si.
- Criar historiamento do banco de dados.

#### 📥Como Instalar?

1º Passo: Tenha o NodeJS instalado corretamente em sua máquina! Para saber se o node está ok use os comandos abaixo para verificar a versão do node e NPM:

```
node --version
npm --version
```

2º Passo: Tenha um banco de dados Oracle funcionando! É importante possuir um banco de dados Oracle funcional, além disso talvez seja necessário a instalação de ferramentas adicionais.

3º Passo: Clone o repositório. E Abra um ternminal na pasta: NodeScrips

4ª Passo rode o comando de instalação de dependecias, depois o comando de construção e por ultimo o comando de execução:

```
npm install
npm run build
npm run startWithoutTsc
```

<p align="center">
Construido com 💛 por <a href="https://github.com/gsbenevides2">Guilherme da Silva Benevides</a> e <a href="https://github.com/akioew">Ewerton Akio Sato Antonio</a>
</p>
