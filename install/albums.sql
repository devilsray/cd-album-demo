-- MySQL dump 10.15  Distrib 10.0.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.0.29-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` longtext,
  `label` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,'Century Child [ˈsɛntʃəɹi ˈtʃaɪld] ist das vierte Album der finnischen Metal-Band Nightwish. Es erschien am 24. Juni 2002 und war das erste Nightwish-Album, bei dem Marco Hietala als Bassist sowie als gesanglicher Gegenpart zu Sängerin Tarja Turunen mitwirkte. Century Child wird von vielen Leuten als Konzeptalbum angesehen, was es laut Keyboarder Tuomas Holopainen in gewisser Weise auch ist.','Nightwish - Century Child',2002),(2,'The Fame (deutsch: „Der Ruhm“) ist das Debütalbum der US-amerikanischen Sängerin Lady Gaga. Es wurde erstmals im Sommer 2008 veröffentlicht, die internationale Veröffentlichung erfolgte Ende 2008 beziehungsweise Anfang 2009. Mit diesem Album gelang ihr der weltweite Durchbruch. Mit rund 15 Millionen verkauften Exemplaren gehört das Debütalbum sogar zu den erfolgreichsten des Jahrzehnts. Alle Singleauskopplungen erreichten in Deutschland, den Vereinigten Staaten, Australien, Kanada, Österreich und anderen Ländern die Top Ten der Charts. In Deutschland erreichte das Album 9-fach Goldstatus (4 x Platin + 1 x Gold). In mehr als 23 Ländern bekam The Fame Mehrfach-Platin.','Lady Gaga',2008),(3,'Soundtrack zum Film: \nHackers is a 1995 American crime film directed by Iain Softley and starring Jonny Lee Miller, Angelina Jolie, Renoly Santiago, Matthew Lillard, Jesse Bradford, Lorraine Bracco, and Fisher Stevens. The film follows a group of high school hackers and their involvement in a corporate extortion conspiracy. Made in the 1990s when the internet was unfamiliar to the general public, it reflects the ideals laid out in the Hacker Manifesto quoted in the film: \"This is our world now... the world of the electron and the switch [...] We exist without skin color, without nationality, without religious bias... and you call us criminals. [...] Yes, I am a criminal. My crime is that of curiosity.\" Hackers has achieved cult classic status.[3]','Hackers',1996);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums_titles_mapping`
--

DROP TABLE IF EXISTS `albums_titles_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums_titles_mapping` (
  `albums_id` bigint(20) NOT NULL,
  `titles_id` bigint(20) NOT NULL,
  KEY `FKkujqean5qbq1yyarymhf9hykq` (`titles_id`),
  KEY `FK2qvb610vbiouyum109u9r6689` (`albums_id`),
  CONSTRAINT `FK2qvb610vbiouyum109u9r6689` FOREIGN KEY (`albums_id`) REFERENCES `albums` (`id`),
  CONSTRAINT `FKkujqean5qbq1yyarymhf9hykq` FOREIGN KEY (`titles_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums_titles_mapping`
--

LOCK TABLES `albums_titles_mapping` WRITE;
/*!40000 ALTER TABLE `albums_titles_mapping` DISABLE KEYS */;
INSERT INTO `albums_titles_mapping` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,13),(1,12),(2,14),(2,15),(2,16),(2,17),(2,18),(2,19),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,28),(3,29),(3,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42);
/*!40000 ALTER TABLE `albums_titles_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Nightwish'),(2,'Lady Gaga'),(4,'Kruder & Dorfmeister'),(5,'Underworld'),(6,'Prodigy'),(7,'Leftfield'),(8,'Carl Cox'),(9,'Josh Abrahams'),(10,'Orbital'),(11,'Plastico'),(12,'Stereo MC\'s'),(13,'Ramshackle'),(14,'Urban Dance Squad'),(15,'Machines Of Loving Grace'),(16,'Squeeze');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titles`
--

DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `titles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `artist_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKihmkjyucepvgrjgnqya7r9u1p` (`artist_id`),
  CONSTRAINT `FKihmkjyucepvgrjgnqya7r9u1p` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titles`
--

LOCK TABLES `titles` WRITE;
/*!40000 ALTER TABLE `titles` DISABLE KEYS */;
INSERT INTO `titles` VALUES (1,'Bless the Child',1),(2,'End of All Hope',1),(3,'Dead to the World',1),(4,'Ever Dream',1),(5,'Slaying Thre Dreamer',1),(6,'Forever Yours',1),(7,'Ocean Soul',1),(8,'Feel For You',1),(9,'The Phantom of the Opera',1),(10,'Beauty of the Beast',1),(11,'Long Lost Love',1),(12,'One More Night to Live',1),(13,'Christable',1),(14,'Just Dance',2),(15,'LoveGame',2),(16,'Paparazzi',2),(17,'Poker Face',2),(18,'Eh, Eh (Nothing Else I Can Say)',2),(19,'Beautiful, Dirty, Rich',2),(20,'The Fame',2),(21,'Money Honey',2),(22,'Starstruck',2),(23,'Boys Boys Boys',2),(24,'Paper Gangsta',2),(25,'Brown Eyes',2),(26,'I Like It Rough',2),(27,'Summerboy',2),(28,'Disco Heaven',2),(29,'Original Bedroom Rockers',4),(30,'Cowgirl',5),(31,'Voodoo People',6),(32,'Open Up',7),(33,'Phoebus Apollo',8),(34,'The Joker',9),(35,'Halcyon & On & On',10),(36,'Communicate',11),(37,'One Love',6),(38,'Connected',12),(39,'Eyes, Lips, Body',13),(40,'Good Grief',14),(41,'Richest Junkie Still Alive',15),(42,'Heaven Knows',16);
/*!40000 ALTER TABLE `titles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-19 12:51:02
