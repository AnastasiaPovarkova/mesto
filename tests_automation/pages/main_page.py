from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pages.base_page import BasePage
import allure

class MainPage(BasePage):
    # ==========================================
    # --- Селекторы элементов на странице ---
    # ==========================================
    PROFILE_NAME = (By.CLASS_NAME, "profile__name")
    PROFILE_PROFESSION = (By.CLASS_NAME, "profile__profession")
    EDIT_PROFILE_BUTTON = (By.CLASS_NAME, "profile__edit-button")
    ADD_CARD_BUTTON = (By.CLASS_NAME, "profile__add-button")
    
    # --- Селекторы попапа профиля ---
    POPUP_EDIT_PROFILE = (By.CLASS_NAME, "popup_edit-profile")
    NAME_INPUT = (By.ID, "name-field")
    PROFESSION_INPUT = (By.ID, "profession-field")
    SUBMIT_PROFILE_BUTTON = (By.CSS_SELECTOR, ".popup_edit-profile .popup__submit")
    
    # --- Селекторы попапа карточек ---
    POPUP_ADD_CARD = (By.CLASS_NAME, "popup_add-card")
    CARD_TITLE_INPUT = (By.ID, "card-field")
    CARD_LINK_INPUT = (By.ID, "link-field")
    SUBMIT_CARD_BUTTON = (By.CSS_SELECTOR, ".popup_add-card .popup__submit")
    
    # --- Селекторы элементов карточки и удаления ---
    CARD_TEXT = (By.CLASS_NAME, "element__text")
    CARD_LIKE_BUTTON = (By.CLASS_NAME, "element__like")
    CARD_LIKE_COUNT = (By.CLASS_NAME, "element__count")
    CARD_TRASH_BUTTON = (By.CLASS_NAME, "element__trash")
    POPUP_CONFIRM_DELETE = (By.CLASS_NAME, "popup_delete-card")
    SUBMIT_DELETE_BUTTON = (By.CSS_SELECTOR, ".popup_delete-card .popup__submit")

    # ==========================================
    # --- Бизнес-логика: ПРОФИЛЬ ---
    # ==========================================
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

    # ==========================================
    # --- Бизнес-логика: КАРТОЧКИ ---
    # ==========================================
    @allure.step("Открыть попап добавления новой карточки")
    def open_add_card_popup(self):
        self.click(self.ADD_CARD_BUTTON)
        self.wait_for_element(self.POPUP_ADD_CARD)

    @allure.step("Создать новую карточку: Название={title}, Ссылка={link}")
    def create_new_card(self, title, link):
        self.send_keys(self.CARD_TITLE_INPUT, title)
        self.send_keys(self.CARD_LINK_INPUT, link)
        self.click(self.SUBMIT_CARD_BUTTON)
        WebDriverWait(self.driver, 10).until(
            EC.invisibility_of_element_located(self.POPUP_ADD_CARD)
        )

    @allure.step("Получить название первой карточки в списке")
    def get_first_card_title(self):
        return self.wait_for_element(self.CARD_TEXT).text

    @allure.step("Поставить лайк первой карточке")
    def like_first_card(self):
        self.click(self.CARD_LIKE_BUTTON)

    @allure.step("Получить количество лайков у первой карточки")
    def get_first_card_likes(self):
        return self.wait_for_element(self.CARD_LIKE_COUNT).text

    @allure.step("Удалить первую карточку")
    def delete_first_card(self):
        self.click(self.CARD_TRASH_BUTTON)
        self.wait_for_element(self.POPUP_CONFIRM_DELETE)
        self.click(self.SUBMIT_DELETE_BUTTON)
        WebDriverWait(self.driver, 10).until(
            EC.invisibility_of_element_located(self.POPUP_CONFIRM_DELETE)
        )