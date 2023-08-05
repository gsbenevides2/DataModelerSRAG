<h1 align="center"> 🏥Banco de Dados de SRAG🤧 </h1>
<p align="center">
<img src="https://img.shields.io/badge/Typescript-241468?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Oracle-241468?style=for-the-badge&logo=oracle&logoColor=white">
<img src="https://img.shields.io/badge/Docker-241468?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/NodeJS-241468?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/PowerBI-241468?style=for-the-badge&logo=powerbi&logoColor=white">
<img src="https://img.shields.io/badge/Qt-241468?style=for-the-badge&logo=qt&logoColor=white">
</p>
<p align="justify">Projeto de criação de um banco de dados de casos de Síndrome Respiratória Aguda Grave do Sistema Único de Saúde Brasileiro do ano de 2021 a 2023 para a disciplina de Laboratório de Banco de Dados do curso superior de Análise e Desenvolvimento de Sistemas da <a href="https://www.fatecmogidascruzes.com.br/">Faculdade de Tecnologia Fatec de Mogi das Cruzes</a>. No final com os dados organizados no banco, elaboramos uma análise com um dashboard em PowerBI.</p>

<p align="center">
  <a href="./Dashboard/file.pdf">
  <img src=".github/Capa.png">
  Veja esse Dashboard!
  </a>
</p>

<h2>🐋 Docker</h2>
<p align="justify">Foi utilizado images Docker para facilitar o gerenciamento do banco de dados Oracle. Para isso foi utilizado o <a href="https://hub.docker.com/r/oracleinanutshell/oracle-xe-11g">oracleinanutshell/oracle-xe-11g</a>. A partir dessa imagem criamos diversas outras imagens com os dados que estão disponíveis em <a href="https://hub.docker.com/r/gsbenevides2/oracle-br-covid/tags">gsbenevides2/oracle-br-covid</a>.
</p>

<h2 id="-estrutura-de-pastas">📂Estrutura de Pastas</h2>
<ul>
<li>DataModeler: Contém a modelagem realizada com Oracle Data Modeler.</li>
<li>ScriptsSQL: Uma série de scripts SQL.</li>
<li>NodeScripts: Programa em Typescript/NodeJS reponsável por auxiliar na administração e execução de tarefas no banco.</li>
<li>Dashboard: Contém o arquivo do PowerBI com o Dashboard. E uma versão em PDF.</li>
</ul>

<h3 id="-pasta-datamodeler">📐Pasta: DataModeler</h3>
<p align="justify">Contém a modelagem do banco de dados usando o Oracle Data Modeler. A modelagem contempla o modelo relacional, com dicionários de dados nas tabelas e colunas, trigramação nas colunas e restrições de chave primária e estrangeira.</p>

<h3 id="-pasta-scriptssql">📝Pasta: ScriptsSQL</h3>
<p align="justify">Contém uma série de scripts SQL que são utilizados pelo programa auxiliar de adminstração de banco de dados a criar a DDL e DML, parte desses scripts são gerados pelo DataModeler e outra parte é realizada na mão. Dependendo da alteração realizada na modelagem, deve alterar os scripts para manter a consistência. A DDL contempla: CREATE TABLES, COMMENTS, SEQUENCES, TRIGGERS E CONSTRAINTS. A DML contempla INSERTS para as tabelas de metadados.</p>

<h3 id="-pasta-nodescripts">🤖Pasta: NodeScripts</h3>
<p align="jutify">Contém um programa escrito em linguagem TypeSript que roda no ambiente NodeJS. Esse programa possui a seguintes funcionalidades:</p>
<ul>
<li>Criar usuário de Aplicação e subir a DDL e DML para metadados.</li>
<li>Subir a DML para os casos em si.</li>
<li>Criar historiamento do banco de dados.</li>
</ul>

<h4 id="-como-instalar-">📥Como Instalar?</h4>
<p align="justify">1º Passo: Tenha o NodeJS instalado corretamente em sua máquina! Para saber se o node está ok use os comandos abaixo para verificar a versão do node e NPM:</p>
<pre><code><span class="hljs-keyword">node</span> <span class="hljs-title">--version</span>
npm --<span class="hljs-keyword">version</span>
</code></pre>
<p align="justify">2º Passo: Tenha um banco de dados Oracle funcionando! É importante possuir um banco de dados Oracle funcional, além disso talvez seja necessário a instalação de ferramentas adicionais.</p>
<p align="justify">3º Passo: Clone o repositório. E Abra um ternminal na pasta: NodeScrips</p>
<p align="justify">4ª Passo rode o comando de instalação de dependecias, depois o comando de construção e por ultimo o comando de execução:</p>
<pre><code>npm install
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>npm <span class="hljs-keyword">run</span><span class="bash"> startWithoutTsc</span>
</code></pre>

<h2>📃 Licença</h2>
<p align="justify">Este projeto está sobre a licença Do What The F*ck You Want To Public License. Veja ela em: <a href="LICENSE">LICENSE</a>.</p>

<p align="center">
Construido com 💙 por <a href="https://github.com/gsbenevides2">Guilherme da Silva Benevides</a> e <a href="https://github.com/akioew">Ewerton Akio Sato Antonio</a>
</p>
