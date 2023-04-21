USE Rapture
GO

CREATE PROCEDURE AddDisaster
	@name varchar(20),
	@description varchar(280) = 'no description provided',
	@range int = 0
AS
BEGIN
	IF (@name = '')
	BEGIN
		RAISERROR('Disaster Name cannot be empty', 1, 14)
		RETURN 1
	END

	IF (EXISTS (SELECT * FROM Disaster WHERE Name = @name))
	BEGIN
		RAISERROR('Disaster with that name already exists', 1, 14)
		RETURN 2
	END

	INSERT INTO Disaster (Name, Description, Range)
	VALUES (@name, @description, @range);
END