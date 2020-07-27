@echo off
REM If postgres was installed by the Windows installed, start it by
REM starting the windows serivce, instead of using the pg_ctl command.
net start postgresql-x64-12
