USE Rapture
GO

CREATE TABLE Location (
	ID int PRIMARY KEY IDENTITY(1, 1),
	Name varchar(20) NOT NULL
);

CREATE TABLE Person (
	ID int PRIMARY KEY IDENTITY(1, 1),
	UserName varchar(50) UNIQUE NOT NULL,
	Password varchar(50) NOT NULL,
	Salt varbinary(1024),
	Name varchar(20) NOT NULL,
	LivesAtID int,
	FOREIGN KEY (LivesAtID) REFERENCES Location(ID)
);

CREATE TABLE Disaster (
	ID int PRIMARY KEY IDENTITY(1, 1),
	Name varchar(20) NOT NULL,
	Description varchar(280),
	Range int
);

CREATE TABLE Asset (
	ID int PRIMARY KEY IDENTITY(1, 1),
	Name varchar(20) NOT NULL,
	Description varchar(280)
);

CREATE TABLE Item (
	ID int REFERENCES Asset(ID),
	PRIMARY KEY(ID)
);

CREATE TABLE Skill (
	ID int REFERENCES Asset(ID),
	PRIMARY KEY(ID)
);

CREATE TABLE Experienced (
	DisasterID int REFERENCES Disaster(ID),
	PersonID int REFERENCES Person(ID),
	LocationID int REFERENCES Location(ID),
	DangerLevel char(1),
	TimeStamp datetime,
	PRIMARY KEY (DisasterID, PersonID, LocationID),
	CHECK (DangerLevel LIKE '[0-5]')
);

CREATE TABLE HasSkill (
	PersonID int REFERENCES Person(ID),
	SkillID int REFERENCES Skill(ID),
	PRIMARY KEY (PersonID, SkillID)
);

CREATE TABLE HasItem (
	PersonID int REFERENCES Person(ID),
	ItemID int REFERENCES Item(ID),
	PRIMARY KEY (PersonID, ItemID)
);

CREATE TABLE CloseTo (
	Location1ID int REFERENCES Location(ID),
	Location2ID int REFERENCES Location(ID),
	PRIMARY KEY (Location1ID, Location2ID)
);

CREATE TABLE UsefulFor (
	DisasterID int REFERENCES Disaster(ID),
	AssetID int REFERENCES Asset(ID),
	PRIMARY KEY (DisasterID, AssetID)
);