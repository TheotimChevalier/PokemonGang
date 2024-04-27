-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 01 mars 2024 à 09:28
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pokemongang`
--

-- --------------------------------------------------------

--
-- Structure de la table `users_pokemons`
--

CREATE TABLE `users_pokemons` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_pokemon` int(11) NOT NULL,
  `surname` varchar(12) DEFAULT NULL,
  `hp` int(11) NOT NULL,
  `xp` int(11) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `nature` tinyint(4) DEFAULT NULL,
  `stat_nature` tinyint(4) DEFAULT NULL,
  `ability` int(11) DEFAULT NULL,
  `friendship` tinyint(4) DEFAULT NULL,
  `origin_world` int(11) DEFAULT NULL,
  `origin_pokeball` int(11) DEFAULT NULL,
  `origin_level` int(11) DEFAULT NULL,
  `origin_date` int(11) DEFAULT NULL,
  `iv_hp` smallint(6) NOT NULL,
  `iv_atk` smallint(6) NOT NULL,
  `iv_def` smallint(6) NOT NULL,
  `iv_sp_atk` smallint(6) NOT NULL,
  `iv_sp_def` smallint(6) NOT NULL,
  `iv_speed` smallint(6) NOT NULL,
  `ev_yield_hp` smallint(6) NOT NULL,
  `ev_yield_atk` smallint(6) NOT NULL,
  `ev_yield_def` smallint(6) NOT NULL,
  `ev_yield_sp_atk` smallint(6) NOT NULL,
  `ev_yield_sp_def` smallint(6) NOT NULL,
  `ev_yield_speed` smallint(6) NOT NULL,
  `move_0` int(11) DEFAULT NULL,
  `move_1` int(11) DEFAULT NULL,
  `move_2` int(11) DEFAULT NULL,
  `move_3` int(11) DEFAULT NULL,
  `move_0_pp` tinyint(4) DEFAULT NULL,
  `move_1_pp` tinyint(4) DEFAULT NULL,
  `move_2_pp` tinyint(4) DEFAULT NULL,
  `move_3_pp` tinyint(4) DEFAULT NULL,
  `location` tinyint(4) NOT NULL DEFAULT -1,
  `shiny` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users_pokemons`
--

INSERT INTO `users_pokemons` (`id`, `id_user`, `id_pokemon`, `surname`, `hp`, `xp`, `gender`, `nature`, `stat_nature`, `ability`, `friendship`, `origin_world`, `origin_pokeball`, `origin_level`, `origin_date`, `iv_hp`, `iv_atk`, `iv_def`, `iv_sp_atk`, `iv_sp_def`, `iv_speed`, `ev_yield_hp`, `ev_yield_atk`, `ev_yield_def`, `ev_yield_sp_atk`, `ev_yield_sp_def`, `ev_yield_speed`, `move_0`, `move_1`, `move_2`, `move_3`, `move_0_pp`, `move_1_pp`, `move_2_pp`, `move_3_pp`, `location`, `shiny`) VALUES
(1, 1, 384, NULL, 20, 135, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 30, 18, 21, 3, 10, 0, 0, 215, 13, 221, 200, 433, 304, 200, 63, 20, 20, 20, 5, 0, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users_pokemons`
--
ALTER TABLE `users_pokemons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_pokemons_id_pokemon` (`id_pokemon`),
  ADD KEY `users_pokemons_id_user` (`id_user`),
  ADD KEY `users_pokemons_move_0` (`move_0`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users_pokemons`
--
ALTER TABLE `users_pokemons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `users_pokemons`
--
ALTER TABLE `users_pokemons`
  ADD CONSTRAINT `users_pokemons_id_pokemon` FOREIGN KEY (`id_pokemon`) REFERENCES `pokemons` (`id`),
  ADD CONSTRAINT `users_pokemons_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_pokemons_move_0` FOREIGN KEY (`move_0`) REFERENCES `moves` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
