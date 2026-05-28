from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pages.base_page import BasePage
import allure

class MainPage(BasePage):
    # --- Селекторы элементов на странице ---
    PROFILE_NAME = (By.CLASS_NAME, "profile__name")
    PROFILE_PROFESSION = (By.CLASS_NAME, "profile__profession")
    EDIT_PROFILE_BUTTON = (By.CLASS_NAME, "profile__edit-button")
    
    # --- Селекторы Попапа профиля ---
    POPUP_EDIT_PROFILE = (By.CLASS_NAME, "popup_edit-profile")
    NAME_INPUT = (By.ID, "name-field")
    PROFESSION_INPUT = (By.ID, "profession-field")
    SUBMIT_PROFILE_BUTTON = (By.CSS_SELECTOR, ".popup_edit-profile .popup__submit")
    
    # --- Бизнес-логика (действия) ---
    @allure.step("Нажать кнопку редактирования профиля")
    def open_edit_profile_popup(self):
        self.click(self.EDIT_PROFILE_BUTTON)
        self.wait_for_element(self.POPUP_EDIT_PROFILE)

    @allure.step("Заполнить форму профиля: Имя={name}, Профессия={profession}")
    def fill_profile_data(self, name, profession):
        self.send_keys(self.NAME_INPUT, name)
        self.send_keys(self.PROFESSION_INPUT, profession)

    @allure.step("Сохранить изменения в профиле")
    def save_profile(self):
        self.click(self.SUBMIT_PROFILE_BUTTON)

    @allure.step("Ожидать и проверить имя в профиле: {1}")
    def wait_for_profile_name(self, expected_name, timeout=10):
        return WebDriverWait(self.driver, timeout).until(
            EC.text_to_be_present_in_element(self.PROFILE_NAME, expected_name)
        )

    @allure.step("Ожидать и проверить профессию в профиле: {1}")
    def wait_for_profile_profession(self, expected_profession, timeout=10):
        return WebDriverWait(self.driver, timeout).until(
            EC.text_to_be_present_in_element(self.PROFILE_PROFESSION, expected_profession)
        )

    @allure.step("Получить текущее имя в профиле")
    def get_profile_name(self):
        return self.wait_for_element(self.PROFILE_NAME).text

    @allure.step("Получить текущую профессию в профиле")
    def get_profile_profession(self):
        return self.wait_for_element(self.PROFILE_PROFESSION).text