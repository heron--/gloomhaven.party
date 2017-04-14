# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: Gloomhaven
# Generation Time: 2017-04-14 16:56:39 +0000
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

LOCK TABLES `Character-Perk` WRITE;
/*!40000 ALTER TABLE `Character-Perk` DISABLE KEYS */;

INSERT INTO `Character-Perk` (`characterId`, `perkId`)
VALUES
	(3,62);

/*!40000 ALTER TABLE `Character-Perk` ENABLE KEYS */;
UNLOCK TABLES;


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
  KEY `Characters_CharacterClasses` (`classId`),
  CONSTRAINT `Characters_CharacterClasses` FOREIGN KEY (`classId`) REFERENCES `CharacterClasses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Characters` WRITE;
/*!40000 ALTER TABLE `Characters` DISABLE KEYS */;

INSERT INTO `Characters` (`id`, `classId`, `name`, `level`, `experienceNotes`, `goldNotes`, `items`, `checks`, `notes`, `retired`)
VALUES
	(3,5,'El Clavo',3,'120','29','Sexy Leather Armor',3,'Kill 10 Forest Imps',0),
	(4,15,'Gregory',9,'2010','929','Unsexy Leather Armor',9,'KILL EVERYTHING',1);

/*!40000 ALTER TABLE `Characters` ENABLE KEYS */;
UNLOCK TABLES;


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
  PRIMARY KEY (`id`),
  KEY `Perk_CharacterClass` (`characterClassId`),
  CONSTRAINT `Perk_CharacterClass` FOREIGN KEY (`characterClassId`) REFERENCES `CharacterClasses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Perks` WRITE;
/*!40000 ALTER TABLE `Perks` DISABLE KEYS */;

INSERT INTO `Perks` (`id`, `characterClassId`, `description`)
VALUES
	(1,1,'Remove two -1 cards'),
	(2,1,'Replace one -1 card with one +1 card'),
	(3,1,'Add two +1 cards'),
	(4,1,'Add two +1 cards'),
	(5,1,'Add one +3 card'),
	(6,1,'Add three ROLLING MODIFIER PUSH 1 cards'),
	(7,1,'Add three ROLLING MODIFIER PUSH 1 cards'),
	(8,1,'Add two ROLLING MODIFIER PIERCE 3 cards'),
	(9,1,'Add one ROLLING MODIFIER STUN card'),
	(10,1,'Add one ROLLING MODIFIER DISARM card and one ROLLING MODIFIER MUDDLE card'),
	(11,1,'Add one ROLLING MODIFIER ADD TARGET card'),
	(12,1,'Add one ROLLING MODIFIER ADD TARGET card'),
	(13,1,'Add one +1 Shield 1, Self card'),
	(14,1,'Ignore negative item effects and add one +1 card'),
	(15,2,'Remove four +0 cards'),
	(16,2,'Replace one -1 card with one +1 card'),
	(17,2,'Replace one -1 card with one +1 card'),
	(18,2,'Replace one -1 card with one +1 card'),
	(19,2,'Add one -2 card and two +2 cards'),
	(20,2,'Add one +1 IMMOBILIZE card'),
	(21,2,'Add one +1 IMMOBILIZE card'),
	(22,2,'Add one +2 MUDDLE card'),
	(23,2,'Add one +2 MUDDLE card'),
	(25,2,'Add two ROLLING MODIFIER PUSH 2 cards'),
	(26,2,'Add two ROLLING MODIFIER EARTH cards'),
	(27,2,'Add two ROLLING MODIFIER EARTH cards'),
	(28,2,'Add two ROLLING MODIFIER AIR cards'),
	(30,2,'Ignore negative item effects'),
	(31,2,'Ignore negative scenario effects'),
	(32,3,'Remove two -1 cards'),
	(33,3,'Remove two -1 cards'),
	(34,3,'Remove four +0 cards'),
	(35,3,'Replace two +1 cards with two +2 cards'),
	(36,3,'Replace one -2 card with one +0 card'),
	(37,3,'Add one +2 ICE card'),
	(38,3,'Add one +2 ICE card'),
	(39,3,'Add two ROLLING MODIFIER +1 cards'),
	(41,3,'Add two ROLLING MODIFIER +1 cards'),
	(42,3,'Add three ROLLING MODIFIER PULL 1 cards'),
	(43,3,'Add three ROLLING MODIFIER MUDDLE cards'),
	(44,3,'Add two ROLLING MODIFIER IMMOBILIZE cards'),
	(45,3,'Add one ROLLING MODIFIER DISARM card and one ROLLING MODIFIER MUDDLE card'),
	(46,3,'Ignore negative scenario effects'),
	(47,4,'Remove four +0 cards'),
	(48,4,'Replace one -1 card with one +1 card'),
	(49,4,'Replace one -1 card with one +1 card'),
	(50,4,'Add two +1 cards'),
	(51,4,'Add two +1 cards'),
	(52,4,'Add one +0 STUN card'),
	(53,4,'Add one +1 WOUND card'),
	(54,4,'Add one +1 IMMOBILIZE card'),
	(55,4,'Add one +1 CURSE card'),
	(56,4,'Add one +2 FIRE card'),
	(57,4,'Add one +2 ICE card'),
	(58,4,'Add one ROLLING MODIFIER EARTH card and one ROLLING MODIFIER AIR card'),
	(59,4,'Add one ROLLING MODIFIER LIGHT card and one ROLLING MODIFIER DARK card'),
	(60,5,'Remove two -1 cards'),
	(61,5,'Remove two -1 cards'),
	(62,5,'Remove four +0 cards'),
	(63,5,'Replace one -2 card with one +1 card'),
	(64,5,'Replace one -1 card with one +1 card'),
	(65,5,'Replace one +0 card with one +2 card'),
	(66,5,'Replace one +0 card with one +2 card'),
	(67,5,'Add two ROLLING MODIFIER +1 cards'),
	(68,5,'Add two ROLLING MODIFIER +1 cards'),
	(69,5,'Add two ROLLING MODIFIER PIERCE 3 cards'),
	(70,5,'Add two ROLLING MODIFIER POISON cards'),
	(71,5,'Add two ROLLING MODIFIER POISON cards'),
	(72,5,'Add two ROLLING MODIFIER MUDDLE cards'),
	(73,5,'Add one ROLLING MODIFIER Invisible card'),
	(74,5,'Ignore negative scenario effects'),
	(75,6,'Remove two -1 cards'),
	(76,6,'Remove two -1 cards'),
	(77,6,'Replace one -2 card with one +0 card'),
	(78,6,'Add two +1 cards'),
	(79,6,'Add one +3 card'),
	(80,6,'Add two ROLLING MODIFIER FIRE cards'),
	(81,6,'Add three ROLLING MODIFIER MUDDLE cards'),
	(82,6,'Add one +1 WOUND card'),
	(83,6,'Add one +1 WOUND card'),
	(84,6,'Add one +1 IMMOBILIZE card'),
	(85,6,'Add one +1 IMMOBILIZE card'),
	(86,6,'Add one +1 Heal 2 card'),
	(87,6,'Add one +1 Heal 2 card'),
	(88,6,'Add one +0 ADD TARGET card'),
	(89,6,'Ignore negative scenario effects');

/*!40000 ALTER TABLE `Perks` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `User-Character` WRITE;
/*!40000 ALTER TABLE `User-Character` DISABLE KEYS */;

INSERT INTO `User-Character` (`userId`, `characterId`)
VALUES
	(8,3),
	(8,4);

/*!40000 ALTER TABLE `User-Character` ENABLE KEYS */;
UNLOCK TABLES;


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
