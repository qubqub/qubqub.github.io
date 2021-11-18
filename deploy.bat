@echo off

@set YEAR=%date:~0,4%
@set MONTH=%date:~5,2%
@set DAY=%date:~8,2%
@set HOUR=%time:~0,2%
@set MINUTE=%time:~3,2%
@set SECOND=%time:~6,2%
 
@set POSTFIX=%YEAR%-%MONTH%-%DAY%_%HOUR%-%MINUTE%-%SECOND%

echo "Deploying updates to GitHub..."

REM Build the project.
hugo -d docs -t PaperMod

git add .

REM Commit changes.
if !%1==! (
  set msg = "rebuilding site "%POSTFIX%
) else (
  set msg = %1
)

git commit -m %msg%

git push origin master