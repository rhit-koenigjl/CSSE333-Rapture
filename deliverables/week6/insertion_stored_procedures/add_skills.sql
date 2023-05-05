Use Rapture
GO

Create PROCEDURE AddSkill (
@name varchar(20), @description varchar(280) = null)
AS
BEGIN
	IF(@name is null) BEGIN
		RAISERROR('Cannot add item with a null name', 1, 14)
		return 1
	END

	IF((SELECT COUNT(a.ID) FROM Asset a JOIN Skill s on s.ID = a.ID where a.name = @Name) <> 0)
	BEGIN
		RAISERROR('Skill already exists', 1, 14)
		return 2
	END

	DECLARE @id int

	IF((SELECT COUNT(a.ID) FROM Asset a where a.Name = @Name) = 0)
	BEGIN
		INSERT INTO Asset
			Values(@name, @description)
	END 

	SET @id = (SELECT a.ID FROM Asset a where a.Name = @Name)

	INSERT INTO Skill
		Values(@id)

END
