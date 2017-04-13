# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: Gloomhaven
# Generation Time: 2017-04-13 23:48:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Character-Perk
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Character-Perk`;

CREATE TABLE `Character-Perk` (
  `characterId` int(11) unsigned NOT NULL,
  `perkId` int(11) unsigned NOT NULL,
  KEY `fk_perk_character-perk` (`perkId`),
  KEY `fk_character_character-perk` (`characterId`),
  CONSTRAINT `fk_character_character-perk` FOREIGN KEY (`characterId`) REFERENCES `Characters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_perk_character-perk` FOREIGN KEY (`perkId`) REFERENCES `Perks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table CharacterClasses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CharacterClasses`;

CREATE TABLE `CharacterClasses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `displayName` varchar(128) NOT NULL DEFAULT '',
  `spoiler` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `CharacterClasses` WRITE;
/*!40000 ALTER TABLE `CharacterClasses` DISABLE KEYS */;

INSERT INTO `CharacterClasses` (`id`, `displayName`, `spoiler`)
VALUES
	(1,'Inox Brute',0),
	(2,'Savvas Cragheart',0),
	(3,'Vermling Mindthief',0),
	(4,'Orchid Spellweaver',0),
	(5,'Human Scoundrel',0),
	(6,'Quatryl Tinkerer',0),
	(7,'Beast Master',1),
	(8,'Static Shock',1),
	(9,'Zack Snyder',1),
	(10,'Shadow Link',1),
	(11,'Moon Baby',1),
	(12,'Mr Fish Monster',1),
	(13,'Oliver Queen',1),
	(14,'Lady Lumberjack',1),
	(15,'Bob Dylan',1),
	(16,'Swirly Twirly',1),
	(17,'BUZZSAW',1);

/*!40000 ALTER TABLE `CharacterClasses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Characters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Characters`;

CREATE TABLE `Characters` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `classId` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `level` int(11) NOT NULL DEFAULT '1',
  `experienceNotes` varchar(2048) DEFAULT NULL,
  `goldNotes` varchar(2048) DEFAULT NULL,
  `items` varchar(2048) DEFAULT NULL,
  `checks` int(11) NOT NULL DEFAULT '0',
  `notes` varchar(2048) DEFAULT NULL,
  `retired` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `Classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Parties
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Parties`;

CREATE TABLE `Parties` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '',
  `location` varchar(128) DEFAULT NULL,
  `notes` varchar(2048) DEFAULT NULL,
  `achievements` varchar(2048) DEFAULT NULL,
  `reputation` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Party-Character
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Party-Character`;

CREATE TABLE `Party-Character` (
  `partyId` int(11) unsigned NOT NULL,
  `characterId` int(11) unsigned NOT NULL,
  KEY `fk_party_party-character` (`partyId`),
  KEY `fk_character_party-character` (`characterId`),
  CONSTRAINT `fk_character_party-character` FOREIGN KEY (`characterId`) REFERENCES `Characters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_party_party-character` FOREIGN KEY (`partyId`) REFERENCES `Party` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Perks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Perks`;

CREATE TABLE `Perks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `characterClassId` int(11) unsigned NOT NULL,
  `description` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table User-Character
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User-Character`;

CREATE TABLE `User-Character` (
  `userId` int(11) unsigned NOT NULL,
  `characterId` int(11) unsigned NOT NULL,
  KEY `fk_user_user-character` (`userId`),
  KEY `fk_character_user-character` (`characterId`),
  CONSTRAINT `fk_character_user-character` FOREIGN KEY (`characterId`) REFERENCES `Characters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_user-character` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table User-Party
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User-Party`;

CREATE TABLE `User-Party` (
  `userId` int(11) unsigned NOT NULL,
  `partyId` int(11) unsigned NOT NULL,
  KEY `fk_party_user-party` (`partyId`),
  KEY `fk_user_user-party` (`userId`),
  CONSTRAINT `fk_party_user-party` FOREIGN KEY (`partyId`) REFERENCES `Party` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_user-party` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table User-Spoiler
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User-Spoiler`;

CREATE TABLE `User-Spoiler` (
  `userId` int(11) unsigned NOT NULL,
  `characterClassId` int(11) unsigned NOT NULL,
  KEY `fk_user_user-spoiler` (`userId`),
  KEY `fk_character-class_user-spoiler` (`characterClassId`),
  CONSTRAINT `fk_character-class_user-spoiler` FOREIGN KEY (`characterClassId`) REFERENCES `CharacterClasses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_user-spoiler` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `email` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `active`, `email`)
VALUES
	(8,1,'775400fbf852dc93e171312769132f89a2ad6b');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
