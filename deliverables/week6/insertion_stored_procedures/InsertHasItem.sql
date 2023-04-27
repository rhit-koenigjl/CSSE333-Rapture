USE Rapture
GO

CREATE PROCEDURE InsertHasItem (
	@PID int,
	@IID int
)
AS
BEGIN
IF @PID IS NULL OR @IID IS NULL
	BEGIN
	PRINT 'ERROR: must have non null values';
	RETURN -1;
	END

IF NOT EXISTS (SELECT * FROM Person WHERE ID = @PID) OR NOT EXISTS (SELECT * FROM Item WHERE ID = @IID)
	BEGIN
	PRINT 'ERROR: provided PID or IID do not exist in the Person or Item tables';
	RETURN -2;
	END

IF EXISTS (SELECT * FROM HasItem WHERE PersonID = @PID AND ItemID = @IID)
	BEGIN
	PRINT 'ERROR: already exists in the HasItem table';
	RETURN -3;
	END

INSERT INTO HasItem (PersonId, ItemID)
VALUES(@PID, @IID)

PRINT 'Item successfully added';
RETURN 1;

END