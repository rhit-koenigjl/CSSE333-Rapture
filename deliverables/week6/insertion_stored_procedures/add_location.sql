USE Rapture
GO

CREATE PROCEDURE AddLocation
	@name varchar(20)
AS
BEGIN
	IF (@name IS NULL)
	BEGIN
		RAISERROR ('Cannot add location with null name', 1, 14)
		RETURN 1
	END

	INSERT INTO Location (Name)
	VALUES (@name)
	RETURN 0
END