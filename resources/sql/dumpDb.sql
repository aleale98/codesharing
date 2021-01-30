-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 25, 2021 alle 17:24
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `codesharing`
--
CREATE DATABASE IF NOT EXISTS `codesharing` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `codesharing`;

-- --------------------------------------------------------

--
-- Struttura della tabella `code`
--

DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `idCode` int(11) NOT NULL,
  `bin` mediumtext CHARACTER SET utf8 DEFAULT NULL,
  `language` varchar(32) NOT NULL,
  `creator` varchar(32) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `code`
--

INSERT INTO `code` (`idCode`, `bin`, `language`, `creator`) VALUES
(1, '// bin 1\npublic class Bin1{\n    public static void main(String[] args){\n        //code here\n    }\n}', 'java', 'aleale98'),
(2, '//bin 2\n<?php \n    echo \"Ciao\";\n    echo \"Update\";\n?>', 'php', 'aleale98'),
(3, '// bin3\npublic class Bin3{\n    public static void main(String[] args){\n        System.out.println(\"Ciao\");\n    }\n}', 'java', 'pluto');

-- --------------------------------------------------------

--
-- Struttura della tabella `links`
--

DROP TABLE IF EXISTS `links`;
CREATE TABLE `links` (
  `link` varchar(80) NOT NULL,
  `idCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `links`
--

INSERT INTO `links` (`link`, `idCode`) VALUES
('http://localhost:8080/tweb/progetto/resources/html/bin.php?mode=view&id=1', 1),
('http://localhost:8080/tweb/progetto/resources/html/bin.php?mode=view&id=2', 2),
('http://localhost:8080/tweb/progetto/resources/html/bin.php?mode=view&id=3', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(32) CHARACTER SET utf8 NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('aleale98', 'd2462e55381a20059ed811cefd42493e'),
('alessio', 'd2462e55381a20059ed811cefd42493e'),
('lorenzo', '3334703c735bd09f54c377b4dfaac1c3'),
('paperino', 'b54b45b19ca1f1ddc424e6b878a53f2d'),
('pluto', 'c6009f08fc5fc6385f1ea1f5840e179f'),
('prof', 'd450c5dbcc10db0749277efc32f15f9f');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`idCode`),
  ADD KEY `creator` (`creator`);

--
-- Indici per le tabelle `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`link`,`idCode`),
  ADD KEY `idCode` (`idCode`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `code`
--
ALTER TABLE `code`
  MODIFY `idCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `code`
--
ALTER TABLE `code`
  ADD CONSTRAINT `code_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`username`);

--
-- Limiti per la tabella `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`idCode`) REFERENCES `code` (`idCode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
