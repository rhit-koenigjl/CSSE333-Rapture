Use Rapture
GO
Create PROCEDURE AddItem @name varchar(20) = '', @description varchar(280) = ''
AS
BEGIN
	IF(@name = '')
	BEGIN
		RAISERROR('Cannot add item with a null name', 1, 14)
		return 1
	END

	IF( (SELECT COUNT(a.ID) FROM Asset a JOIN Item i on i.ID = a.ID where a.name = @Name) <> 0)
	BEGIN
		RAISERROR('Item already exists', 1, 14)
		return 2
	END

	DECLARE @id int

	IF((SELECT COUNT(a.ID) FROM Asset a where a.Name = @Name) = 0)
	BEGIN
		INSERT INTO Asset
			Values(@name, @description)
	END 

	SET @id = (SELECT a.ID FROM Asset a where a.Name = @Name)

	INSERT INTO Item
		Values(@id)


	
END
