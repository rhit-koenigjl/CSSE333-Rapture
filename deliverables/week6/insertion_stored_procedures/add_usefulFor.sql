USE Rapture
GO
CREATE PROCEDURE AddUsefulFor(@disasterName varchar(20), @assetName varchar(20))
AS
BEGIN
	IF(@disasterName is null or @assetName is null) 
	BEGIN
		RAISERROR('asset name or disaster name cannot be null',1,14)
		return 1
	END

	IF(Count((SELECT * FROM Disaster WHERE Name = @disasterName)) <> 0)
	BEGIN
		RAISERROR('disaster does not exist', 1,14)
		Return 3
	END

	IF(Count((SELECT * FROM Asset WHERE Name = @assetName)) <> 0)
	BEGIN
		RAISERROR('asset does not exist', 1,14)
		Return 3
	END

	Declare @disasterID int
	Declare @assetID int

	SET @assetID = (SELECT ID FROM Asset WHERE Name = @assetName)
	SET @disasterID = (SELECT ID FROM Disaster WHERE Name = @disasterName)

	IF(COUNT((SELECT * FROM UsefulFor where DisasterID = @disasterID and AssetID = @assetID)) <> 0)
	BEGIN
		RAISERROR('Useful for table already has connection', 1, 14)
		return 2
	END

	INSERT INTO UsefulFor
		Values(@disasterID, @assetID)

END