-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 29 avr. 2023 à 11:49
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `basefivem`
--

-- --------------------------------------------------------

--
-- Structure de la table `items`
--

CREATE TABLE `items` (
  `name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  `weight` int(11) NOT NULL DEFAULT 1,
  `rare` tinyint(4) NOT NULL DEFAULT 0,
  `can_remove` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `items`
--

INSERT INTO `items` (`name`, `label`, `weight`, `rare`, `can_remove`) VALUES
('armor', 'Gilet par balle', -1, 0, 1),
('burger', 'Burger', 1, 0, 1),
('coca', 'Coca', 1, 0, 1),
('fries', 'Frite', 1, 0, 1),
('hotdog', 'Hot-Dog', 1, 0, 1),
('icetea', 'Ice-Tea', 1, 0, 1),
('jsm', 'Jus de mangue', 1, 0, 1),
('pizza', 'Pizza', 1, 0, 1),
('popcorn', 'Pop Corn', 1, 0, 1),
('radio', 'Rado', 1, 0, 1),
('ramen', 'Ramen', 1, 0, 1),
('red', 'Red Bull', 1, 0, 1),
('rhum', 'Rhum', 1, 0, 1),
('sim', 'Carte Sim', 1, 0, 1),
('sprite', 'Sprite', 1, 0, 1),
('taco', 'Taco', 1, 0, 1),
('tacot', 'Tacos', 1, 0, 1),
('tavuknuggets', 'Nuggets', 1, 0, 1),
('telephone', 'Telephone', 1, 0, 1),
('vin', 'Vin', 1, 0, 1),
('vodka', 'Vodka', 1, 0, 1),
('water', 'Eau', 1, 0, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
