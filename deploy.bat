ECHO OFF

echo Verify packages
if exist node_modules (
	echo Modules are already here.
	SET "ERRORLEVEL=0"
) else (
	call npm i
)
if ["%ERRORLEVEL%"]==["1"] (
	echo Error trying to install modules
	GOTO :EOF
)

echo ~
echo Build Stage
call npm run build%1
echo "Build error level: %ERRORLEVEL%"

if ["%ERRORLEVEL%"]==["1"] (
	GOTO :EOF
)

echo ~ 
echo Deploy stage
echo Establishing connection...
ssh -i "C:\Users\%USERNAME%\.ssh\adote.pem" ec2-user@adote-um-amanha.duckdns.org "bash ./scripts/%1/backup_frontend.sh"  

sftp -b "deploy%1.sftp" -i "C:\Users\%USERNAME%\.ssh\adote.pem" -P 22 ec2-user@adote-um-amanha.duckdns.org

ssh -i "C:\Users\%USERNAME%\.ssh\adote.pem" ec2-user@adote-um-amanha.duckdns.org "bash ./scripts/%1/deploy_frontend.sh"
