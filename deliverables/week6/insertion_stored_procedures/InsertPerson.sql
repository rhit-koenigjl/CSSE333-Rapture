USE Rapture
GO

CREATE PROCEDURE InsertPerson (
	@UserName varchar(50),
	@PassWord varchar(50),
	@Salt varbinary(1024),
	@Name varchar(20),
	@LAID int
)
AS
BEGIN
IF @UserName IS NULL OR @Salt IS NULL OR @Name IS NULL OR @LAID IS NULL
	BEGIN
	PRINT 'ERROR: must have non null values';
	RETURN -1;
	END

IF NOT EXISTS (SELECT * FROM Location WHERE ID = @LAID)
	BEGIN
	PRINT 'ERROR: provided location is not valid';
	RETURN -2;
	END

IF EXISTS (SELECT * FROM Person WHERE UserName = @UserName AND Password = @PassWord AND Salt = @Salt AND Name = @Name AND LivesAtID = @LAID)
	BEGIN
	PRINT 'ERROR: already exists in the Person table';
	RETURN -3;
	END

INSERT INTO Person (UserName, Password, Salt, Name, LivesAtID)
VALUES(@UserName, @PassWord, @Salt, @Name, @LAID)

PRINT 'Person successfully added';
RETURN 1;

END
