from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import allure

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.base_url = "https://anastasiapovarkova.github.io/mesto/"  # ссылка на GitHub Pages.

    def open(self, url=None):
        target_url = url if url else self.base_url
        with allure.step(f"Открыть страницу: {target_url}"):
            self.driver.get(target_url)

    # Метод для ожидания, что элемент появился и виден
    def wait_for_element(self, locator, timeout=10):
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located(locator)
        )

    # Метод для клика с ожиданием кликабельности
    def click(self, locator, timeout=10):
        element = WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable(locator)
        )
        element.click()

    # Метод для ввода текста в поле
    def send_keys(self, locator, text, timeout=10):
        element = self.wait_for_element(locator, timeout)
        element.clear()
        element.send_keys(text)