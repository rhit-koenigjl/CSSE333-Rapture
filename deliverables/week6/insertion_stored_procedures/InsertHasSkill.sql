USE Rapture
GO

CREATE PROCEDURE InsertHasSkill (
	@PID int,
	@SID int
)
AS
BEGIN
IF @PID IS NULL OR @SID IS NULL
	BEGIN
	PRINT 'ERROR: must have non null values';
	RETURN -1;
	END

IF NOT EXISTS (SELECT * FROM Person WHERE ID = @PID) OR NOT EXISTS (SELECT * FROM Skill WHERE ID = @SID)
	BEGIN
	PRINT 'ERROR: provided PID or SID do not exist in the Person or Skill tables';
	RETURN -2;
	END

IF EXISTS (SELECT * FROM HasSkill WHERE PersonID = @PID AND SkillID = @SID)
	BEGIN
	PRINT 'ERROR: already exists in the HasSkill table';
	RETURN -3;
	END

INSERT INTO HasSkill (PersonId, SkillID)
VALUES(@PID, @SID)

PRINT 'Skill successfully added';
RETURN 1;

END
