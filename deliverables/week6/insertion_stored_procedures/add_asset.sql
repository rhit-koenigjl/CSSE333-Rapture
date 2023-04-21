USE Rapture
GO

CREATE PROCEDURE AddAsset
	@name varchar(20) = '',
	@description varchar(280) = ''
AS
BEGIN
	IF (@name = '')
	BEGIN
		RAISERROR('Name cannot be null or empty', 1, 14)
		RETURN 1
	END
	IF (EXISTS (SELECT * FROM Asset WHERE Name = @name))
	BEGIN
		RAISERROR('This asset already exists', 1, 14)
		RETURN 2
	END

	INSERT INTO Asset (Name, Description)
	VALUES (@name, @description)
END