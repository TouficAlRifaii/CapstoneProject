-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: capstoneproject
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add course',7,'add_course'),(26,'Can change course',7,'change_course'),(27,'Can delete course',7,'delete_course'),(28,'Can view course',7,'view_course'),(29,'Can add course relation ship',8,'add_courserelationship'),(30,'Can change course relation ship',8,'change_courserelationship'),(31,'Can delete course relation ship',8,'delete_courserelationship'),(32,'Can view course relation ship',8,'view_courserelationship'),(33,'Can add student',9,'add_student'),(34,'Can change student',9,'change_student'),(35,'Can delete student',9,'delete_student'),(36,'Can view student',9,'view_student'),(37,'Can add section',10,'add_section'),(38,'Can change section',10,'change_section'),(39,'Can delete section',10,'delete_section'),(40,'Can view section',10,'view_section'),(41,'Can add major',11,'add_major'),(42,'Can change major',11,'change_major'),(43,'Can delete major',11,'delete_major'),(44,'Can view major',11,'view_major'),(45,'Can add availability',12,'add_availability'),(46,'Can change availability',12,'change_availability'),(47,'Can delete availability',12,'delete_availability'),(48,'Can view availability',12,'view_availability'),(49,'Can add doctor',13,'add_doctor'),(50,'Can change doctor',13,'change_doctor'),(51,'Can delete doctor',13,'delete_doctor'),(52,'Can view doctor',13,'view_doctor'),(53,'Can add study plan',14,'add_studyplan'),(54,'Can change study plan',14,'change_studyplan'),(55,'Can delete study plan',14,'delete_studyplan'),(56,'Can view study plan',14,'view_studyplan');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_availability`
--

DROP TABLE IF EXISTS `backend_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_availability` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `days` varchar(5) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_availability`
--

LOCK TABLES `backend_availability` WRITE;
/*!40000 ALTER TABLE `backend_availability` DISABLE KEYS */;
INSERT INTO `backend_availability` VALUES (1,'M','01:00','01:04'),(2,'M','01:00','01:04'),(3,'M','01:00','01:04'),(4,'M','01:00','01:04'),(5,'M','01:00','01:04'),(6,'M','00:00','01:00'),(7,'M','00:00','01:00'),(8,'MTW','01:00','03:00'),(9,'MTW','01:00','03:00'),(10,'MTW','01:00','03:00'),(11,'MTW','01:00','03:00'),(12,'MTW','01:00','03:00'),(13,'MTW','01:00','03:00'),(14,'M','02:00','03:00'),(15,'M','02:00','03:00'),(16,'M','02:00','03:00'),(17,'M','02:00','03:00'),(18,'M','01:02','02:03'),(19,'M','12:23','00:32'),(20,'M','12:23','00:32'),(21,'MWF','12:00','17:00'),(22,'TR','14:15','15:30'),(24,'M','01:00','12:20'),(25,'M','01:00','12:20'),(26,'M','01:00','12:20'),(27,'TW','15:00','18:00'),(28,'FR','2:00','3:00'),(29,'TW','15:00','18:00'),(30,'FR','2:00','3:00'),(33,'TW','15:00','18:00'),(34,'FR','2:00','3:00'),(35,'TW','15:00','18:00'),(50,'TW','15:00','18:00'),(51,'FR','2:00','3:00'),(55,'TR','11:00','12:15'),(59,'TR','11:00','12:15'),(60,'TR','12:30','13:45'),(61,'TR','14:00','15:30'),(62,'F','01:01','13:01'),(67,'MFW','08:00','08:50'),(68,'MWF','09:00','09:50'),(70,'MWF','13:57','17:59');
/*!40000 ALTER TABLE `backend_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_course`
--

DROP TABLE IF EXISTS `backend_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `courseNumber` varchar(5) NOT NULL,
  `title` varchar(255) NOT NULL,
  `creditsNumber` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_course_subject_courseNumber_7ad9aecb_uniq` (`subject`,`courseNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_course`
--

LOCK TABLES `backend_course` WRITE;
/*!40000 ALTER TABLE `backend_course` DISABLE KEYS */;
INSERT INTO `backend_course` VALUES (43,'CSC','243','Introduction to Object-Oriented Programming',3),(44,'CSC','245','Objects and Data Abstraction',3),(45,'CSC','310','Algorithms and Data Structures',3),(46,'CSC','320','Computer Organization',3),(47,'CSC','322','Computer Organization Lab',1),(48,'CSC','326','Operating Systems',3),(49,'CSC','375','Database Management Systems',3),(50,'CSC','430','Computer Networks',3),(51,'CSC','447','Parallel Programming for Multicore and Cluster Systems',3),(53,'CSC','491','Professional Experience',1),(54,'CSC','490','Software Engineering',3),(55,'CSC','323','Digital Systems Design',3),(56,'CSC','412','Introduction to Bioinformatics',3),(57,'CSC','420','Computer Architecture',3),(58,'CSC','431','Mobile Computing',3),(59,'CSC','435','Computer Security',3),(60,'CSC','440','Advanced Object-Oriented Programming',3),(61,'CSC','450','Computer Graphics',3),(62,'CSC','458','Game Programming',3),(63,'CSC','460','Artificial Intelligence',3),(64,'CSC','461','Introduction to Machine Learning',3),(65,'CSC','462','Fundamentals of Deep Learning',3),(66,'CSC','463','Computer Vision',3),(67,'CSC','464','Deep Learning for Natural Language Processing',3),(68,'CSC','495','IT Project Management',3),(69,'MTH','301','Linear Algebra',3),(70,'MTH','307','Discrete Structures II',3),(71,'MTH','303','Numerical Methods',3),(72,'MTH','304','Differential Equations',3),(73,'MTH','306','Non-Linear Dynamics Chaos',3),(74,'MTH','309','Graph Theory',3),(75,'MTH','201','Calculus III',3),(76,'MTH','207','Discrete Structures I',3),(77,'MTH','305','Probability and Statistics',3),(79,'BIF','205','TBA',3),(80,'BIF','243','TBA',3),(81,'BIF','244','TBA',3),(82,'BIF','245','TBA',3),(83,'BIF','310','TBA',3),(84,'BIF','375','TBA',3),(85,'BIF','415','TBA',3),(86,'BIF','435','TBA',3),(87,'BIF','455','TBA',3),(88,'BIF','513','TBA',3),(90,'BIF','599','TBA',3),(92,'CSC','206','TBA',3),(93,'CSC','241','TBA',3),(94,'CSC','443','TBA',3),(95,'CSC','480','TBA',3),(96,'CSC','599','TBA',3),(97,'CSC','613','TBA',3),(98,'CSC','615','TBA',3),(99,'MTH','101','TBA',3),(100,'MTH','102','TBA',3),(101,'MTH','206','TBA',3),(102,'MTH','308','TBA',3),(103,'MTH','311','TBA',3),(104,'MTH','400','TBA',3),(105,'MTH','401','TBA',3),(106,'MTH','403','TBA',3),(107,'MTH','407','TBA',3),(108,'MTH','409','TBA',3),(109,'MTH','410','TBA',3),(110,'MTH','411','TBA',3),(111,'STA','102','TBA',3),(112,'STA','201','TBA',3),(113,'STA','205','TBA',3),(114,'STA','302','TBA',3),(115,'BIF','599H','TBA',3),(116,'CSC','243B','TBA',3),(117,'CSC','245B','TBA',1),(118,'CSC','498B','TBA',3),(119,'CSC','498G','TBA',3),(120,'CSC','498H','TBA',3),(121,'CSC','498P','TBA',3),(122,'CSC','498X','TBA',3),(123,'CSC','599H','TBA',3),(124,'MTH','498A','TBA',3),(125,'BIF','498HB','TBA',3),(126,'BIF','498HC','TBA',3),(127,'BIF','498HF','TBA',3),(128,'CSC','498AC','TBA',3),(129,'CSC','498AD','TBA',3),(130,'CSC','498AE','TBa',3),(131,'CSC','498HJ','TBA',3),(132,'CSC','498HM','TBA',3),(133,'BIF','345','TBA',3),(134,'MTH','402','TBA',3),(135,'CSC','201','TBA',3),(167,'CSC','333','testi',3),(170,'CSC','310B','TBA',1),(171,'CSC','380','Theory of Computation',3),(174,'CSC','444','Testing times 2',3),(178,'CSC','557','TBA',3);
/*!40000 ALTER TABLE `backend_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_course_substitutes`
--

DROP TABLE IF EXISTS `backend_course_substitutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_course_substitutes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `from_course_id` bigint NOT NULL,
  `to_course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_course_substitut_from_course_id_to_course_9bde791a_uniq` (`from_course_id`,`to_course_id`),
  KEY `backend_course_subst_to_course_id_4575f0b1_fk_backend_c` (`to_course_id`),
  CONSTRAINT `backend_course_subst_from_course_id_7c116c89_fk_backend_c` FOREIGN KEY (`from_course_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_course_subst_to_course_id_4575f0b1_fk_backend_c` FOREIGN KEY (`to_course_id`) REFERENCES `backend_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_course_substitutes`
--

LOCK TABLES `backend_course_substitutes` WRITE;
/*!40000 ALTER TABLE `backend_course_substitutes` DISABLE KEYS */;
INSERT INTO `backend_course_substitutes` VALUES (1,43,80),(2,44,82),(3,45,83),(4,49,84),(5,56,85),(6,80,43),(7,82,44),(8,83,45),(9,84,49),(10,85,56),(14,90,115),(12,96,123),(16,109,110),(17,110,109),(13,115,90),(11,123,96),(24,167,133),(18,171,70),(22,174,125);
/*!40000 ALTER TABLE `backend_course_substitutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_courserelationship`
--

DROP TABLE IF EXISTS `backend_courserelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_courserelationship` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isPrerequisite` tinyint(1) NOT NULL,
  `mainCourse_id` bigint NOT NULL,
  `secondCourse_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_courserelati_mainCourse_id_9a0dc9b8_fk_backend_c` (`mainCourse_id`),
  KEY `backend_courserelati_secondCourse_id_b2d0d1a5_fk_backend_c` (`secondCourse_id`),
  CONSTRAINT `backend_courserelati_mainCourse_id_9a0dc9b8_fk_backend_c` FOREIGN KEY (`mainCourse_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_courserelati_secondCourse_id_b2d0d1a5_fk_backend_c` FOREIGN KEY (`secondCourse_id`) REFERENCES `backend_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_courserelationship`
--

LOCK TABLES `backend_courserelationship` WRITE;
/*!40000 ALTER TABLE `backend_courserelationship` DISABLE KEYS */;
INSERT INTO `backend_courserelationship` VALUES (30,1,44,43),(31,1,45,44),(32,1,45,76),(33,0,46,44),(34,0,46,76),(35,0,47,46),(36,1,48,44),(37,1,48,46),(38,1,49,44),(39,1,49,76),(40,1,50,48),(41,1,51,45),(42,1,51,48),(43,0,53,54),(44,0,54,49),(45,1,55,43),(46,1,56,45),(47,1,57,46),(48,1,59,48),(49,1,60,44),(50,1,61,45),(51,1,62,45),(52,1,63,45),(53,1,68,54),(54,1,69,75),(55,1,70,76),(56,1,70,75),(57,1,71,75),(58,1,72,75),(59,1,74,75),(60,1,75,100),(61,1,76,100),(62,1,77,75),(63,1,82,80),(64,1,83,82),(65,1,83,76),(66,1,84,82),(67,1,84,76),(68,1,86,85),(70,1,90,85),(71,0,94,49),(72,1,96,54),(73,1,100,99),(74,1,101,75),(75,1,103,76),(76,1,104,69),(77,1,105,76),(78,1,105,69),(79,1,106,105),(80,1,107,77),(81,1,107,134),(82,1,108,105),(83,1,109,101),(84,1,109,105),(85,1,110,103),(86,1,115,85),(87,0,116,43),(88,0,117,44),(89,1,118,44),(90,1,119,44),(91,1,120,44),(92,1,121,44),(93,1,122,44),(94,1,123,54),(95,1,128,44),(96,1,129,44),(97,1,130,44),(98,1,131,44),(99,1,132,44),(100,1,134,100),(119,0,170,45),(131,1,167,82),(132,0,167,45);
/*!40000 ALTER TABLE `backend_courserelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_doctor`
--

DROP TABLE IF EXISTS `backend_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_doctor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `campus` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_doctor`
--

LOCK TABLES `backend_doctor` WRITE;
/*!40000 ALTER TABLE `backend_doctor` DISABLE KEYS */;
INSERT INTO `backend_doctor` VALUES (14,'Danielle Azar','Associate Professor',2),(15,'Haidar Harmanani','Professor',2);
/*!40000 ALTER TABLE `backend_doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_doctor_availability`
--

DROP TABLE IF EXISTS `backend_doctor_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_doctor_availability` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint NOT NULL,
  `availability_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_doctor_availabil_doctor_id_availability_i_70265275_uniq` (`doctor_id`,`availability_id`),
  KEY `backend_doctor_avail_availability_id_8c61a86f_fk_backend_a` (`availability_id`),
  CONSTRAINT `backend_doctor_avail_availability_id_8c61a86f_fk_backend_a` FOREIGN KEY (`availability_id`) REFERENCES `backend_availability` (`id`),
  CONSTRAINT `backend_doctor_avail_doctor_id_952660c2_fk_backend_d` FOREIGN KEY (`doctor_id`) REFERENCES `backend_doctor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_doctor_availability`
--

LOCK TABLES `backend_doctor_availability` WRITE;
/*!40000 ALTER TABLE `backend_doctor_availability` DISABLE KEYS */;
INSERT INTO `backend_doctor_availability` VALUES (40,14,59),(41,14,60),(42,14,61),(36,15,55);
/*!40000 ALTER TABLE `backend_doctor_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_doctor_courses`
--

DROP TABLE IF EXISTS `backend_doctor_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_doctor_courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_doctor_courses_doctor_id_course_id_f6c8304e_uniq` (`doctor_id`,`course_id`),
  KEY `backend_doctor_courses_course_id_bb1de01c_fk_backend_course_id` (`course_id`),
  CONSTRAINT `backend_doctor_courses_course_id_bb1de01c_fk_backend_course_id` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_doctor_courses_doctor_id_5eca817c_fk_backend_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `backend_doctor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_doctor_courses`
--

LOCK TABLES `backend_doctor_courses` WRITE;
/*!40000 ALTER TABLE `backend_doctor_courses` DISABLE KEYS */;
INSERT INTO `backend_doctor_courses` VALUES (18,14,43),(19,14,44),(20,14,45),(21,14,80),(22,14,82),(23,14,83),(24,15,51);
/*!40000 ALTER TABLE `backend_doctor_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_major`
--

DROP TABLE IF EXISTS `backend_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_major` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `credits` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_major_title_cfb11411_uniq` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_major`
--

LOCK TABLES `backend_major` WRITE;
/*!40000 ALTER TABLE `backend_major` DISABLE KEYS */;
INSERT INTO `backend_major` VALUES (1,'BS in Computer Science',92),(2,'BS in Bioinformatics',100),(3,'BS in Mathematics',92),(5,'tesing add major',80);
/*!40000 ALTER TABLE `backend_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_major_courses`
--

DROP TABLE IF EXISTS `backend_major_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_major_courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `major_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_major_courses_major_id_course_id_ebeea082_uniq` (`major_id`,`course_id`),
  KEY `backend_major_courses_course_id_4a27d1bc_fk_backend_course_id` (`course_id`),
  CONSTRAINT `backend_major_courses_course_id_4a27d1bc_fk_backend_course_id` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_major_courses_major_id_9f0a3b7c_fk_backend_major_id` FOREIGN KEY (`major_id`) REFERENCES `backend_major` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_major_courses`
--

LOCK TABLES `backend_major_courses` WRITE;
/*!40000 ALTER TABLE `backend_major_courses` DISABLE KEYS */;
INSERT INTO `backend_major_courses` VALUES (4,1,43),(5,1,44),(6,1,45),(7,1,46),(8,1,47),(9,1,48),(10,1,49),(11,1,50),(12,1,51),(14,1,53),(15,1,54),(3,1,70),(13,1,75),(17,1,76),(2,1,77),(16,1,95),(1,1,96),(31,2,75),(32,2,76),(33,2,79),(34,2,80),(35,2,81),(36,2,82),(37,2,83),(38,2,84),(39,2,85),(40,2,90),(30,2,133),(24,3,43),(18,3,69),(23,3,75),(26,3,76),(25,3,77),(19,3,101),(20,3,103),(21,3,105),(22,3,106),(27,3,108),(28,3,109),(29,3,110),(43,5,44),(44,5,174);
/*!40000 ALTER TABLE `backend_major_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_section`
--

DROP TABLE IF EXISTS `backend_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_section` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `campus` varchar(7) NOT NULL,
  `numOfStudents` int NOT NULL,
  `numOfSections` int NOT NULL,
  `course_id` bigint NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_section_course_id_d8ecb991_fk_backend_course_id` (`course_id`),
  CONSTRAINT `backend_section_course_id_d8ecb991_fk_backend_course_id` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1978 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_section`
--

LOCK TABLES `backend_section` WRITE;
/*!40000 ALTER TABLE `backend_section` DISABLE KEYS */;
INSERT INTO `backend_section` VALUES (1940,'Byblos',4,1,43,40),(1941,'Beirut',7,1,43,40),(1942,'Beirut',3,1,45,40),(1943,'Beirut',4,1,48,40),(1944,'Beirut',3,1,49,40),(1945,'Beirut',4,1,50,40),(1946,'Byblos',1,1,50,40),(1947,'Beirut',3,1,51,40),(1948,'Beirut',6,1,53,40),(1949,'Beirut',7,1,54,40),(1950,'Beirut',7,1,70,40),(1951,'Byblos',2,1,70,40),(1952,'Beirut',5,1,75,40),(1953,'Beirut',5,1,76,40),(1954,'Beirut',6,1,77,40),(1955,'Byblos',1,1,77,40),(1956,'Beirut',39,1,79,40),(1957,'Byblos',19,1,79,40),(1958,'Beirut',3,1,80,40),(1959,'Byblos',1,1,80,40),(1960,'Beirut',43,2,81,40),(1961,'Byblos',19,1,81,40),(1962,'Byblos',14,1,82,40),(1963,'Beirut',9,1,82,40),(1964,'Beirut',30,1,83,40),(1965,'Byblos',5,1,83,40),(1966,'Beirut',29,1,84,40),(1967,'Byblos',11,1,84,40),(1968,'Beirut',10,1,85,40),(1969,'Byblos',6,1,85,40),(1970,'Byblos',23,1,90,40),(1971,'Beirut',49,2,90,40),(1972,'Byblos',6,1,95,40),(1973,'Beirut',18,1,95,40),(1974,'Beirut',3,1,96,40),(1975,'Byblos',1,1,96,40),(1976,'Beirut',55,2,133,40),(1977,'Byblos',26,1,133,40);
/*!40000 ALTER TABLE `backend_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_student`
--

DROP TABLE IF EXISTS `backend_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_student` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `takenCredits` int NOT NULL,
  `remainingCredits` int NOT NULL,
  `campus` varchar(6) NOT NULL,
  `major_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_student_major_id_240a03d4_fk_backend_major_id` (`major_id`),
  CONSTRAINT `backend_student_major_id_240a03d4_fk_backend_major_id` FOREIGN KEY (`major_id`) REFERENCES `backend_major` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20575 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_student`
--

LOCK TABLES `backend_student` WRITE;
/*!40000 ALTER TABLE `backend_student` DISABLE KEYS */;
INSERT INTO `backend_student` VALUES (20453,70,22,'Byblos',1),(20454,24,68,'Beirut',1),(20455,30,62,'Byblos',1),(20456,34,66,'Beirut',2),(20457,36,56,'Beirut',1),(20458,30,62,'Byblos',1),(20459,24,68,'Beirut',1),(20460,18,74,'Byblos',1),(20461,31,69,'Byblos',2),(20462,10,82,'Beirut',1),(20463,24,68,'Beirut',1),(20464,24,76,'Beirut',2),(20465,24,68,'Beirut',1),(20466,24,68,'Beirut',1),(20467,143,-43,'Byblos',2),(20468,139,-39,'Byblos',2),(20469,117,-17,'Byblos',2),(20470,106,-6,'Beirut',2),(20471,109,-9,'Beirut',2),(20472,115,-15,'Byblos',2),(20473,96,4,'Beirut',2),(20474,99,1,'Beirut',2),(20475,106,-6,'Beirut',2),(20476,112,-12,'Beirut',2),(20477,102,-2,'Beirut',2),(20478,103,-3,'Beirut',2),(20479,106,-6,'Beirut',2),(20480,105,-5,'Byblos',2),(20481,115,-15,'Byblos',2),(20482,103,-3,'Byblos',2),(20483,90,10,'Beirut',2),(20484,69,23,'Beirut',1),(20485,97,3,'Beirut',2),(20486,73,27,'Byblos',2),(20487,69,31,'Beirut',2),(20488,78,22,'Byblos',2),(20489,81,19,'Byblos',2),(20490,64,36,'Beirut',2),(20491,72,28,'Beirut',2),(20492,81,19,'Beirut',2),(20493,83,17,'Byblos',2),(20494,65,35,'Byblos',2),(20495,78,22,'Beirut',2),(20496,81,19,'Beirut',2),(20497,76,24,'Byblos',2),(20498,93,7,'Byblos',2),(20499,84,16,'Beirut',2),(20500,66,34,'Beirut',2),(20501,66,34,'Byblos',2),(20502,71,29,'Beirut',2),(20503,85,15,'Beirut',2),(20504,28,72,'Beirut',2),(20505,111,-19,'Beirut',1),(20506,88,4,'Beirut',1),(20507,104,-12,'Beirut',1),(20508,46,54,'Beirut',2),(20509,40,60,'Beirut',2),(20510,77,15,'Beirut',1),(20511,64,36,'Beirut',2),(20512,82,18,'Byblos',2),(20513,62,30,'Beirut',1),(20514,81,19,'Beirut',2),(20515,63,37,'Beirut',2),(20516,80,20,'Byblos',2),(20517,72,28,'Beirut',2),(20518,50,50,'Beirut',2),(20519,79,21,'Beirut',2),(20520,55,45,'Byblos',2),(20521,75,25,'Beirut',2),(20522,63,29,'Byblos',1),(20523,50,42,'Beirut',1),(20524,65,35,'Beirut',2),(20525,70,30,'Beirut',2),(20526,56,44,'Byblos',2),(20527,58,34,'Beirut',1),(20528,22,78,'Beirut',2),(20529,62,38,'Beirut',2),(20530,62,38,'Byblos',2),(20531,37,63,'Byblos',2),(20532,37,63,'Beirut',2),(20533,49,43,'Beirut',1),(20534,39,61,'Byblos',2),(20535,31,69,'Beirut',2),(20536,36,56,'Beirut',1),(20537,46,54,'Byblos',2),(20538,40,60,'Beirut',2),(20539,43,57,'Beirut',2),(20540,34,66,'Beirut',2),(20541,37,63,'Byblos',2),(20542,40,60,'Beirut',2),(20543,37,63,'Beirut',2),(20544,28,72,'Byblos',2),(20545,37,63,'Beirut',2),(20546,40,60,'Byblos',2),(20547,34,66,'Beirut',2),(20548,43,57,'Beirut',2),(20549,46,54,'Beirut',2),(20550,37,55,'Beirut',1),(20551,43,57,'Byblos',2),(20552,46,54,'Beirut',2),(20553,37,63,'Beirut',2),(20554,46,54,'Beirut',2),(20555,30,62,'Beirut',1),(20556,43,57,'Byblos',2),(20557,28,72,'Beirut',2),(20558,37,63,'Beirut',2),(20559,40,60,'Beirut',2),(20560,34,66,'Byblos',2),(20561,94,6,'Byblos',2),(20562,37,63,'Beirut',2),(20563,40,60,'Beirut',2),(20564,40,60,'Beirut',2),(20565,43,57,'Byblos',2),(20566,31,69,'Beirut',2),(20567,37,63,'Beirut',2),(20568,37,63,'Beirut',2),(20569,37,63,'Byblos',2),(20570,37,63,'Beirut',2),(20571,24,76,'Byblos',2),(20572,113,-21,'Beirut',1),(20573,89,3,'Beirut',1),(20574,91,1,'Byblos',1);
/*!40000 ALTER TABLE `backend_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_student_courses`
--

DROP TABLE IF EXISTS `backend_student_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_student_courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_student_courses_student_id_course_id_8941b711_uniq` (`student_id`,`course_id`),
  KEY `backend_student_courses_course_id_99e0cb72_fk_backend_course_id` (`course_id`),
  CONSTRAINT `backend_student_cour_student_id_a1f6607d_fk_backend_s` FOREIGN KEY (`student_id`) REFERENCES `backend_student` (`id`),
  CONSTRAINT `backend_student_courses_course_id_99e0cb72_fk_backend_course_id` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=212393 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_student_courses`
--

LOCK TABLES `backend_student_courses` WRITE;
/*!40000 ALTER TABLE `backend_student_courses` DISABLE KEYS */;
INSERT INTO `backend_student_courses` VALUES (211567,20467,69),(211568,20467,75),(211569,20467,76),(211570,20467,79),(211571,20467,80),(211572,20467,81),(211573,20467,82),(211574,20467,83),(211575,20467,84),(211576,20467,85),(211577,20467,86),(211578,20467,87),(211580,20467,90),(211566,20467,133),(211585,20468,69),(211586,20468,72),(211588,20468,75),(211589,20468,76),(211590,20468,79),(211591,20468,80),(211592,20468,81),(211593,20468,82),(211594,20468,83),(211595,20468,84),(211596,20468,85),(211597,20468,86),(211581,20468,97),(211582,20468,98),(211584,20468,101),(211587,20468,105),(211583,20468,133),(211601,20469,75),(211602,20469,76),(211603,20469,79),(211604,20469,80),(211605,20469,84),(211606,20469,85),(211607,20469,86),(211599,20469,99),(211600,20469,100),(211609,20470,72),(211610,20470,75),(211611,20470,76),(211612,20470,79),(211613,20470,80),(211614,20470,81),(211615,20470,82),(211616,20470,83),(211617,20470,84),(211618,20470,85),(211619,20470,86),(211620,20470,115),(211608,20470,133),(211622,20471,69),(211623,20471,75),(211624,20471,76),(211625,20471,79),(211626,20471,80),(211627,20471,81),(211628,20471,82),(211629,20471,83),(211630,20471,84),(211631,20471,85),(211633,20471,126),(211634,20471,127),(211621,20471,133),(211649,20472,63),(211636,20472,75),(211637,20472,76),(211638,20472,79),(211639,20472,80),(211640,20472,81),(211641,20472,82),(211642,20472,83),(211643,20472,84),(211644,20472,85),(211645,20472,86),(211647,20472,90),(211648,20472,94),(211635,20472,133),(211650,20473,75),(211651,20473,76),(211652,20473,79),(211653,20473,80),(211654,20473,81),(211655,20473,82),(211656,20473,84),(211657,20473,85),(211658,20473,86),(211659,20474,72),(211660,20474,75),(211661,20474,76),(211662,20474,79),(211663,20474,80),(211664,20474,81),(211665,20474,82),(211666,20474,83),(211667,20474,84),(211668,20474,85),(211669,20474,86),(211670,20474,87),(211672,20475,75),(211673,20475,76),(211674,20475,79),(211675,20475,80),(211676,20475,81),(211677,20475,82),(211678,20475,83),(211679,20475,84),(211680,20475,85),(211681,20475,86),(211682,20475,88),(211671,20475,133),(211684,20476,75),(211685,20476,76),(211686,20476,79),(211687,20476,80),(211688,20476,81),(211689,20476,82),(211690,20476,83),(211691,20476,84),(211692,20476,85),(211693,20476,86),(211694,20476,88),(211695,20476,90),(211683,20476,133),(211696,20477,64),(211697,20477,72),(211698,20477,75),(211699,20477,76),(211700,20477,79),(211701,20477,80),(211702,20477,81),(211703,20477,82),(211704,20477,83),(211705,20477,84),(211706,20477,85),(211707,20477,88),(211708,20478,75),(211709,20478,76),(211710,20478,79),(211711,20478,80),(211712,20478,81),(211713,20478,82),(211714,20478,83),(211715,20478,84),(211716,20478,85),(211717,20478,86),(211718,20478,87),(211720,20479,75),(211721,20479,76),(211722,20479,79),(211723,20479,80),(211724,20479,81),(211725,20479,82),(211726,20479,83),(211727,20479,84),(211728,20479,85),(211729,20479,86),(211719,20479,133),(211744,20480,63),(211731,20480,75),(211732,20480,76),(211733,20480,79),(211734,20480,80),(211735,20480,81),(211736,20480,82),(211737,20480,83),(211738,20480,84),(211739,20480,85),(211740,20480,86),(211742,20480,90),(211743,20480,94),(211730,20480,133),(211746,20481,72),(211747,20481,75),(211748,20481,76),(211749,20481,79),(211750,20481,80),(211751,20481,81),(211752,20481,82),(211753,20481,83),(211754,20481,84),(211755,20481,85),(211756,20481,86),(211758,20481,90),(211745,20481,133),(211760,20482,75),(211761,20482,76),(211762,20482,79),(211763,20482,80),(211764,20482,81),(211765,20482,82),(211766,20482,83),(211767,20482,84),(211768,20482,85),(211769,20482,86),(211771,20482,90),(211772,20482,94),(211759,20482,133),(211773,20483,75),(211774,20483,76),(211775,20483,79),(211776,20483,80),(211777,20483,81),(211778,20483,82),(211779,20483,84),(211780,20483,85),(211781,20483,86),(211785,20484,43),(211786,20484,44),(211788,20484,46),(211790,20484,47),(211787,20484,76),(211789,20484,79),(211782,20484,99),(211783,20484,100),(211784,20484,135),(211793,20485,75),(211794,20485,76),(211795,20485,79),(211796,20485,80),(211797,20485,81),(211798,20485,82),(211799,20485,85),(211800,20485,86),(211801,20485,88),(211791,20485,133),(211792,20485,135),(211802,20486,75),(211803,20486,76),(211804,20486,79),(211805,20486,80),(211806,20486,81),(211807,20486,82),(211808,20486,83),(211809,20486,85),(211810,20486,86),(211811,20487,75),(211812,20487,76),(211813,20487,79),(211814,20487,80),(211815,20487,82),(211816,20487,83),(211817,20487,84),(211818,20487,85),(211819,20488,43),(211820,20488,44),(211821,20488,75),(211822,20488,76),(211823,20488,79),(211824,20488,81),(211825,20488,83),(211826,20488,84),(211827,20488,85),(211828,20488,86),(211829,20489,75),(211830,20489,76),(211831,20489,79),(211832,20489,80),(211833,20489,81),(211834,20489,82),(211835,20489,83),(211836,20489,85),(211837,20489,86),(211839,20490,69),(211840,20490,72),(211841,20490,75),(211842,20490,76),(211843,20490,79),(211844,20490,80),(211845,20490,81),(211846,20490,82),(211847,20490,85),(211838,20490,101),(211848,20490,124),(211849,20491,75),(211850,20491,76),(211851,20491,79),(211852,20491,80),(211853,20491,82),(211854,20491,83),(211855,20491,84),(211856,20491,85),(211857,20492,75),(211858,20492,76),(211859,20492,79),(211860,20492,80),(211861,20492,82),(211862,20492,83),(211863,20492,85),(211865,20493,75),(211866,20493,76),(211867,20493,79),(211868,20493,80),(211869,20493,81),(211870,20493,82),(211871,20493,83),(211872,20493,85),(211873,20493,86),(211864,20493,100),(211874,20494,75),(211875,20494,76),(211876,20494,79),(211877,20494,80),(211878,20494,82),(211879,20494,85),(211881,20495,76),(211882,20495,79),(211883,20495,80),(211884,20495,82),(211885,20495,85),(211886,20495,86),(211880,20495,100),(211887,20496,76),(211888,20496,79),(211889,20496,80),(211890,20496,81),(211891,20496,82),(211892,20496,85),(211893,20496,86),(211894,20496,127),(211905,20497,63),(211895,20497,75),(211896,20497,76),(211897,20497,79),(211898,20497,80),(211899,20497,81),(211900,20497,82),(211901,20497,83),(211902,20497,85),(211903,20497,86),(211908,20498,69),(211909,20498,72),(211911,20498,75),(211912,20498,76),(211913,20498,79),(211914,20498,80),(211915,20498,81),(211916,20498,82),(211917,20498,83),(211918,20498,85),(211919,20498,86),(211907,20498,101),(211910,20498,105),(211921,20498,125),(211906,20498,133),(211922,20499,75),(211923,20499,76),(211924,20499,79),(211925,20499,80),(211926,20499,81),(211927,20499,82),(211928,20499,83),(211929,20499,85),(211930,20500,75),(211931,20500,76),(211932,20500,79),(211933,20500,80),(211934,20500,81),(211935,20500,82),(211936,20500,85),(211937,20501,75),(211938,20501,76),(211939,20501,79),(211940,20501,80),(211941,20501,81),(211942,20501,82),(211943,20501,83),(211944,20501,85),(211945,20501,86),(211946,20502,76),(211947,20502,79),(211948,20502,80),(211949,20502,82),(211950,20502,85),(211951,20503,75),(211952,20503,76),(211953,20503,79),(211954,20503,80),(211955,20503,81),(211956,20503,82),(211957,20503,85),(211958,20504,79),(211959,20505,45),(211960,20505,46),(211961,20505,47),(211962,20505,48),(211963,20505,49),(211964,20505,50),(211965,20505,51),(211966,20505,53),(211967,20505,54),(211968,20505,59),(211969,20505,70),(211970,20505,72),(211971,20505,75),(211972,20505,76),(211973,20505,77),(211974,20505,80),(211975,20505,82),(211976,20505,85),(211977,20505,94),(211978,20505,95),(211979,20505,96),(211980,20505,118),(211981,20505,122),(211984,20506,45),(211985,20506,46),(211986,20506,47),(211988,20506,48),(211990,20506,49),(211982,20506,75),(211983,20506,76),(211987,20506,80),(211989,20506,82),(211992,20506,85),(211993,20506,93),(211994,20506,94),(211991,20506,113),(211995,20507,45),(211996,20507,46),(211997,20507,47),(211998,20507,48),(211999,20507,49),(212000,20507,50),(212001,20507,51),(212002,20507,53),(212003,20507,54),(212004,20507,59),(212005,20507,64),(212006,20507,69),(212007,20507,70),(212008,20507,75),(212009,20507,76),(212010,20507,77),(212011,20507,80),(212012,20507,82),(212013,20507,85),(212014,20507,94),(212015,20507,95),(212016,20507,122),(212019,20508,75),(212020,20508,76),(212021,20508,80),(212022,20508,82),(212023,20508,85),(212017,20508,99),(212018,20508,100),(212024,20509,80),(212027,20509,85),(212025,20509,99),(212026,20509,100),(212032,20510,46),(212033,20510,47),(212035,20510,48),(212038,20510,49),(212039,20510,51),(212041,20510,53),(212040,20510,54),(212042,20510,59),(212028,20510,70),(212029,20510,75),(212030,20510,76),(212031,20510,77),(212034,20510,80),(212036,20510,82),(212037,20510,83),(212045,20511,76),(212043,20511,80),(212044,20511,82),(212046,20511,135),(212048,20512,80),(212050,20512,85),(212051,20512,86),(212049,20512,113),(212047,20512,133),(212054,20513,44),(212055,20513,45),(212056,20513,46),(212057,20513,47),(212059,20513,48),(212060,20513,49),(212062,20513,53),(212052,20513,72),(212053,20513,75),(212061,20513,76),(212058,20513,80),(212063,20514,75),(212064,20514,76),(212065,20514,80),(212066,20514,82),(212067,20514,85),(212068,20514,86),(212071,20515,75),(212069,20515,80),(212070,20515,82),(212072,20515,85),(212074,20516,80),(212075,20516,81),(212076,20516,82),(212077,20516,113),(212073,20516,135),(212078,20517,72),(212079,20517,75),(212080,20517,76),(212081,20517,80),(212083,20517,82),(212084,20517,85),(212085,20517,86),(212082,20517,113),(212087,20518,72),(212088,20518,75),(212089,20518,76),(212090,20518,80),(212086,20518,101),(212092,20519,76),(212093,20519,80),(212094,20519,81),(212095,20519,82),(212097,20519,84),(212098,20519,85),(212099,20519,86),(212096,20519,113),(212091,20519,135),(212101,20520,75),(212102,20520,76),(212103,20520,80),(212105,20520,85),(212104,20520,113),(212100,20520,135),(212106,20521,75),(212107,20521,76),(212108,20521,80),(212110,20521,85),(212109,20521,113),(212115,20522,45),(212116,20522,46),(212117,20522,47),(212112,20522,69),(212113,20522,75),(212114,20522,76),(212118,20522,80),(212119,20522,82),(212120,20522,84),(212111,20522,100),(212123,20523,46),(212124,20523,47),(212121,20523,75),(212122,20523,76),(212125,20523,80),(212126,20523,82),(212129,20524,76),(212127,20524,80),(212128,20524,113),(212130,20524,135),(212131,20525,75),(212132,20525,76),(212133,20525,80),(212134,20525,81),(212135,20525,82),(212136,20525,85),(212140,20526,75),(212141,20526,76),(212142,20526,80),(212143,20526,82),(212137,20526,99),(212138,20526,100),(212139,20526,135),(212144,20527,69),(212145,20527,75),(212146,20527,76),(212147,20527,80),(212148,20527,82),(212149,20527,83),(212150,20527,84),(212151,20528,80),(212153,20528,85),(212152,20528,100),(212156,20529,75),(212154,20529,80),(212155,20529,113),(212157,20529,135),(212158,20530,75),(212159,20530,76),(212160,20530,80),(212161,20530,82),(212162,20530,85),(212164,20531,75),(212165,20531,76),(212163,20531,80),(212166,20531,85),(212167,20532,75),(212168,20532,76),(212169,20532,80),(212170,20532,82),(212171,20532,85),(212174,20533,44),(212175,20533,45),(212176,20533,46),(212177,20533,47),(212179,20533,49),(212172,20533,69),(212173,20533,75),(212180,20533,76),(212178,20533,80),(212183,20534,75),(212184,20534,76),(212181,20534,80),(212182,20534,81),(212185,20535,80),(212186,20535,82),(212187,20535,85),(212188,20536,44),(212190,20536,46),(212191,20536,47),(212189,20536,76),(212192,20536,80),(212193,20536,117),(212195,20537,75),(212196,20537,76),(212194,20537,80),(212198,20538,75),(212199,20538,80),(212200,20538,82),(212201,20538,85),(212197,20538,100),(212202,20539,75),(212203,20539,76),(212204,20539,80),(212205,20539,82),(212206,20539,85),(212209,20540,75),(212207,20540,80),(212208,20540,82),(212210,20540,85),(212212,20541,75),(212211,20541,80),(212213,20541,85),(212214,20542,80),(212215,20542,113),(212217,20543,75),(212218,20543,80),(212219,20543,82),(212220,20543,85),(212216,20543,100),(212222,20544,76),(212221,20544,80),(212223,20544,85),(212226,20545,75),(212224,20545,80),(212225,20545,82),(212227,20545,85),(212229,20546,75),(212230,20546,76),(212228,20546,80),(212231,20546,85),(212234,20547,76),(212232,20547,80),(212233,20547,82),(212235,20547,85),(212236,20548,80),(212237,20548,82),(212239,20548,85),(212238,20548,100),(212240,20549,75),(212241,20549,76),(212242,20549,80),(212243,20549,82),(212244,20549,85),(212245,20550,75),(212246,20550,76),(212247,20550,80),(212248,20550,82),(212249,20550,85),(212251,20551,75),(212252,20551,76),(212250,20551,80),(212253,20551,85),(212254,20552,75),(212255,20552,76),(212256,20552,80),(212257,20552,82),(212258,20552,85),(212261,20553,76),(212259,20553,80),(212260,20553,82),(212262,20553,85),(212263,20554,75),(212264,20554,76),(212265,20554,80),(212266,20554,82),(212267,20554,85),(212268,20555,44),(212270,20555,46),(212271,20555,47),(212269,20555,76),(212272,20555,80),(212273,20555,117),(212275,20556,75),(212276,20556,76),(212274,20556,80),(212277,20556,85),(212278,20557,80),(212281,20558,76),(212279,20558,80),(212280,20558,82),(212282,20558,85),(212283,20559,75),(212284,20559,76),(212285,20559,80),(212286,20559,82),(212287,20559,85),(212290,20560,76),(212288,20560,80),(212289,20560,82),(212291,20560,85),(212293,20561,75),(212294,20561,76),(212295,20561,80),(212296,20561,85),(212292,20561,135),(212297,20562,75),(212298,20562,76),(212299,20562,80),(212300,20562,82),(212301,20562,85),(212302,20563,75),(212303,20563,76),(212304,20563,80),(212305,20563,82),(212306,20563,85),(212309,20564,76),(212307,20564,80),(212308,20564,82),(212310,20564,85),(212313,20565,76),(212311,20565,80),(212312,20565,82),(212314,20565,85),(212316,20566,43),(212315,20566,80),(212317,20566,116),(212320,20567,76),(212318,20567,80),(212319,20567,82),(212321,20567,85),(212322,20568,75),(212323,20568,76),(212324,20568,80),(212325,20568,82),(212326,20568,85),(212328,20569,76),(212327,20569,80),(212329,20569,85),(212332,20570,76),(212330,20570,80),(212331,20570,82),(212333,20570,85),(212335,20571,76),(212334,20571,80),(212337,20572,43),(212338,20572,44),(212339,20572,45),(212340,20572,46),(212341,20572,47),(212342,20572,48),(212343,20572,49),(212344,20572,50),(212345,20572,51),(212346,20572,53),(212347,20572,54),(212348,20572,59),(212349,20572,64),(212350,20572,69),(212351,20572,70),(212352,20572,75),(212353,20572,76),(212354,20572,77),(212355,20572,81),(212356,20572,95),(212357,20572,99),(212358,20572,100),(212359,20572,119),(212336,20572,130),(212363,20573,43),(212364,20573,44),(212365,20573,45),(212366,20573,46),(212367,20573,47),(212368,20573,48),(212370,20573,49),(212362,20573,72),(212371,20573,75),(212372,20573,76),(212373,20573,77),(212369,20573,81),(212374,20573,94),(212360,20573,99),(212361,20573,100),(212379,20574,43),(212380,20574,44),(212381,20574,45),(212382,20574,46),(212383,20574,47),(212384,20574,48),(212386,20574,49),(212387,20574,51),(212389,20574,53),(212390,20574,54),(212392,20574,63),(212378,20574,72),(212388,20574,75),(212391,20574,76),(212377,20574,77),(212385,20574,81),(212375,20574,99),(212376,20574,100);
/*!40000 ALTER TABLE `backend_student_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_studyplan`
--

DROP TABLE IF EXISTS `backend_studyplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_studyplan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `major_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_studyplan_major_id_9e9815eb_fk_backend_major_id` (`major_id`),
  CONSTRAINT `backend_studyplan_major_id_9e9815eb_fk_backend_major_id` FOREIGN KEY (`major_id`) REFERENCES `backend_major` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_studyplan`
--

LOCK TABLES `backend_studyplan` WRITE;
/*!40000 ALTER TABLE `backend_studyplan` DISABLE KEYS */;
INSERT INTO `backend_studyplan` VALUES (1,1);
/*!40000 ALTER TABLE `backend_studyplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_studyplan_firstyear`
--

DROP TABLE IF EXISTS `backend_studyplan_firstyear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_studyplan_firstyear` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `studyplan_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_studyplan_firstYear_studyplan_id_course_id_051dc471_uniq` (`studyplan_id`,`course_id`),
  KEY `backend_studyplan_fi_course_id_8e745b3a_fk_backend_c` (`course_id`),
  CONSTRAINT `backend_studyplan_fi_course_id_8e745b3a_fk_backend_c` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_studyplan_fi_studyplan_id_4ed60c93_fk_backend_s` FOREIGN KEY (`studyplan_id`) REFERENCES `backend_studyplan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_studyplan_firstyear`
--

LOCK TABLES `backend_studyplan_firstyear` WRITE;
/*!40000 ALTER TABLE `backend_studyplan_firstyear` DISABLE KEYS */;
INSERT INTO `backend_studyplan_firstyear` VALUES (2,1,43),(3,1,44),(4,1,46),(5,1,47),(1,1,75),(6,1,76),(7,1,116),(8,1,117);
/*!40000 ALTER TABLE `backend_studyplan_firstyear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_studyplan_secondyear`
--

DROP TABLE IF EXISTS `backend_studyplan_secondyear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_studyplan_secondyear` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `studyplan_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_studyplan_second_studyplan_id_course_id_2a97a0f1_uniq` (`studyplan_id`,`course_id`),
  KEY `backend_studyplan_se_course_id_e4520daf_fk_backend_c` (`course_id`),
  CONSTRAINT `backend_studyplan_se_course_id_e4520daf_fk_backend_c` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_studyplan_se_studyplan_id_b258c233_fk_backend_s` FOREIGN KEY (`studyplan_id`) REFERENCES `backend_studyplan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_studyplan_secondyear`
--

LOCK TABLES `backend_studyplan_secondyear` WRITE;
/*!40000 ALTER TABLE `backend_studyplan_secondyear` DISABLE KEYS */;
INSERT INTO `backend_studyplan_secondyear` VALUES (3,1,45),(5,1,48),(6,1,49),(7,1,53),(8,1,54),(1,1,69),(4,1,77),(2,1,170);
/*!40000 ALTER TABLE `backend_studyplan_secondyear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_studyplan_thirdyear`
--

DROP TABLE IF EXISTS `backend_studyplan_thirdyear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_studyplan_thirdyear` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `studyplan_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_studyplan_thirdYear_studyplan_id_course_id_b10c5953_uniq` (`studyplan_id`,`course_id`),
  KEY `backend_studyplan_th_course_id_d2f676d6_fk_backend_c` (`course_id`),
  CONSTRAINT `backend_studyplan_th_course_id_d2f676d6_fk_backend_c` FOREIGN KEY (`course_id`) REFERENCES `backend_course` (`id`),
  CONSTRAINT `backend_studyplan_th_studyplan_id_c6e855f2_fk_backend_s` FOREIGN KEY (`studyplan_id`) REFERENCES `backend_studyplan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_studyplan_thirdyear`
--

LOCK TABLES `backend_studyplan_thirdyear` WRITE;
/*!40000 ALTER TABLE `backend_studyplan_thirdyear` DISABLE KEYS */;
INSERT INTO `backend_studyplan_thirdyear` VALUES (2,1,50),(3,1,51),(1,1,96),(4,1,171);
/*!40000 ALTER TABLE `backend_studyplan_thirdyear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_user`
--

DROP TABLE IF EXISTS `backend_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isChaiperson` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_user`
--

LOCK TABLES `backend_user` WRITE;
/*!40000 ALTER TABLE `backend_user` DISABLE KEYS */;
INSERT INTO `backend_user` VALUES (1,'2023-05-08 08:24:59.816214',1,'Toufic','Al Rifaii',1,1,'2023-02-21 12:56:22.000000','Toufic Al Rifaii','altoufic2015@gmail.co','Kira','pbkdf2_sha256$390000$uhhpHb4DGU7DXe6uFjer85$L1F9/sdjlORtzTFELFzBFxPqurIBW14qGdTuMsjO89A=',1),(2,NULL,0,'','',0,1,'2023-02-21 16:00:18.928057','Toufic','altoufic2015@gmail.com','toufic','pbkdf2_sha256$390000$jGmXAYik16v4jnm5iKliub$OzNgFJ90jI2GwgkNTOHzZVsHXHtHuTXBd0tahZaQYGQ=',0);
/*!40000 ALTER TABLE `backend_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_user_groups`
--

DROP TABLE IF EXISTS `backend_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_user_groups_user_id_group_id_decc787e_uniq` (`user_id`,`group_id`),
  KEY `backend_user_groups_group_id_df691386_fk_auth_group_id` (`group_id`),
  CONSTRAINT `backend_user_groups_group_id_df691386_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `backend_user_groups_user_id_d2c44525_fk_backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `backend_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_user_groups`
--

LOCK TABLES `backend_user_groups` WRITE;
/*!40000 ALTER TABLE `backend_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `backend_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backend_user_user_permissions`
--

DROP TABLE IF EXISTS `backend_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backend_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `backend_user_user_permis_user_id_permission_id_d232313e_uniq` (`user_id`,`permission_id`),
  KEY `backend_user_user_pe_permission_id_634ab7e4_fk_auth_perm` (`permission_id`),
  CONSTRAINT `backend_user_user_pe_permission_id_634ab7e4_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `backend_user_user_pe_user_id_439140a5_fk_backend_u` FOREIGN KEY (`user_id`) REFERENCES `backend_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backend_user_user_permissions`
--

LOCK TABLES `backend_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `backend_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `backend_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_backend_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `backend_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-02-21 12:59:12.238066','1','Kira',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Name\", \"IsChaiperson\"]}}]',6,1),(2,'2023-02-21 15:45:57.198650','1','Kira',2,'[]',6,1),(3,'2023-03-11 17:05:03.386352','2','Course object (2)',1,'[{\"added\": {}}]',7,1),(4,'2023-03-11 17:07:56.849684','1','Course object (1)',3,'',7,1),(5,'2023-03-11 17:08:00.742700','2','Course object (2)',3,'',7,1),(6,'2023-03-11 17:09:37.721116','3','test',1,'[{\"added\": {}}]',7,1),(7,'2023-03-11 17:09:59.363811','3','Intro. Object Oriented Programming',2,'[{\"changed\": {\"fields\": [\"Title\"]}}]',7,1),(8,'2023-03-11 17:12:07.412965','4','CSC245',1,'[{\"added\": {}}]',7,1),(9,'2023-03-11 17:12:31.413363','5','CSC310',1,'[{\"added\": {}}]',7,1),(10,'2023-03-15 10:45:53.506781','6','CSC490',3,'',7,1),(11,'2023-03-15 10:45:58.358674','5','CSC310',3,'',7,1),(12,'2023-03-15 10:46:01.551097','3','CSC243',3,'',7,1),(13,'2023-03-15 10:46:05.774886','4','CSC245',3,'',7,1),(14,'2023-03-15 22:13:03.966898','8','CSC245',2,'[{\"changed\": {\"fields\": [\"Prerequisites\"]}}]',7,1),(15,'2023-03-15 22:13:33.211061','9','CSC310',2,'[{\"changed\": {\"fields\": [\"Prerequisites\"]}}]',7,1),(16,'2023-03-15 22:26:09.982737','42','MTH307',3,'',7,1),(17,'2023-03-15 22:26:09.985705','41','MTH305',3,'',7,1),(18,'2023-03-15 22:26:09.987740','40','MTH207',3,'',7,1),(19,'2023-03-15 22:26:09.989741','39','MTH201',3,'',7,1),(20,'2023-03-15 22:26:09.990938','38','MTH309',3,'',7,1),(21,'2023-03-15 22:26:09.992958','37','MTH306',3,'',7,1),(22,'2023-03-15 22:26:09.994954','36','MTH304',3,'',7,1),(23,'2023-03-15 22:26:09.996956','35','MTH303',3,'',7,1),(24,'2023-03-15 22:26:09.998479','34','MTH307',3,'',7,1),(25,'2023-03-15 22:26:09.999479','33','MTH301',3,'',7,1),(26,'2023-03-15 22:26:10.001479','32','CSC495',3,'',7,1),(27,'2023-03-15 22:26:10.003486','31','CSC464',3,'',7,1),(28,'2023-03-15 22:26:10.004479','30','CSC463',3,'',7,1),(29,'2023-03-15 22:26:10.007219','29','CSC462',3,'',7,1),(30,'2023-03-15 22:26:10.009219','28','CSC461',3,'',7,1),(31,'2023-03-15 22:26:10.011219','27','CSC460',3,'',7,1),(32,'2023-03-15 22:26:10.013219','26','CSC458',3,'',7,1),(33,'2023-03-15 22:26:10.015214','25','CSC450',3,'',7,1),(34,'2023-03-15 22:26:10.016219','24','CSC440',3,'',7,1),(35,'2023-03-15 22:26:10.018218','23','CSC435',3,'',7,1),(36,'2023-03-15 22:26:10.019219','22','CSC431',3,'',7,1),(37,'2023-03-15 22:26:10.021218','21','CSC420',3,'',7,1),(38,'2023-03-15 22:26:10.022218','20','CSC412',3,'',7,1),(39,'2023-03-15 22:26:10.024218','19','CSC323',3,'',7,1),(40,'2023-03-15 22:26:10.026218','18','CSC490',3,'',7,1),(41,'2023-03-15 22:26:10.028213','17','CSC491',3,'',7,1),(42,'2023-03-15 22:26:10.030218','16','CSC490',3,'',7,1),(43,'2023-03-15 22:26:10.031736','15','CSC447',3,'',7,1),(44,'2023-03-15 22:26:10.032746','14','CSC430',3,'',7,1),(45,'2023-03-15 22:26:10.034748','13','CSC375',3,'',7,1),(46,'2023-03-15 22:26:10.035742','12','CSC326',3,'',7,1),(47,'2023-03-15 22:26:10.037748','11','CSC322',3,'',7,1),(48,'2023-03-15 22:26:10.038748','10','CSC320',3,'',7,1),(49,'2023-03-15 22:26:10.040748','9','CSC310',3,'',7,1),(50,'2023-03-15 22:26:10.041757','8','CSC245',3,'',7,1),(51,'2023-03-15 22:26:10.043745','7','CSC243',3,'',7,1),(52,'2023-03-15 23:11:32.132724','1','CourseRelationShip object (1)',1,'[{\"added\": {}}]',8,1),(53,'2023-03-15 23:11:43.726226','2','CourseRelationShip object (2)',1,'[{\"added\": {}}]',8,1),(54,'2023-03-15 23:12:09.483559','3','CourseRelationShip object (3)',1,'[{\"added\": {}}]',8,1),(55,'2023-03-15 23:36:26.168290','4','CourseRelationShip object (4)',1,'[{\"added\": {}}]',8,1),(56,'2023-03-15 23:36:35.087194','5','CourseRelationShip object (5)',1,'[{\"added\": {}}]',8,1),(57,'2023-03-15 23:36:55.189057','6','CourseRelationShip object (6)',1,'[{\"added\": {}}]',8,1),(58,'2023-03-15 23:37:08.761458','7','CourseRelationShip object (7)',1,'[{\"added\": {}}]',8,1),(59,'2023-03-15 23:37:19.852324','8','CourseRelationShip object (8)',1,'[{\"added\": {}}]',8,1),(60,'2023-03-15 23:41:07.760773','9','CourseRelationShip object (9)',1,'[{\"added\": {}}]',8,1),(61,'2023-03-15 23:41:19.797242','10','CourseRelationShip object (10)',1,'[{\"added\": {}}]',8,1),(62,'2023-03-15 23:41:32.459099','11','CourseRelationShip object (11)',1,'[{\"added\": {}}]',8,1),(63,'2023-03-15 23:42:13.266724','12','CourseRelationShip object (12)',1,'[{\"added\": {}}]',8,1),(64,'2023-03-15 23:42:21.042682','13','CourseRelationShip object (13)',1,'[{\"added\": {}}]',8,1),(65,'2023-03-15 23:42:30.252657','14','CourseRelationShip object (14)',1,'[{\"added\": {}}]',8,1),(66,'2023-03-15 23:42:43.064253','15','CourseRelationShip object (15)',1,'[{\"added\": {}}]',8,1),(67,'2023-03-15 23:44:34.498122','16','CourseRelationShip object (16)',1,'[{\"added\": {}}]',8,1),(68,'2023-03-15 23:44:46.773988','17','CourseRelationShip object (17)',1,'[{\"added\": {}}]',8,1),(69,'2023-03-15 23:46:07.620676','18','CourseRelationShip object (18)',1,'[{\"added\": {}}]',8,1),(70,'2023-03-15 23:46:37.052284','19','CourseRelationShip object (19)',1,'[{\"added\": {}}]',8,1),(71,'2023-03-15 23:46:50.584485','20','CourseRelationShip object (20)',1,'[{\"added\": {}}]',8,1),(72,'2023-03-15 23:47:32.313528','21','CourseRelationShip object (21)',1,'[{\"added\": {}}]',8,1),(73,'2023-03-15 23:47:44.390274','22','CourseRelationShip object (22)',1,'[{\"added\": {}}]',8,1),(74,'2023-03-15 23:49:18.343655','23','CourseRelationShip object (23)',1,'[{\"added\": {}}]',8,1),(75,'2023-03-15 23:50:02.766049','24','CourseRelationShip object (24)',1,'[{\"added\": {}}]',8,1),(76,'2023-03-15 23:50:27.200165','25','CourseRelationShip object (25)',1,'[{\"added\": {}}]',8,1),(77,'2023-03-15 23:50:50.130133','26','CourseRelationShip object (26)',1,'[{\"added\": {}}]',8,1),(78,'2023-03-15 23:51:46.992168','27','CourseRelationShip object (27)',1,'[{\"added\": {}}]',8,1),(79,'2023-03-15 23:51:56.977812','28','CourseRelationShip object (28)',1,'[{\"added\": {}}]',8,1),(80,'2023-03-15 23:52:07.287389','29','CourseRelationShip object (29)',1,'[{\"added\": {}}]',8,1),(81,'2023-05-08 08:25:46.782449','79','BIF205',1,'[{\"added\": {}}]',7,1),(82,'2023-05-08 08:25:58.733635','80','BIF243',1,'[{\"added\": {}}]',7,1),(83,'2023-05-08 08:26:11.699638','81','BIF244',1,'[{\"added\": {}}]',7,1),(84,'2023-05-08 08:26:27.409726','82','BIF245',1,'[{\"added\": {}}]',7,1),(85,'2023-05-08 08:26:38.709889','83','BIF310',1,'[{\"added\": {}}]',7,1),(86,'2023-05-08 08:26:54.324683','84','BIF375',1,'[{\"added\": {}}]',7,1),(87,'2023-05-08 08:27:03.356691','85','BIF415',1,'[{\"added\": {}}]',7,1),(88,'2023-05-08 08:27:13.120613','86','BIF435',1,'[{\"added\": {}}]',7,1),(89,'2023-05-08 08:27:22.731806','87','BIF455',1,'[{\"added\": {}}]',7,1),(90,'2023-05-08 08:27:37.602012','88','BIF513',1,'[{\"added\": {}}]',7,1),(91,'2023-05-08 08:28:14.893370','89','BIF524',1,'[{\"added\": {}}]',7,1),(92,'2023-05-08 08:28:22.008129','90','BIF599',1,'[{\"added\": {}}]',7,1),(93,'2023-05-08 08:28:33.995177','91','CSC201',1,'[{\"added\": {}}]',7,1),(94,'2023-05-08 08:28:59.373493','91','CSC201',3,'',7,1),(95,'2023-05-08 08:29:23.449462','92','CSC206',1,'[{\"added\": {}}]',7,1),(96,'2023-05-08 08:29:37.915346','93','CSC241',1,'[{\"added\": {}}]',7,1),(97,'2023-05-08 08:30:30.997715','94','CSC443',1,'[{\"added\": {}}]',7,1),(98,'2023-05-08 08:31:23.163742','95','CSC480',1,'[{\"added\": {}}]',7,1),(99,'2023-05-08 08:31:42.489662','96','CSC599',1,'[{\"added\": {}}]',7,1),(100,'2023-05-08 08:31:57.849783','97','CSC613',1,'[{\"added\": {}}]',7,1),(101,'2023-05-08 08:32:10.834755','98','CSC615',1,'[{\"added\": {}}]',7,1),(102,'2023-05-08 08:32:18.037894','99','MTH101',1,'[{\"added\": {}}]',7,1),(103,'2023-05-08 08:32:24.758078','100','MTH102',1,'[{\"added\": {}}]',7,1),(104,'2023-05-08 08:32:35.730750','101','MTH206',1,'[{\"added\": {}}]',7,1),(105,'2023-05-08 08:33:25.449731','102','MTH308',1,'[{\"added\": {}}]',7,1),(106,'2023-05-08 08:33:44.957010','103','MTH311',1,'[{\"added\": {}}]',7,1),(107,'2023-05-08 08:33:52.846103','104','MTH400',1,'[{\"added\": {}}]',7,1),(108,'2023-05-08 08:34:07.569205','105','MTH401',1,'[{\"added\": {}}]',7,1),(109,'2023-05-08 08:34:13.346458','106','MTH403',1,'[{\"added\": {}}]',7,1),(110,'2023-05-08 08:34:37.279124','107','MTH407',1,'[{\"added\": {}}]',7,1),(111,'2023-05-08 08:34:46.461311','108','MTH409',1,'[{\"added\": {}}]',7,1),(112,'2023-05-08 08:34:54.901747','109','MTH410',1,'[{\"added\": {}}]',7,1),(113,'2023-05-08 08:35:05.857605','110','MTH411',1,'[{\"added\": {}}]',7,1),(114,'2023-05-08 08:35:16.822062','111','STA102',1,'[{\"added\": {}}]',7,1),(115,'2023-05-08 08:35:26.428443','112','STA201',1,'[{\"added\": {}}]',7,1),(116,'2023-05-08 08:35:51.598901','113','STA205',1,'[{\"added\": {}}]',7,1),(117,'2023-05-08 08:36:01.077762','114','STA302',1,'[{\"added\": {}}]',7,1),(118,'2023-05-08 08:36:17.490616','115','BIF599H',1,'[{\"added\": {}}]',7,1),(119,'2023-05-08 08:36:27.015782','116','CSC243B',1,'[{\"added\": {}}]',7,1),(120,'2023-05-08 08:36:35.988744','117','CSC245B',1,'[{\"added\": {}}]',7,1),(121,'2023-05-08 08:36:59.046316','118','CSC498B',1,'[{\"added\": {}}]',7,1),(122,'2023-05-08 08:37:08.809766','119','CSC498G',1,'[{\"added\": {}}]',7,1),(123,'2023-05-08 08:37:23.970777','120','CSC498H',1,'[{\"added\": {}}]',7,1),(124,'2023-05-08 08:37:37.103294','121','CSC498P',1,'[{\"added\": {}}]',7,1),(125,'2023-05-08 08:37:52.653224','122','CSC498X',1,'[{\"added\": {}}]',7,1),(126,'2023-05-08 08:38:19.448761','123','CSC599H',1,'[{\"added\": {}}]',7,1),(127,'2023-05-08 08:38:28.620526','124','MTH498A',1,'[{\"added\": {}}]',7,1),(128,'2023-05-08 08:38:43.753909','125','BIF498HB',1,'[{\"added\": {}}]',7,1),(129,'2023-05-08 08:39:04.278291','126','BIF498HC',1,'[{\"added\": {}}]',7,1),(130,'2023-05-08 08:39:27.149603','127','BIF498HF',1,'[{\"added\": {}}]',7,1),(131,'2023-05-08 08:39:55.318346','128','CSC498AC',1,'[{\"added\": {}}]',7,1),(132,'2023-05-08 08:40:06.234427','129','CSC498AD',1,'[{\"added\": {}}]',7,1),(133,'2023-05-08 08:40:18.436135','130','CSC498AE',1,'[{\"added\": {}}]',7,1),(134,'2023-05-08 08:40:26.419988','131','CSC498HJ',1,'[{\"added\": {}}]',7,1),(135,'2023-05-08 08:40:35.501513','132','CSC498HM',1,'[{\"added\": {}}]',7,1),(136,'2023-05-08 11:57:58.912898','133','BIF345',1,'[{\"added\": {}}]',7,1),(137,'2023-05-11 10:14:27.260683','29','CourseRelationShip object (29)',3,'',8,1),(138,'2023-05-11 10:14:27.274341','28','CourseRelationShip object (28)',3,'',8,1),(139,'2023-05-11 10:14:27.275350','27','CourseRelationShip object (27)',3,'',8,1),(140,'2023-05-11 10:14:27.277864','26','CourseRelationShip object (26)',3,'',8,1),(141,'2023-05-11 10:14:27.279925','25','CourseRelationShip object (25)',3,'',8,1),(142,'2023-05-11 10:14:27.280930','24','CourseRelationShip object (24)',3,'',8,1),(143,'2023-05-11 10:14:27.281967','23','CourseRelationShip object (23)',3,'',8,1),(144,'2023-05-11 10:14:27.283464','22','CourseRelationShip object (22)',3,'',8,1),(145,'2023-05-11 10:14:27.285431','21','CourseRelationShip object (21)',3,'',8,1),(146,'2023-05-11 10:14:27.286936','20','CourseRelationShip object (20)',3,'',8,1),(147,'2023-05-11 10:14:27.290723','19','CourseRelationShip object (19)',3,'',8,1),(148,'2023-05-11 10:14:27.292929','18','CourseRelationShip object (18)',3,'',8,1),(149,'2023-05-11 10:14:27.294996','17','CourseRelationShip object (17)',3,'',8,1),(150,'2023-05-11 10:14:27.296007','16','CourseRelationShip object (16)',3,'',8,1),(151,'2023-05-11 10:14:27.297003','15','CourseRelationShip object (15)',3,'',8,1),(152,'2023-05-11 10:14:27.299007','14','CourseRelationShip object (14)',3,'',8,1),(153,'2023-05-11 10:14:27.300712','13','CourseRelationShip object (13)',3,'',8,1),(154,'2023-05-11 10:14:27.302250','12','CourseRelationShip object (12)',3,'',8,1),(155,'2023-05-11 10:14:27.303272','11','CourseRelationShip object (11)',3,'',8,1),(156,'2023-05-11 10:14:27.306067','10','CourseRelationShip object (10)',3,'',8,1),(157,'2023-05-11 10:14:27.308087','9','CourseRelationShip object (9)',3,'',8,1),(158,'2023-05-11 10:14:27.310094','8','CourseRelationShip object (8)',3,'',8,1),(159,'2023-05-11 10:14:27.312094','7','CourseRelationShip object (7)',3,'',8,1),(160,'2023-05-11 10:14:27.314095','6','CourseRelationShip object (6)',3,'',8,1),(161,'2023-05-11 10:14:27.315094','5','CourseRelationShip object (5)',3,'',8,1),(162,'2023-05-11 10:14:27.317100','4','CourseRelationShip object (4)',3,'',8,1),(163,'2023-05-11 10:14:27.318111','3','CourseRelationShip object (3)',3,'',8,1),(164,'2023-05-11 10:14:27.320112','2','CourseRelationShip object (2)',3,'',8,1),(165,'2023-05-11 10:14:27.322112','1','CourseRelationShip object (1)',3,'',8,1),(166,'2023-05-11 10:15:12.413992','30','CourseRelationShip object (30)',1,'[{\"added\": {}}]',8,1),(167,'2023-05-11 10:15:58.449068','31','CourseRelationShip object (31)',1,'[{\"added\": {}}]',8,1),(168,'2023-05-11 10:16:26.985638','32','CourseRelationShip object (32)',1,'[{\"added\": {}}]',8,1),(169,'2023-05-11 10:16:57.504558','33','CourseRelationShip object (33)',1,'[{\"added\": {}}]',8,1),(170,'2023-05-11 10:17:06.738229','34','CourseRelationShip object (34)',1,'[{\"added\": {}}]',8,1),(171,'2023-05-11 10:17:23.702649','35','CourseRelationShip object (35)',1,'[{\"added\": {}}]',8,1),(172,'2023-05-11 10:17:38.326465','36','CourseRelationShip object (36)',1,'[{\"added\": {}}]',8,1),(173,'2023-05-11 10:17:45.602520','37','CourseRelationShip object (37)',1,'[{\"added\": {}}]',8,1),(174,'2023-05-11 10:18:12.351271','38','CourseRelationShip object (38)',1,'[{\"added\": {}}]',8,1),(175,'2023-05-11 10:18:20.566927','39','CourseRelationShip object (39)',1,'[{\"added\": {}}]',8,1),(176,'2023-05-11 10:18:38.634142','40','CourseRelationShip object (40)',1,'[{\"added\": {}}]',8,1),(177,'2023-05-11 10:19:11.568506','41','CourseRelationShip object (41)',1,'[{\"added\": {}}]',8,1),(178,'2023-05-11 10:19:25.072005','42','CourseRelationShip object (42)',1,'[{\"added\": {}}]',8,1),(179,'2023-05-11 10:19:40.842598','43','CourseRelationShip object (43)',1,'[{\"added\": {}}]',8,1),(180,'2023-05-11 10:20:07.833839','44','CourseRelationShip object (44)',1,'[{\"added\": {}}]',8,1),(181,'2023-05-11 10:20:34.091494','45','CourseRelationShip object (45)',1,'[{\"added\": {}}]',8,1),(182,'2023-05-11 10:21:17.158400','46','CourseRelationShip object (46)',1,'[{\"added\": {}}]',8,1),(183,'2023-05-11 10:21:47.510427','47','CourseRelationShip object (47)',1,'[{\"added\": {}}]',8,1),(184,'2023-05-11 10:25:32.893035','33','CourseRelationShip object (33)',2,'[{\"changed\": {\"fields\": [\"IsPrerequisite\"]}}]',8,1),(185,'2023-05-11 10:25:38.471007','34','CourseRelationShip object (34)',2,'[{\"changed\": {\"fields\": [\"IsPrerequisite\"]}}]',8,1),(186,'2023-05-11 10:26:00.559560','35','CourseRelationShip object (35)',2,'[{\"changed\": {\"fields\": [\"SecondCourse\"]}}]',8,1),(187,'2023-05-11 10:27:13.345185','39','CourseRelationShip object (39)',2,'[{\"changed\": {\"fields\": [\"SecondCourse\"]}}]',8,1),(188,'2023-05-11 10:30:12.097965','48','CourseRelationShip object (48)',1,'[{\"added\": {}}]',8,1),(189,'2023-05-11 10:30:40.256640','49','CourseRelationShip object (49)',1,'[{\"added\": {}}]',8,1),(190,'2023-05-11 10:30:56.997449','50','CourseRelationShip object (50)',1,'[{\"added\": {}}]',8,1),(191,'2023-05-11 10:31:12.550492','51','CourseRelationShip object (51)',1,'[{\"added\": {}}]',8,1),(192,'2023-05-11 10:31:30.567578','52','CourseRelationShip object (52)',1,'[{\"added\": {}}]',8,1),(193,'2023-05-11 10:32:51.889364','53','CourseRelationShip object (53)',1,'[{\"added\": {}}]',8,1),(194,'2023-05-11 10:33:27.681324','54','CourseRelationShip object (54)',1,'[{\"added\": {}}]',8,1),(195,'2023-05-11 10:33:55.438855','55','CourseRelationShip object (55)',1,'[{\"added\": {}}]',8,1),(196,'2023-05-11 10:34:09.522945','56','CourseRelationShip object (56)',1,'[{\"added\": {}}]',8,1),(197,'2023-05-11 10:35:18.439064','57','CourseRelationShip object (57)',1,'[{\"added\": {}}]',8,1),(198,'2023-05-11 10:36:15.244870','58','CourseRelationShip object (58)',1,'[{\"added\": {}}]',8,1),(199,'2023-05-11 10:37:01.927647','59','CourseRelationShip object (59)',1,'[{\"added\": {}}]',8,1),(200,'2023-05-11 10:37:33.089068','60','CourseRelationShip object (60)',1,'[{\"added\": {}}]',8,1),(201,'2023-05-11 10:37:49.594224','61','CourseRelationShip object (61)',1,'[{\"added\": {}}]',8,1),(202,'2023-05-11 10:38:07.994731','62','CourseRelationShip object (62)',1,'[{\"added\": {}}]',8,1),(203,'2023-05-11 10:39:29.879875','63','CourseRelationShip object (63)',1,'[{\"added\": {}}]',8,1),(204,'2023-05-11 10:39:55.657923','64','CourseRelationShip object (64)',1,'[{\"added\": {}}]',8,1),(205,'2023-05-11 10:40:05.346030','65','CourseRelationShip object (65)',1,'[{\"added\": {}}]',8,1),(206,'2023-05-11 10:40:25.224758','66','CourseRelationShip object (66)',1,'[{\"added\": {}}]',8,1),(207,'2023-05-11 10:40:50.129936','67','CourseRelationShip object (67)',1,'[{\"added\": {}}]',8,1),(208,'2023-05-11 10:41:01.630364','67','CourseRelationShip object (67)',2,'[{\"changed\": {\"fields\": [\"SecondCourse\"]}}]',8,1),(209,'2023-05-11 10:42:20.182812','68','CourseRelationShip object (68)',1,'[{\"added\": {}}]',8,1),(210,'2023-05-11 10:45:31.716030','69','CourseRelationShip object (69)',1,'[{\"added\": {}}]',8,1),(211,'2023-05-11 10:46:58.510355','70','CourseRelationShip object (70)',1,'[{\"added\": {}}]',8,1),(212,'2023-05-11 10:48:03.180000','71','CourseRelationShip object (71)',1,'[{\"added\": {}}]',8,1),(213,'2023-05-11 10:48:38.640859','72','CourseRelationShip object (72)',1,'[{\"added\": {}}]',8,1),(214,'2023-05-11 10:49:43.203190','73','CourseRelationShip object (73)',1,'[{\"added\": {}}]',8,1),(215,'2023-05-11 10:50:02.957895','74','CourseRelationShip object (74)',1,'[{\"added\": {}}]',8,1),(216,'2023-05-11 10:50:40.076209','75','CourseRelationShip object (75)',1,'[{\"added\": {}}]',8,1),(217,'2023-05-11 10:51:12.041566','76','CourseRelationShip object (76)',1,'[{\"added\": {}}]',8,1),(218,'2023-05-11 10:51:37.325950','77','CourseRelationShip object (77)',1,'[{\"added\": {}}]',8,1),(219,'2023-05-11 10:51:51.397411','78','CourseRelationShip object (78)',1,'[{\"added\": {}}]',8,1),(220,'2023-05-11 10:52:40.030917','79','CourseRelationShip object (79)',1,'[{\"added\": {}}]',8,1),(221,'2023-05-11 10:53:23.079992','80','CourseRelationShip object (80)',1,'[{\"added\": {}}]',8,1),(222,'2023-05-11 10:54:07.968966','134','MTH402',1,'[{\"added\": {}}]',7,1),(223,'2023-05-11 10:54:13.593303','81','CourseRelationShip object (81)',1,'[{\"added\": {}}]',8,1),(224,'2023-05-11 10:54:43.182803','82','CourseRelationShip object (82)',1,'[{\"added\": {}}]',8,1),(225,'2023-05-11 10:55:06.622366','83','CourseRelationShip object (83)',1,'[{\"added\": {}}]',8,1),(226,'2023-05-11 10:55:45.485177','84','CourseRelationShip object (84)',1,'[{\"added\": {}}]',8,1),(227,'2023-05-11 10:56:09.253453','85','CourseRelationShip object (85)',1,'[{\"added\": {}}]',8,1),(228,'2023-05-11 10:57:22.682128','86','CourseRelationShip object (86)',1,'[{\"added\": {}}]',8,1),(229,'2023-05-11 10:58:10.974863','87','CourseRelationShip object (87)',1,'[{\"added\": {}}]',8,1),(230,'2023-05-11 10:58:20.003441','88','CourseRelationShip object (88)',1,'[{\"added\": {}}]',8,1),(231,'2023-05-11 11:01:07.333132','89','CourseRelationShip object (89)',1,'[{\"added\": {}}]',8,1),(232,'2023-05-11 11:01:19.441883','90','CourseRelationShip object (90)',1,'[{\"added\": {}}]',8,1),(233,'2023-05-11 11:01:50.141747','91','CourseRelationShip object (91)',1,'[{\"added\": {}}]',8,1),(234,'2023-05-11 11:02:41.069611','92','CourseRelationShip object (92)',1,'[{\"added\": {}}]',8,1),(235,'2023-05-11 11:02:47.204258','93','CourseRelationShip object (93)',1,'[{\"added\": {}}]',8,1),(236,'2023-05-11 11:02:56.824090','94','CourseRelationShip object (94)',1,'[{\"added\": {}}]',8,1),(237,'2023-05-11 11:03:50.606684','95','CourseRelationShip object (95)',1,'[{\"added\": {}}]',8,1),(238,'2023-05-11 11:03:57.314044','96','CourseRelationShip object (96)',1,'[{\"added\": {}}]',8,1),(239,'2023-05-11 11:04:04.669870','97','CourseRelationShip object (97)',1,'[{\"added\": {}}]',8,1),(240,'2023-05-11 11:04:11.753564','98','CourseRelationShip object (98)',1,'[{\"added\": {}}]',8,1),(241,'2023-05-11 11:04:17.562115','99','CourseRelationShip object (99)',1,'[{\"added\": {}}]',8,1),(242,'2023-05-11 11:05:10.690308','100','CourseRelationShip object (100)',1,'[{\"added\": {}}]',8,1),(243,'2023-05-12 23:37:42.185423','1','BS in Computer Science',2,'[{\"changed\": {\"fields\": [\"Credits\", \"Courses\"]}}]',11,1),(244,'2023-05-12 23:41:17.126468','3','BS in Mathematics',2,'[{\"changed\": {\"fields\": [\"Credits\"]}}]',11,1),(245,'2023-05-12 23:41:22.339444','1','BS in Computer Science',2,'[{\"changed\": {\"fields\": [\"Credits\"]}}]',11,1),(246,'2023-05-12 23:50:58.730613','3','BS in Mathematics',2,'[{\"changed\": {\"fields\": [\"Courses\"]}}]',11,1),(247,'2023-05-12 23:54:14.292090','2','BS in Bioinformatics',2,'[{\"changed\": {\"fields\": [\"Credits\", \"Courses\"]}}]',11,1),(248,'2023-05-13 00:03:19.086214','43','CSC243',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(249,'2023-05-13 00:03:29.481782','44','CSC245',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(250,'2023-05-13 00:03:49.273893','45','CSC310',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(251,'2023-05-13 00:04:01.732547','49','CSC375',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(252,'2023-05-13 00:04:39.396087','56','CSC412',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(253,'2023-05-13 00:04:50.157526','80','BIF243',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(254,'2023-05-13 00:05:02.138028','82','BIF245',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(255,'2023-05-13 00:05:08.831794','83','BIF310',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(256,'2023-05-13 00:05:16.647238','84','BIF375',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(257,'2023-05-13 00:05:28.690387','85','BIF415',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(258,'2023-05-13 00:05:37.571423','123','CSC599H',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(259,'2023-05-13 00:06:05.690430','96','CSC599',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(260,'2023-05-13 00:06:24.261882','115','BIF599H',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(261,'2023-05-13 00:06:38.648491','90','BIF599',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(262,'2023-05-13 00:14:00.597693','109','MTH410',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(263,'2023-05-13 00:14:09.741126','109','MTH410',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(264,'2023-05-13 00:14:36.281818','110','MTH411',2,'[{\"changed\": {\"fields\": [\"Substitutes\"]}}]',7,1),(265,'2023-05-14 09:23:35.142347','160','CSC701',3,'',7,1),(266,'2023-05-14 09:23:35.150348','159','CSC700',3,'',7,1),(267,'2023-05-14 09:23:35.152349','158','CSC699',3,'',7,1),(268,'2023-05-14 09:23:35.154348','157','CSC698',3,'',7,1),(269,'2023-05-14 09:23:35.156347','156','CSC697',3,'',7,1),(270,'2023-05-14 09:23:35.158348','155','CSC696',3,'',7,1),(271,'2023-05-14 09:23:35.160353','154','CSC695',3,'',7,1),(272,'2023-05-14 09:23:35.165353','153','CSC694',3,'',7,1),(273,'2023-05-14 09:23:35.166352','152','CSC693',3,'',7,1),(274,'2023-05-14 09:23:35.168355','151','CSC692',3,'',7,1),(275,'2023-05-14 09:23:35.170668','150','CSC691',3,'',7,1),(276,'2023-05-14 09:23:35.171705','149','CSC690',3,'',7,1),(277,'2023-05-14 09:23:35.173905','148','CSC689',3,'',7,1),(278,'2023-05-14 09:23:35.175462','147','CSC688',3,'',7,1),(279,'2023-05-14 09:23:35.176468','146','CSC687',3,'',7,1),(280,'2023-05-14 09:23:35.178469','145','CSC678',3,'',7,1),(281,'2023-05-14 09:23:35.180469','144','CSC555',3,'',7,1),(282,'2023-05-14 09:23:35.182472','143','CSC444',3,'',7,1),(283,'2023-05-14 09:23:35.183480','142','CSC111',3,'',7,1),(284,'2023-05-14 09:23:35.185582','141','CSC222',3,'',7,1),(285,'2023-05-14 09:23:35.188615','140','CSC888',3,'',7,1),(286,'2023-05-14 09:23:35.190965','139','CSC999',3,'',7,1),(287,'2023-05-14 09:23:35.192963','138','CSC777',3,'',7,1),(288,'2023-05-14 09:23:35.193963','137','CSC666',3,'',7,1),(289,'2023-05-14 09:23:35.194964','136','CSC333',3,'',7,1),(290,'2023-05-20 13:49:32.926862','170','CSC310B',1,'[{\"added\": {}}]',7,1),(291,'2023-05-20 13:53:35.295101','171','CSC380',1,'[{\"added\": {}}]',7,1),(292,'2023-05-20 13:53:44.974523','1','StudyPlan object (1)',1,'[{\"added\": {}}]',14,1),(293,'2023-05-20 13:55:22.514458','119','CourseRelationShip object (119)',1,'[{\"added\": {}}]',8,1),(294,'2023-05-20 16:37:07.515194','13','Doctor object (13)',3,'',13,1),(295,'2023-05-20 16:37:22.360842','1','Doctor object (1)',3,'',13,1),(296,'2023-05-20 19:49:56.386864','1','StudyPlan object (1)',2,'[{\"changed\": {\"fields\": [\"FirstYear\"]}}]',14,1),(297,'2023-05-21 07:44:25.993902','4','Batalna el cha8le',3,'',11,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(12,'backend','availability'),(7,'backend','course'),(8,'backend','courserelationship'),(13,'backend','doctor'),(11,'backend','major'),(10,'backend','section'),(9,'backend','student'),(14,'backend','studyplan'),(6,'backend','user'),(4,'contenttypes','contenttype'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-02-21 12:55:03.784506'),(2,'contenttypes','0002_remove_content_type_name','2023-02-21 12:55:03.846447'),(3,'auth','0001_initial','2023-02-21 12:55:04.051928'),(4,'auth','0002_alter_permission_name_max_length','2023-02-21 12:55:04.095589'),(5,'auth','0003_alter_user_email_max_length','2023-02-21 12:55:04.102802'),(6,'auth','0004_alter_user_username_opts','2023-02-21 12:55:04.109652'),(7,'auth','0005_alter_user_last_login_null','2023-02-21 12:55:04.119624'),(8,'auth','0006_require_contenttypes_0002','2023-02-21 12:55:04.121634'),(9,'auth','0007_alter_validators_add_error_messages','2023-02-21 12:55:04.128855'),(10,'auth','0008_alter_user_username_max_length','2023-02-21 12:55:04.137646'),(11,'auth','0009_alter_user_last_name_max_length','2023-02-21 12:55:04.144626'),(12,'auth','0010_alter_group_name_max_length','2023-02-21 12:55:04.162740'),(13,'auth','0011_update_proxy_permissions','2023-02-21 12:55:04.173465'),(14,'auth','0012_alter_user_first_name_max_length','2023-02-21 12:55:04.180159'),(15,'backend','0001_initial','2023-02-21 12:55:04.413152'),(16,'admin','0001_initial','2023-02-21 12:55:04.520766'),(17,'admin','0002_logentry_remove_auto_add','2023-02-21 12:55:04.529341'),(18,'admin','0003_logentry_add_action_flag_choices','2023-02-21 12:55:04.538993'),(19,'sessions','0001_initial','2023-02-21 12:55:04.575231'),(20,'backend','0002_alter_user_ischaiperson_course','2023-02-22 00:27:45.562367'),(21,'backend','0003_alter_course_campus_alter_course_unique_together_and_more','2023-03-15 23:09:52.720717'),(22,'backend','0004_alter_course_unique_together','2023-03-15 23:09:52.746793'),(23,'backend','0005_delete_courserelationship','2023-03-15 23:09:52.760424'),(24,'backend','0006_alter_course_unique_together_courserelationship','2023-03-15 23:10:26.539204'),(25,'backend','0007_rename_maincourse_id_courserelationship_maincourse_and_more','2023-03-16 01:15:13.894147'),(26,'backend','0008_student','2023-03-16 09:55:15.447389'),(27,'backend','0009_remove_course_campus','2023-03-23 20:00:30.065162'),(28,'backend','0010_section','2023-04-14 20:24:09.165466'),(29,'backend','0011_student_campus_student_major_major','2023-05-08 09:03:09.676928'),(30,'backend','0012_alter_major_courses','2023-05-08 09:26:41.938830'),(31,'backend','0013_alter_major_title','2023-05-08 09:28:15.231909'),(32,'backend','0016_student','2023-05-08 09:47:36.130798'),(33,'backend','0017_course_substitutes','2023-05-11 13:55:47.767686'),(34,'backend','0018_section_capacity','2023-05-18 15:18:06.147358'),(35,'backend','0019_availability_doctor','2023-05-18 21:04:04.775861'),(36,'backend','0020_alter_availability_day','2023-05-18 21:07:45.052483'),(37,'backend','0021_alter_doctor_availability','2023-05-18 21:57:14.830667'),(38,'backend','0022_alter_doctor_courses','2023-05-18 21:57:14.844258'),(39,'backend','0023_rename_day_availability_days_and_more','2023-05-19 01:35:29.127100'),(40,'backend','0024_alter_availability_end_alter_availability_start','2023-05-19 02:03:27.613254'),(41,'backend','0025_alter_availability_days','2023-05-19 02:36:42.626764'),(42,'backend','0026_studyplan','2023-05-20 13:46:00.246856'),(43,'backend','0027_doctor_campus','2023-05-20 18:59:10.403739');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1u6agczyayl2n4cuksfyowi1psca42cj','.eJxVjEEOwiAQRe_C2pBBoIBL9z0DmYFBqoYmpV0Z765NutDtf-_9l4i4rTVunZc4ZXERSpx-N8L04LaDfMd2m2Wa27pMJHdFHrTLcc78vB7u30HFXr81W8JATFqDM8FAPgOCYy7eJRp8sDRA4KwSeaWCZpvYeFDFWIMaihXvD-zBN88:1pqeNk:zAlrM9kfS9nRpzPqYD2VhQx8g-1hAnJdAb7HwkoUY9o','2023-05-07 18:24:16.446031'),('5tob56cdkzzmzi5c109f4t3o9zjif95c','.eJxVjEEOwiAQRe_C2pBBoIBL9z0DmYFBqoYmpV0Z765NutDtf-_9l4i4rTVunZc4ZXERSpx-N8L04LaDfMd2m2Wa27pMJHdFHrTLcc78vB7u30HFXr81W8JATFqDM8FAPgOCYy7eJRp8sDRA4KwSeaWCZpvYeFDFWIMaihXvD-zBN88:1pb2cD:A5R4ky-dwIuOPzcorBctZ7wLPs_M797PiWJEeiUnV9s','2023-03-25 17:02:41.019729'),('o3kmwb8rscx0lhxpytmdoolsahgde0qt','.eJxVjEEOwiAQRe_C2pBBoIBL9z0DmYFBqoYmpV0Z765NutDtf-_9l4i4rTVunZc4ZXERSpx-N8L04LaDfMd2m2Wa27pMJHdFHrTLcc78vB7u30HFXr81W8JATFqDM8FAPgOCYy7eJRp8sDRA4KwSeaWCZpvYeFDFWIMaihXvD-zBN88:1pUSCT:ossPjZSz4MOOWGjH5RhPBMCO2ReZXkN0TQzc90crzqw','2023-03-07 12:56:53.437758'),('q5ed8ffhqk3urzkvone802iulp0s8jtd','.eJxVjEEOwiAQRe_C2pBBoIBL9z0DmYFBqoYmpV0Z765NutDtf-_9l4i4rTVunZc4ZXERSpx-N8L04LaDfMd2m2Wa27pMJHdFHrTLcc78vB7u30HFXr81W8JATFqDM8FAPgOCYy7eJRp8sDRA4KwSeaWCZpvYeFDFWIMaihXvD-zBN88:1pb2PL:ZwpVG0UzhgQc2_JEtrK99yF9rAwW0RnaqKYQPXiZ6es','2023-03-25 16:49:23.463010'),('rmywqy9bdupc6duv2khhp4caeipdn5si','.eJxVjEEOwiAQRe_C2pBBoIBL9z0DmYFBqoYmpV0Z765NutDtf-_9l4i4rTVunZc4ZXERSpx-N8L04LaDfMd2m2Wa27pMJHdFHrTLcc78vB7u30HFXr81W8JATFqDM8FAPgOCYy7eJRp8sDRA4KwSeaWCZpvYeFDFWIMaihXvD-zBN88:1pvwB1:wFvfC58Fe-V2-vd3qKtfPJWMwesx6VkqMwxJ2Fd28LM','2023-05-22 08:24:59.823441');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-21 15:15:27
