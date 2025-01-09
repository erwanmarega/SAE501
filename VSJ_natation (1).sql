-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 09 jan. 2025 à 09:16
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `VSJ_natation`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `group_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` int NOT NULL,
  `duration` time NOT NULL,
  `intensity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_defined` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `attendance`
--

CREATE TABLE `attendance` (
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `calendar_event`
--

CREATE TABLE `calendar_event` (
  `id` int NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `calendar_event`
--

INSERT INTO `calendar_event` (`id`, `date`, `status`, `title`, `details`) VALUES
(1, '12/07/2024', 'training', 'Session d\'entraînement', '{\"description\": \"Entraînement intensif\"}');

-- --------------------------------------------------------

--
-- Structure de la table `coach`
--

CREATE TABLE `coach` (
  `id` int NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `competition`
--

CREATE TABLE `competition` (
  `id` int NOT NULL,
  `group_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_date` date NOT NULL,
  `hour_date` time NOT NULL,
  `duration` time NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_defined` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `competition`
--

INSERT INTO `competition` (`id`, `group_id`, `title`, `day_date`, `hour_date`, `duration`, `address`, `category`, `description`, `is_defined`) VALUES
(2, 6, 'Compétition Hiver', '2025-01-09', '10:00:00', '02:00:00', 'Piscine municipale  L’Hippocampe - Rue Entroncamento – 94350 Villiers-sur-Marne', 'Regional', 'Compétition régional.', 1);

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20241215152828', '2024-12-15 15:28:38', 18),
('DoctrineMigrations\\Version20241216104213', '2024-12-16 10:42:19', 10),
('DoctrineMigrations\\Version20241216145432', '2024-12-16 14:54:39', 23),
('DoctrineMigrations\\Version20241219124959', '2024-12-19 12:50:11', 26),
('DoctrineMigrations\\Version20241219141925', '2024-12-19 14:19:29', 50),
('DoctrineMigrations\\Version20241220123533', '2024-12-20 12:35:38', 43),
('DoctrineMigrations\\Version20241221182941', '2024-12-21 18:30:05', 18),
('DoctrineMigrations\\Version20241223185232', '2024-12-23 18:52:52', 44),
('DoctrineMigrations\\Version20241223221543', '2024-12-25 08:03:35', 3),
('DoctrineMigrations\\Version20241225081155', '2024-12-25 08:12:32', 12),
('DoctrineMigrations\\Version20241225082650', '2024-12-25 08:32:51', 31),
('DoctrineMigrations\\Version20241226095011', '2024-12-26 09:59:06', 25),
('DoctrineMigrations\\Version20241228074309', '2024-12-28 07:43:17', 50),
('DoctrineMigrations\\Version20250102205945', '2025-01-02 20:59:54', 21),
('DoctrineMigrations\\Version20250104211325', '2025-01-04 21:13:32', 36);

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE `groups` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `groups`
--

INSERT INTO `groups` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Natation bébé', '2024-12-25 08:56:23', '2024-12-25 08:56:23'),
(2, 'Natation enfants', '2024-12-25 08:56:23', '2024-12-25 08:56:23'),
(3, 'Natation ados', '2024-12-25 08:56:23', '2024-12-25 08:56:23'),
(5, 'Aquagym', '2024-12-25 08:56:23', '2024-12-25 08:56:23'),
(6, 'Natation Adultes', '2024-12-25 09:38:02', '2024-12-25 09:38:02'),
(7, 'Aquabike', '2024-12-25 09:38:15', '2024-12-25 09:38:15');

-- --------------------------------------------------------

--
-- Structure de la table `membership`
--

CREATE TABLE `membership` (
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `sender_id` int NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `receiver_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `content`, `created_at`, `receiver_id`) VALUES
(6, 66, 'Salut, comment vas-tu ?', '2025-01-04 21:22:48', 65),
(7, 66, 'tu t\'en sors ?', '2025-01-05 15:08:04', 64),
(9, 66, 'Ohhhh', '2025-01-05 17:33:40', 65),
(10, 66, 'j\'ai réussi', '2025-01-05 17:33:44', 65),
(11, 66, 'merci à tous', '2025-01-05 17:33:46', 65),
(14, 66, 'oui', '2025-01-05 17:46:27', 65),
(15, 65, 'd\'accord', '2025-01-05 17:46:56', 66),
(16, 65, 'trop bien', '2025-01-05 17:55:59', 66),
(17, 65, 'yes', '2025-01-05 17:56:09', 66),
(18, 66, 'ouiii', '2025-01-05 17:57:44', 65),
(19, 65, 'ta vu', '2025-01-05 17:57:54', 66),
(20, 66, 'je regarde si ça marche', '2025-01-05 17:59:46', 65),
(21, 66, 'Salut !!', '2025-01-05 18:44:47', 65),
(22, 66, 'bon je test ici', '2025-01-05 18:45:19', 64),
(23, 64, 'oh ptn laurent', '2025-01-05 18:45:59', 66),
(24, 65, 'cc', '2025-01-06 13:01:00', 66),
(25, 66, 'salut', '2025-01-06 13:01:20', 65),
(26, 65, 're', '2025-01-06 13:27:54', 66),
(27, 66, 'yes', '2025-01-06 13:59:36', 65),
(28, 65, 'ça va ?', '2025-01-06 14:04:33', 66),
(29, 66, 'salut ', '2025-01-06 14:52:07', 68),
(30, 68, 'salut', '2025-01-06 14:56:10', 66),
(31, 66, 'bro ', '2025-01-06 14:57:05', 68),
(32, 68, 'carré ça marche', '2025-01-06 14:57:16', 66),
(33, 64, 'Il faut une bonne note à cette SAE', '2025-01-06 14:58:50', 68),
(34, 65, 'J\'avance bien sur le front !', '2025-01-06 15:00:27', 68),
(35, 68, '', '2025-01-06 17:58:53', 69),
(36, 68, 'saluttt', '2025-01-06 17:59:02', 69),
(37, 64, '', '2025-01-06 18:03:43', 69),
(38, 64, '', '2025-01-06 18:03:54', 69),
(39, 64, 'voila', '2025-01-06 18:07:12', 69),
(40, 64, 'ok', '2025-01-06 20:33:17', 69),
(41, 68, 'wake up', '2025-01-08 11:44:00', 64),
(42, 68, 'maman je passe à la télé !!!', '2025-01-08 14:00:05', 64);

-- --------------------------------------------------------

--
-- Structure de la table `performances`
--

CREATE TABLE `performances` (
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `swimmer`
--

CREATE TABLE `swimmer` (
  `id` int NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code_postal` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `swimmer`
--

INSERT INTO `swimmer` (`id`, `nom`, `prenom`, `date_naissance`, `adresse`, `code_postal`, `ville`, `telephone`, `email`, `password`, `roles`) VALUES
(62, 'Marega', 'Erwan ', '2024-12-30', '12 impasse du port', '77440', 'Mary-sur-Marne', '0757551598', 'testmail@gmail.com', '$2y$13$/8TGeBVIPuB4sdMpUqqBRuOMKtaMZMJS7OqhbYoIF/6Y3Nurs6u/u', '[\"ROLE_USER\"]'),
(64, 'Fontaine', 'Valentin', '2004-02-07', '10, 12, 14 bureau', '77440', 'Meaux', '0303030303', 'valentin@gmail.com', '$2y$13$6vc62ZqZYiKT/fomaYZEwuTubw3i45vZ2NHyRL.ajjvG.7tUcAcbW', '[\"ROLE_USER\"]'),
(65, 'Moulin', 'Antoine ', '2004-01-09', '1 avenue du test ', '77000', 'Serris', '0303030303', 'antoine@gmail.com', '$2y$13$mjIJF1VPULgm4/Bn9CUcO.Ggw54ZL0dkV85XOtYYWvdp26B0JQMpK', '[\"ROLE_USER\"]'),
(66, 'Leszek', 'Alan', '2004-06-09', '1 avenue du test du zoo', '77330', 'lognes', '0303030303', 'alan@gmail.com', '$2y$13$BFa7mr8KKcVLvr4wYvfC3e9NrxTft/3x5L4GW5J7iuz4GVQd5hgle', '[\"ROLE_USER\"]'),
(68, 'Marega', 'Erwan ', '2004-02-07', '1 square de la croix du sud', '77440', 'Mary-sur-Marne', '0757551598', 'maregaerwan@gmail.com', '$2y$13$LHJ5gXCpvVEF31wxAhGaxePWvXUMC/V9Op1v/LhkQP0Tm2grWcKh2', '[\"ROLE_USER\"]'),
(69, 'test', 'test', '2000-06-13', 'test avenue du test', '10000', 'testland', '0000000000', 'test@gmail.com', '$2y$13$OC/ThjVYrhG/XH7X0I221uz9YwnsdRiJ7DF/Ebh7gMGm.UiHH339i', '[\"ROLE_USER\"]'),
(70, 'lalo', 'Erwan ', '2024-07-01', '12 impasse du port', '77100', 'Meaux', '0101010101', 'test5@gmail.com', '$2y$13$NCXmJwIOxHlU18bECsPVHeRrNVzgslTXk6yyWPxEDRaDT3cmsbIrW', '[\"ROLE_USER\"]'),
(71, 'lmerletti', 'Er1', '2001-06-06', '4 rue notre dame', '77440', 'Meaux', '0303030303', 'test444@gmail.com', '$2y$13$wLIZ27an23N9a6pEFizr5enQwny1KfH5n7IDtIWtrnK.WPr1g/TFO', '[\"ROLE_USER\"]'),
(72, 'Coubeh', 'Erwan ', '2006-10-25', '10, 12, 14 bureau', '77440', 'Meaux', '0303030303', 'test55@gmail.com', '$2y$13$3hu3UJ4Ggc5FAKWHlbpH8uEUfjWnNjvDBN5ubY4YCzljTDekw8gDa', '[\"ROLE_USER\"]'),
(73, 'test', 'invite', '1995-05-09', 'test avenue de l\'invite', '77100', 'invite_land', '0606060606', 'invite@gmail.com', '$2y$13$lc4N1g/x59fDNKSV74hMsuV5gxS7kbH.Y7bYdLkMTpncRsb4EDuUS', '[\"ROLE_USER\"]');

-- --------------------------------------------------------

--
-- Structure de la table `training`
--

CREATE TABLE `training` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` time NOT NULL,
  `intensity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_defined` tinyint(1) NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `training`
--

INSERT INTO `training` (`id`, `title`, `start_date`, `duration`, `intensity`, `category`, `description`, `is_defined`, `group_id`) VALUES
(5, 'Séance Test', '2024-12-26 14:30:00', '02:00:00', 'high', 'technique', 'Description test', 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_880E0D76FE54D947` (`group_id`);

--
-- Index pour la table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `calendar_event`
--
ALTER TABLE `calendar_event`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `competition`
--
ALTER TABLE `competition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B50A2CB1FE54D947` (`group_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_DB021E96F624B39D` (`sender_id`),
  ADD KEY `IDX_DB021E96CD53EDB6` (`receiver_id`);

--
-- Index pour la table `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `swimmer`
--
ALTER TABLE `swimmer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_ED2BC5D2E7927C74` (`email`);

--
-- Index pour la table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D5128A8FFE54D947` (`group_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `calendar_event`
--
ALTER TABLE `calendar_event`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `coach`
--
ALTER TABLE `coach`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `competition`
--
ALTER TABLE `competition`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `membership`
--
ALTER TABLE `membership`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `performances`
--
ALTER TABLE `performances`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `swimmer`
--
ALTER TABLE `swimmer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `training`
--
ALTER TABLE `training`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FK_880E0D76FE54D947` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Contraintes pour la table `competition`
--
ALTER TABLE `competition`
  ADD CONSTRAINT `FK_B50A2CB1FE54D947` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `FK_DB021E96CD53EDB6` FOREIGN KEY (`receiver_id`) REFERENCES `swimmer` (`id`),
  ADD CONSTRAINT `FK_DB021E96F624B39D` FOREIGN KEY (`sender_id`) REFERENCES `swimmer` (`id`);

--
-- Contraintes pour la table `training`
--
ALTER TABLE `training`
  ADD CONSTRAINT `FK_D5128A8FFE54D947` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
