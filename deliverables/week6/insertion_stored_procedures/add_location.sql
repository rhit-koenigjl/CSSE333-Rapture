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
	IF (EXISTS (SELECT * FROM Location WHERE Name = @name))
	BEGIN
		RAISERROR ('That item is already in the Location table', 1, 14)
		RETURN 2
	END

	INSERT INTO Location (Name)
	VALUES (@name)
	RETURN 0
END