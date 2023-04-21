USE Rapture
GO

CREATE PROCEDURE AddPerson
	@username varchar(50) = '',
	@password varchar(50) = '',
	@salt varbinary(1024),
	@name varchar(20) = '',
	@locationname varchar(20) = ''
AS
BEGIN
	IF (@username = '')
	BEGIN
		RAISERROR('Username cannot bo null or empty', 1, 14)
		RETURN 1
	END
	IF (@password = '')
	BEGIN
		RAISERROR('Password cannot bo null or empty',1 ,14)
		RETURN 1
	END
	IF (@name = '')
	BEGIN
		RAISERROR('Name cannot bo null or empty', 1, 14)
		RETURN 1
	END
	IF (@locationname = '')
	BEGIN
		RAISERROR('Location Name cannot bo null or empty', 1, 14)
		RETURN 1
	END
	IF (NOT EXISTS(SELECT * FROM Location WHERE Name = @locationname))
	BEGIN
		RAISERROR('Location invalid', 1, 14)
		RETURN 2
	END

	DECLARE @locationID int
	SELECT @locationID = ID FROM Location WHERE Name = @locationname;

	INSERT INTO Person (UserName, Password, Salt, Name, LivesAtID)
	VALUES (@username, @password, @salt, @name, @locationID)

	RETURN 0
END