@echo off
set "DIR=venv"

if exist "%DIR%" (
    echo.
) else (
    echo Directory '%DIR%' does not exist.
    python -m venv venv
)

call venv\Scripts\activate.bat

if exist requirements.txt (
    pip install -r requirements.txt
)

flask --app main run --debug
