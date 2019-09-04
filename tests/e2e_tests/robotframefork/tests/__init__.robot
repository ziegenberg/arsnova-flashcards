*** Settings ***
Resource    utility/testdata.robot

Suite Setup    Custom Suite Setup


*** Keywords ***
Custom Suite Setup
    Load TestDB
    Check Environment Variables


Check Environment Variables
    Variable Should Exist    ${ENV_USE_GUI_BROWSER}    ERROR: You forgot to specify ENV_USE_GUI_BROWSER in the environment variables, Please pass using -v var:value in the command line
    Variable Should Exist    ${ENV_DEBUG_MODE}    ERROR: You forgot to specify ENV_DEBUG_MODE in the environment variables, Please pass using -v var:value in the command line
    Variable Should Exist    ${ENV_BROWSER_TIMEOUT}    ERROR: You forgot to specify ENV_BROWSER_TIMEOUT in the environment variables, Please pass using -v var:value in the command line
    Variable Should Exist    ${ENV_CARDS_URL}    ERROR: You forgot to specify ENV_CARDS_URL in the environment variables, Please pass using -v var:value in the command line

    Variable Should Exist    ${ENV_LOAD_TESTDB_PATH}    ERROR: You forgot to specify ENV_LOAD_TESTDB_PATH in the environment variables, Please pass using -v var:value in the command line