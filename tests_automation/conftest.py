import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope="function")
def driver():
    options = Options()
    # Раскомментируйте строчку ниже для запуска в GitHub Actions (без графического интерфейса)
    # options.add_argument("--headless") 
    options.add_argument("--window-size=1280,800")
    options.add_argument("--incognito")
    
    # Автоматически скачивает и управляет нужной версией ChromeDriver
    service = ChromeService(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    yield driver
    
    driver.quit()