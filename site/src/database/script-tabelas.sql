-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE MiracleSolutions;
USE MiracleSolutions;

CREATE TABLE Empresa(
  idEmpresa INT NOT NULL AUTO_INCREMENT,
  nomeEmpresa VARCHAR(45),
  CNPJ CHAR(18),
  telefoneFixoEmpresa CHAR(14),
  numero INT,
  CEP CHAR(9),
  PRIMARY KEY (idEmpresa));

CREATE TABLE Usuario(
  idUsuario INT NOT NULL AUTO_INCREMENT,
  nomeUsuario VARCHAR(45),
  sobrenomeUsuario VARCHAR(45),
  cargoUsuario VARCHAR(45),
  emailUsuario VARCHAR(90),
  senhaUsuario VARBINARY(150),
  fkSupervisionador INT,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idUsuario),
  FOREIGN KEY (fkSupervisionador) REFERENCES Usuario (idUsuario),
  FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa));

CREATE TABLE Computador(
  idComputador INT NOT NULL AUTO_INCREMENT,
  fabricante VARCHAR(45),
  marca VARCHAR(45),
  modeloComputador VARCHAR(45),
  sistemaOperacional VARCHAR(45),
  arquitetura CHAR(4),
  fkUsuario INT NOT NULL,
  PRIMARY KEY (idComputador),
  FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario));

CREATE TABLE ApontamentoHoras(
  idApontamento INT NOT NULL AUTO_INCREMENT,
  horaInicio DATETIME,
  horaFim DATETIME,
  minutoExtra INT,
  fkUsuario INT NOT NULL,
  PRIMARY KEY (idApontamento),
  FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario));

CREATE TABLE Pesquisa(
  idPesquisa INT NOT NULL AUTO_INCREMENT,
  dataPesquisa DATE,
  fkUsuario INT NOT NULL,
  PRIMARY KEY (idPesquisa),
  FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario));

CREATE TABLE Componente (
  idComponente INT NOT NULL AUTO_INCREMENT,
  tipoComponente VARCHAR(10),
  nome VARCHAR(45),
  velocidade DECIMAL,
  capacidade INT,
  unidadeMedida VARCHAR(10),
  nucleo INT,
  processadorLogico INT,
  fkComputador INT NOT NULL,
  PRIMARY KEY (idComponente),
  FOREIGN KEY (fkComputador) REFERENCES Computador (idComputador));

CREATE TABLE Monitoramento (
  idRegistro INT NOT NULL AUTO_INCREMENT,
  dado INT,
  dataHora DATETIME,
  fkComponente INT NOT NULL,
  PRIMARY KEY (idRegistro, fkComponente),
  FOREIGN KEY (fkComponente) REFERENCES Componente (idComponente));

CREATE TABLE Pergunta (
  idPergunta INT NOT NULL AUTO_INCREMENT,
  pergunta VARCHAR(90) NULL,
  resposta INT NULL,
  fkPesquisa INT NOT NULL,
  PRIMARY KEY (idPergunta, fkPesquisa),
  FOREIGN KEY (fkPesquisa) REFERENCES Pesquisa (idPesquisa)
  );

INSERT INTO Empresa VALUES
  (null , 'EY' , '12345678901234', '551140028922', 02, 02430011),
  (null , 'Genial', '12345678901234', '11955555555', 15, 01221000);

  INSERT INTO Usuario VALUES
  ( null, 'Fernanda', 'Caramico', 'Suporte Técnico', 'fernanda@sptech.com', aes_encrypt('123','miracle'), null, 1),
  ( null, 'João', 'Víctor', 'Dessenvolvedor front', 'joao@sptech.com', aes_encrypt('123','miracle'), 1, 1),
  ( null, 'Thiago', 'Ramos', 'Analista de QA', 'thiago@sptech.com', aes_encrypt('123','miracle'), 1, 1),
  ( null, 'Marte', 'Longo', 'Estagiário', 'marte@sptech.com', aes_encrypt('123','miracle'), 1, 1),
  ( null, 'Paulo', 'Enrique', 'Dessenvolvedor back', 'paulo@sptech.com', aes_encrypt('123','miracle'), 1, 1),
  ( null, 'Wladimir', 'Tinini', 'Dessenvolvedor mobile', 'wladimir@sptech.com', aes_encrypt('123','miracle'), 1, 1);
  
  INSERT INTO Computador VALUES
  (null , 'Michael Dell', 'Dell', 'Notebook Inspiron','Windows 11', '64X', 1),
  (null , 'Michael Dell', 'Dell', 'Notebook Inspiron','Windows 10', '32X', 2),
  (null , 'Michael Dell', 'Dell', 'Notebook Inspiron','Windows 11', '64X', 3),
  (null , 'Michael Dell', 'Dell', 'Notebook Inspiron','Windows 10', '32X', 4),
  (null , 'Michael Dell', 'Dell', 'Notebook Inspiron','Windows 11', '64X', 5),
  (null , 'Michael Dell', 'Dell', 'Notebook Inspiron','Windows 11', '86X', 6);
  
  INSERT INTO ApontamentoHoras VALUES
  (null , '2022-09-23 08:30:00', '2022-09-23 14:50:00', 0, 5),
  (null , '2022-09-24 09:35:00', '2022-09-24 15:45:00', 2, 5),
  (null , '2022-09-24 07:10:00', '2022-09-24 15:00:00', 10, 5),
  (null , '2022-09-24 07:55:00', '2022-09-24 14:25:00', 30, 6),
  (null , '2022-09-25 08:40:00', '2022-09-25 16:00:00', 25, 6),
  (null , '2022-09-25 07:35:00', '2022-09-25 17:45:00', 7, 6);
  
  INSERT INTO Pesquisa VALUES
  (null , '2022-09-24', 1),
  (null , '2022-09-10', 2),
  (null , '2022-09-10', 3),
  (null , '2022-09-11', 4),
  (null , '2022-09-11', 5);
  
  INSERT INTO Componente VALUES
  (null , 'CPU', 'intel core i7 4770', '3', 8,'3.4GHz', 8, 16, 1 ),
  (null , 'CPU', 'intel core i7 4770', '3', 8,'3.4GHz', 8, 16, 2 ),
  (null , 'CPU', 'intel core i7 4770', '3', 8,'3.4GHz', 8, 16, 3 ),
  (null , 'CPU', 'intel core i7 4770', '3', 8,'3.4GHz', 8, 16, 4 ),
  (null , 'CPU', 'intel core i7 4770', '3', 8,'3.4GHz', 8, 16, 5 ),
  (null , 'CPU', 'intel core i7 4770', '3', 8,'3.4GHz', 8, 16, 6 ),
  (null , 'RAM', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 1 ),
  (null , 'RAM', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 2 ),
  (null , 'RAM', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 3 ),
  (null , 'RAM', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 4 ),
  (null , 'Disco', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 1 ),
  (null , 'Disco', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 2 ),
  (null , 'Disco', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 3 ),
  (null , 'Disco', 'Generico', '1600.00', 8,'1600GHz', 2, 16, 4 );
  
  insert into monitoramento values (null, 95, '2022-09-24 02:46:00', 1);
  
  INSERT INTO Monitoramento VALUES
  (null, 60, '2022-09-25 02:46:00', 10),
  (null, 57, '2022-09-25 03:57:00', 2),
  (null, 39, '2022-09-25 04:18:00', 3),
  (null, 80, '2022-09-25 05:29:00', 4),
  (null, 64, '2022-09-25 06:30:00', 5),
  (null, 70, '2022-09-25 07:41:00', 6),
  (null, 58, '2022-09-25 08:52:00', 7),
  (null, 30, '2022-09-25 09:03:00', 8),
  (null, 0, '2022-09-25 09:04:00', 6);
  
  INSERT INTO Pergunta VALUES
  (null, 'Nesta semana, você teve uma otimo comunicação com seu time?', 5, 6),
  (null, 'Nesta semana, Você teve algum contato ou interação com seu gestor/responsavel?', 5, 6),
  (null, 'Nesta semana, você teve uma otima experiencia com este novo sistema?', 5, 6),
  (null, 'Nesta semana, Você teve algum contato ou interação com seu gestor/responsavel?', 5, 6),
  (null, 'Nesta semana, você teve uma otima experiencia com este novo sistema?', 5, 6);

  select * from pesquisa join pergunta on fkPesquisa = idPesquisa;
  
  -- Select tela de máquinas
  select idComputador, marca, modeloComputador, usuario.nomeUsuario, avg(dado)
  from usuario join usuario as supervisionador 
  on usuario.fkSupervisionador = supervisionador.idUsuario join Computador
  on usuario.IdUsuario = fkUsuario join Componente
  on idComputador = fkComputador join Monitoramento
  on idComponente = fkComponente
  where supervisionador.IdUsuario = 1 and dataHora like '____-09-24%' group by idComputador;
  
  -- Select Máquinas Individuais
  select marca, modeloComputador, sistemaOperacional, arquitetura, fkUsuario from computador where fkUsuario = 2;
  
  select idComputador, tipoComponente, velocidade, capacidade, unidadeMedida from componente join computador on fkComputador = idComputador where tipoComponente = 'CPU' and fkUsuario = 2 union
  select idComputador, tipoComponente, velocidade, capacidade, unidadeMedida from componente join computador on fkComputador = idComputador where tipoComponente = 'RAM' and fkUsuario = 2 union
  select idComputador, tipoComponente, velocidade, capacidade, unidadeMedida from componente join computador on fkComputador = idComputador where tipoComponente = 'Disco' and fkUsuario = 2;
  
  -- Select últimos dados
  select distinct(idComponente), tipoComponente, idRegistro, dado from componente 
  join computador on fkComputador = idComputador 
  join monitoramento on fkComponente = idComponente
  where fkComputador = 1 order by idComponente;
  
  -- Select tela dos funcionários 1
  select usuario.nomeUsuario, horaInicio, horaFim, minutoExtra, usuario.cargoUsuario, supervisionador.nomeUsuario 
  from usuario join usuario as supervisionador on usuario.fkSupervisionador = supervisionador.idUsuario
  join apontamentoHoras on apontamentoHoras.fkUsuario = usuario.idUsuario
  where supervisionador.idUsuario = 1 and horaInicio like '____-09%'
  group by idApontamento 
  order by usuario.idUsuario;
  
  select * from apontamentoHoras;
  
  -- Select tela dos funcionários 2
  select idPesquisa, usuario.nomeUsuario, dataPesquisa, sum(resposta) from pergunta
  join pesquisa on fkPesquisa = idPesquisa
  join usuario on fkUsuario = idUsuario
  join usuario as supervisionador on usuario.fkSupervisionador = supervisionador.idUsuario
  where supervisionador.idUsuario = 1 and dataPesquisa like '____-09%'
  group by idPesquisa order by usuario.idUsuario;
  
  -- Select dos componentes CPU
  select tipoComponente, dado, dataHora from monitoramento join componente
  on fkComponente = idComponente join computador on fkComputador = idComputador
  where fkUsuario = 2 and tipoComponente = 'CPU' order by idRegistro desc;
  
  -- Select dos componentes Disco
    select tipoComponente, dado, dataHora from monitoramento join componente
  on fkComponente = idComponente join computador on fkComputador = idComputador
  where fkUsuario = 3 and tipoComponente = 'Disco' order by idRegistro desc;



/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DOUBLE,
	umidade DOUBLE,
	momento DATETIME,
	fk_aquario INT
);


